// Persistent, headless Explorer. The browser observes the same generated terrain and removals.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import * as B from '../src/blocks.js';
import { createExplorerWorld, positionKey } from './world.js';
import { objectiveOptions, selectObjective } from './objectives.js';
import { availableSlot, countItem, craft, PICKAXE_GOAL, pickaxeStep, takeItems } from './crafting.js';

const PORT = Number(process.env.AGENT_PORT || 8787);
const STORE = process.env.AGENT_DATA || path.resolve('data/explorer.json');
const INTERVAL = Math.max(50, Number(process.env.AGENT_INTERVAL_MS || 5000));

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
const world = createExplorerWorld(state.seed, state.removedBlocks ??= {}, state.placedBlocks ??= {});
if (!resumed) {
  const spawn = world.spawn(state.x, state.z);
  state = {
    ...state, ...spawn, version: 2, action: 'explore', inventory: [], destination: null,
    visited: { [positionKey(spawn)]: 1 },
    obstacles: {}, failedDestinations: {}, discoveries: [], lastAIDecision: null
  };
}

if (state.destination && !state.objective) {
  state.objective = {
    kind: state.destination.resource ? 'gather' : 'explore',
    label: state.destination.resource ? `Gather ${B.getItemName(B.blockDrop(state.destination.resource.id).id)}` : 'Explore terrain',
    status: 'active', source: 'legacy', reason: 'Resuming a saved objective from the previous version.', memories: []
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

function miningTime(next, id) {
  const tool = countItem(next.inventory, next.equippedTool) ? next.equippedTool : undefined;
  return B.blockBreakTime(id, tool);
}

function sameBlock(a, b) {
  return a.id === b.id && positionKey(a) === positionKey(b);
}

function finishObjective(next, status, outcome) {
  const objective = next.objective;
  if (objective) {
    objective.status = status;
    if (objective.kind === 'craft') {
      if (status === 'failed') next.craftRetryAt = next.tick + 40;
      else next.pickaxeUsed = true;
    }
    const finished = { label: objective.label, status, detail: outcome };
    next.lastObjectiveOutcome = finished;
    remember(next, 'objective', status, `${objective.label} · ${outcome}`, { objectiveOutcome: finished });
  }
  next.destination = null;
}

function rest(next) {
  next.action = 'rest';
  next.energy = Math.min(100, next.energy + 24);
  remember(next, 'rest', 'success', 'Recovered energy');
}

function survey(next) {
  const { queue, obstacles } = next.energy < 25 ? { queue: [], obstacles: [] } : world.survey(
    { x: next.x, y: next.y, z: next.z }, next.obstacles
  );
  for (const { key, x, z } of obstacles) {
    next.obstacles[key] = { x, z };
    remember(next, 'explore', 'failed', `Blocked terrain toward ${x}, ${z}`);
  }

  const resources = new Map();
  for (const entry of queue) {
    for (const resource of world.resources(entry.position)) {
      const key = positionKey(resource);
      if (resources.has(key) || next.failedDestinations[key]) continue;

      resources.set(key, { ...entry, resource });
    }
  }
  const frontiers = queue.filter(({ position, route }) =>
    route.length > 0 && !next.failedDestinations[positionKey(position)]
  ).sort((a, b) => (next.visited[positionKey(a.position)] ?? 0) -
    (next.visited[positionKey(b.position)] ?? 0) || b.route.length - a.route.length);
  return { resources: [...resources.values()], frontier: frontiers[0] };
}

async function plan(next) {
  const { resources, frontier } = survey(next);
  const locked = resources.find(({ route, resource }) => !route.length &&
    !Number.isFinite(miningTime(next, resource.id)) &&
    !next.memory.some(entry => entry.action === 'inspect' && entry.result === 'failed' && entry.block && sameBlock(entry.block, resource)));
  if (locked) {
    const { resource } = locked;
    const name = B.getItemName(resource.id);
    remember(next, 'inspect', 'failed', `Cannot mine ${name} without a compatible tool`, { block: resource });
  }
  const collectable = resources.filter(({ resource }) => Number.isFinite(miningTime(next, resource.id)) &&
    availableSlot(next.inventory, B.blockDrop(resource.id)) >= 0);
  const options = objectiveOptions(next, collectable, frontier);
  if (next.energy >= 25 && !next.pickaxeUsed && next.tick >= (next.craftRetryAt ?? 0)) {
    const step = pickaxeStep(next.inventory, world.nearbyTable(next));
    const wood = collectable.some(({ resource }) => resource.id === B.WOOD);
    if (step.kind !== 'gather' || wood) {
      const owned = step.kind === 'equip';
      const label = owned ? 'Equip and use the owned pickaxe' : PICKAXE_GOAL;
      const needed = step.missing[0]?.count ?? 0;
      options.unshift({ kind: 'craft', label, ready: needed === 0, reason: owned
        ? 'A pickaxe is already in inventory and can unlock tool-required resources.'
        : `This goal gathers any missing logs itself, then crafts and equips the pickaxe to mine stone or ore. ${needed} additional logs needed.` });
    }
  }
  if (options.length === 1 && options[0].kind === 'rest' &&
      next.energy >= 75 && next.lastObjectiveOutcome?.label === options[0].label) return;
  const { choice, source, reason, sourceNote, memories, model } = await selectObjective(next, options);
  const at = new Date().toISOString();
  next.objective = {
    at, kind: choice.kind, label: choice.label, status: 'active', source, sourceNote, reason,
    fact: choice.reason, memories, site: choice.site, model
  };
  remember(next, 'decision', 'selected', choice.label, { source, reason, sourceNote });
  if (source === 'llm') {
    next.lastAIDecision = { at, goal: choice.label, reason, model };
  }
  if (choice.kind === 'rest') {
    next.action = 'rest';
    return;
  }

  next.action = 'explore';
  if (choice.kind === 'craft') {
    next.objective.progress = { step: 'Check ingredients', completed: [], missing: [], searches: 0 };
    return;
  }
  setDestination(next, choice.target);
}

function setDestination(next, goal) {
  next.destination = goal;
  if (!goal.resource) return;
  const name = B.getItemName(goal.resource.id);
  if (!next.discoveries.some(resource => sameBlock(resource, goal.resource))) {
    next.discoveries = [...next.discoveries, goal.resource].slice(-20);
    remember(next, 'explore', 'success', `Discovered ${name}`, { block: goal.resource });
  }
}

function progress(next, description) {
  next.objective.progress.completed.push(description);
}

function advanceCraft(next) {
  const progressState = next.objective.progress;
  const table = world.nearbyTable(next);
  const step = pickaxeStep(next.inventory, table);
  progressState.missing = step.missing;
  if (step.kind === 'craft') {
    next.action = 'craft';
    const name = B.getItemName(step.recipe.result.id);
    progressState.step = `Craft ${name}`;
    const result = craft(next.inventory, step.recipe, table ? 3 : 2);
    if (result.error) {
      finishObjective(next, 'failed', result.error);
      return;
    }
    next.inventory = result.inventory;
    progress(next, `Crafted ${name} ×${result.produced.count}`);
    remember(next, 'craft', 'success', `Crafted ${name} ×${result.produced.count}`, {
      consumed: result.consumed, produced: result.produced, table: step.recipe.size === 3 ? table : undefined
    });
    return;
  }
  if (step.kind === 'place') {
    next.action = 'place';
    progressState.step = 'Place a crafting table';
    const site = world.tablePlacement(next);
    if (!site || !takeItems(next.inventory, B.CRAFTING, 1)) {
      finishObjective(next, 'failed', 'No reachable, supported space for a crafting table');
      return;
    }
    next.inventory = next.inventory.filter(slot => slot.count);
    next.placedBlocks[positionKey(site)] = B.CRAFTING;
    progress(next, 'Placed a crafting table');
    remember(next, 'place', 'success', 'Placed a crafting table', { block: { ...site, id: B.CRAFTING } });
    return;
  }
  if (step.kind === 'equip' && next.equippedTool !== B.TOOL_PICKAXE) {
    next.action = 'equip';
    next.equippedTool = B.TOOL_PICKAXE;
    progressState.step = 'Equip the pickaxe';
    progress(next, 'Equipped the pickaxe');
    remember(next, 'equip', 'success', 'Equipped the pickaxe', { tool: next.equippedTool });
    return;
  }

  const gathering = step.kind === 'gather';
  progressState.step = gathering ? 'Gather missing logs' : 'Mine with the pickaxe';
  next.action = 'explore';
  const { resources, frontier } = survey(next);
  const matching = resources.filter(({ resource }) => gathering ? resource.id === B.WOOD
    : B.getDef(resource.id)?.requiresTool && Number.isFinite(miningTime(next, resource.id)));
  const target = matching.find(({ resource }) => availableSlot(next.inventory, B.blockDrop(resource.id)) >= 0);
  if (target) {
    progressState.searches = 0;
    delete progressState.digSite;
    setDestination(next, target);
    return;
  }
  if (!gathering && !matching.length) {
    const digSite = progressState.digSite;
    if (digSite) {
      const dig = digSite.blockers[0];
      progressState.step = 'Expose stone by digging a safe step';
      if (dig) {
        if (!world.resources(next).some(block => sameBlock(block, dig))) {
          finishObjective(next, 'failed', 'Excavation block is no longer accessible');
          return;
        }
        if (availableSlot(next.inventory, B.blockDrop(dig.id)) < 0) {
          finishObjective(next, 'failed', 'Inventory is full');
          return;
        }
        setDestination(next, { position: { x: next.x, y: next.y, z: next.z }, route: [], resource: dig, excavating: true });
        return;
      }
      const step = world.stepTo(next, digSite.position.x, digSite.position.z);
      if (!step || positionKey(step) !== positionKey(digSite.position)) {
        finishObjective(next, 'failed', 'The excavated step is unsafe');
        return;
      }
      delete progressState.digSite;
      setDestination(next, { position: step, route: [step] });
      return;
    }
    const site = (progressState.excavated ?? 0) < 6 && world.excavation(next);
    if (site) {
      progressState.excavated = (progressState.excavated ?? 0) + 1;
      progressState.digSite = site;
      return;
    }
  }
  if (!matching.length && frontier && !next.visited[positionKey(frontier.position)] && progressState.searches < 3) {
    progressState.searches++;
    setDestination(next, frontier);
    return;
  }
  finishObjective(next, 'failed', matching.length ? 'Inventory is full'
    : gathering ? 'Missing wood: no reachable logs after searching' : 'No reachable pickaxe-only resource after searching');
}

function fail(next, outcome) {
  const { position, resource } = next.destination;
  next.failedDestinations[positionKey(resource ?? position)] = true;
  remember(next, next.action, 'failed', outcome, { destination: position, block: resource });
  finishObjective(next, 'failed', outcome);
}

function advance(next) {
  const { route, resource, position, readyAt, excavating } = next.destination;
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
      if (next.objective?.kind === 'craft') next.destination = null;
      else finishObjective(next, 'completed', 'Reached destination');
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
  const duration = miningTime(next, resource.id);
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
  const tool = B.getToolAction(next.equippedTool) === B.getDef(resource.id)?.action ? next.equippedTool : undefined;
  const outcome = `Collected ${B.getItemName(drop.id)}${tool ? ` with ${B.getItemName(tool)}` : ''}`;
  remember(next, 'mine', 'success', outcome, { block: resource, drop, tool });
  if (next.objective?.kind === 'craft') {
    if (excavating) next.objective.progress.digSite.blockers.shift();
    else progress(next, outcome);
    if (!tool || !B.getDef(resource.id).requiresTool) {
      next.destination = null;
      return;
    }
  }
  finishObjective(next, 'completed', outcome);
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
    if (next.objective?.kind === 'rest' && next.objective.status === 'active') {
      rest(next);
      if (next.energy >= 75) finishObjective(next, 'completed', `Recovered to ${next.energy} energy`);
    } else if (next.energy < 25 && (next.destination || next.objective?.status === 'active')) {
      rest(next);
    } else if (next.destination) {
      advance(next);
    } else if (next.objective?.kind === 'craft' && next.objective.status === 'active') {
      advanceCraft(next);
    } else {
      await plan(next);
    }
    next.lastTickAt = Date.now();
    next.updatedAt = new Date(next.lastTickAt).toISOString();
    save(next);
    // Keep the generator cache and publish changed voxels only after the save.
    Object.assign(state.removedBlocks, next.removedBlocks);
    next.removedBlocks = state.removedBlocks;
    Object.assign(state.placedBlocks, next.placedBlocks);
    next.placedBlocks = state.placedBlocks;
    state = next;
  } catch (err) {
    console.error('Explorer tick failed:', err);
  } finally {
    busy = false;
  }
}
setInterval(tick, INTERVAL);
if (!resumed) tick();
