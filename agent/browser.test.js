// Run with npm run dev -- --port 5177. Chrome uses a disposable profile and real game inputs.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { shelterPlan } from './shelter.js';
import { createExplorerWorld, positionKey } from './world.js';
import { AIR, PLANKS, TOOL_AXE } from '../src/blocks.js';

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const game = 'http://localhost:5177/notminecraft/?explorer';
async function until(check, label, timeout = 30000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const result = await check();
    if (result) return result;
    await pause(100);
  }
  throw Error('Timed out waiting for ' + label);
}

test('Chrome places and mines shared blocks; Explorer reroutes and notices shelter damage', { timeout: 115000 }, async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'notminecraft-browser-'));
  const statePath = path.join(dir, 'state.json');
  const shelter = shelterPlan({ x: -2, y: 34, z: 14 }, [0,-1]);
  const placed = Object.fromEntries(shelter.blocks.map(block => [positionKey(block), PLANKS]));
  const terrain = createExplorerWorld(4242, {}, placed);
  const destination = terrain.survey(shelter.outside, {}).queue.find(entry => entry.route.length === 4 && entry.route[0].x === -3);
  const obstacle = destination.route[0];
  const wall = shelter.blocks[0];
  writeFileSync(statePath, JSON.stringify({
    ...shelter.outside, version: 2, seed: 4242, name: 'Explorer', tick: 0, energy: 90,
    inventory: [], memory: [], visited: {}, obstacles: {}, failedDestinations: {}, discoveries: [],
    placedBlocks: placed, removedBlocks: {}, shelters: [{ position: shelter.center, entrance: shelter.entrance, blocks: 23 }],
    objective: { kind: 'explore', label: 'Walk the planned route', status: 'active' }, destination
  }));

  let agent, chrome, socket, stateUrl, closeBrowser;
  const errors = [];
  function startAgent(interval = 9000) {
    agent = spawn(process.execPath, ['agent/server.js'], {
      stdio: ['ignore','pipe','inherit'],
      env: { ...process.env, AGENT_DATA: statePath, AGENT_PORT: '0', AGENT_LLM: process.env.AGENT_LLM ?? 'off', AGENT_INTERVAL_MS: String(interval) }
    });
    return new Promise((resolve, reject) => {
      agent.once('error', reject);
      agent.once('exit', code => reject(Error('Explorer exited before listening: ' + code)));
      agent.stdout.once('data', data => {
        stateUrl = data.toString().match(/http:\/\/127\.0\.0\.1:\d+\/state/)?.[0];
        if (stateUrl) resolve();
        else reject(Error(data.toString()));
      });
    });
  }
  async function stopAgent() {
    if (!agent || agent.signalCode || agent.exitCode !== null) return;
    await new Promise(resolve => { agent.once('exit', resolve); agent.kill(); });
  }
  const state = () => fetch(stateUrl).then(response => response.json());
  try {
    assert.ok((await fetch(game)).ok, 'Start the local Vite server on port 5177');
    await startAgent();
    chrome = spawn(process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
      '--headless', '--disable-extensions', '--remote-debugging-port=0', '--enable-unsafe-swiftshader',
      '--use-gl=angle', '--use-angle=swiftshader', '--window-size=1100,800', '--user-data-dir=' + dir, 'about:blank'
    ], { stdio: ['ignore','ignore','pipe'] });
    chrome.stderr.on('data', data => errors.push(data.toString()));
    chrome.on('error', error => errors.push(error.message));
    const debug = await until(() => {
      try { return readFileSync(path.join(dir, 'DevToolsActivePort'), 'utf8').split('\n')[0]; }
      catch { if (chrome.exitCode !== null || chrome.signalCode) throw Error(errors.join('')); }
    }, 'Chrome');
    const targets = await (await fetch(`http://127.0.0.1:${debug}/json/list`)).json();
    socket = new WebSocket(targets.find(page => page.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
    let seq = 0;
    const pending = new Map();
    function send(method, params = {}) {
      const id = ++seq;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    }
    closeBrowser = () => Promise.race([send('Browser.close').catch(() => {}), pause(1000)]);
    socket.onmessage = ({ data }) => {
      const msg = JSON.parse(data);
      if (msg.method === 'Fetch.requestPaused') {
        const request = msg.params;
        // Route only the test page's normal requests to the isolated, real LaunchAgent code.
        const url = new URL(new URL(request.request.url).pathname, stateUrl).href;
        send('Fetch.continueRequest', { requestId: request.requestId, url }).catch(error => errors.push(error.message));
      }
      if (!pending.has(msg.id)) return;
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(Error(msg.error.message));
      else resolve(msg.result);
    };
    async function evaluate(expression) {
      const reply = await send('Runtime.evaluate', { expression, returnByValue: true });
      if (reply.exceptionDetails) throw Error(reply.exceptionDetails.text);
      return reply.result.value;
    }
    async function click(type, button, point = { x: 550, y: 400 }) {
      await send('Input.dispatchMouseEvent', { ...point, type, button, clickCount: 1 });
    }
    const panel = () => evaluate('document.querySelector("#explorer-panel")?.innerText');
    async function openGame() {
      await send('Page.navigate', { url: game });
      const point = await until(() => evaluate(`(() => {
        const button = document.querySelector('#explorer-panel button');
        if (!button || button.disabled) return null;
        button.scrollIntoView({block:'nearest'});
        const r = button.getBoundingClientRect();
        return { x:r.x+r.width/2, y:r.y+r.height/2 };
      })()`), 'Visit Explorer');
      await click('mousePressed', 'left', point);
      await click('mouseReleased', 'left', point);
      await until(() => evaluate('!!document.pointerLockElement && window.__player?.().spawned'), 'pointer lock');
    }
    async function aim(target, hit, item, px = -1.5) {
      // Set only the player fixture position, aim, and held item. Editing uses mouse input.
      await evaluate(`(() => {
        const p=window.__player();
        p.pos.set(${px},34,12.5); p.vel.set(0,0,0);
        p.hotbar[0]={id:${item},count:1}; p.selectedSlot=0;
        const [x,y,z]=${JSON.stringify(hit)};
        p.yaw=Math.atan2(p.pos.x-x,p.pos.z-z);
        p.pitch=Math.atan2(y-p.pos.y-1.62,Math.hypot(x-p.pos.x,z-p.pos.z));
      })()`);
      const key = positionKey(target);
      await until(() => evaluate(`(() => {
        const t=window.__player().target;
        return t && [t.wx,t.wy,t.wz].join(',')===${JSON.stringify(key)};
      })()`), 'game raycast to ' + key, 5000);
    }

    await send('Page.enable');
    await send('Page.bringToFront');
    await send('Fetch.enable', { patterns: [{ urlPattern:'http://127.0.0.1:8787/*', requestStage:'Request' }] });
    await openGame();
    const anchor = { ...obstacle, y: obstacle.y-1 };
    await aim(anchor, [obstacle.x+.5, obstacle.y, obstacle.z+.5], PLANKS);
    await click('mousePressed', 'right');
    await click('mouseReleased', 'right');
    await until(async () => (await state()).placedBlocks[positionKey(obstacle)] === PLANKS, 'right-click placement');
    assert.equal(await evaluate('window.__player().hotbar[0]'), null);
    await send('Page.navigate', { url: 'about:blank' });
    await openGame();
    assert.equal(await evaluate(`window.__world().getBlock(${positionKey(obstacle)})`), PLANKS);
    const adapted = await until(async () => {
      const s = await state();
      return s.memory.some(e => e.outcome === 'Adapted route around a new obstruction') && s;
    }, 'Explorer reroute');
    assert.ok(adapted.memory.some(e => e.outcome === 'Observed player-placed Planks'));

    await aim(obstacle, [obstacle.x+.5, obstacle.y+.65, obstacle.z+.5], TOOL_AXE);
    await click('mousePressed', 'left');
    await until(async () => (await state()).removedBlocks[positionKey(obstacle)] === PLANKS, 'mined obstruction');
    await click('mouseReleased', 'left');
    await until(async () => (await panel())?.includes('Observed player removal of Planks'), 'removal observation');
    assert.equal(await evaluate(`window.__world().getBlock(${positionKey(obstacle)})`), AIR);

    await aim(wall, [wall.x+.5, wall.y+.4, wall.z+.02], TOOL_AXE, wall.x+.5);
    await click('mousePressed', 'left');
    await until(async () => (await state()).removedBlocks[positionKey(wall)] === PLANKS, 'mined shelter wall');
    await click('mouseReleased', 'left');
    await until(async () => (await panel())?.includes('found shelter damage'), 'shelter damage');
    if (process.env.AGENT_LLM === 'on') {
      const decision = await until(async () => {
        const s = await state();
        return s.objective?.source === 'llm' &&
          s.objective.memories?.some(e => /player removal|shelter damage/.test(e.outcome)) && s.objective;
      }, 'real model decision with player-change context', 65000);
      console.log('Real local model decision:', decision.model, decision.label, decision.reason);
    }
    await stopAgent();
    const saved = JSON.parse(readFileSync(statePath, 'utf8'));
    await startAgent(600000);
    assert.deepEqual(await state(), { ...saved, online: true });
    assert.equal(saved.home.complete, false);
    assert.equal(saved.home.usable, false);
    assert.equal(saved.removedBlocks[positionKey(wall)], PLANKS);
    assert.ok(saved.memory.some(e => e.outcome === 'Adapted route around a new obstruction'));
    await send('Page.navigate', { url: 'about:blank' });
    await openGame();
    assert.equal(await evaluate(`window.__world().getBlock(${positionKey(wall)})`), AIR);
    assert.match(await panel(), /Home · .*Damaged/);
    console.log('Chrome placement, reload, reroute, obstacle removal, damage and restart verified');
  } catch (error) {
    console.error(error.stack);
    if (agent && stateUrl && agent.exitCode === null) {
      const last = await state().catch(() => null);
      if (last) console.error(JSON.stringify({ tick: last.tick, action: last.action, changes: last.playerChanges, last: last.memory.slice(-5) }));
    }
    throw error;
  } finally {
    await closeBrowser?.();
    socket?.close();
    await stopAgent();
    if (chrome && chrome.exitCode === null && !chrome.signalCode) {
      await new Promise(resolve => { chrome.once('exit', resolve); chrome.kill(); });
    }
    rmSync(dir, { recursive:true, force:true, maxRetries: 6, retryDelay: 100 });
  }
});
