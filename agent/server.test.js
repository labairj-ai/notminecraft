import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import http from 'node:http';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import * as B from '../src/blocks.js';
import { experienceContext, initializeExperience, preference, recordExperience, recordChoice } from './experience.js';
import { RECIPES } from '../src/crafting.js';
import { craft, PICKAXE_GOAL, supplyStep } from './crafting.js';
import { findShelter, SHELTER_GOAL, shelterPlan, validShelter } from './shelter.js';
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

  return { start, readState, stop, statePath, get url() { return url; }, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
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

test('Crafting rejects missing ingredients or output space without consuming items', () => {
  const recipe = RECIPES.find(entry => entry.result.id === B.STICK);
  const short = [{ id: B.PLANKS, count: 1 }];
  assert.match(craft(short, recipe, 2).error, /Missing/);
  assert.deepEqual(short, [{ id: B.PLANKS, count: 1 }]);
  const full = [{ id: B.PLANKS, count: 3 }, ...Array.from({ length: 26 }, () => ({ id: B.WOOD, count: 64 }))];
  assert.match(craft(full, recipe, 2).error, /Inventory is full/);
  assert.equal(full[0].count, 3);
});

test('Explorer gathers, crafts, resumes, equips, and mines a generated pickaxe-only block', async () => {
  let requests = 0;
  const model = http.createServer(async (req, res) => {
    const chunks = [];
    for await (const part of req) chunks.push(part);
    const { options } = JSON.parse(JSON.parse(Buffer.concat(chunks)).messages[1].content);
    requests++;
    const choice = options.findIndex(option => option.label === PICKAXE_GOAL);
    res.end(JSON.stringify({ model: 'craft-test', choices: [{ message: { content: JSON.stringify({ choice, reason: 'Craft a first tool to unlock stone.' }) } }] }));
  });
  await new Promise(resolve => model.listen(0, '127.0.0.1', resolve));
  const { start, readState, stop, statePath, cleanup } = agentFixture({
    AGENT_LLM: 'on', LLM_URL: `http://127.0.0.1:${model.address().port}/v1/chat/completions`
  });
  try {
    await start(140);
    const intermediate = await waitFor(readState, s => s.inventory.some(item => item.id === B.PLANKS));
    assert.equal(intermediate.objective.label, PICKAXE_GOAL);
    assert.equal(intermediate.objective.source, 'llm');
    assert.deepEqual(intermediate.inventory, [{ id: B.PLANKS, count: 4 }]);
    assert.equal(requests, 1);
    await stop();
    const saved = JSON.parse(readFileSync(statePath, 'utf8'));
    assert.deepEqual(await start(140), { ...saved, online: true });

    const completed = await waitFor(readState, s => s.pickaxeUsed || s.objective?.status === 'failed', 60000);
    assert.equal(completed.lastObjectiveOutcome.status, 'completed', JSON.stringify(completed.lastObjectiveOutcome));
    assert.equal(requests, 1, 'craft and navigation require no further inference');
    assert.equal(completed.equippedTool, B.TOOL_PICKAXE);
    const finalCraft = completed.memory.find(e => e.produced?.id === B.TOOL_PICKAXE);
    assert.deepEqual(finalCraft.consumed, { [B.PLANKS]: 3, [B.STICK]: 2 });
    const tableKey = positionKey(finalCraft.table);
    assert.equal(completed.placedBlocks[tableKey], B.CRAFTING);
    const original = createExplorerWorld(completed.seed, {});
    const restoredWorld = createExplorerWorld(completed.seed, completed.removedBlocks, completed.placedBlocks);
    assert.equal(original.getBlock(finalCraft.table.x, finalCraft.table.y, finalCraft.table.z), B.AIR);
    assert.equal(restoredWorld.getBlock(finalCraft.table.x, finalCraft.table.y, finalCraft.table.z), B.CRAFTING);
    const edits = Object.entries(completed.removedBlocks);
    const wood = edits.filter(([, id]) => id === B.WOOD);
    assert.equal(wood.length, 3);
    for (const [key] of wood) assert.equal(original.getBlock(...key.split(',').map(Number)), B.WOOD);
    const mined = completed.memory.find(e => e.action === 'mine' && e.tool === B.TOOL_PICKAXE);
    assert.ok(mined);
    assert.equal(B.blockBreakTime(mined.block.id), Infinity);
    assert.ok(Number.isFinite(B.blockBreakTime(mined.block.id, B.TOOL_PICKAXE)));
    const { x, y, z, id } = mined.block;
    assert.equal(original.getBlock(x, y, z), id);
    assert.equal(restoredWorld.getBlock(x, y, z), B.AIR);
    const expected = { [B.PLANKS]: 3, [B.STICK]: 2, [B.TOOL_PICKAXE]: 1 };
    for (const [key, blockId] of edits) {
      if (blockId === B.WOOD) continue;
      assert.equal(original.getBlock(...key.split(',').map(Number)), blockId);
      const { id: dropId, count } = B.blockDrop(blockId);
      expected[dropId] = (expected[dropId] ?? 0) + count;
    }
    assert.deepEqual(Object.fromEntries(completed.inventory.map(item => [item.id, item.count])), expected);
    await stop();
    const final = JSON.parse(readFileSync(statePath, 'utf8'));
    assert.deepEqual(await start(5000), { ...final, online: true });
    console.log(`Crafted and placed table at ${tableKey}; ${mined.outcome} at ${positionKey(mined.block)}`);
  } finally {
    await stop();
    await new Promise(resolve => model.close(resolve));
    cleanup();
  }
});

test('A saved crafting goal with unavailable wood fails honestly and yields to another objective', async () => {
  const { start, readState, stop, statePath, cleanup } = agentFixture();
  try {
    const world = createExplorerWorld(4242, {});
    const origin = world.spawn(8, 8);
    const failedDestinations = {};
    for (const { position } of world.survey(origin, {}).queue) {
      failedDestinations[positionKey(position)] = true;
      for (const block of world.resources(position)) {
        if (block.id === B.WOOD) failedDestinations[positionKey(block)] = true;
      }
    }
    writeFileSync(statePath, JSON.stringify({
      ...origin, seed: 4242, version: 2, tick: 0, energy: 100, inventory: [],
      memory: [], visited: {}, obstacles: {}, failedDestinations, discoveries: [],
      objective: { kind: 'craft', label: PICKAXE_GOAL, status: 'active', progress: { completed: [], searches: 0 } }
    }));
    await start(125);
    const failed = await waitFor(readState, s => s.lastObjectiveOutcome?.status === 'failed');
    assert.match(failed.lastObjectiveOutcome.detail, /Missing wood/);
    assert.deepEqual(failed.inventory, []);
    assert.deepEqual(failed.removedBlocks, {});
    assert.ok(!failed.memory.some(e => e.action === 'craft' && e.result === 'success'));
    const next = await waitFor(readState, s => s.objective?.kind !== 'craft');
    assert.ok(next.craftRetryAt > next.tick);
  } finally {
    await stop();
    cleanup();
  }
});

test('Shelter survey rejects an obstructed footprint and respects remembered rejections', () => {
  const center = { x: -2, y: 34, z: 14 };
  const world = createExplorerWorld(4242, {});
  const { queue } = world.survey(center, {}, 24);
  const baseline = findShelter(world, queue, {}).plan;
  assert.deepEqual(baseline.center, center);
  const blocker = positionKey({ ...center, y: center.y + 2 });
  const altered = createExplorerWorld(4242, {}, { [blocker]: B.CRAFTING });
  assert.equal(validShelter(altered, baseline), false);
  const chosen = findShelter(altered, queue, {});
  assert.ok(chosen.unsuitable.includes(positionKey(center)));
  assert.ok(chosen.plan);
  assert.notDeepEqual(chosen.plan.center, center);
  const remembered = findShelter(world, queue, { [positionKey(center)]: true });
  assert.notDeepEqual(remembered.plan.center, center);
  assert.equal(altered.getBlock(...blocker.split(',').map(Number)), B.CRAFTING);
});

test('Explorer gathers missing wood, crafts planks, and resumes block-by-block shelter construction', async () => {
  const prompts = [];
  const model = http.createServer(async (req, res) => {
    const chunks = [];
    for await (const part of req) chunks.push(part);
    const prompt = JSON.parse(JSON.parse(Buffer.concat(chunks)).messages[1].content);
    prompts.push(prompt);
    const choice = prompt.options.findIndex(option => option.kind === 'shelter');
    res.end(JSON.stringify({ model: 'shelter-test', choices: [{ message: { content: JSON.stringify({ choice, reason: 'A level site is reachable and building materials are within reach.' }) } }] }));
  });
  await new Promise(resolve => model.listen(0, '127.0.0.1', resolve));
  const { start, readState, stop, statePath, cleanup } = agentFixture({
    AGENT_LLM: 'on', LLM_URL: `http://127.0.0.1:${model.address().port}/v1/chat/completions`
  });
  const origin = { x: -2, y: 34, z: 14 };
  const oldPlacement = '-9,36,0';
  const oldRemoval = '3,30,14';
  const savedEdits = { [oldPlacement]: B.CRAFTING };
  try {
    writeFileSync(statePath, JSON.stringify({
      ...origin, seed: 4242, version: 2, tick: 0, energy: 100,
      inventory: [{ id: B.WOOD, count: 5 }], memory: [], visited: {}, obstacles: {},
      failedDestinations: {}, discoveries: [], placedBlocks: savedEdits, removedBlocks: { [oldRemoval]: B.WOOD }
    }));
    assert.deepEqual(supplyStep([{ id: B.WOOD, count: 5 }], B.PLANKS, 23).missing, [{ id: B.WOOD, count: 1 }]);
    await start(100);
    const mid = await waitFor(readState, s => s.objective?.progress?.placed >= 7, 28000);
    assert.equal(mid.objective.label, SHELTER_GOAL);
    assert.ok(prompts[0].options.some(option => option.kind === 'explore'));
    assert.ok(prompts[0].options.some(option => option.kind === 'gather'));
    assert.equal(countPlanks(mid), 24 - mid.objective.progress.placed);
    const gathered = mid.memory.find(e => e.action === 'mine' && e.block.id === B.WOOD);
    assert.ok(gathered);
    assert.notDeepEqual({x:gathered.x,y:gathered.y,z:gathered.z}, origin);
    assert.equal(mid.removedBlocks[positionKey(gathered.block)], B.WOOD);
    assert.equal(createExplorerWorld(4242, {}).getBlock(gathered.block.x, gathered.block.y, gathered.block.z), B.WOOD);
    assert.equal(mid.placedBlocks[oldPlacement], B.CRAFTING);
    assert.equal(mid.removedBlocks[oldRemoval], B.WOOD);
    await stop();
    const saved = JSON.parse(readFileSync(statePath, 'utf8'));
    assert.deepEqual(await start(120), { ...saved, online: true });

    const completed = await waitFor(readState, s => s.shelters?.length || s.objective?.status === 'failed');
    assert.equal(completed.lastObjectiveOutcome.status, 'completed', JSON.stringify(completed.lastObjectiveOutcome));
    const { plan, placed } = completed.objective.progress;
    assert.equal(placed, 23);
    assert.equal(countPlanks(completed), 1);
    assert.equal(Object.keys(completed.placedBlocks).length, 24);
    assert.equal(completed.placedBlocks[oldPlacement], B.CRAFTING);
    assert.equal(completed.removedBlocks[oldRemoval], B.WOOD);
    assert.equal(prompts.length, 1);
    const persisted = createExplorerWorld(completed.seed, completed.removedBlocks, completed.placedBlocks);
    assert.ok(validShelter(persisted, plan, placed));
    assert.ok(persisted.stepTo(plan.outside, plan.entrance.x, plan.entrance.z));
    assert.ok(persisted.stepTo(plan.entrance, plan.center.x, plan.center.z));
    assert.ok(completed.memory.some(entry => /Verified shelter/.test(entry.outcome)));
    await stop();
    const final = JSON.parse(readFileSync(statePath, 'utf8'));
    assert.deepEqual(await start(5000), { ...final, online: true });
    console.log(`Built and verified ${placed} blocks at ${positionKey(plan.center)}; acquired one missing log and retained prior edits`);
  } finally {
    await stop();
    await new Promise(resolve => model.close(resolve));
    cleanup();
  }
});

function countPlanks(state) {
  return state.inventory.filter(item => item.id === B.PLANKS).reduce((sum, item) => sum + item.count, 0);
}

test('Shelter with unreachable wood makes no placements and records the unmet prerequisite', async () => {
  const { start, readState, stop, statePath, cleanup } = agentFixture();
  try {
    const origin = { x: -2, y: 34, z: 14 };
    const world = createExplorerWorld(4242, {});
    const { queue } = world.survey(origin, {});
    const failedDestinations = {};
    for (const { position } of queue) {
      failedDestinations[positionKey(position)] = true;
      for (const block of world.resources(position)) {
        if (block.id === B.WOOD) failedDestinations[positionKey(block)] = true;
      }
    }
    writeFileSync(statePath, JSON.stringify({
      ...origin, seed: 4242, version: 2, tick: 0, energy: 100, inventory: [],
      memory: [], visited: {}, obstacles: {}, failedDestinations, discoveries: [],
      objective: { kind: 'shelter', label: SHELTER_GOAL, status: 'active', progress: { completed: [], searches: 0 } }
    }));
    await start(120);
    const failed = await waitFor(readState, state => state.lastObjectiveOutcome?.status === 'failed');
    assert.match(failed.lastObjectiveOutcome.detail, /Missing wood/);
    assert.deepEqual(failed.objective.progress.missing, [{ id: B.WOOD, count: 6 }]);
    assert.deepEqual(failed.placedBlocks, {});
    assert.deepEqual(failed.inventory, []);
    assert.ok(failed.shelterRetryAt > failed.tick);
  } finally {
    await stop();
    cleanup();
  }
});

function homeFixture() {
  const plan = shelterPlan({ x: -2, y: 34, z: 14 }, [0, -1]);
  const placedBlocks = Object.fromEntries(plan.blocks.map(block => [positionKey(block), B.PLANKS]));
  const world = createExplorerWorld(4242, {}, placedBlocks);
  const origin = plan.center;
  return { plan, world, state: {
    ...origin, version: 2, seed: 4242, energy: 51, tick: 0, name: 'Explorer',
    inventory: [], memory: [], obstacles: {}, failedDestinations: {}, discoveries: [],
    visited: { [positionKey(origin)]: 1 }, placedBlocks, removedBlocks: {},
    shelters: [{ position: origin, entrance: plan.entrance, blocks: 23 }]
  } };
}

test('Explorer leaves an existing shelter, returns on low energy and persists home recovery', async () => {
  const fixture = agentFixture();
  const { plan, world, state } = homeFixture();
  const destination = world.survey(plan.center, {}).queue.find(entry => entry.route.length === 6);
  state.destination = destination;
  state.objective = { kind: 'explore', label: 'Explore nearby terrain', status: 'active' };
  writeFileSync(fixture.statePath, JSON.stringify(state));
  try {
    await fixture.start(125);
    const away = await waitFor(fixture.readState, s => positionKey(s) === positionKey(destination.position));
    assert.equal(away.energy, 39);
    const returning = await waitFor(fixture.readState, s => s.objective?.kind === 'home' && s.destination);
    assert.equal(positionKey(returning.destination.route.at(-2)), positionKey(plan.entrance));
    const recovered = await waitFor(fixture.readState, s => s.lastObjectiveOutcome?.detail === 'Recovered at home');
    assert.equal(positionKey(recovered), positionKey(plan.center));
    assert.ok(recovered.energy >= 75);
    assert.ok(recovered.memory.some(e => e.outcome.includes('Returned home through')));
    assert.ok(recovered.memory.some(e => e.outcome.includes('Rested at home')));
    await waitFor(fixture.readState, s => s.objective?.kind !== 'home');
    await fixture.stop();
    const saved = JSON.parse(readFileSync(fixture.statePath));
    assert.deepEqual(await fixture.start(5000), { ...saved, online: true });
    assert.deepEqual(saved.home.position, plan.center);
  } finally {
    await fixture.stop();
    fixture.cleanup();
  }
});

async function playerEdit(fixture, edit, origin = 'http://localhost:5177', withToken = true) {
  const response = await fetch(fixture.url, { headers: { Origin: origin } });
  const token = response.headers.get('X-Explorer-Session');
  return fetch(new URL('/edit', fixture.url), { method: 'POST', headers: {
    Origin: origin, 'Content-Type': 'application/json', 'X-Explorer-Session': withToken ? token ?? '' : ''
  }, body: JSON.stringify({ seed: 4242, ...edit }) });
}

test('Local edits are authorized, revision-checked, rerouted around and persisted with observations', async () => {
  const fixture = agentFixture();
  const { plan, world, state } = homeFixture();
  Object.assign(state, plan.outside, { energy: 90 });
  const destination = world.survey(plan.outside, {}).queue.find(entry => entry.route.length === 4 &&
    entry.route[0].x === -3 && entry.route[0].y === plan.outside.y);
  const cell = destination.route[0];
  const key = positionKey(cell);
  const anchor = { ...cell, y: cell.y-1 };
  const eye = { x: cell.x-.5,y:cell.y+1.62,z:cell.z+.5 };
  state.destination = destination;
  state.objective = { kind: 'explore', label: 'Walk the route', status: 'active' };
  writeFileSync(fixture.statePath, JSON.stringify(state));
  try {
    await fixture.start(700);
    const place = { ...cell, id: B.PLANKS, before: B.AIR, revision: 0, eye, anchor };
    assert.equal((await playerEdit(fixture, place, 'https://example.org')).status, 403);
    assert.equal((await playerEdit(fixture, place, undefined, false)).status, 403);
    const response = await playerEdit(fixture, place);
    assert.equal(response.status, 200);
    const { revision } = await response.json();
    assert.equal((await playerEdit(fixture, place)).status, 409);
    const changed = await waitFor(fixture.readState, s => s.memory.some(e => e.outcome.includes('Adapted route') || e.outcome.includes('route is blocked')));
    assert.equal(changed.placedBlocks[key], B.PLANKS);
    assert.ok(changed.memory.some(e => e.outcome === 'Observed player-placed Planks'));
    assert.ok(Object.keys(changed.obstacles).some(edge => edge.endsWith(`>${cell.x},${cell.z}`)));
    assert.equal((await playerEdit(fixture, { ...place, id: B.AIR, before: B.PLANKS, revision })).status, 200);
    const cleared = await waitFor(fixture.readState, s => s.memory.some(e => e.outcome === 'Observed player removal of Planks'));
    assert.ok(!Object.keys(cleared.obstacles).some(edge => edge.endsWith(`>${cell.x},${cell.z}`)));
    assert.notEqual(cleared.voxelRevisions[key], revision);
    assert.equal((await playerEdit(fixture, place)).status, 409, 'reject stale edit even though the old voxel value returned');

    const wall = plan.blocks[0];
    const wallKey = positionKey(wall);
    const removed = await playerEdit(fixture, { ...wall, id: B.AIR, before: B.PLANKS, revision: 0,
      eye: { x: wall.x+.5,y:wall.y+1.62,z:wall.z-1 } });
    assert.equal(removed.status, 200);
    const damaged = await waitFor(fixture.readState, s => s.home?.complete === false);
    assert.equal(damaged.home.usable, false);
    assert.ok(damaged.memory.some(e => e.outcome.includes('found shelter damage')));
    assert.equal(damaged.placedBlocks[wallKey], undefined);
    await fixture.stop();
    const saved = JSON.parse(readFileSync(fixture.statePath));
    const restarted = await fixture.start(5000);
    assert.deepEqual(restarted, { ...saved, online: true });
    assert.equal(createExplorerWorld(4242, restarted.removedBlocks, restarted.placedBlocks).getBlock(wall.x,wall.y,wall.z), B.AIR);
  } finally {
    await fixture.stop();
    fixture.cleanup();
  }
});

test('Explorer notices nearby exposed wood but does not perceive distant player edits', async () => {
  const fixture = agentFixture();
  const { world, state } = homeFixture();
  state.energy = 28;
  state.objective = { kind: 'rest', label: 'Recover energy', status: 'active' };
  const near = { x: -5, y: 36, z: 12 };
  const far = { x: 22, y: 33, z: 44 };
  const wood = { x: -5, y: 36, z: 13 };
  assert.equal(world.getBlock(...positionKey(wood).split(',').map(Number)), B.WOOD);
  writeFileSync(fixture.statePath, JSON.stringify(state));
  try {
    await fixture.start(400);
    for (const p of [far, near]) {
      const before = world.getBlock(p.x,p.y,p.z);
      assert.equal(before, B.LEAVES);
      const response = await playerEdit(fixture, {
        ...p, before, id: B.AIR, revision: 0, eye: { x:p.x+.5,y:p.y+.5,z:p.z-.5 }
      });
      assert.equal(response.status, 200);
    }
    const observed = await waitFor(fixture.readState, s => s.memory.some(e => e.outcome === 'Discovered exposed Wood Log'));
    assert.ok(observed.discoveries.some(block => positionKey(block) === positionKey(wood)));
    assert.equal(observed.removedBlocks[positionKey(far)], B.LEAVES);
    assert.equal(observed.observedChanges[positionKey(far)], undefined);
    assert.ok(!observed.memory.some(e => e.block && positionKey(e.block) === positionKey(far)));
  } finally {
    await fixture.stop();
    fixture.cleanup();
  }
});

function learningFixture(inventory = []) {
  return {
    version: 2, seed: 4242, name: 'Explorer', x: -2, y: 34, z: 14, tick: 0, energy: 100,
    inventory, memory: [], obstacles: {}, failedDestinations: {}, discoveries: [],
    visited: { '-2,34,14': 1 }, placedBlocks: {}, removedBlocks: {}
  };
}

async function modelFixture(handler) {
  const model = http.createServer(async (req, res) => {
    try {
      const chunks = [];
      for await (const part of req) chunks.push(part);
      const request = JSON.parse(Buffer.concat(chunks));
      const prompt = JSON.parse(request.messages[1].content);
      const answer = await handler(prompt, request);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(answer));
    } catch (error) {
      res.writeHead(502).end(JSON.stringify({ error: error.message }));
    }
  });
  await new Promise(resolve => model.listen(0, '127.0.0.1', resolve));
  return {
    env: { AGENT_LLM: 'on', LLM_URL: `http://127.0.0.1:${model.address().port}/v1/chat/completions` },
    stop: () => new Promise(resolve => model.close(resolve))
  };
}

