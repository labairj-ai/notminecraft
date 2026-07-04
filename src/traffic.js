// ── Traffic lights and stop signs ────────────────────────────────────────────
import * as THREE from 'three';
import { CITY_BASE_Y, STREET_PERIOD, STREET_WIDTH, SIDEWALK_WIDTH } from './city.js';

// Timing constants (seconds)
const GREEN  = 9;
const YELLOW = 2;
const CYCLE  = (GREEN + YELLOW) * 2; // full NS+EW cycle

function mod(x, n) { return ((x % n) + n) % n; }

function makeMat(color, extra = {}) {
  return new THREE.MeshLambertMaterial({ color, ...extra });
}
function box(w, h, d, mat) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
}

// ── Stop sign mesh ────────────────────────────────────────────────────────────
function buildStopSign(wx, wz) {
  const g = new THREE.Group();
  const poleM = makeMat(0x888888);
  const pole  = box(0.08, 2.0, 0.08, poleM);
  pole.position.set(0, 1.0, 0);
  g.add(pole);

  // Octagon (8-sided cylinder)
  const signM  = makeMat(0xcc1111);
  const borderM = makeMat(0xffffff);
  const signGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.06, 8);
  const borderGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.04, 8);
  const border = new THREE.Mesh(borderGeo, borderM);
  const sign   = new THREE.Mesh(signGeo,  signM);
  sign.rotation.y = Math.PI / 8;
  border.rotation.y = Math.PI / 8;
  sign.position.set(0, 2.1, 0);
  border.position.set(0, 2.1, 0);
  g.add(border);
  g.add(sign);
  // White "STOP" bar hint (thin white box across sign)
  const textM = makeMat(0xffffff);
  const bar = box(0.36, 0.04, 0.08, textM);
  bar.position.set(0, 2.1, 0);
  g.add(bar);

  g.position.set(wx, CITY_BASE_Y + 1, wz);
  return g;
}

// ── Traffic light mesh ────────────────────────────────────────────────────────
// Returns { group, redLight, yellowLight, greenLight }
function buildTrafficLight(wx, wz) {
  const g = new THREE.Group();

  const poleM    = makeMat(0x444444);
  const housingM = makeMat(0x111111);

  // Vertical pole
  const pole = box(0.1, 3.0, 0.1, poleM);
  pole.position.set(0, 1.5, 0);
  g.add(pole);

  // Horizontal arm angled over road
  const arm = box(0.8, 0.1, 0.1, poleM);
  arm.position.set(0.4, 3.1, 0);
  g.add(arm);

  // Housing box
  const housing = box(0.28, 0.85, 0.28, housingM);
  housing.position.set(0.8, 3.1, 0);
  g.add(housing);

  // Visors above each light
  const visorM = makeMat(0x111111);
  for (let i = -1; i <= 1; i++) {
    const v = box(0.30, 0.05, 0.18, visorM);
    v.position.set(0.8, 3.1 + i * 0.27 + 0.14, 0.12);
    g.add(v);
  }

  // Light bulbs: red (top), yellow (mid), green (bottom)
  const LIGHT_DEFS = [
    { name: 'red',    offColor: 0x4a0000, onColor: 0xff2020, emissiveOn: new THREE.Color(0xff0000), y:  0.27 },
    { name: 'yellow', offColor: 0x3a2a00, onColor: 0xffcc00, emissiveOn: new THREE.Color(0xffaa00), y:  0    },
    { name: 'green',  offColor: 0x003300, onColor: 0x22ee22, emissiveOn: new THREE.Color(0x00cc00), y: -0.27 },
  ];
  const lights = {};
  for (const ld of LIGHT_DEFS) {
    const geo = new THREE.SphereGeometry(0.09, 8, 8);
    const mat = makeMat(ld.offColor, { emissive: 0x000000 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0.8, 3.1 + ld.y, 0.01);
    g.add(mesh);
    lights[ld.name] = { mesh, offColor: new THREE.Color(ld.offColor), onColor: new THREE.Color(ld.onColor), emissiveOn: ld.emissiveOn };
  }

  g.position.set(wx, CITY_BASE_Y + 1, wz);
  return { group: g, lights };
}

// ── TrafficManager ────────────────────────────────────────────────────────────
export class TrafficManager {
  constructor(scene) {
    this.scene   = scene;
    this._tl     = new Map();   // chunkKey → [{group, lights, isNS}]
    this._signs  = new Map();   // chunkKey → [group]
    this._time   = 0;
  }

  // Returns 'green'|'yellow'|'red' for the given axis at time t
  _state(t, isNS) {
    const phase = mod(t, CYCLE);
    if (isNS) {
      if (phase < GREEN)              return 'green';
      if (phase < GREEN + YELLOW)     return 'yellow';
      return 'red';
    } else {
      const off = GREEN + YELLOW;
      if (phase < off)                return 'red';
      if (phase < off + GREEN)        return 'green';
      return 'yellow';
    }
  }

  // Returns true if it's safe (green or yellow) to travel in given heading
  isGreenForHeading(heading) {
    // Heading ≈ 0 or π → Z-direction (NS); heading ≈ ±π/2 → X-direction (EW)
    const h = ((heading % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const isNS = h < Math.PI / 4 || h > 7 * Math.PI / 4 ||
                 (h > 3 * Math.PI / 4 && h < 5 * Math.PI / 4);
    return this._state(this._time, isNS) !== 'red';
  }

  spawnForChunk(chunkKey, spawns) {
    if (this._tl.has(chunkKey)) return;
    const tls   = [];
    const signs = [];
    for (const s of spawns) {
      if (s.kind === 'light') {
        const { group, lights } = buildTrafficLight(s.wx, s.wz);
        this.scene.add(group);
        tls.push({ group, lights, isNS: s.isNS });
      } else {
        const g = buildStopSign(s.wx, s.wz);
        this.scene.add(g);
        signs.push(g);
      }
    }
    this._tl.set(chunkKey, tls);
    this._signs.set(chunkKey, signs);
  }

  despawnChunk(chunkKey) {
    for (const tl of (this._tl.get(chunkKey) || [])) {
      this.scene.remove(tl.group);
      tl.group.traverse(o => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); } });
    }
    for (const sg of (this._signs.get(chunkKey) || [])) {
      this.scene.remove(sg);
      sg.traverse(o => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); } });
    }
    this._tl.delete(chunkKey);
    this._signs.delete(chunkKey);
  }

  update(dt) {
    this._time += dt;
    for (const tlList of this._tl.values()) {
      for (const tl of tlList) {
        const state = this._state(this._time, tl.isNS);
        for (const [name, ld] of Object.entries(tl.lights)) {
          const on = name === state;
          ld.mesh.material.color.set(on ? ld.onColor : ld.offColor);
          ld.mesh.material.emissive.set(on ? ld.emissiveOn : new THREE.Color(0));
        }
      }
    }
  }
}

