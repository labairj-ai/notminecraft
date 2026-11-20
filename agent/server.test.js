import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
test('Explorer makes decisions, saves state, and resumes after restart', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'notminecraft-agent-'));
  const statePath = path.join(dir, 'explorer.json');
  const port = 19000 + Math.floor(Math.random() * 30000);
  let proc;
  async function start() {
    proc = spawn(process.execPath, ['agent/server.js'], {
      env: { ...process.env, AGENT_PORT: String(port), AGENT_DATA: statePath, AGENT_LLM: 'off' },
      stdio: 'ignore'
    });
    for (let i = 0; i < 80; i++) {
      if (proc.exitCode !== null) throw Error('Agent exited early');
      try {
        const res = await fetch(`http://127.0.0.1:${port}/state`);
        if (res.ok) return res.json();
      } catch {}
      await sleep(50);
    }
    throw Error('Explorer did not start');
  }
  async function stop() {
    if (!proc || proc.exitCode !== null) return;
    const child = proc;
    await new Promise(resolve => {
      child.once('exit', resolve);
      child.kill('SIGTERM');
    });
    proc = null;
  }
  try {
    let state = await start();
    assert.equal(state.seed, 4242);
    for (let i = 0; i < 30 && state.tick === 0; i++) {
      await sleep(50);
      state = await (await fetch(`http://127.0.0.1:${port}/state`)).json();
    }
    assert.ok(state.tick >= 1, 'agent should perform first decision');
    assert.ok(state.memory.length > 0);
    const saved = JSON.parse(readFileSync(statePath, 'utf8'));
    assert.equal(saved.tick, state.tick);
    await stop();
    const restored = await start();
    assert.ok(restored.tick >= saved.tick, 'restart should retain history');
    assert.equal(restored.seed, saved.seed);
    assert.ok(restored.memory.length >= saved.memory.length);
  } finally {
    await stop();
    rmSync(dir, { recursive: true, force: true });
  }
});