const modelChoice = (choice, reason) => ({
  model: 'controlled-model', choices: [{ message: { content: JSON.stringify({ choice, reason }) } }]
});

test('Verified exploration increases neutral interest with diminishing gains and restarts intact', async () => {
  const model = await modelFixture(prompt => modelChoice(
    prompt.options.findIndex(option => option.kind === 'explore'), 'Exercise a feasible exploration choice'
  ));
  const fixture = agentFixture(model.env);
  const initial = learningFixture();
  initializeExperience(initial);
  assert.deepEqual(Object.values(initial.experience.interests), [50,50,50,50,50]);
  writeFileSync(fixture.statePath, JSON.stringify(initial));
  try {
    await fixture.start(125);
    const reached = await waitFor(fixture.readState, s => s.experience.competence.exploration.success === 3);
    assert.deepEqual(reached.experience.recentChanges.filter(e => e.activity === 'exploration').map(e => e.delta), [3,2,1]);
    assert.equal(reached.experience.interests.exploration, 56);
    assert.equal(reached.experience.competence.navigation.success, 3);
    assert.ok(reached.tick > 12, 'movement ticks do not count as attempts');
    assert.equal(reached.experience.competence.gathering.success, 0);
    assert.ok(reached.memory.some(entry => entry.supplied?.interests.exploration === 53));
    await fixture.stop();
    const saved = JSON.parse(readFileSync(fixture.statePath));
    assert.deepEqual(await fixture.start(5000), { ...saved, online: true });
  } finally {
    await fixture.stop();
    await model.stop();
    fixture.cleanup();
  }
});

