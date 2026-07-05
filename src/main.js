import * as THREE from 'three';
import { World } from './world.js';
import { Player } from './player.js';
import { UI } from './ui.js';
import { FirstPersonHand } from './hand.js';
import * as B from './blocks.js';
import { BLOCK_DEFS, getToolAction } from './blocks.js';
import { Minimap } from './minimap.js';
import { getCityInfo, CITY_SPACING } from './city.js';
import { VEHICLE_TYPES } from './car.js';
import { IS_MOBILE, MobileControls } from './mobile-controls.js';

// ── Renderer ──────────────────────────────────────────────────────────────────
const canvas = document.getElementById('game-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
renderer.setClearColor(0x87ceeb);
renderer.autoClear = false; // we control clearing manually for the hand pass

// ── Scene / Camera ────────────────────────────────────────────────────────────
const scene  = new THREE.Scene();
scene.fog    = new THREE.Fog(0x87ceeb, 80, 160);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.05, 500);
scene.add(camera);

// ── Lighting ──────────────────────────────────────────────────────────────────
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const sunLight = new THREE.DirectionalLight(0xfffbe0, 1.4);
sunLight.position.set(100, 200, 50);
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0xaaccff, 0.3);
fillLight.position.set(-50, 50, -50);
scene.add(fillLight);

// ── Block highlight (wireframe outline) ───────────────────────────────────────
const hlGeo = new THREE.BoxGeometry(1.002, 1.002, 1.002);
const hlEdges = new THREE.EdgesGeometry(hlGeo);
const hlMesh = new THREE.LineSegments(hlEdges, new THREE.LineBasicMaterial({ color: 0x000000, depthTest: true, linewidth: 2 }));
hlMesh.visible = false;
scene.add(hlMesh);

// ── Block crack overlay ───────────────────────────────────────────────────────
const crackCanvas = document.createElement('canvas');
crackCanvas.width = 64; crackCanvas.height = 64;
const crackCtx = crackCanvas.getContext('2d');
const crackTexture = new THREE.CanvasTexture(crackCanvas);
crackTexture.flipY = false;

const crackMat = new THREE.MeshBasicMaterial({
  map: crackTexture,
  transparent: true,
  depthTest: true,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -1,
});
const crackMesh = new THREE.Mesh(new THREE.BoxGeometry(1.002, 1.002, 1.002), crackMat);
crackMesh.visible = false;
scene.add(crackMesh);

function seededVal(n) {
  let s = (n * 1664525 + 1013904223) >>> 0;
  s = (s * 1664525 + 1013904223) >>> 0;
  return (s >>> 0) / 0xffffffff;
}

function updateCrackOverlay(progress, target) {
  if (!target || progress <= 0) { crackMesh.visible = false; return; }
  crackMesh.visible = true;
  crackMesh.position.set(target.wx + 0.5, target.wy + 0.5, target.wz + 0.5);

  const sz = 64;
  crackCtx.clearRect(0, 0, sz, sz);

  // Darkening overlay scales with progress
  crackCtx.fillStyle = `rgba(0,0,0,${(progress * 0.55).toFixed(2)})`;
  crackCtx.fillRect(0, 0, sz, sz);

  // Draw cracks — more cracks at higher progress
  const numCracks = Math.ceil(progress * 10);
  for (let i = 0; i < numCracks; i++) {
    const alpha = 0.55 + progress * 0.45;
    crackCtx.strokeStyle = `rgba(0,0,0,${alpha.toFixed(2)})`;
    crackCtx.lineWidth = 1 + progress;
    crackCtx.beginPath();
    let cx = seededVal(i * 3)     * sz;
    let cy = seededVal(i * 3 + 1) * sz;
    crackCtx.moveTo(cx, cy);
    const segs = 2 + Math.floor(seededVal(i * 7) * 4);
    for (let j = 0; j < segs; j++) {
      cx += (seededVal(i * 11 + j * 2)     - 0.5) * sz * 0.4;
      cy += (seededVal(i * 11 + j * 2 + 1) - 0.5) * sz * 0.4;
      crackCtx.lineTo(cx, cy);
    }
    crackCtx.stroke();
    // White highlight alongside crack
    crackCtx.strokeStyle = `rgba(255,255,255,${(progress * 0.3).toFixed(2)})`;
    crackCtx.lineWidth = 0.5;
    crackCtx.stroke();
  }

  crackTexture.needsUpdate = true;
}

