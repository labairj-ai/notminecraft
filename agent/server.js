// Persistent, headless Explorer. The browser observes the same generated terrain and removals.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import * as B from '../src/blocks.js';
import { createExplorerWorld, positionKey } from './world.js';

const PORT = Number(process.env.AGENT_PORT || 8787);
const STORE = process.env.AGENT_DATA || path.resolve('data/explorer.json');
const LLM_URL = process.env.LLM_URL || 'http://127.0.0.1:8080/v1/chat/completions';
const LLM_MODEL = process.env.LLM_MODEL || 'local';
const USE_LLM = process.env.AGENT_LLM !== 'off';
const INTERVAL = Math.max(50, Number(process.env.AGENT_INTERVAL_MS || 5000));
const SLOTS = 27;

function load() {
  try {
    const saved = JSON.parse(fs.readFileSync(STORE, 'utf8'));
    if (saved.version === 1 || saved.version === 2) return saved;
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('Could not read explorer state:', err.message);
  }
  return { seed: 4242, name: 'Explorer', x: 8, z: 8, energy: 100, tick: 0, memory: [] };
}

let state = load();
const resumed = state.version === 2;
const world = createExplorerWorld(state.seed, state.removedBlocks ??= {});
if (!resumed) {
  const spawn = world.spawn(state.x, state.z);
  state = {
    ...state, ...spawn, version: 2, action: 'explore', inventory: [], destination: null,
    visited: { [positionKey(spawn)]: 1 },
    obstacles: {}, failedDestinations: {}, discoveries: [], lastAIDecision: null
  };
}

function save(next) {
  fs.mkdirSync(path.dirname(STORE), { recursive: true });
  const tmp = STORE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(next, null, 2));
  fs.renameSync(tmp, STORE);
}

function remember(next, action, result, outcome, details = {}) {
  next.memory.push({
    at: new Date().toISOString(), action, result, outcome,
    x: next.x, y: next.y, z: next.z, ...details
  });
  next.memory = next.memory.slice(-80);
}

function availableSlot(inventory, drop) {
  const existing = inventory.findIndex(slot => slot.id === drop.id && slot.count + drop.count <= B.maxStack(drop.id));
  if (existing !== -1) return existing;
  return inventory.length < SLOTS ? inventory.length : -1;
}

function miningTime(inventory, id) {
  return Math.min(B.blockBreakTime(id), ...inventory.map(slot => B.blockBreakTime(id, slot.id)));
}

function sameBlock(a, b) {
  return a.id === b.id && positionKey(a) === positionKey(b);
}

async function selectGoal(next, options) {
  if (!USE_LLM || options.length < 2 || Date.now() - (next.lastModelAttempt ?? 0) < 600000) return options[0];
  next.lastModelAttempt = Date.now();
  try {
    const response = await fetch(LLM_URL, {
      method: 'POST', signal: AbortSignal.timeout(4500),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: LLM_MODEL, max_tokens: 70, temperature: 0.4,
        messages: [
          { role: 'system', content: 'Choose one goal for a voxel-game character. Return JSON only with the zero-based option index: {"choice":0}.' },
          { role: 'user', content: JSON.stringify({
            energy: next.energy, inventory: next.inventory, recentExperiences: next.memory.slice(-5),
            options: options.map(({ resource, position, route }) => ({
              goal: resource ? `Collect ${B.getItemName(resource.id)}` : 'Explore new terrain',
              position, steps: route.length
            }))
          }) }
        ]
      })
    });
    if (!response.ok) return options[0];
    const output = (await response.json()).choices?.[0]?.message?.content || '';
    const { choice } = JSON.parse(output.match(/\{[^]*?\}/)?.[0] ?? output);
    if (Number.isInteger(choice) && options[choice]) {
      const { resource, position } = options[choice];
      next.lastAIDecision = {
        at: new Date().toISOString(), position, goal: resource ? `Collect ${B.getItemName(resource.id)}` : 'Explore new terrain'
      };
      return options[choice];
    }
  } catch {
    // The same validated options drive the deterministic fallback.
  }
  return options[0];
}