test('One successful recipe and one rejected recipe produce a 50% crafting success rate', async () => {
  const fixture = agentFixture();
  const initial = learningFixture([{ id: B.WOOD, count: 1 }]);
  initial.objective = { kind: 'supplies', label: 'Craft planks for supplies', status: 'active',
    progress: { completed: [], searches: 0 } };
  try {
    writeFileSync(fixture.statePath, JSON.stringify(initial));
    await fixture.start(150);
    const success = await waitFor(fixture.readState, s => s.experience?.competence.crafting.success === 1);
    await fixture.stop();
    const failedInput = {
      ...success, inventory: [{ id: B.WOOD, count: 2 }, ...Array.from({ length: 26 }, () => ({ id: B.STONE, count: 64 }))],
      objective: { ...initial.objective, progress: { completed: [], searches: 0 } }
    };
    writeFileSync(fixture.statePath, JSON.stringify(failedInput));
    await fixture.start(150);
    const failed = await waitFor(fixture.readState, s => s.experience.competence.crafting.failure === 1);
    assert.deepEqual(failed.experience.competence.crafting, { success: 1, failure: 1 });
    assert.equal(experienceContext(failed).competence.crafting.rate, 50);
    assert.deepEqual(failed.inventory, failedInput.inventory);
    assert.equal(failed.lastObjectiveOutcome.detail, 'Inventory is full');
    assert.equal(failed.experience.interests.crafting, 52);
    assert.equal(failed.experience.competence.navigation.success, 0);
  } finally {
    await fixture.stop();
    fixture.cleanup();
  }
});

