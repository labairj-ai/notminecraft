import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import http from 'node:http';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import * as B from '../src/blocks.js';
import { createExplorerWorld, positionKey } from './world.js';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function agentFixture(modelEnv = { AGENT_LLM: 'off' }) {
  const dir = mkdtempSync(path.join(tmpdir(), 'notminecraft-agent-'));
  const statePath = path.join(dir, 'explorer.json');
  let proc;
  let url;

  async function start(interval) {
    proc = spawn(process.execPath, ['agent/server.js'], {
      env: {
        ...process.env, AGENT_PORT: '0', AGENT_DATA: statePath,
        ...modelEnv, AGENT_INTERVAL_MS: String(interval)
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

  return { start, readState, stop, statePath, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

async function waitFor(readState, predicate, timeout = 18000) {
  const deadline = Date.now() + timeout;
  do {
    const state = await readState();
    if (predicate(state)) return state;
    await sleep(30);
  } while (Date.now() < deadline);
  assert.fail('Expected Explorer state was not reached in time');
}

test('Explorer discovers and collects a generated block, then restores the entire result', async () => {
  const { start, readState, stop, statePath, cleanup } = agentFixture();
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
    cleanup();
  }
});

test('Model uses a completed objective to choose a remembered site; restart and outage preserve autonomy', async () => {
  const requests = [];
  const model = http.createServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const prompt = JSON.parse(JSON.parse(Buffer.concat(chunks)).messages[1].content);
    requests.push(prompt);
    if (requests.length >= 3) {
      res.writeHead(503).end();
      return;
    }
    const learned = prompt.memories.some(entry => entry.objectiveOutcome?.detail === 'Collected Wood Log');
    const choice = learned
      ? prompt.options.findIndex(option => option.kind === 'revisit' && option.site?.id === B.WOOD)
      : prompt.options.findIndex(option => option.kind === 'gather' && option.block?.id === B.WOOD);
    const reason = learned ? 'Return to the remembered site where gathering wood succeeded.' : 'Inventory has no wood and a log is accessible.';
    res.end(JSON.stringify({ model: 'test-model', choices: [{ message: { content: JSON.stringify({ choice, reason }) } }] }));
  });
  await new Promise(resolve => model.listen(0, '127.0.0.1', resolve));
  const { start, readState, stop, statePath, cleanup } = agentFixture({
    AGENT_LLM: 'on', LLM_URL: `http://127.0.0.1:${model.address().port}/v1/chat/completions`, LLM_MODEL: 'test-model'
  });

  try {
    await start(200);
    const first = await waitFor(readState, state => state.objective?.source === 'llm');
    assert.equal(first.objective.kind, 'gather');
    assert.ok(requests[0].options.some(option => option.kind === 'explore'));
    assert.equal(requests[0].inventory.length, 0);
    const block = first.destination.resource;
    assert.equal(createExplorerWorld(first.seed, {}).getBlock(block.x, block.y, block.z), B.WOOD);

    const second = await waitFor(readState, state => state.objective?.kind === 'revisit');
    assert.equal(requests.length, 2, 'model called only at objective boundaries');
    assert.deepEqual(second.inventory, [{ id: B.WOOD, count: 1 }]);
    assert.equal(second.removedBlocks[positionKey(block)], B.WOOD);
    assert.equal(second.objective.source, 'llm');
    assert.deepEqual(second.objective.site, block);
    assert.notEqual(positionKey(second.destination.resource), positionKey(block));
    assert.match(second.objective.reason, /remembered site/);
    assert.deepEqual(requests[1].inventory, [{ item: 'Wood Log', count: 1 }]);
    assert.ok(requests[1].memories.some(entry => entry.objectiveOutcome?.detail === 'Collected Wood Log'));
    assert.ok(requests[1].memories.some(entry => entry.outcome === 'Collected Wood Log' && positionKey(entry.block) === positionKey(block)));
    assert.ok(second.memory.some(entry => entry.objectiveOutcome?.status === 'completed'));

    await stop();
    const saved = JSON.parse(readFileSync(statePath, 'utf8'));
    const restored = await start(400);
    assert.deepEqual(restored, { ...saved, online: true });
    assert.equal(restored.objective.kind, 'revisit');
    assert.equal(restored.objective.status, 'active');
    assert.equal(requests.length, 2);

    const fallback = await waitFor(readState, state => state.objective?.sourceNote === 'Model returned HTTP 503');
    assert.equal(requests.length, 3);
    assert.equal(fallback.objective.source, 'fallback');
    assert.equal(fallback.lastObjectiveOutcome.label, second.objective.label);
    assert.equal(fallback.lastObjectiveOutcome.status, 'completed');
    assert.deepEqual(fallback.inventory, [{ id: B.WOOD, count: 2 }]);
    assert.equal(fallback.lastAIDecision.model, 'test-model');
    assert.ok(fallback.memory.some(entry => entry.action === 'decision' && entry.source === 'fallback'));
    const advanced = await waitFor(readState, state => state.tick > fallback.tick && state.action !== 'explore');
    assert.equal(advanced.objective.source, 'fallback');
    assert.equal(requests.length, 3);
  } finally {
    await stop();
    await new Promise(resolve => model.close(resolve));
    cleanup();
  }
});