// ── World / Player / UI / Hand ────────────────────────────────────────────────
const world   = new World(scene);
const player  = new Player(camera, world);
const ui      = new UI(player, world);
const hand    = new FirstPersonHand(renderer);
const minimap = new Minimap(document.getElementById('minimap'), world);

let mobileControls = null;
if (IS_MOBILE) {
  mobileControls = new MobileControls(player);
  mobileControls.onExitCar = () => exitCar();
  mobileControls.onPause   = () => {
    if (gameState !== 'playing') return;
    mobileControls.hide();
    player.active = false;
    gameState = 'paused';
    document.getElementById('pause-screen').classList.remove('hidden');
    ui.hide();
  };
}

// ── State ────────────────────────────────────────────────────────────────────
let gameState = 'menu'; // 'menu'|'playing'|'paused'|'inventory'|'dialog'|'shop'|'driving'
let lastTime  = 0;
let activeNPC = null;  // NPC currently in dialog/shop
let activeCar = null;  // car currently being driven

// Driving camera offset (behind and above)
const _driveCamOffset = new THREE.Vector3();
const _driveLookAt    = new THREE.Vector3();

// ── Day / Night cycle ─────────────────────────────────────────────────────────
let timeOfDay = 0.3; // 0=midnight, 0.25=sunrise, 0.5=noon, 0.75=sunset
const DAY_DURATION = 600; // seconds for full day

const SKY_COLORS = {
  night:   new THREE.Color(0x05050f),
  dawn:    new THREE.Color(0xff7730),
  day:     new THREE.Color(0x87ceeb),
  dusk:    new THREE.Color(0xff6020),
};

const SUN_COLORS = {
  night:   new THREE.Color(0x1020ff),
  dawn:    new THREE.Color(0xff9050),
  day:     new THREE.Color(0xfffbe0),
  dusk:    new THREE.Color(0xff8040),
};

function lerpColor(a, b, t) { return a.clone().lerp(b, t); }

function updateSky(t) {
  // t: 0–1 (0=midnight, 0.5=noon)
  let sky, sun, ambI, sunI;
  if (t < 0.2) {
    // night → dawn
    const f = t / 0.2;
    sky  = lerpColor(SKY_COLORS.night, SKY_COLORS.dawn, f);
    sun  = lerpColor(SUN_COLORS.night, SUN_COLORS.dawn, f);
    ambI = 0.1 + 0.2 * f; sunI = 0.05 + 0.4 * f;
  } else if (t < 0.3) {
    const f = (t - 0.2) / 0.1;
    sky  = lerpColor(SKY_COLORS.dawn, SKY_COLORS.day, f);
    sun  = lerpColor(SUN_COLORS.dawn, SUN_COLORS.day, f);
    ambI = 0.3 + 0.3 * f; sunI = 0.45 + 0.95 * f;
  } else if (t < 0.7) {
    // day
    sky = SKY_COLORS.day.clone(); sun = SUN_COLORS.day.clone();
    ambI = 0.6; sunI = 1.4;
  } else if (t < 0.8) {
    const f = (t - 0.7) / 0.1;
    sky  = lerpColor(SKY_COLORS.day, SKY_COLORS.dusk, f);
    sun  = lerpColor(SUN_COLORS.day, SUN_COLORS.dusk, f);
    ambI = 0.6 - 0.3 * f; sunI = 1.4 - 0.95 * f;
  } else {
    const f = (t - 0.8) / 0.2;
    sky  = lerpColor(SKY_COLORS.dusk, SKY_COLORS.night, f);
    sun  = lerpColor(SUN_COLORS.dusk, SUN_COLORS.night, f);
    ambI = 0.3 - 0.2 * f; sunI = 0.45 - 0.4 * f;
  }

  renderer.setClearColor(sky);
  scene.fog.color.copy(sky);
  ambient.color.copy(sky.clone().lerp(new THREE.Color(0xffffff), 0.4));
  ambient.intensity = Math.max(0.1, ambI);
  sunLight.color.copy(sun);
  sunLight.intensity = Math.max(0.05, sunI);

  const angle = t * Math.PI * 2;
  sunLight.position.set(
    Math.cos(angle) * 200,
    Math.sin(angle) * 200,
    50
  );
}

