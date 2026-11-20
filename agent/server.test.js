import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import * as B from '../src/blocks.js';
import { createExplorerWorld, positionKey } from './world.js';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

test('Explorer discovers and collects a generated block, then restores the entire result', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'notminecraft-agent-'));
  const statePath = path.join(dir, 'explorer.json');
  let proc;
  let url;

  async function start(interval) {
    proc = spawn(process.execPath, ['agent/server.js'], {
      env: {
        ...process.env, AGENT_PORT: '0', AGENT_DATA: statePath,
        AGENT_LLM: 'off', AGENT_INTERVAL_MS: String(interval)
      },
      stdio: ['ignore', 'pipe', 'inherit']
    });
    url = await new Promise((resolve, reject) => {
      proc.once('error', reject);
      proc.once('exit', code => reject(Error(`Agent exited with code ${code}`)));
      proc.stdout.on('data', data => {
        const address = data.toString().match(/http:\/\/127\.0\.0\.1:\d+\/state/);
        if (address) resolve(address[0]);
      });
    });
    return readState();
  }

  async function readState() {
    const res = await fetch(url);
    assert.ok(res.ok);
    return res.json();
  }

  async function stop() {
    if (!proc || proc.exitCode !== null || proc.signalCode) return;
    const child = proc;
    await new Promise(resolve => {
      child.once('exit', resolve);
      child.kill('SIGTERM');
    });
    proc = null;
  }

  try {
    let state = await start(200);
    const generated = createExplorerWorld(state.seed, {});
    const startPosition = positionKey(state);
    let discovery;
    let collection;
    let steps = 0;
    const deadline = Date.now() + 18000;

    while (!collection && Date.now() < deadline) {
      const prev = state;
      await sleep(30);
      state = await readState();
      if (positionKey(prev) !== positionKey(state)) {
        assert.equal(state.action, 'navigate');
        const step = generated.stepTo(prev, state.x, state.z);
        assert.deepEqual(step, { x: state.x, y: state.y, z: state.z });
        steps++;
      }
      discovery ??= state.memory.find(entry => entry.outcome.startsWith('Discovered '));
      collection = state.memory.find(entry => entry.action === 'mine' && entry.result === 'success');
    }

    assert.ok(discovery, 'autonomous discovery');
    assert.ok(collection, 'autonomous collection');
    assert.ok(steps >= 2, 'valid movement before arrival');
    assert.notEqual(positionKey(state), startPosition);
    assert.deepEqual(collection.block, discovery.block);
    const { x, y, z, id } = collection.block;
    assert.equal(generated.getBlock(x, y, z), id);
    assert.equal(state.removedBlocks[positionKey(collection.block)], id);
    assert.deepEqual(state.inventory, [B.blockDrop(id)]);
    assert.ok(state.memory.some(entry => entry.action === 'inspect' && entry.block.id === id));
    const blocked = state.memory.find(entry => entry.outcome.startsWith('Blocked terrain'));
    assert.ok(blocked, 'observed a real obstacle');
    assert.ok(generated.survey(blocked, {}).obstacles.length > 0);
    assert.equal(generated.survey(blocked, state.obstacles).obstacles.length, 0, 'known edge is skipped');

    await stop();
    const saved = JSON.parse(readFileSync(statePath, 'utf8'));
    const restored = await start(5000);
    assert.deepEqual(restored, { ...saved, online: true });
    assert.deepEqual(restored.inventory, state.inventory);
    assert.equal(positionKey(restored), positionKey(state));
    assert.ok(restored.memory.some(entry => entry.outcome === collection.outcome));
    assert.equal(createExplorerWorld(restored.seed, restored.removedBlocks).getBlock(x, y, z), B.AIR);
    console.log(`${steps} steps, ${collection.outcome} at ${positionKey(collection.block)}; inventory and world restored`);
  } finally {
    await stop();
    rmSync(dir, { recursive: true, force: true });
  }
});
