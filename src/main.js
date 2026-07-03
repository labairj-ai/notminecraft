import * as THREE from 'three';
import { World } from './world.js';
import { Player } from './player.js';
import { UI } from './ui.js';

// ── Renderer ──────────────────────────────────────────────────────────────────
const canvas = document.getElementById('game-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
renderer.setClearColor(0x87ceeb);

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

// ── World / Player / UI ───────────────────────────────────────────────────────
const world  = new World(scene);
const player = new Player(camera, world);
const ui     = new UI(player, world);

// ── State ────────────────────────────────────────────────────────────────────
let gameState = 'menu'; // 'menu' | 'playing' | 'paused' | 'inventory'
let lastTime  = 0;

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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
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

// ── Inventory toggle ──────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.code === 'KeyE' && gameState === 'playing') {
    document.exitPointerLock();
    gameState = 'inventory';
    ui.openInventory();
    return;
  }
  if (e.code === 'KeyE' && gameState === 'inventory') {
    ui.closeInventory();
    gameState = 'playing';
    lockPointer();
    return;
  }
  if (e.code === 'Escape') {
    if (gameState === 'inventory') {
      ui.closeInventory();
      gameState = 'playing';
      lockPointer();
    }
    // Pointer unlock handles pause for 'playing' state
  }
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

  if (gameState === 'playing') {
    timeOfDay = (timeOfDay + dt / DAY_DURATION) % 1;
    updateSky(timeOfDay);

    if (!player.spawned) player.spawn(world);

    player.update(dt);
    world.update(player.pos.x, player.pos.z);
    ui.update(dt);

    // Block highlight
    if (player.target) {
      const { wx, wy, wz } = player.target;
      hlMesh.position.set(wx + 0.5, wy + 0.5, wz + 0.5);
      hlMesh.visible = true;
    } else {
      hlMesh.visible = false;
    }
  }

  renderer.render(scene, camera);
}

requestAnimationFrame(loop);