// ── Resize ────────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  hand.resize(aspect);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── Pointer lock ──────────────────────────────────────────────────────────────
function lockPointer() {
  if (IS_MOBILE) return;
  canvas.requestPointerLock();
}

document.addEventListener('pointerlockchange', () => {
  if (IS_MOBILE) return;
  if (document.pointerLockElement === canvas) {
    player.active = true;
  } else {
    player.active = false;
    if (gameState === 'playing') {
      gameState = 'paused';
      document.getElementById('pause-screen').classList.remove('hidden');
      ui.hide();
    }
  }
});

// ── Menu buttons ──────────────────────────────────────────────────────────────
document.getElementById('play-btn').addEventListener('click', startGame);

document.getElementById('resume-btn').addEventListener('click', () => {
  document.getElementById('pause-screen').classList.add('hidden');
  gameState = 'playing';
  ui.show();
  if (IS_MOBILE && mobileControls) {
    mobileControls.showPlaying();
  } else {
    lockPointer();
  }
});

document.getElementById('quit-btn').addEventListener('click', () => {
  document.getElementById('pause-screen').classList.add('hidden');
  document.getElementById('menu-screen').classList.remove('hidden');
  gameState = 'menu';
  ui.hide();
});

// ── Inventory closed (from any path: E key, button click, etc.) ──────────────
document.addEventListener('inventoryClosed', () => {
  if (gameState !== 'inventory') return;
  gameState = 'playing';
  if (IS_MOBILE && mobileControls) {
    mobileControls.showPlaying();
  } else {
    lockPointer();
  }
});

// ── NPC shop open ─────────────────────────────────────────────────────────────
document.addEventListener('openShop', (e) => {
  if (!activeNPC || gameState !== 'dialog') return;
  const mode = e.detail?.mode || 'buy';
  gameState = 'shop';
  ui.openShop(activeNPC, player, mode);
});

// ── Dialog close (from tree option) ──────────────────────────────────────────
document.addEventListener('dialogClose', () => {
  if (gameState !== 'dialog') return;
  closeDialogOrShop();
});

// ── Shop closed (back to dialog) ──────────────────────────────────────────────
document.addEventListener('shopClosed', () => {
  if (gameState !== 'shop') return;
  gameState = 'dialog';
  ui.closeShop();
  ui.openDialog(activeNPC); // re-open dialog (tree NPCs resume from start)
});

// ── Crafting table event (right-click on crafting table block) ────────────────
document.addEventListener('openCrafting', (e) => {
  if (gameState !== 'playing') return;
  document.exitPointerLock();
  gameState = 'inventory';
  ui.openInventory(e.detail);
  if (IS_MOBILE && mobileControls) mobileControls.hide();
});

// ── Inventory / dialog / shop key handling ────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.code === 'KeyE' && gameState === 'playing') {
    // Enter car first, then inventory
    const nearbyCar = world.cars.getNearest(player.pos, 3.5);
    if (nearbyCar && !nearbyCar.occupied) {
      enterCar(nearbyCar);
      return;
    }
    document.exitPointerLock();
    gameState = 'inventory';
    ui.openInventory(2);
    if (IS_MOBILE && mobileControls) mobileControls.hide();
    return;
  }
  if (e.code === 'KeyE' && gameState === 'driving') {
    exitCar();
    return;
  }
  if (e.code === 'KeyE' && gameState === 'inventory') {
    ui.closeInventory(); // dispatches 'inventoryClosed' → re-locks pointer
    return;
  }
  if (e.code === 'Escape' && gameState === 'driving') {
    exitCar();
    return;
  }
  if (e.code === 'Escape' && gameState === 'inventory') {
    ui.closeInventory();
    return;
  }
  // F = bus stop or NPC
  if (e.code === 'KeyF' && gameState === 'playing') {
    const nearBusStop = world.busStops.getNearest(player.pos, 3);
    if (nearBusStop) { openBusPanel(nearBusStop); return; }
    const npc = world.npcs.getNearest(player.pos, 4);
    if (npc) { openDialog(npc); }
    return;
  }
  if (e.code === 'KeyF' && gameState === 'dialog') {
    if (_busPanel) { closeBusPanel(); return; }
    closeDialogOrShop();
    return;
  }
  if (e.code === 'KeyF' && gameState === 'shop') {
    closeDialogOrShop();
    return;
  }
  if (e.code === 'Escape' && gameState === 'dialog') {
    closeDialogOrShop();
    return;
  }
  if (e.code === 'Escape' && gameState === 'shop') {
    ui.closeShop(); gameState = 'dialog';
    return;
  }
  // Pointer unlock handles pause for 'playing' → 'paused' transition
});

