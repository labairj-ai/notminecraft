import * as THREE from 'three';
import { STREET_PERIOD, STREET_WIDTH, SIDEWALK_WIDTH } from './city.js';

function mod(x, n) { return ((x % n) + n) % n; }
const AI_TARGET_SPEED = 7;  // blocks/sec for autonomous cars

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
    this._inIntersection = false;
    this._stuckTimer     = 0;
    this._lastPos        = new THREE.Vector3(wx, wy, wz);

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

  // Called every frame; keys is null for AI-driven cars
  update(dt, keys, trafficMgr, cityInfoFn) {
    if (this.occupied && keys) {
      this._playerUpdate(dt, keys);
    } else if (!this.occupied) {
      this._aiUpdate(dt, trafficMgr, cityInfoFn);
    }
    this._applyMovement(dt);
    // Keep AI cars on asphalt only
    if (!this.occupied && cityInfoFn) this._constrainToRoad(cityInfoFn);
  }

  // Snap AI car back onto road if it has drifted onto a sidewalk
  _constrainToRoad(cityInfoFn) {
    const city = cityInfoFn(this.pos.x, this.pos.z);
    if (!city) return;

    const fpx = mod(city.localX, STREET_PERIOD);
    const fpz = mod(city.localZ, STREET_PERIOD);
    const ipx = Math.floor(fpx);
    const ipz = Math.floor(fpz);

    // Only correct in straight corridors (not intersections)
    const inZCorr = ipx < STREET_WIDTH && ipz >= STREET_WIDTH;
    const inXCorr = ipz < STREET_WIDTH && ipx >= STREET_WIDTH;

    const roadMax = STREET_WIDTH - SIDEWALK_WIDTH; // 9
    let corrected = false;

    if (inZCorr) {
      if (fpx < SIDEWALK_WIDTH) {
        this.pos.x += SIDEWALK_WIDTH + 0.5 - fpx; corrected = true;
      } else if (fpx > roadMax) {
        this.pos.x += roadMax - 0.5 - fpx; corrected = true;
      }
    } else if (inXCorr) {
      if (fpz < SIDEWALK_WIDTH) {
        this.pos.z += SIDEWALK_WIDTH + 0.5 - fpz; corrected = true;
      } else if (fpz > roadMax) {
        this.pos.z += roadMax - 0.5 - fpz; corrected = true;
      }
    }

    if (corrected) this._group.position.copy(this.pos);
  }

  _playerUpdate(dt, keys) {
    const accel = 14, maxSpd = 18, drag = 3;
    if (keys['KeyW'] || keys['ArrowUp']) {
      this.speed = Math.min(this.speed + accel * dt, maxSpd);
    } else if (keys['KeyS'] || keys['ArrowDown']) {
      this.speed = Math.max(this.speed - accel * dt, -maxSpd * 0.4);
    } else {
      this.speed *= Math.exp(-drag * dt);
      if (Math.abs(this.speed) < 0.05) this.speed = 0;
    }
    const steerMax = 0.55, steerRate = 1.6;
    if (Math.abs(this.speed) > 0.2) {
      if (keys['KeyA'] || keys['ArrowLeft'])  this.steer -= steerRate * dt;
      if (keys['KeyD'] || keys['ArrowRight']) this.steer += steerRate * dt;
    }
    this.steer *= Math.exp(-4 * dt);
    this.steer = Math.max(-steerMax, Math.min(steerMax, this.steer));
    this.heading += this.steer * this.speed * 0.12 * dt;
  }

  _aiUpdate(dt, trafficMgr, cityInfoFn) {
    const city = cityInfoFn ? cityInfoFn(this.pos.x, this.pos.z) : null;
    if (!city) {
      // Outside city — slow to stop
      this.speed = Math.max(0, this.speed - 6 * dt);
      return;
    }
    const px = mod(Math.floor(city.localX), STREET_PERIOD);
    const pz = mod(Math.floor(city.localZ), STREET_PERIOD);
    const atIntersection = px < STREET_WIDTH && pz < STREET_WIDTH;

    if (!atIntersection) {
      this._inIntersection = false;

      // Red-light check: look SIDEWALK_WIDTH+2 blocks ahead
      if (trafficMgr) {
        const la = SIDEWALK_WIDTH + 2;
        const ax = this.pos.x + Math.sin(this.heading) * la;
        const az = this.pos.z + Math.cos(this.heading) * la;
        const ac = cityInfoFn(ax, az);
        if (ac) {
          const apx = mod(Math.floor(ac.localX), STREET_PERIOD);
          const apz = mod(Math.floor(ac.localZ), STREET_PERIOD);
          if (apx < STREET_WIDTH && apz < STREET_WIDTH &&
              !trafficMgr.isGreenForHeading(this.heading)) {
            // Brake to a stop before the intersection
            this.speed = Math.max(0, this.speed - 10 * dt);
            return;
          }
        }
      }

      // Stuck detection — if barely moved in 3 s, turn 90°
      this._stuckTimer += dt;
      if (this._stuckTimer > 3.0) {
        const moved = this.pos.distanceTo(this._lastPos);
        if (moved < 1.0) {
          this.heading += (Math.random() < 0.5 ? 1 : -1) * Math.PI / 2;
          this.heading = Math.round(this.heading / (Math.PI / 2)) * (Math.PI / 2);
        }
        this._stuckTimer = 0;
        this._lastPos.copy(this.pos);
      }
    } else if (!this._inIntersection) {
      // First frame entering intersection → decide direction
      this._inIntersection = true;
      const r = Math.random();
      if (r < 0.30)      this.heading -= Math.PI / 2; // left
      else if (r < 0.55) this.heading += Math.PI / 2; // right
      // else straight
      this.heading = Math.round(this.heading / (Math.PI / 2)) * (Math.PI / 2);
    }

    // Accelerate toward target
    this.speed = Math.min(AI_TARGET_SPEED, this.speed + 6 * dt);
  }

  _applyMovement(dt) {
    this.pos.x += Math.sin(this.heading) * this.speed * dt;
    this.pos.z += Math.cos(this.heading) * this.speed * dt;
    this._group.position.copy(this.pos);
    this._group.rotation.y = this.heading;

    this._wheelRot += this.speed * dt * 2.5;
    for (let i = 0; i < this._wheels.length; i++) {
      this._wheels[i].rotation.x = -this._wheelRot;
      if (i < 2) this._wheels[i].rotation.y = (this.occupied ? this.steer : 0) * 0.45;
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

  // Place a player-crafted vehicle on the road
  deployAt(scene, wx, wy, wz, heading) {
    const seed = Math.floor(wx * 7411 + wz * 5003 + Date.now());
    const k    = `car:${wx.toFixed(1)},${wz.toFixed(1)}`;
    if (!this._cars.has(k)) {
      const car = new Car(scene, { wx, wy, wz, seed, heading });
      this._cars.set(k, car);
    }
  }

  update(dt, keys, activeCar, trafficMgr, cityInfoFn) {
    for (const car of this._cars.values()) {
      car.update(dt, car === activeCar ? keys : null, trafficMgr, cityInfoFn);
    }
  }
}
