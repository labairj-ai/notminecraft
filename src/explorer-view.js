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
  let session;
  let minimumRevision = 0;
  let voxelRevisions = {};
  let editStatus = '';
  const pending = new Set();
  const api = 'http://127.0.0.1:8787';

  player.sharedEdit = async edit => {
    const key = `${edit.x},${edit.y},${edit.z}`;
    if (!session || !snapshot) {
      editStatus = 'Shared world unavailable';
      return false;
    }
    if (pending.has(key)) return false;
    pending.add(key);
    try {
      const response = await fetch(api + '/edit', {
        method: 'POST', signal: AbortSignal.timeout(4000),
        headers: { 'Content-Type': 'application/json', 'X-Explorer-Session': session },
        body: JSON.stringify({ ...edit, seed: world.seed, revision: voxelRevisions[key] ?? 0,
          before: world.getBlock(edit.x, edit.y, edit.z) })
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.error);
      minimumRevision = Math.max(minimumRevision, result.revision);
      if (result.revision >= (voxelRevisions[key] ?? 0)) {
        voxelRevisions[key] = result.revision;
        world.applyExplorerEdits(edit.id ? {} : { [key]: true }, edit.id ? { [key]: edit.id } : {});
      }
      editStatus = '';
      return true;
    } catch (err) {
      editStatus = err.message;
      return false;
    } finally {
      pending.delete(key);
      fetchState();
    }
  };

  async function fetchState() {
    if (inFlight) return;
    inFlight = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    try {
      const response = await fetch(api + '/state', { signal: controller.signal });
      if (!response.ok) throw new Error('Agent not available');
      const next = await response.json();
      if (next.seed !== world.seed) throw new Error('World seed mismatch');
      if (next.version !== 2) throw new Error('Update the local Explorer service');
      if ((next.revision ?? 0) < minimumRevision) return;
      session = response.headers.get('X-Explorer-Session');
      minimumRevision = next.revision ?? 0;
      voxelRevisions = next.voxelRevisions ?? {};
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
      const setback = next.memory.findLast(entry => entry.result === 'failed');
      const experience = next.experience;
      const counts = experience && Object.entries(experience.selected).sort((a, b) => b[1] - a[1]).slice(0, 3);
      const changes = experience?.recentChanges.slice(-2) ?? [];
      const suppliedChanges = objective?.source === 'llm' ? objective.experience?.recentChanges : null;
      const home = next.home;
      const environment = next.memory.findLast(entry => entry.action === 'environment');
      const reaction = next.memory.findLast(entry => entry.action === 'home' || entry.outcome.startsWith('Adapted route'));
      const lastAI = next.lastAIDecision;
      const progress = objective?.progress;
      const toolOutcome = next.memory.findLast(entry => entry.tool && entry.action === 'mine');
      const craftOutcome = next.memory.findLast(entry => entry.action === 'craft');
      info.textContent = [
        `Explorer · ${next.action} · Energy ${next.energy}`,
        `Position ${coords(next)}`,
        home && `Home · ${coords(home.position)} · ${home.complete == null ? 'Uninspected' : home.complete ? home.usable === false ? 'Obstructed' : 'Intact' : 'Damaged'}${home.reachable === false ? ' / route blocked' : home.reachable ? ' / reachable' : ''}`,
        objective?.kind === 'home' && objective.status === 'active' && (destination ? 'Returning home' : 'Resting at home'),
        environment && `Environment · ${environment.outcome}`,
        reaction && `Reaction · ${reaction.outcome}`,
        editStatus && `Shared world · ${editStatus}`,
        objective && `Objective · ${objective.label} (${objective.status})`,
        progress && `Step · ${progress.step}`,
        progress?.completed.length > 0 && `Completed · ${progress.completed.join(' / ')}`,
        progress && `Missing · ${progress.missing.map(({ id, count }) => `${B.getItemName(id)} ×${count}`).join(', ') || 'None'}`,
        progress?.materials && `Planks · ${progress.materials.available} available / ${progress.materials.required - (progress.placed ?? 0)} still needed`,
        progress?.plan && `Construction · ${progress.placed ?? 0}/${progress.plan.blocks.length} blocks`,
        next.shelters?.length > 0 && `Shelters · ${next.shelters.map(site => coords(site.position)).join(', ')}`,
        `Equipped · ${B.getItemName(next.equippedTool) || 'None'}`,
        craftOutcome && `Last craft · ${craftOutcome.outcome}`,
        toolOutcome && `Last tool use · ${toolOutcome.outcome}`,
        destination && `Destination ${coords(destination)}${resource ? ` · ${B.getItemName(resource.id)}` : ''}`,
        objective && `Decision · ${decisionSource}${objective.sourceNote ? ` / ${objective.sourceNote}` : ''}`,
        objective && `${objective.source === 'llm' ? 'Model reason' : 'Reason'} · ${objective.reason}`,
        objective?.site && `Remembered site · ${coords(objective.site)}`,
        recent.length > 0 && `Decision context · ${recent.map(entry => entry.outcome).join(' / ')}`,
        experience && `Interests · ${Object.entries(experience.interests).map(([activity, score]) => `${activity} ${score}`).join(' / ')}`,
        counts?.length > 0 && `Most chosen · ${counts.map(([activity, count]) => `${activity} ×${count}`).join(' / ')}`,
        experience && `Competence · ${Object.entries(experience.competence).map(([activity, { success, failure }]) =>
          `${activity} ${success}/${success + failure}`).join(' / ')} (successes/attempts)`,
        changes.length > 0 && `Interest changes · ${changes.map(({ activity, delta, reason }) =>
          `${activity} ${delta > 0 ? '+' : ''}${delta} (${reason})`).join(' / ')}`,
        suppliedChanges?.length > 0 && `Interest context sent · ${suppliedChanges.map(({ activity, score, reason }) =>
          `${activity} ${score} (${reason})`).join(' / ')}`,
        setback && `Recent setback · ${setback.outcome}`,
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