function openDialog(npc) {
  activeNPC     = npc;
  npc.talking   = true;
  gameState     = 'dialog'; // set BEFORE exitPointerLock to avoid pause-screen trigger
  document.exitPointerLock();
  ui.openDialog(npc);
  if (IS_MOBILE && mobileControls) { mobileControls.hide(); player.active = false; }
}

function closeDialogOrShop() {
  ui.closeDialog();
  ui.closeShop();
  if (activeNPC) activeNPC.talking = false;
  activeNPC = null;
  gameState = 'playing';
  if (IS_MOBILE && mobileControls) {
    mobileControls.showPlaying();
  } else {
    lockPointer();
  }
}

function enterCar(car) {
  activeCar = car;
  car.occupied = true;
  gameState = 'driving';
  player.active = false; // disable player FPS controls; camera follows car
  document.exitPointerLock();
  if (IS_MOBILE && mobileControls) {
    mobileControls.showDriving();
  } else {
    const hint = document.getElementById('npc-hint');
    hint.textContent = 'WASD / Arrows = Drive  |  E or Esc = Exit Car';
    hint.classList.remove('hidden');
  }
}

function exitCar() {
  if (!activeCar) return;
  player.pos.set(
    activeCar.pos.x + Math.sin(activeCar.heading + Math.PI / 2) * 2.5,
    activeCar.pos.y + 1,
    activeCar.pos.z + Math.cos(activeCar.heading + Math.PI / 2) * 2.5,
  );
  activeCar.occupied = false;
  activeCar = null;
  gameState = 'playing';
  player.velY = 0;
  player.flying = true;
  document.getElementById('npc-hint').classList.add('hidden');
  if (IS_MOBILE && mobileControls) {
    mobileControls.showPlaying();
  } else {
    lockPointer(); // E-key is a user gesture, so this works
  }
}

// Left-click attack on NPCs when not aiming at a block
document.addEventListener('mousedown', e => {
  if (e.button !== 0 || !player.active || gameState !== 'playing') return;
  // Only attack when there's no block target (swinging in air / at NPC)
  if (!player.target) {
    const npc = world.npcs.getNearest(player.pos, 3.0);
    if (npc) {
      const toolDef = B.TOOL_DEFS[player.hotbar[player.selectedSlot]?.id];
      const dmg = toolDef?.damage ?? 1;
      npc.takeDamage(dmg);
    }
  }
});

// ── Dialog / shop buttons ─────────────────────────────────────────────────────
document.getElementById('dialog-bye-btn').addEventListener('click', () => {
  closeDialogOrShop();
});

document.getElementById('dialog-talk-btn').addEventListener('click', () => {
  if (!activeNPC) return;
  document.getElementById('dialog-text').textContent = activeNPC.nextLine();
});

document.getElementById('dialog-shop-btn').addEventListener('click', () => {
  document.dispatchEvent(new CustomEvent('openShop'));
});

document.getElementById('shop-back-btn').addEventListener('click', () => {
  document.dispatchEvent(new CustomEvent('shopClosed'));
});

document.getElementById('shop-close-btn').addEventListener('click', () => {
  closeDialogOrShop();
});

