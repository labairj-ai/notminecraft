import * as THREE from 'three';

// Browser-only viewer. The agent keeps living in agent/server.js when this page is closed.
export function createExplorerView(scene, world, player) {
  const params = new URLSearchParams(location.search);
  if (!params.has('explorer')) return { update() {} };

  const group = new THREE.Group();
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.85, 0.4), new THREE.MeshLambertMaterial({ color: 0x16a085 }));
  torso.position.y = 1.15;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), new THREE.MeshLambertMaterial({ color: 0xffdc9c }));
  head.position.y = 1.85;
  const legMat = new THREE.MeshLambertMaterial({ color: 0x263b52 });
  for (const x of [-0.2, 0.2]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.75, 0.3), legMat);
    leg.position.set(x, 0.4, 0);
    group.add(leg);
  }
  group.add(torso, head);
  group.visible = false;
  scene.add(group);

  const panel = document.createElement('div');
  panel.style.cssText = 'position:fixed;top:12px;left:12px;z-index:30;background:rgba(18,28,40,.9);color:white;padding:12px;border-radius:8px;font:13px sans-serif;max-width:260px;pointer-events:auto';
  const info = document.createElement('div');
  info.textContent = 'Explorer: connecting to local agent...';
  const visit = document.createElement('button');
  visit.textContent = 'Visit Explorer';
  visit.style.cssText = 'margin-top:8px;padding:6px;cursor:pointer';
  visit.disabled = true;
  panel.append(info, visit);
  document.body.append(panel);
  let snapshot = null;
  let inFlight = false;
  let lastFetch = 0;

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
      snapshot = next;
      visit.disabled = false;
      const memory = next.memory?.at(-1)?.outcome || 'Starting';
      info.textContent = `${next.name} | ${next.action} | Energy ${next.energy} | ${memory} | ${next.updatedAt}`;
    } catch {
      snapshot = null;
      group.visible = false;
      info.textContent = 'Explorer offline. Run npm run agent locally, then reload.';
      visit.disabled = true;
    } finally {
      clearTimeout(timeout);
      inFlight = false;
    }
  }

  function groundHeight(x, z) {
    for (let y = 100; y >= 1; y--) {
      if (world.getBlock(Math.floor(x), y, Math.floor(z)) !== 0) return y + 1;
    }
    return 40;
  }
  visit.addEventListener('click', () => {
    if (!snapshot) return;
    world.update(snapshot.x, snapshot.z);
    player.pos.set(snapshot.x + 3, groundHeight(snapshot.x + 3, snapshot.z), snapshot.z + 3);
    player.vel.set(0, 0, 0);
  });
  return {
    update(now) {
      if (now - lastFetch >= 3000) {
        lastFetch = now;
        fetchState();
      }
      if (!snapshot) return;
      const dx = player.pos.x - snapshot.x, dz = player.pos.z - snapshot.z;
      group.visible = Math.hypot(dx, dz) < 110;
      group.position.set(snapshot.x, groundHeight(snapshot.x, snapshot.z), snapshot.z);
    }
  };
}