test('Repeated success and failure keep preference history bounded without changing feasibility', () => {
  const state = learningFixture();
  for (let i = 0; i < 1000; i++) {
    recordChoice(state, { kind: 'gather' });
    recordExperience(state, 'gathering', 'success', 'same wood', 'Collected Wood Log');
    recordExperience(state, 'gathering', 'failure', 'same wood', 'Could not reach Wood Log');
  }
  assert.equal(state.experience.interests.gathering, 55);
  assert.deepEqual(state.experience.competence.gathering, { success: 1000, failure: 1000 });
  assert.equal(state.experience.recentChoices.length, 12);
  assert.equal(state.experience.recentOutcomes.gathering.length, 8);
  assert.equal(state.experience.recentChanges.length, 4);
});

test('Recent repetition can outweigh modest interest without making an activity infeasible', () => {
  const state = learningFixture();
  const gather = { kind: 'gather' };
  const explore = { kind: 'explore' };
  for (let i = 0; i < 3; i++) recordExperience(state, 'gathering', 'success', 'wood', 'Collected Wood Log');
  assert.ok(preference(experienceContext(state), gather) > preference(experienceContext(state), explore));
  for (let i = 0; i < 3; i++) recordChoice(state, gather);
  const context = experienceContext(state);
  assert.equal(context.interests.gathering, 56);
  assert.ok(preference(context, gather) < preference(context, explore));
});