// ── Dev helpers ───────────────────────────────────────────────────────────────
window.__tp = (x, y, z) => { player.pos.set(x, y ?? 30, z); player.vel.set(0,0,0); };
window.__world = () => world; // expose for console debugging
window.__findSnow = () => {
  for (const chunk of world.chunks.values()) {
    if (!chunk.data) continue;
    for (let lx = 0; lx < 16; lx++) for (let lz = 0; lz < 16; lz++) {
      for (let y = 60; y >= 20; y--) {
        if (chunk.getLocal(lx, y, lz) === 12) { // SNOW_BLOCK
          const wx = chunk.cx*16+lx, wz = chunk.cz*16+lz;
          window.__tp(wx, y+2, wz);
          return `snow at ${wx},${y},${wz}`;
        }
      }
    }
  }
  return 'no snow in loaded chunks';
};
window.__testGrassRegrow = () => {
  // Dig the surface block at player position and report queue state
  const x = Math.floor(player.pos.x), z = Math.floor(player.pos.z);
  for (let y = Math.floor(player.pos.y); y >= 0; y--) {
    if (world.getBlock(x, y, z) !== 0) {
      world.setBlock(x, y, z, 0); // break it
      const q = world._grassQueue.size;
      return `broke (${x},${y},${z}), queue=${q}, regrows in ${Math.round((world._grassQueue.get(`${x},${y-1},${z}`) - Date.now())/1000)}s`;
    }
  }
  return 'no surface block found';
};
window.__findCity = () => {
  for (let x = 0; x < 1200; x += 10) {
    for (let z = 0; z < 1200; z += 10) {
      const ci = world.cityInfo(x, z);
      if (ci) {
        window.__tp(ci.centerX, 40, ci.centerZ);
        return `City at ${ci.centerX.toFixed(0)},${ci.centerZ.toFixed(0)}`;
      }
    }
  }
  return 'No city found in scan range';
};
window.__findShopkeeper = (role) => {
  let fallback = null;
  for (const npc of world.npcs._npcs.values()) {
    if (npc.type === 'shopkeeper') {
      if (!role || npc.role === role) {
        window.__tp(npc.homePos.x, npc.homePos.y + 1, npc.homePos.z);
        return `Found ${npc.name} (${npc.role}) at ${npc.homePos.x.toFixed(1)},${npc.homePos.z.toFixed(1)}`;
      }
      fallback = npc;
    }
  }
  if (fallback && !role) {
    window.__tp(fallback.homePos.x, fallback.homePos.y + 1, fallback.homePos.z);
    return `Found ${fallback.name} (${fallback.role}) at ${fallback.homePos.x.toFixed(1)},${fallback.homePos.z.toFixed(1)}`;
  }
  // List all loaded roles
  const loaded = [...world.npcs._npcs.values()].filter(n => n.type === 'shopkeeper').map(n => n.role);
  return `No ${role||'shopkeeper'} found. Loaded: ${[...new Set(loaded)].join(', ')||'none'}`;
};
window.__openShopkeeperDialog = (role) => {
  for (const npc of world.npcs._npcs.values()) {
    if (npc.type === 'shopkeeper' && (!role || npc.role === role)) {
      openDialog(npc); return npc.name + ' (' + npc.role + ')';
    }
  }
  return 'none';
};

// ── Bus route panel ───────────────────────────────────────────────────────────
let _busPanel = null;

function findNearbyVillages(currentCityX, currentCityZ, worldInfoFn) {
  const dirs = [
    [1,0,'E'], [-1,0,'W'], [0,1,'S'], [0,-1,'N'],
    [1,1,'SE'], [-1,1,'SW'], [1,-1,'NE'], [-1,-1,'NW'],
  ];
  const results = [];
  const seen = new Set();
  for (const [dx, dz, label] of dirs) {
    for (let n = 1; n <= 2 && results.length < 4; n++) {
      const tx = currentCityX + dx * CITY_SPACING * n;
      const tz = currentCityZ + dz * CITY_SPACING * n;
      const ci = worldInfoFn(tx, tz);
      if (!ci) continue;
      const key = `${Math.round(ci.centerX)},${Math.round(ci.centerZ)}`;
      if (seen.has(key)) continue;
      if (Math.round(ci.centerX) === Math.round(currentCityX) &&
          Math.round(ci.centerZ) === Math.round(currentCityZ)) continue;
      seen.add(key);
      const dist = Math.round(Math.sqrt(
        (ci.centerX - currentCityX) ** 2 + (ci.centerZ - currentCityZ) ** 2
      ));
      results.push({ label: `Village (${label}, ${dist}m)`, x: ci.centerX, z: ci.centerZ });
      if (results.length >= 4) break;
    }
    if (results.length >= 4) break;
  }
  return results;
}