async function plan(next) {
  const { queue, obstacles } = world.survey({ x: next.x, y: next.y, z: next.z }, next.obstacles);
  for (const { key, x, z } of obstacles) {
    next.obstacles[key] = { x, z };
    remember(next, 'explore', 'failed', `Blocked terrain toward ${x}, ${z}`);
  }

  const resources = new Map();
  for (const entry of queue) {
    for (const resource of world.resources(entry.position)) {
      const key = positionKey(resource);
      if (resources.has(key) || next.failedDestinations[key]) continue;
      if (!Number.isFinite(miningTime(next.inventory, resource.id))) continue;
      if (availableSlot(next.inventory, B.blockDrop(resource.id)) < 0) continue;
      resources.set(key, { ...entry, resource });
    }
  }
  const candidates = [...resources.values()].sort((a, b) =>
    Number(b.resource.id === B.WOOD) - Number(a.resource.id === B.WOOD) ||
    Number(b.route.length >= 2) - Number(a.route.length >= 2) ||
    a.route.length - b.route.length
  ).slice(0, 3);
  const frontier = queue.filter(({ position, route }) =>
    route.length > 0 && !next.failedDestinations[positionKey(position)]
  ).sort((a, b) => (next.visited[positionKey(a.position)] ?? 0) -
    (next.visited[positionKey(b.position)] ?? 0) || b.route.length - a.route.length)[0];
  if (frontier) candidates.push(frontier);

  next.action = 'explore';
  if (!candidates.length) {
    next.action = 'rest';
    if (!next.memory.some(entry => entry.outcome === 'No reachable destination')) {
      remember(next, 'explore', 'failed', 'No reachable destination');
    }
    return;
  }
  const goal = await selectGoal(next, candidates);
  next.destination = goal;
  if (!goal.resource) return;
  const name = B.getItemName(goal.resource.id);
  if (!next.discoveries.some(resource => sameBlock(resource, goal.resource))) {
    next.discoveries = [...next.discoveries, goal.resource].slice(-20);
    remember(next, 'explore', 'success', `Discovered ${name}`, { block: goal.resource });
  }
}

function fail(next, outcome) {
  const { position, resource } = next.destination;
  next.failedDestinations[positionKey(resource ?? position)] = true;
  remember(next, next.action, 'failed', outcome, { destination: position, block: resource });
  next.destination = null;
}

function advance(next) {
  const { route, resource, position, readyAt } = next.destination;
  if (route.length) {
    next.action = 'navigate';
    const step = world.stepTo(next, route[0].x, route[0].z);
    if (!step || positionKey(step) !== positionKey(route[0])) {
      fail(next, 'Could not reach destination: route is blocked');
      return;
    }
    Object.assign(next, step);
    route.shift();
    next.energy -= 2;
    const key = positionKey(step);
    const visits = next.visited[key] ?? 0;
    next.visited[key] = visits + 1;
    if (visits) remember(next, 'navigate', 'success', 'Revisited familiar terrain');
    if (!route.length && !resource) {
      remember(next, 'navigate', 'success', 'Reached exploration destination', { destination: position });
      next.destination = null;
    }
    return;
  }

  const name = B.getItemName(resource.id);
  if (!readyAt) next.action = 'inspect';
  else next.action = 'mine';
  if (!world.resources(next).some(block => sameBlock(block, resource))) {
    fail(next, `Could not reach ${name} from the destination`);
    return;
  }
  const drop = B.blockDrop(resource.id);
  const slot = availableSlot(next.inventory, drop);
  const duration = miningTime(next.inventory, resource.id);
  if (slot < 0 || !Number.isFinite(duration)) {
    fail(next, `Cannot collect ${name} with current tools or inventory space`);
    return;
  }
  if (!readyAt) {
    remember(next, 'inspect', 'success', `Inspected ${name}`, { block: resource });
    next.destination.readyAt = Date.now() + INTERVAL + duration * 1000;
    return;
  }
  if (Date.now() < readyAt) return;
  if (next.inventory[slot]) next.inventory[slot].count += drop.count;
  else next.inventory.push({ ...drop });
  next.removedBlocks[positionKey(resource)] = resource.id;
  // A removed voxel can change clearance at either end of a remembered edge.
  for (const [key, obstacle] of Object.entries(next.obstacles)) {
    const [x, , z] = key.split('>')[0].split(',').map(Number);
    if ((x === resource.x && z === resource.z) || (obstacle.x === resource.x && obstacle.z === resource.z)) {
      delete next.obstacles[key];
    }
  }
  next.energy -= 6;
  remember(next, 'mine', 'success', `Collected ${B.getItemName(drop.id)}`, { block: resource, drop });
  next.destination = null;
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin || '';
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET' && req.url === '/state') {
    res.end(JSON.stringify({ ...state, online: true }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

save(state);
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Explorer active on http://127.0.0.1:${server.address().port}/state`);
});
let busy = false;
async function tick() {
  if (busy) return;
  busy = true;
  try {
    const next = structuredClone(state);
    next.tick++;
    if (next.energy < 25) {
      next.action = 'rest';
      next.energy = Math.min(100, next.energy + 24);
      remember(next, 'rest', 'success', 'Recovered energy');
    } else if (next.destination) {
      advance(next);
    } else {
      await plan(next);
    }
    next.lastTickAt = Date.now();
    next.updatedAt = new Date(next.lastTickAt).toISOString();
    save(next);
    // Keep the generator cache and publish changed voxels only after the save.
    Object.assign(state.removedBlocks, next.removedBlocks);
    next.removedBlocks = state.removedBlocks;
    state = next;
  } catch (err) {
    console.error('Explorer tick failed:', err);
  } finally {
    busy = false;
  }
}
setInterval(tick, INTERVAL);
if (!resumed) tick();
