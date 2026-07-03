import * as THREE from 'three';
import { World } from './world.js';
import { Player } from './player.js';
import { UI } from './ui.js';
import { FirstPersonHand } from './hand.js';
import { BLOCK_DEFS, getToolAction } from './blocks.js';

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
const world  = new World(scene);
const player = new Player(camera, world);
const ui     = new UI(player, world);
const hand   = new FirstPersonHand(renderer);

// ── State ────────────────────────────────────────────────────────────────────
let gameState = 'menu'; // 'menu'|'playing'|'paused'|'inventory'|'dialog'|'shop'
let lastTime  = 0;
let activeNPC = null; // NPC currently in dialog/shop

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
  canvas.requestPointerLock();
}

document.addEventListener('pointerlockchange', () => {
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
  lockPointer();
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
  lockPointer();
});

// ── NPC shop open ─────────────────────────────────────────────────────────────
document.addEventListener('openShop', () => {
  if (!activeNPC || gameState !== 'dialog') return;
  gameState = 'shop';
  ui.openShop(activeNPC, player);
});

// ── Shop closed (back to dialog) ──────────────────────────────────────────────
document.addEventListener('shopClosed', () => {
  if (gameState !== 'shop') return;
  gameState = 'dialog';
  ui.closeShop();
  ui.openDialog(activeNPC);
});

// ── Crafting table event (right-click on crafting table block) ────────────────
document.addEventListener('openCrafting', (e) => {
  if (gameState !== 'playing') return;
  document.exitPointerLock();
  gameState = 'inventory';
  ui.openInventory(e.detail); // detail = 3 for 3×3
});

// ── Inventory / dialog / shop key handling ────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.code === 'KeyE' && gameState === 'playing') {
    document.exitPointerLock();
    gameState = 'inventory';
    ui.openInventory(2);
    return;
  }
  if (e.code === 'KeyE' && gameState === 'inventory') {
    ui.closeInventory(); // dispatches 'inventoryClosed' → re-locks pointer
    return;
  }
  if (e.code === 'Escape' && gameState === 'inventory') {
    ui.closeInventory();
    return;
  }
  // F = interact with nearby NPC
  if (e.code === 'KeyF' && gameState === 'playing') {
    const npc = world.npcs.getNearest(player.pos, 4);
    if (npc) { openDialog(npc); }
    return;
  }
  if (e.code === 'KeyF' && (gameState === 'dialog' || gameState === 'shop')) {
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
  activeNPC   = npc;
  gameState   = 'dialog'; // set BEFORE exitPointerLock to avoid pause-screen trigger
  document.exitPointerLock();
  ui.openDialog(npc);
}

function closeDialogOrShop() {
  ui.closeDialog();
  ui.closeShop();
  activeNPC = null;
  gameState = 'playing';
  lockPointer();
}

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

// ── Start game ────────────────────────────────────────────────────────────────
function startGame() {
  document.getElementById('menu-screen').classList.add('hidden');
  gameState = 'playing';
  ui.show();
  lockPointer();
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

  if (gameState === 'playing' || gameState === 'dialog' || gameState === 'shop') {
    world.npcs.update(dt, player.pos);
  }

  if (gameState === 'playing') {
    timeOfDay = (timeOfDay + dt / DAY_DURATION) % 1;
    updateSky(timeOfDay);

    if (!player.spawned) player.spawn(world);

    player.update(dt);
    world.update(player.pos.x, player.pos.z);
    ui.update(dt);

    // NPC nearby hint
    const npcHint = document.getElementById('npc-hint');
    const nearNPC = world.npcs.getNearest(player.pos, 4);
    if (nearNPC) npcHint.classList.remove('hidden');
    else          npcHint.classList.add('hidden');

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
}

requestAnimationFrame(loop);