function openBusPanel(stopData) {
  closeBusPanel();
  gameState = 'dialog'; // reuse dialog state to keep pointer unlocked
  document.exitPointerLock();
  if (IS_MOBILE && mobileControls) { mobileControls.hide(); player.active = false; }

  const panel = document.createElement('div');
  panel.id = 'bus-route-panel';
  panel.style.cssText = [
    'position:fixed','top:50%','left:50%',
    'transform:translate(-50%,-50%)',
    'background:#1e3a5f','color:#fff',
    'border:3px solid #d4af37','border-radius:8px',
    'padding:24px 32px','min-width:300px',
    'font-family:sans-serif','z-index:1000',
    'display:flex','flex-direction:column','gap:12px',
  ].join(';');

  const title = document.createElement('h2');
  title.textContent = 'Bus Routes';
  title.style.cssText = 'margin:0;font-size:1.4em;color:#fbbf24;text-align:center;';
  panel.appendChild(title);

  const worldInfoFn = (wx, wz) => getCityInfo(wx, wz, world.seed);
  const destinations = findNearbyVillages(stopData.cityX, stopData.cityZ, worldInfoFn);

  if (destinations.length === 0) {
    const msg = document.createElement('p');
    msg.textContent = 'No nearby villages found.';
    msg.style.textAlign = 'center';
    panel.appendChild(msg);
  }

  for (const dest of destinations) {
    const btn = document.createElement('button');
    btn.textContent = dest.label;
    btn.style.cssText = [
      'padding:10px 16px','background:#0f766e','color:#fff',
      'border:none','border-radius:5px','cursor:pointer',
      'font-size:1em',
    ].join(';');
    btn.addEventListener('click', () => {
      closeBusPanel();
      gameState = 'playing';
      document.getElementById('npc-hint').classList.add('hidden');
      player.pos.set(dest.x, 40, dest.z);
      player.vel.set(0, 0, 0);
      world.update(dest.x, dest.z);
      lockPointer();
    });
    panel.appendChild(btn);
  }

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close [F]';
  closeBtn.style.cssText = [
    'padding:8px 16px','background:#374151','color:#fff',
    'border:none','border-radius:5px','cursor:pointer',
    'font-size:0.9em','margin-top:4px',
  ].join(';');
  closeBtn.addEventListener('click', closeBusPanel);
  panel.appendChild(closeBtn);

  document.body.appendChild(panel);
  _busPanel = panel;
}

function closeBusPanel() {
  if (_busPanel) {
    _busPanel.remove();
    _busPanel = null;
  }
  if (gameState === 'dialog') {
    gameState = 'playing';
    if (IS_MOBILE && mobileControls) {
      mobileControls.showPlaying();
    } else {
      lockPointer();
    }
  }
}

// ── Start game ────────────────────────────────────────────────────────────────
function startGame() {
  document.getElementById('menu-screen').classList.add('hidden');
  gameState = 'playing';
  ui.show();
  if (IS_MOBILE && mobileControls) {
    mobileControls.showPlaying();
  } else {
    lockPointer();
  }
  // Prime world generation around spawn
  world.update(8, 8);
}

