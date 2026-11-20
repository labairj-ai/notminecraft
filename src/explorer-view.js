import * as THREE from 'three';
import * as B from './blocks.js';

// Browser-only viewer. The agent keeps living in agent/server.js when this page is closed.
export function createExplorerView(scene, world, player, resumeGame) {
  const params = new URLSearchParams(location.search);
  if (!params.has('explorer')) return { update() {} };

  const group = new THREE.Group();
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.85, 0.4), new THREE.MeshLambertMaterial({ color: 0x16a085 }));
  torso.position.y = 1.15;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), new THREE.MeshLambertMaterial({ color: 0xffdc9c }));
  head.position.y = 1.72;
  const legMat = new THREE.MeshLambertMaterial({ color: 0x263b52 });
  for (const x of [-0.2, 0.2]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.75, 0.3), legMat);
    leg.position.set(x, 0.4, 0);
    group.add(leg);
  }
  group.add(torso, head);
  group.name = 'Explorer';
  group.visible = false;
  scene.add(group);

  const panel = document.createElement('div');
  panel.id = 'explorer-panel';
  const info = document.createElement('div');
  info.textContent = 'Connecting to Explorer…';
  const visit = document.createElement('button');
  visit.textContent = 'Visit Explorer';
  visit.style.cssText = 'margin-top:8px;padding:6px;cursor:pointer';
  visit.disabled = true;
  panel.append(info, visit);
  document.body.append(panel);
  let snapshot = null;
  let previous = null;
  let movedAt = 0;
  let inFlight = false;
  let lastFetch = -Infinity;

  async function fetchState() {
    if (inFlight) return;
    inFlight = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    try {
      const response = await fetch('http://127.0.0.1:8787/state', { signal: controller.signal });
      if (!response.ok) throw new Error('Agent not available');
      const next = await response.json();
      if (next.seed !== world.seed) throw new Error('World seed mismatch');
      if (next.version !== 2) throw new Error('Update the local Explorer service');
      world.applyExplorerEdits(next.removedBlocks, next.placedBlocks);
      if (!snapshot || snapshot.x !== next.x || snapshot.y !== next.y || snapshot.z !== next.z) {
        previous = snapshot;
        movedAt = performance.now();
      }
      snapshot = next;
      visit.disabled = false;
      const destination = next.destination?.position;
      const resource = next.destination?.resource;
      const coords = ({ x, y, z }) => `(${x}, ${y}, ${z})`;
      const inventory = new Map();
      for (const { id, count } of next.inventory) inventory.set(id, (inventory.get(id) ?? 0) + count);
      const items = [...inventory].map(([id, count]) => `${B.getItemName(id)} ×${count}`);
      const discoveries = next.discoveries.slice(-3).map(block => `${B.getItemName(block.id)} ${coords(block)}`);
      const objective = next.objective;
      const decisionSource = { llm: 'LLM', fallback: 'Fallback', legacy: 'Previous version' }[objective?.source];
      const outcome = next.lastObjectiveOutcome;
      const context = objective?.memories ?? [];
      const recent = [context.findLast(entry => entry.objectiveOutcome), ...context.slice(-2)]
        .filter((entry, index, entries) => entry && entries.indexOf(entry) === index);
      const lastAI = next.lastAIDecision;
      const progress = objective?.progress;
      const toolOutcome = next.memory.findLast(entry => entry.tool && entry.action === 'mine');
      const craftOutcome = next.memory.findLast(entry => entry.action === 'craft');
      info.textContent = [
        `Explorer · ${next.action} · Energy ${next.energy}`,
        `Position ${coords(next)}`,
        objective && `Objective · ${objective.label} (${objective.status})`,
        progress && `Step · ${progress.step}`,
        progress?.completed.length > 0 && `Completed · ${progress.completed.join(' / ')}`,
        progress && `Missing · ${progress.missing.map(({ id, count }) => `${B.getItemName(id)} ×${count}`).join(', ') || 'None'}`,
        `Equipped · ${B.getItemName(next.equippedTool) || 'None'}`,
        craftOutcome && `Last craft · ${craftOutcome.outcome}`,
        toolOutcome && `Last tool use · ${toolOutcome.outcome}`,
        destination && `Destination ${coords(destination)}${resource ? ` · ${B.getItemName(resource.id)}` : ''}`,
        objective && `Decision · ${decisionSource}${objective.sourceNote ? ` / ${objective.sourceNote}` : ''}`,
        objective && `${objective.source === 'llm' ? 'Model reason' : 'Reason'} · ${objective.reason}`,
        objective?.site && `Remembered site · ${coords(objective.site)}`,
        recent.length > 0 && `Decision context · ${recent.map(entry => entry.outcome).join(' / ')}`,
        outcome && `Latest outcome · ${outcome.status} / ${outcome.label} / ${outcome.detail}`,
        `Last successful LLM decision · ${lastAI ? new Date(lastAI.at).toLocaleString() : 'None yet'}`,
        `Inventory · ${items.join(', ') || 'Empty'}`,
        `Discoveries · ${discoveries.join(', ') || 'None yet'}`
      ].filter(Boolean).join('\n');
    } catch (err) {
      snapshot = null;
      group.visible = false;
      info.textContent = 'Explorer unavailable · ' + err.message;
      visit.disabled = true;
    } finally {
      clearTimeout(timeout);
      inFlight = false;
    }
  }

  visit.addEventListener('click', () => {
    if (!snapshot) return;
    resumeGame();
    const { x, y, z } = snapshot;
    world.update(x, z);
    for (const [dx, dz] of [[2, 0], [0, 2], [-2, 0], [0, -2], [0, 0]]) {
      const px = x + dx;
      const pz = z + dz;
      for (const py of [y, y + 1, y - 1]) {
        if (!world.isSolid(px, py - 1, pz)) continue;
        if (world.getBlock(px, py, pz) !== B.AIR || world.getBlock(px, py + 1, pz) !== B.AIR) continue;
        player.pos.set(px + 0.5, py, pz + 0.5);
        player.vel.set(0, 0, 0);
        if (dx || dz) player.yaw = Math.atan2(dx, dz);
        player.pitch = -0.12;
        if (!player.spawned) {
          player.spawned = true;
          player.spawnPos = player.pos.clone();
        }
        return;
      }
    }
  });
  return {
    update(now) {
      if (now - lastFetch >= 1000) {
        lastFetch = now;
        fetchState();
      }
      if (!snapshot) return;
      const dx = player.pos.x - snapshot.x, dz = player.pos.z - snapshot.z;
      group.visible = Math.hypot(dx, dz) < 110;
      const adjacent = previous && Math.abs(previous.x - snapshot.x) + Math.abs(previous.z - snapshot.z) === 1;
      if (!adjacent) {
        group.position.set(snapshot.x + 0.5, snapshot.y, snapshot.z + 0.5);
        return;
      }
      const t = Math.max(0, Math.min(1, (now - movedAt) / 280));
      const stepped = snapshot.y !== previous.y;
      const horizontal = !stepped ? t : snapshot.y > previous.y ? Math.max(0, 2 * t - 1) : Math.min(1, 2 * t);
      const vertical = snapshot.y > previous.y ? Math.min(1, 2 * t) : Math.max(0, 2 * t - 1);
      group.position.set(
        previous.x + 0.5 + (snapshot.x - previous.x) * horizontal,
        previous.y + (snapshot.y - previous.y) * vertical,
        previous.z + 0.5 + (snapshot.z - previous.z) * horizontal
      );
    }
  };
}