// ── Spawn point generator ────────────────────────────────────────────────────
// Returns array of {kind, wx, wz, isNS} for traffic infrastructure in chunk
export function getChunkTrafficSpawns(chunkX, chunkZ, worldSeed, cityInfoFn) {
  const SIZE   = 16;
  const spawns = [];
  const seen   = new Set();

  // inner-road-edge positions within the STREET_WIDTH zone at intersections
  const INNER = SIDEWALK_WIDTH - 1;         // = 2: inner sidewalk corner
  const OUTER = STREET_WIDTH - SIDEWALK_WIDTH; // = 9: far sidewalk corner

  for (let lx = 0; lx < SIZE; lx++) {
    for (let lz = 0; lz < SIZE; lz++) {
      const wx = chunkX * SIZE + lx;
      const wz = chunkZ * SIZE + lz;
      const city = cityInfoFn(wx, wz);
      if (!city) continue;

      const px = mod(Math.floor(city.localX), STREET_PERIOD);
      const pz = mod(Math.floor(city.localZ), STREET_PERIOD);

      // Only place objects within intersection zone
      if (!(px < STREET_WIDTH && pz < STREET_WIDTH)) continue;

      // Traffic light — NE inner corner: controls NS traffic (facing Z)
      if (px === OUTER && pz === INNER) {
        const key = `tl:${wx},${wz}`;
        if (!seen.has(key)) { seen.add(key); spawns.push({ kind: 'light', wx: wx + 0.5, wz: wz + 0.5, isNS: true }); }
      }
      // Traffic light — SW inner corner: controls EW traffic (facing X)
      if (px === INNER && pz === OUTER) {
        const key = `tl:${wx},${wz}`;
        if (!seen.has(key)) { seen.add(key); spawns.push({ kind: 'light', wx: wx + 0.5, wz: wz + 0.5, isNS: false }); }
      }
      // Stop sign — SW outer corner
      if (px === INNER && pz === INNER) {
        const key = `sg:${wx},${wz}`;
        if (!seen.has(key)) { seen.add(key); spawns.push({ kind: 'stop', wx: wx + 0.5, wz: wz + 0.5 }); }
      }
      // Stop sign — NE outer corner
      if (px === OUTER && pz === OUTER) {
        const key = `sg2:${wx},${wz}`;
        if (!seen.has(key)) { seen.add(key); spawns.push({ kind: 'stop', wx: wx + 0.5, wz: wz + 0.5 }); }
      }
    }
  }

  return spawns;
}
