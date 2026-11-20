// Persistent, headless Explorer for NotMinecraft. Node 20+, no additional packages.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = Number(process.env.AGENT_PORT || 8787);
const STORE = process.env.AGENT_DATA || path.resolve('data/explorer.json');
const LLM_URL = process.env.LLM_URL || 'http://127.0.0.1:8080/v1/chat/completions';
const LLM_MODEL = process.env.LLM_MODEL || 'local';
const USE_LLM = process.env.AGENT_LLM !== 'off';
const INTERVAL = Math.max(5000, Number(process.env.AGENT_INTERVAL_MS || 30000));
const DEFAULT = () => ({
  version: 1, seed: 4242, name: 'Explorer', x: 8, z: 8,
  energy: 100, curiosity: 65, confidence: 40, tick: 0,
  action: 'rest', goal: 'Explore the world', memory: [], visited: ['8,8'],
  lastTickAt: Date.now(), updatedAt: new Date().toISOString()
});
function load() {
  try {
    const data = JSON.parse(fs.readFileSync(STORE, 'utf8'));
    if (data.version === 1 && Number.isFinite(data.x) && Number.isFinite(data.z)) return data;
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('Could not read explorer state:', err.message);
  }
  return DEFAULT();
}
let state = load();
function save() {
  fs.mkdirSync(path.dirname(STORE), { recursive: true });
  const tmp = STORE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, STORE);
}
function nearby() {
  return [{ action: 'explore', reason: 'Find a new area' }, { action: 'rest', reason: 'Recover energy' },
    { action: 'inspect', reason: 'Observe this location' }];
}
function fallback() {
  if (state.energy < 25) return 'rest';
  if (state.tick % 5 === 0) return 'inspect';
  return 'explore';
}
async function choose() {
  const safe = fallback();
  // The local model is optional and consulted once per decision, not per frame.
  if (!USE_LLM || state.tick % 20 !== 0) return safe;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);
  try {
    const response = await fetch(LLM_URL, {
      method: 'POST', signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: LLM_MODEL, max_tokens: 70, temperature: 0.4,
        messages: [
          { role: 'system', content: 'You control one game character. Return JSON only: {"action":"explore|rest|inspect"}. Only choose allowed actions. Prefer rest when energy is low. Remember prior experiences.' },
          { role: 'user', content: JSON.stringify({
            position: [state.x, state.z], energy: state.energy,
            curiosity: state.curiosity, confidence: state.confidence,
            recentExperiences: state.memory.slice(-5), availableActions: nearby()
          }) }
        ]
      })
    });
    if (!response.ok) return safe;
    const json = await response.json();
    const output = json.choices?.[0]?.message?.content || '';
    const match = output.match(/\{[^]*?\}/);
    const action = JSON.parse(match ? match[0] : output).action;
    return ['explore', 'rest', 'inspect'].includes(action) ? action : safe;
  } catch { return safe; }
  finally { clearTimeout(timeout); }
}
async function step() {
  const action = await choose();
  state.tick += 1;
  state.action = action;
  let outcome;
  if (action === 'rest') {
    state.energy = Math.min(100, state.energy + 24);
    outcome = 'Recovered energy';
  } else if (action === 'explore') {
    const angle = Math.random() * Math.PI * 2;
    const distance = 2 + Math.random() * 5;
    state.x = Math.round(Math.max(-40, Math.min(40, state.x + Math.cos(angle) * distance)));
    state.z = Math.round(Math.max(-40, Math.min(40, state.z + Math.sin(angle) * distance)));
    state.energy = Math.max(0, state.energy - 9);
    const spot = `${state.x},${state.z}`;
    const newSpot = !state.visited.includes(spot);
    if (newSpot) state.visited.push(spot);
    state.curiosity = Math.min(100, state.curiosity + (newSpot ? 1 : 0));
    outcome = newSpot ? 'Reached a new location' : 'Returned to a familiar location';
  } else {
    state.energy = Math.max(0, state.energy - 2);
    state.confidence = Math.min(100, state.confidence + 1);
    outcome = 'Observed the surroundings';
  }
  state.memory.push({ at: new Date().toISOString(), action, outcome, x: state.x, z: state.z });
  state.memory = state.memory.slice(-80);
  state.visited = state.visited.slice(-500);
  state.updatedAt = new Date().toISOString();
  state.lastTickAt = Date.now();
  save();
  console.log(state.updatedAt, action, outcome, state.x, state.z);
}
const server = http.createServer((req, res) => {
  const origin = req.headers.origin || '';
  // Only local development origins are allowed to inspect the character.
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
server.listen(PORT, '127.0.0.1', () => console.log(`Explorer active on http://127.0.0.1:${PORT}/state`));
save();
let busy = false;
async function tick() {
  if (busy) return;
  busy = true;
  try { await step(); } catch (err) { console.error('Explorer tick failed:', err); }
  finally { busy = false; }
}
setInterval(tick, INTERVAL);
tick();