async function pairedHistories(handler) {
  const prompts = [];
  const model = await modelFixture((prompt, request) => {
    prompts.push(prompt);
    return handler(prompt, request);
  });
  const decisions = [];
  try {
    for (const [activity, detail] of [
      ['construction', 'Verified shelter with 23 placed planks'],
      ['exploration', 'Reached an unfamiliar destination']
    ]) {
      const fixture = agentFixture(model.env);
      const initial = learningFixture([{ id: B.WOOD, count: 6 }, { id: B.TOOL_PICKAXE, count: 1 }]);
      initial.equippedTool = B.TOOL_PICKAXE;
      initial.pickaxeUsed = true;
      for (let i = 0; i < 5; i++) {
        recordExperience(initial, activity, 'success', activity, detail);
        recordChoice(initial, { kind: activity === 'construction' ? 'shelter' : 'explore' });
        initial.memory.push({
          at: new Date(1000 * i).toISOString(), action: 'objective', result: 'completed', outcome: detail,
          objectiveOutcome: { label: activity, status: 'completed', detail }
        });
      }
      writeFileSync(fixture.statePath, JSON.stringify(initial));
      try {
        await fixture.start(500);
        const chosen = await waitFor(fixture.readState, s => s.objective?.source, 25000);
        assert.equal(chosen.objective.source, 'llm', chosen.objective.sourceNote);
        assert.equal(chosen.objective.experience.interests[activity], 56);
        assert.deepEqual(chosen.objective.experience.competence[activity], { success:5, failure:0, rate:100 });
        assert.ok(chosen.objective.memories.some(e => e.outcome === detail));
        assert.deepEqual(chosen.memory.find(e => e.action === 'decision').supplied.interests, chosen.objective.experience.interests);
        decisions.push(chosen.objective);
      } finally {
        await fixture.stop();
        fixture.cleanup();
      }
    }
    assert.equal(prompts.length, 2);
    const [{ experience: a, memories: am, ...worldA }, { experience: b, memories: bm, ...worldB }] = prompts;
    assert.deepEqual(worldA, worldB, 'terrain, equipment, inventory, energy and feasible options match');
    assert.notDeepEqual(a, b);
    assert.notDeepEqual(am, bm);
    assert.ok(worldA.options.some(option => option.kind === 'shelter'));
    assert.ok(worldA.options.some(option => option.kind === 'explore'));
    return { decisions, prompts };
  } finally {
    await model.stop();
  }
}

