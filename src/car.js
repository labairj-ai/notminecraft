import * as THREE from 'three';

function mat(color, extra = {}) {
  return new THREE.MeshLambertMaterial({ color, ...extra });
}
function box(w, h, d, m) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
}
function srng(seed) {
  let s = ((seed * 1664525 + 1013904223) >>> 0);
  return () => { s = ((s * 1664525 + 1013904223) >>> 0); return s / 0xffffffff; };
}

const PALETTES = [
  { body: '#ef4444', trim: '#b91c1c' },
  { body: '#3b82f6', trim: '#1d4ed8' },
  { body: '#f8fafc', trim: '#cbd5e1' },
  { body: '#fbbf24', trim: '#d97706' },
  { body: '#1e293b', trim: '#0f172a' },
  { body: '#94a3b8', trim: '#64748b' },
  { body: '#10b981', trim: '#047857' },
  { body: '#f97316', trim: '#c2410c' },
  { body: '#a855f7', trim: '#7e22ce' },
  { body: '#14b8a6', trim: '#0f766e' },
];

export class Car {
  constructor(scene, { wx, wy, wz, seed, heading = 0 }) {
    this.pos     = new THREE.Vector3(wx, wy, wz);
    this.heading = heading;
    this.speed   = 0;
    this.steer   = 0;
    this.occupied = false;
    this._scene  = scene;

    const r = srng(seed);
    const pal = PALETTES[Math.floor(r() * PALETTES.length)];

    const bodyM  = mat(pal.body);
    const trimM  = mat(pal.trim);
    const glassM = mat('#bfdbfe', { transparent: true, opacity: 0.75 });
    const wheelM = mat('#18181b');
    const rimM   = mat('#a1a1aa');
    const headM  = mat('#fef9c3', { emissive: '#fef9c3', emissiveIntensity: 0.6 });
    const tailM  = mat('#991b1b', { emissive: '#991b1b', emissiveIntensity: 0.4 });

    const g = new THREE.Group();

    // Main chassis
    const chassis = box(1.8, 0.5, 3.8, bodyM);
    chassis.position.set(0, 0.35, 0);
    g.add(chassis);

    // Cabin/roof
    const cabin = box(1.45, 0.44, 2.0, bodyM);
    cabin.position.set(0, 0.82, -0.05);
    g.add(cabin);

    // Windshields
    const fwGeo = new THREE.BoxGeometry(1.25, 0.36, 0.07);
    const fw = new THREE.Mesh(fwGeo, glassM);
    fw.position.set(0, 0.83, 0.97); fw.rotation.x = 0.38;
    g.add(fw);

    const rwGeo = new THREE.BoxGeometry(1.25, 0.36, 0.07);
    const rw = new THREE.Mesh(rwGeo, glassM);
    rw.position.set(0, 0.83, -1.07); rw.rotation.x = -0.38;
    g.add(rw);

    // Side windows
    for (const sx of [-0.73, 0.73]) {
      const sw = box(0.07, 0.3, 1.65, glassM);
      sw.position.set(sx, 0.82, -0.05);
      g.add(sw);
    }

    // Wheels
    this._wheels = [];
    const wheelData = [[-0.95, 0, 1.25], [0.95, 0, 1.25], [-0.95, 0, -1.25], [0.95, 0, -1.25]];
    for (const [wx2, wy2, wz2] of wheelData) {
      const wg = new THREE.Group();
      wg.add(box(0.24, 0.52, 0.52, wheelM));
      const rim = box(0.26, 0.32, 0.32, rimM); wg.add(rim);
      wg.position.set(wx2, wy2, wz2);
      g.add(wg);
      this._wheels.push(wg);
    }

    // Headlights
    for (const sx of [-0.55, 0.55]) {
      const hl = box(0.38, 0.17, 0.06, headM); hl.position.set(sx, 0.36, 1.92); g.add(hl);
    }
    // Tail lights
    for (const sx of [-0.55, 0.55]) {
      const tl = box(0.34, 0.15, 0.06, tailM); tl.position.set(sx, 0.36, -1.92); g.add(tl);
    }

    // Bumpers
    const fb = box(1.85, 0.22, 0.12, trimM); fb.position.set(0, 0.17, 1.96); g.add(fb);
    const rb = box(1.85, 0.22, 0.12, trimM); rb.position.set(0, 0.17, -1.96); g.add(rb);

    // Door handles (tiny details on side)
    for (const [sx, zoff] of [[-0.91, 0.4], [0.91, 0.4], [-0.91, -0.5], [0.91, -0.5]]) {
      const dh = box(0.04, 0.06, 0.22, rimM);
      dh.position.set(sx, 0.55, zoff);
      g.add(dh);
    }

    g.position.copy(this.pos);
    g.rotation.y = heading;
    scene.add(g);
    this._group = g;
    this._wheelRot = 0;
  }

