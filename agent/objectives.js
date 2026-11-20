import * as B from '../src/blocks.js';
import { experienceContext, objectiveActivity, preference } from './experience.js';
import { positionKey } from './world.js';

const URL = process.env.LLM_URL || 'http://127.0.0.1:11434/v1/chat/completions';
const MODEL = process.env.LLM_MODEL || 'qwen2.5:7b';
const USE_LLM = process.env.AGENT_LLM !== 'off';

function restOption(energy) {
  return { kind: 'rest', label: 'Recover energy', reason: `Energy is ${energy}; rest restores energy to at least 75.` };
}

export function objectiveOptions(state, resources, frontier) {
  const options = [];
  if (state.energy < 25) return [restOption(state.energy)];

  const ranked = [...resources].sort((a, b) =>
    Number(b.resource.id === B.WOOD) - Number(a.resource.id === B.WOOD) ||
    Number(b.route.length >= 2) - Number(a.route.length >= 2) ||
    a.route.length - b.route.length
  );
  const activityFor = target => B.getDef(target.resource.id)?.requiresTool ? 'mining' : 'gathering';
  const types = new Set();
  for (const target of ranked) {
    const drop = B.blockDrop(target.resource.id);
    if (types.has(drop.id)) continue;
    types.add(drop.id);
    const item = B.getItemName(drop.id);
    const count = state.inventory.reduce((total, slot) => total + (slot.id === drop.id ? slot.count : 0), 0);
    options.push({ kind: 'gather', activity: activityFor(target), label: `Gather ${item}`, reason: `${count} in inventory; a block is reachable.`, target });
    if (types.size === 3) break;
  }

  const revisitable = ranked.filter(target => target.route.length > 0);
  const known = state.discoveries.slice().reverse().find(site => revisitable.some(({ resource }) => nearSite(site, resource)));
  if (known) {
    const target = revisitable.find(({ resource }) => nearSite(known, resource));
    const name = B.getItemName(B.blockDrop(target.resource.id).id);
    const revisit = {
      kind: 'revisit', activity: activityFor(target), label: `Revisit a ${name} site`, target,
      reason: `A matching block is reachable near the remembered discovery at ${positionKey(known)}.`,
      site: known
    };
    const duplicate = options.findIndex(option => option.target === target);
    if (duplicate < 0) options.push(revisit);
    else options[duplicate] = revisit;
  }

  if (frontier) {
    const visits = state.visited[positionKey(frontier.position)] ?? 0;
    options.push({
      kind: 'explore', label: visits ? 'Explore beyond familiar terrain' : 'Explore unvisited terrain',
      reason: visits ? `The least-visited reachable destination has ${visits} prior visits.` : 'The destination has no recorded visits.',
      target: frontier
    });
  }
  if (state.energy < 55 || options.length === 0) options.push(restOption(state.energy));
  return options;
}

function nearSite(site, resource) {
  return site.id === resource.id &&
    Math.abs(site.x - resource.x) + Math.abs(site.y - resource.y) + Math.abs(site.z - resource.z) <= 4;
}

export async function selectObjective(state, options) {
  const outcomes = state.memory.filter(entry => entry.objectiveOutcome).slice(-3);
  const observations = state.memory.filter(entry => !entry.objectiveOutcome && (entry.block || entry.action === 'craft' || entry.action === 'equip' || entry.result === 'failed')).slice(-5);
  const recent = [...outcomes, ...observations].sort((a, b) => a.at.localeCompare(b.at));
  const memories = recent.map(({ at, outcome, block, destination, objectiveOutcome, tool, produced }) => ({
    at, outcome, block, destination, objectiveOutcome, tool, produced
  }));
  const experience = experienceContext(state);
  const eligible = options.filter(option => !['craft', 'shelter', 'supplies'].includes(option.kind) || option.ready);
  const fallback = (eligible.length ? eligible : options).reduce((best, option) =>
    preference(experience, option) > preference(experience, best) ? option : best
  );
  const result = { choice: fallback, source: 'fallback', reason: fallback.reason, memories, experience };
  if (!USE_LLM) return { ...result, sourceNote: 'Model disabled' };
  if (options.length < 2) return { ...result, sourceNote: 'Only one feasible objective' };
  if (Date.now() < (state.retryModelAt ?? 0)) return { ...result, sourceNote: 'Model retry pending' };

  try {
    const response = await fetch(URL, {
      method: 'POST', signal: AbortSignal.timeout(20000),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL, max_tokens: 110, temperature: 0,
        messages: [
          { role: 'system', content: 'Choose one feasible objective for a voxel-game Explorer using current energy, inventory, and recent experiences. Prefer an available first-tool objective over standalone gathering: a crafting objective includes gathering its missing materials. Consider whether stocked materials, a suitable site, and the lack of a structure justify building; compare that against other needs. Consider learned interests as preferences and success/failure counts as evidence of reliability. Prefer variety after several recent choices in one activity, while keeping needs and feasible opportunities first. A proven resource site can be worth revisiting when you still need that material. Preserve energy before a difficult trip. Return only JSON {"choice":0,"reason":"one short sentence tied to the supplied facts"}. choice is the option index.' },
          { role: 'user', content: JSON.stringify({
            position: { x: state.x, y: state.y, z: state.z }, energy: state.energy,
            equipment: B.getItemName(state.equippedTool) || 'none', structures: state.shelters ?? [], home: state.home,
            inventory: state.inventory.map(({ id, count }) => ({ item: B.getItemName(id), count })),
            avoided: { blockedEdges: Object.keys(state.obstacles).length, failedTargets: Object.keys(state.failedDestinations).length },
            memories, experience,
            options: options.map(option => ({
              kind: option.kind, label: option.label, activity: objectiveActivity(option), fact: option.reason, position: option.target?.position, steps: option.target?.route.length, block: option.target?.resource, site: option.site
            }))
          }) }
        ]
      })
    });
    if (!response.ok) throw Error(`Model returned HTTP ${response.status}`);
    const reply = await response.json();
    const output = reply.choices?.[0]?.message?.content ?? '';
    const { choice, reason } = JSON.parse(output.match(/\{[^]*\}/)?.[0] ?? output);
    if (!Number.isInteger(choice) || !options[choice] || typeof reason !== 'string' || !reason.trim()) {
      throw Error('Model returned an invalid objective');
    }
    delete state.retryModelAt;
    return { choice: options[choice], source: 'llm', reason: reason.trim().slice(0, 240), memories, experience, model: reply.model ?? MODEL };
  } catch (err) {
    state.retryModelAt = Date.now() + 60000;
    return { ...result, sourceNote: err.message };
  }
}