test('Matched world scenarios send different experience to the same model policy', async () => {
  const { decisions } = await pairedHistories(prompt => {
    const best = prompt.options.reduce((a, b) =>
      (prompt.experience.interests[b.activity] ?? 50) > (prompt.experience.interests[a.activity] ?? 50) ? b : a);
    return modelChoice(prompt.options.indexOf(best), 'Choose the strongest learned preference among feasible options');
  });
  assert.deepEqual(decisions.map(option => option.kind), ['shelter', 'explore']);
});

test('Real Ollama evaluates the two matched worlds', { skip: process.env.AGENT_REAL_LEARNING !== 'on' }, async () => {
  const { decisions, prompts } = await pairedHistories(async (prompt, request) => {
    const response = await fetch(process.env.LLM_URL ?? 'http://127.0.0.1:11434/v1/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request), signal: AbortSignal.timeout(19000)
    });
    assert.ok(response.ok, `Ollama returned HTTP ${response.status}`);
    return response.json();
  });
  for (const [i, objective] of decisions.entries()) {
    console.log(JSON.stringify({
      scenario: i ? 'exploration history' : 'construction history',
      model: objective.model, choice: objective.label, reason: objective.reason,
      experience: prompts[i].experience, memories: prompts[i].memories.map(e => e.outcome),
      options: prompts[i].options.map(e => e.label)
    }));
  }
});