// ── Game loop ─────────────────────────────────────────────────────────────────
function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  const isMoving = player.active &&
    (player.keys['KeyW'] || player.keys['KeyS'] ||
     player.keys['KeyA'] || player.keys['KeyD']);

  if (gameState !== 'menu' && gameState !== 'paused') {
    world.npcs.update(dt, player.pos);
    world.animals.update(dt, player.pos);
  }

  const _cityInfoFn  = (wx, wz)      => world.cityInfo(wx, wz);
  const _getBlockFn  = (wx, wy, wz)  => world.getBlock(wx, wy, wz);

  if (gameState !== 'menu' && gameState !== 'paused') {
    world.traffic.update(dt);
  }

  if ((gameState === 'playing' || gameState === 'dialog' || gameState === 'shop') && !activeCar) {
    world.cars.update(dt, null, null, world.traffic, _cityInfoFn);
  }

  if (gameState === 'driving' && activeCar) {
    world.cars.update(dt, player.keys, activeCar, world.traffic, _cityInfoFn, _getBlockFn);
    // Sync player position to car so chunks load around it
    player.pos.copy(activeCar.pos);
    world.update(activeCar.pos.x, activeCar.pos.z);

    // Drive camera: behind and above the car
    const _vt = activeCar.vehicleType;
    const _camBack = (_vt === 'motorcycle') ? -3.5
      : (_vt === 'bus' || _vt === 'limo') ? -7.5
      : (_vt === 'monster_truck') ? -6.0
      : -5.5;
    const fwd = new THREE.Vector3(Math.sin(activeCar.heading), 0, Math.cos(activeCar.heading));
    _driveCamOffset.copy(activeCar.pos).addScaledVector(fwd, _camBack).setY(activeCar.pos.y + 2.8);
    camera.position.lerp(_driveCamOffset, Math.min(1, dt * 10));
    _driveLookAt.copy(activeCar.pos).addScaledVector(fwd, 3).setY(activeCar.pos.y + 0.8);
    camera.lookAt(_driveLookAt);
  }

  if (gameState === 'playing') {
    timeOfDay = (timeOfDay + dt / DAY_DURATION) % 1;
    updateSky(timeOfDay);

    if (!player.spawned) player.spawn(world);

    player.update(dt);
    world.update(player.pos.x, player.pos.z);
    ui.update(dt);

    // Nearby context hint
    const npcHint = document.getElementById('npc-hint');
    const nearNPC = world.npcs.getNearest(player.pos, 4);
    const nearCarHint = world.cars.getNearest(player.pos, 3.5);
    const nearBusStopHint = world.busStops.getNearest(player.pos, 3);
    if (nearCarHint && !nearCarHint.occupied) {
      npcHint.textContent = 'Press E to enter car';
      npcHint.classList.remove('hidden');
    } else if (nearBusStopHint) {
      npcHint.textContent = 'Press F for bus routes';
      npcHint.classList.remove('hidden');
    } else if (nearNPC) {
      npcHint.textContent = 'Press F to talk';
      npcHint.classList.remove('hidden');
    } else {
      npcHint.classList.add('hidden');
    }

    // Crack overlay
    updateCrackOverlay(player.getBreakProgress(), player.breakTarget);

    // Block highlight
    if (player.target) {
      const { wx, wy, wz } = player.target;
      hlMesh.position.set(wx + 0.5, wy + 0.5, wz + 0.5);
      hlMesh.visible = true;
    } else {
      hlMesh.visible = false;
    }

    // First-person hand — driven by the HELD ITEM, not the block's action
    const heldId         = player.hotbar[player.selectedSlot]?.id ?? null;
    const heldToolAction = getToolAction(heldId); // null → bare fist
    const info           = player.getBreakInfo();

    if (info && info.canBreak) {
      hand.startBreaking(heldToolAction || 'break');
    } else {
      hand.stopBreaking();
      hand.switchTool(heldToolAction);
    }
    hand.update(dt, isMoving);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  renderer.clear();
  renderer.render(scene, camera);
  if (gameState === 'playing' || gameState === 'dialog' || gameState === 'shop') hand.render();
  // In driving mode: clear block highlight and crack overlay
  if (gameState === 'driving') { hlMesh.visible = false; crackMesh.visible = false; }

  // Minimap — visible whenever the HUD is up
  if (gameState === 'playing' || gameState === 'dialog' || gameState === 'shop' || gameState === 'driving') {
    minimap.render(player.pos.x, player.pos.z, player.yaw, world.npcs);
  }
}

requestAnimationFrame(loop);