  update(dt, keys) {
    if (!this.occupied) return;

    const accel = 14, maxSpd = 18, drag = 3;

    if (keys['KeyW'] || keys['ArrowUp']) {
      this.speed = Math.min(this.speed + accel * dt, maxSpd);
    } else if (keys['KeyS'] || keys['ArrowDown']) {
      this.speed = Math.max(this.speed - accel * dt, -maxSpd * 0.4);
    } else {
      this.speed *= Math.exp(-drag * dt);
      if (Math.abs(this.speed) < 0.05) this.speed = 0;
    }

    // Steering — more responsive at low speed
    const steerMax = 0.55;
    const steerRate = 1.6;
    if (Math.abs(this.speed) > 0.2) {
      if (keys['KeyA'] || keys['ArrowLeft'])  this.steer -= steerRate * dt;
      if (keys['KeyD'] || keys['ArrowRight']) this.steer += steerRate * dt;
    }
    this.steer *= Math.exp(-4 * dt);
    this.steer = Math.max(-steerMax, Math.min(steerMax, this.steer));

    // Turn
    this.heading += this.steer * this.speed * 0.12 * dt;

    // Move
    this.pos.x += Math.sin(this.heading) * this.speed * dt;
    this.pos.z += Math.cos(this.heading) * this.speed * dt;

    this._group.position.copy(this.pos);
    this._group.rotation.y = this.heading;

    // Wheel animation
    this._wheelRot += this.speed * dt * 2.5;
    for (let i = 0; i < this._wheels.length; i++) {
      this._wheels[i].rotation.x = -this._wheelRot;
      if (i < 2) this._wheels[i].rotation.y = this.steer * 0.45;
    }
  }

  dispose() {
    this._group.parent?.remove(this._group);
    this._group.traverse(o => {
      if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); }
    });
  }
}

// ── CarManager ────────────────────────────────────────────────────────────────

export class CarManager {
  constructor(scene) {
    this._scene  = scene;
    this._cars   = new Map();
    this._chunks = new Map();
  }

  spawnForChunk(chunkKey, spawns) {
    if (this._chunks.has(chunkKey)) return;
    const keys = [];
    for (const s of spawns) {
      const k = `car:${s.wx.toFixed(1)},${s.wz.toFixed(1)}`;
      if (!this._cars.has(k)) {
        this._cars.set(k, new Car(this._scene, s));
      }
      keys.push(k);
    }
    this._chunks.set(chunkKey, keys);
  }

  despawnChunk(chunkKey) {
    const keys = this._chunks.get(chunkKey);
    if (!keys) return;
    for (const k of keys) {
      const car = this._cars.get(k);
      if (car && !car.occupied) {
        car.dispose();
        this._cars.delete(k);
      }
    }
    this._chunks.delete(chunkKey);
  }

  getNearest(playerPos, maxDist = 3.5) {
    let best = null, bd = maxDist * maxDist;
    for (const car of this._cars.values()) {
      const dx = playerPos.x - car.pos.x;
      const dz = playerPos.z - car.pos.z;
      const d2 = dx * dx + dz * dz;
      if (d2 < bd) { bd = d2; best = car; }
    }
    return best;
  }

  update(dt, keys, activeCar) {
    for (const car of this._cars.values()) {
      car.update(dt, car === activeCar ? keys : {});
    }
  }
}