test('A fully explored enclosure does not offer another exploration circuit', async () => {
  const { plan, state } = homeFixture();
  state.energy = 54;
  state.inventory = [{ id: B.WOOD, count: 6 }];
  state.placedBlocks[positionKey(plan.outside)] = B.PLANKS;
  state.placedBlocks[positionKey({ ...plan.outside, y: plan.outside.y + 1 })] = B.PLANKS;
  const world = createExplorerWorld(state.seed, {}, state.placedBlocks);
  const { queue } = world.survey(plan.center, {});
  assert.equal(queue.length, 2, 'both interior and entrance are reachable');
  state.visited = Object.fromEntries(queue.map(({ position }) => [positionKey(position), 30]));

  let considered;
  const model = await modelFixture(prompt => {
    considered = prompt.options;
    return modelChoice(prompt.options.findIndex(option => option.kind === 'rest'), 'Navigation cannot expose new terrain');
  });
  const fixture = agentFixture(model.env);
  writeFileSync(fixture.statePath, JSON.stringify(state));
  try {
    await fixture.start(150);
    const choice = await waitFor(fixture.readState, s => s.objective?.status === 'active');
    assert.ok(considered.some(option => option.kind === 'craft'));
    assert.ok(!considered.some(option => option.kind === 'explore'));
    assert.equal(choice.objective.kind, 'rest');
  } finally {
    await fixture.stop();
    await model.stop();
    fixture.cleanup();
  }
});
