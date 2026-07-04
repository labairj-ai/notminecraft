import * as THREE from 'three';
import { STREET_PERIOD, STREET_WIDTH, SIDEWALK_WIDTH } from './city.js';

function mod(x, n) { return ((x % n) + n) % n; }

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

export const VEHICLE_TYPES = [
  'car','car','car','car',
  'truck','truck',
  'monster_truck',
  'limo',
  'motorcycle','motorcycle',
  'bus',
  'dog_car',
];

const PHYSICS = {
  car:           { accel:14, maxSpd:18, drag:3.0, steerMax:0.55, steerRate:1.6, aiSpd:7  },
  truck:         { accel: 9, maxSpd:14, drag:2.5, steerMax:0.45, steerRate:1.2, aiSpd:5  },
  monster_truck: { accel:11, maxSpd:16, drag:2.0, steerMax:0.40, steerRate:1.0, aiSpd:5  },
  limo:          { accel:12, maxSpd:22, drag:2.0, steerMax:0.30, steerRate:0.9, aiSpd:9  },
  motorcycle:    { accel:18, maxSpd:28, drag:3.5, steerMax:0.70, steerRate:2.2, aiSpd:11 },
  bus:           { accel: 6, maxSpd:10, drag:1.5, steerMax:0.28, steerRate:0.7, aiSpd:4  },
  dog_car:       { accel:14, maxSpd:18, drag:3.0, steerMax:0.55, steerRate:1.6, aiSpd:7  },
};

// Helper: add a wheel group to parent g, return the group
function addWheel(g, x, y, z, width, radius, wheelMat, rimMat) {
  const wg = new THREE.Group();
  wg.add(new THREE.Mesh(new THREE.BoxGeometry(width, radius * 2, radius * 2), wheelMat));
  const rim = new THREE.Mesh(new THREE.BoxGeometry(width + 0.04, radius * 1.2, radius * 1.2), rimMat);
  wg.add(rim);
  wg.position.set(x, y, z);
  g.add(wg);
  return wg;
}

function buildCarMesh(vehicleType, pal, r) {
  const bodyM  = mat(pal.body);
  const trimM  = mat(pal.trim);
  const glassM = mat('#bfdbfe', { transparent: true, opacity: 0.75 });
  const wheelM = mat('#18181b');
  const rimM   = mat('#a1a1aa');
  const headM  = mat('#fef9c3', { emissive: '#fef9c3', emissiveIntensity: 0.6 });
  const tailM  = mat('#991b1b', { emissive: '#991b1b', emissiveIntensity: 0.4 });

  const g = new THREE.Group();
  const wheels = [];

  if (vehicleType === 'car') {
    // Main chassis
    const chassis = box(1.8, 0.5, 3.8, bodyM);
    chassis.position.set(0, 0.35, 0);
    g.add(chassis);
    // Cabin/roof
    const cabin = box(1.45, 0.44, 2.0, bodyM);
    cabin.position.set(0, 0.82, -0.05);
    g.add(cabin);
    // Windshields
    const fw = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.36, 0.07), glassM);
    fw.position.set(0, 0.83, 0.97); fw.rotation.x = 0.38;
    g.add(fw);
    const rw = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.36, 0.07), glassM);
    rw.position.set(0, 0.83, -1.07); rw.rotation.x = -0.38;
    g.add(rw);
    // Side windows
    for (const sx of [-0.73, 0.73]) {
      const sw = box(0.07, 0.3, 1.65, glassM); sw.position.set(sx, 0.82, -0.05); g.add(sw);
    }
    // Wheels
    for (const [wx2, wy2, wz2] of [[-0.95, 0, 1.25], [0.95, 0, 1.25], [-0.95, 0, -1.25], [0.95, 0, -1.25]]) {
      wheels.push(addWheel(g, wx2, wy2, wz2, 0.24, 0.26, wheelM, rimM));
    }
    // Headlights
    for (const sx of [-0.55, 0.55]) { const hl = box(0.38, 0.17, 0.06, headM); hl.position.set(sx, 0.36, 1.92); g.add(hl); }
    // Tail lights
    for (const sx of [-0.55, 0.55]) { const tl = box(0.34, 0.15, 0.06, tailM); tl.position.set(sx, 0.36, -1.92); g.add(tl); }
    // Bumpers
    const fb = box(1.85, 0.22, 0.12, trimM); fb.position.set(0, 0.17, 1.96); g.add(fb);
    const rb = box(1.85, 0.22, 0.12, trimM); rb.position.set(0, 0.17, -1.96); g.add(rb);
    // Door handles
    for (const [sx, zoff] of [[-0.91, 0.4], [0.91, 0.4], [-0.91, -0.5], [0.91, -0.5]]) {
      const dh = box(0.04, 0.06, 0.22, rimM); dh.position.set(sx, 0.55, zoff); g.add(dh);
    }

  } else if (vehicleType === 'truck') {
    // Chassis
    const chassis = box(2.0, 0.55, 4.2, bodyM); chassis.position.set(0, 0.35, 0); g.add(chassis);
    // Wide cab (front half)
    const cab = box(1.9, 0.6, 2.0, bodyM); cab.position.set(0, 0.93, 0.9); g.add(cab);
    // Cab windshield
    const fw2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.38, 0.07), glassM);
    fw2.position.set(0, 0.95, 1.92); fw2.rotation.x = 0.35; g.add(fw2);
    // Cab side windows
    for (const sx of [-0.95, 0.95]) { const sg = box(0.07, 0.32, 1.6, glassM); sg.position.set(sx, 0.95, 0.9); g.add(sg); }
    // Cargo bed (open wooden box)
    const bedFloor = box(1.9, 0.12, 1.9, mat('#92400e')); bedFloor.position.set(0, 0.62, -1.0); g.add(bedFloor);
    for (const [bx2, bw, bh, bz2] of [
      [0, 1.9, 0.45, -2.0],   // rear wall
      [-0.9, 0.12, 0.45, -1.0], // left wall
      [0.9, 0.12, 0.45, -1.0],  // right wall
    ]) {
      const side = box(bw, bh, 0.12, mat('#92400e')); side.position.set(bx2, 0.85, bz2); g.add(side);
    }
    const lwall = box(0.12, 0.45, 1.9, mat('#92400e')); lwall.position.set(-0.9, 0.85, -1.0); g.add(lwall);
    const rwall = box(0.12, 0.45, 1.9, mat('#92400e')); rwall.position.set( 0.9, 0.85, -1.0); g.add(rwall);
    // Headlights / tail lights
    for (const sx of [-0.65, 0.65]) { const hl = box(0.38, 0.18, 0.06, headM); hl.position.set(sx, 0.38, 2.12); g.add(hl); }
    for (const sx of [-0.65, 0.65]) { const tl = box(0.35, 0.16, 0.06, tailM); tl.position.set(sx, 0.38, -2.12); g.add(tl); }
    // Bumpers
    const fbt = box(2.05, 0.22, 0.13, trimM); fbt.position.set(0, 0.17, 2.16); g.add(fbt);
    const rbt = box(2.05, 0.22, 0.13, trimM); rbt.position.set(0, 0.17, -2.16); g.add(rbt);
    // 4 wheels (higher riding: y=0.1)
    for (const [wx2, wz2] of [[-1.05, 1.4], [1.05, 1.4], [-1.05, -1.3], [1.05, -1.3]]) {
      wheels.push(addWheel(g, wx2, 0.1, wz2, 0.28, 0.32, wheelM, rimM));
    }

  } else if (vehicleType === 'monster_truck') {
    // Massive body, sits very high
    const chassis = box(2.2, 0.6, 4.0, bodyM); chassis.position.set(0, 0.85, 0); g.add(chassis);
    const cab = box(2.0, 0.65, 2.1, bodyM); cab.position.set(0, 1.55, -0.1); g.add(cab);
    const fw3 = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.4, 0.08), glassM);
    fw3.position.set(0, 1.57, 1.07); fw3.rotation.x = 0.33; g.add(fw3);
    for (const sx of [-1.0, 1.0]) { const sg = box(0.08, 0.38, 1.8, glassM); sg.position.set(sx, 1.55, -0.1); g.add(sg); }
    // Massive wheels (radius ~0.78)
    for (const [wx2, wz2] of [[-1.3, 1.5], [1.3, 1.5], [-1.3, -1.5], [1.3, -1.5]]) {
      wheels.push(addWheel(g, wx2, 0.0, wz2, 0.36, 0.78, wheelM, rimM));
    }
    for (const sx of [-0.7, 0.7]) { const hl = box(0.4, 0.2, 0.07, headM); hl.position.set(sx, 0.9, 2.06); g.add(hl); }
    for (const sx of [-0.7, 0.7]) { const tl = box(0.4, 0.18, 0.07, tailM); tl.position.set(sx, 0.9, -2.06); g.add(tl); }
    const fbt2 = box(2.3, 0.28, 0.18, trimM); fbt2.position.set(0, 0.5, 2.09); g.add(fbt2);

  } else if (vehicleType === 'limo') {
    const navyM = mat('#1e3a5f');
    const goldM = mat('#d4af37');
    // Long chassis: 6+ blocks
    const chassis = box(1.85, 0.5, 6.5, navyM); chassis.position.set(0, 0.35, 0); g.add(chassis);
    const cabin = box(1.6, 0.45, 4.8, navyM); cabin.position.set(0, 0.82, -0.3); g.add(cabin);
    // Windshields
    const fw4 = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.36, 0.07), glassM);
    fw4.position.set(0, 0.83, 3.18); fw4.rotation.x = 0.32; g.add(fw4);
    const rw4 = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.36, 0.07), glassM);
    rw4.position.set(0, 0.83, -3.38); rw4.rotation.x = -0.32; g.add(rw4);
    // 5 side windows per side
    for (const sx of [-0.93, 0.93]) {
      for (let wi = 0; wi < 5; wi++) {
        const sw2 = box(0.07, 0.28, 0.56, glassM);
        sw2.position.set(sx, 0.83, 2.5 - wi * 0.85);
        g.add(sw2);
      }
    }
    // Gold trim strips
    const gt1 = box(1.86, 0.06, 6.52, goldM); gt1.position.set(0, 0.61, 0); g.add(gt1);
    const gt2 = box(1.86, 0.06, 6.52, goldM); gt2.position.set(0, 1.04, 0); g.add(gt2);
    // Headlights / tail lights
    for (const sx of [-0.6, 0.6]) { const hl = box(0.4, 0.17, 0.06, headM); hl.position.set(sx, 0.36, 3.27); g.add(hl); }
    for (const sx of [-0.6, 0.6]) { const tl = box(0.38, 0.15, 0.06, tailM); tl.position.set(sx, 0.36, -3.27); g.add(tl); }
    // Bumpers
    const fbl = box(1.9, 0.22, 0.12, goldM); fbl.position.set(0, 0.17, 3.32); g.add(fbl);
    const rbl = box(1.9, 0.22, 0.12, goldM); rbl.position.set(0, 0.17, -3.32); g.add(rbl);
    // 6 wheels
    for (const [wx2, wz2] of [[-0.98, 2.4], [0.98, 2.4], [-0.98, 0.0], [0.98, 0.0], [-0.98, -2.4], [0.98, -2.4]]) {
      wheels.push(addWheel(g, wx2, 0, wz2, 0.24, 0.28, wheelM, rimM));
    }

  } else if (vehicleType === 'motorcycle') {
    // Slim body
    const body = box(0.4, 0.3, 1.6, bodyM); body.position.set(0, 0.62, 0); g.add(body);
    // Fuel tank hump
    const tank = box(0.38, 0.2, 0.55, bodyM); tank.position.set(0, 0.82, 0.1); g.add(tank);
    // Seat
    const seat = box(0.35, 0.1, 0.6, mat('#111')); seat.position.set(0, 0.87, -0.3); g.add(seat);
    // Handlebars
    const stem = box(0.06, 0.35, 0.06, trimM); stem.position.set(0, 0.82, 0.72); g.add(stem);
    const bar  = box(0.72, 0.06, 0.06, trimM); bar.position.set(0, 1.0, 0.72); g.add(bar);
    // Exhaust pipe
    const pipe = box(0.07, 0.07, 0.9, mat('#71717a')); pipe.position.set(0.22, 0.42, -0.2); pipe.rotation.z = 0.15; g.add(pipe);
    // Headlight
    const hl2 = box(0.22, 0.18, 0.06, headM); hl2.position.set(0, 0.7, 0.85); g.add(hl2);
    // 2 wheels: front and rear
    wheels.push(addWheel(g, 0, 0, 0.75, 0.14, 0.34, wheelM, rimM));
    wheels.push(addWheel(g, 0, 0, -0.75, 0.14, 0.34, wheelM, rimM));

  } else if (vehicleType === 'bus') {
    const yellowM = mat('#fbbf24');
    const blackM  = mat('#18181b');
    // Long flat box body
    const body = box(2.2, 1.5, 5.8, yellowM); body.position.set(0, 1.0, 0); g.add(body);
    // Big flat front face
    const front = box(2.2, 1.5, 0.15, blackM); front.position.set(0, 1.0, 2.97); g.add(front);
    // Windshield (big)
    const bfw = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.9, 0.09), glassM);
    bfw.position.set(0, 1.15, 2.95); g.add(bfw);
    // Many windows on both sides (6 per side)
    for (const sx of [-1.11, 1.11]) {
      for (let wi = 0; wi < 6; wi++) {
        const bw2 = box(0.09, 0.55, 0.68, glassM);
        bw2.position.set(sx, 1.25, 2.1 - wi * 0.82);
        g.add(bw2);
      }
    }
    // Stop sign / destination sign at front top
    const sign = box(1.6, 0.28, 0.08, mat('#1e3a5f')); sign.position.set(0, 2.05, 2.98); g.add(sign);
    // Tail lights
    for (const sx of [-0.7, 0.7]) { const tl = box(0.5, 0.2, 0.07, tailM); tl.position.set(sx, 0.5, -2.97); g.add(tl); }
    // Headlights
    for (const sx of [-0.7, 0.7]) { const hl3 = box(0.4, 0.22, 0.07, headM); hl3.position.set(sx, 0.5, 2.97); g.add(hl3); }
    // 6 wheels
    for (const [wx2, wz2] of [[-1.15, 2.2], [1.15, 2.2], [-1.15, 0.0], [1.15, 0.0], [-1.15, -2.2], [1.15, -2.2]]) {
      wheels.push(addWheel(g, wx2, 0, wz2, 0.3, 0.36, wheelM, rimM));
    }

  } else if (vehicleType === 'dog_car') {
    const brownM = mat('#92400e');
    const noseM  = mat('#111827');
    const eyeM   = mat('#111827');
    // Body (brown)
    const body2 = box(1.8, 0.55, 3.6, brownM); body2.position.set(0, 0.38, 0); g.add(body2);
    // Cabin/head
    const head = box(1.7, 0.5, 2.0, brownM); head.position.set(0, 0.88, 0.0); g.add(head);
    // Rounded snout on front
    const snout = box(0.9, 0.35, 0.55, mat('#b45309')); snout.position.set(0, 0.7, 1.1); g.add(snout);
    // Black nose
    const nose = box(0.3, 0.2, 0.1, noseM); nose.position.set(0, 0.82, 1.36); g.add(nose);
    // Dot eyes
    for (const sx of [-0.38, 0.38]) { const eye = box(0.12, 0.12, 0.08, eyeM); eye.position.set(sx, 1.0, 1.1); g.add(eye); }
    // Boxy ears on roof
    for (const sx of [-0.55, 0.55]) { const ear = box(0.38, 0.38, 0.42, brownM); ear.position.set(sx, 1.45, 0.3); g.add(ear); }
    // Small tail at rear
    const tail = box(0.18, 0.35, 0.35, brownM); tail.position.set(0.0, 0.9, -1.82); tail.rotation.x = -0.5; g.add(tail);
    // Headlights
    for (const sx of [-0.55, 0.55]) { const hl4 = box(0.32, 0.17, 0.06, headM); hl4.position.set(sx, 0.38, 1.82); g.add(hl4); }
    // Tail lights
    for (const sx of [-0.55, 0.55]) { const tl2 = box(0.3, 0.15, 0.06, tailM); tl2.position.set(sx, 0.38, -1.82); g.add(tl2); }
    const fbd = box(1.85, 0.22, 0.12, mat('#b45309')); fbd.position.set(0, 0.17, 1.86); g.add(fbd);
    const rbd = box(1.85, 0.22, 0.12, mat('#b45309')); rbd.position.set(0, 0.17, -1.86); g.add(rbd);
    // 4 wheels
    for (const [wx2, wz2] of [[-0.95, 1.2], [0.95, 1.2], [-0.95, -1.2], [0.95, -1.2]]) {
      wheels.push(addWheel(g, wx2, 0, wz2, 0.24, 0.26, wheelM, rimM));
    }
  }

  return { g, wheels };
}

export class Car {
  constructor(scene, { wx, wy, wz, seed, heading = 0, vehicleType }) {
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

    // If no vehicleType provided, pick one based on seed
    this.vehicleType = vehicleType || VEHICLE_TYPES[Math.floor(r() * VEHICLE_TYPES.length)];
    this._physics = PHYSICS[this.vehicleType] || PHYSICS.car;

    const { g, wheels } = buildCarMesh(this.vehicleType, pal, r);
    this._wheels = wheels;

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
    const { accel, maxSpd, drag, steerMax, steerRate } = this._physics;
    if (keys['KeyW'] || keys['ArrowUp']) {
      this.speed = Math.min(this.speed + accel * dt, maxSpd);
    } else if (keys['KeyS'] || keys['ArrowDown']) {
      this.speed = Math.max(this.speed - accel * dt, -maxSpd * 0.4);
    } else {
      this.speed *= Math.exp(-drag * dt);
      if (Math.abs(this.speed) < 0.05) this.speed = 0;
    }
    if (Math.abs(this.speed) > 0.2) {
      if (keys['KeyA'] || keys['ArrowLeft'])  this.steer -= steerRate * dt;
      if (keys['KeyD'] || keys['ArrowRight']) this.steer += steerRate * dt;
    }
    this.steer *= Math.exp(-4 * dt);
    this.steer = Math.max(-steerMax, Math.min(steerMax, this.steer));
    this.heading += this.steer * this.speed * 0.12 * dt;
  }

  _aiUpdate(dt, trafficMgr, cityInfoFn) {
    const { aiSpd } = this._physics;
    const city = cityInfoFn ? cityInfoFn(this.pos.x, this.pos.z) : null;
    if (!city) {
      this.speed = Math.max(0, this.speed - 6 * dt);
      return;
    }
    const px = mod(Math.floor(city.localX), STREET_PERIOD);
    const pz = mod(Math.floor(city.localZ), STREET_PERIOD);
    const atIntersection = px < STREET_WIDTH && pz < STREET_WIDTH;

    if (!atIntersection) {
      this._inIntersection = false;

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
            this.speed = Math.max(0, this.speed - 10 * dt);
            return;
          }
        }
      }

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
      this._inIntersection = true;
      const rr = Math.random();
      if (rr < 0.30)      this.heading -= Math.PI / 2;
      else if (rr < 0.55) this.heading += Math.PI / 2;
      this.heading = Math.round(this.heading / (Math.PI / 2)) * (Math.PI / 2);
    }

    this.speed = Math.min(aiSpd, this.speed + 6 * dt);
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
  deployAt(scene, wx, wy, wz, heading, vehicleType) {
    const seed = Math.floor(wx * 7411 + wz * 5003 + Date.now());
    const k    = `car:${wx.toFixed(1)},${wz.toFixed(1)}`;
    if (!this._cars.has(k)) {
      const car = new Car(scene, { wx, wy, wz, seed, heading, vehicleType });
      this._cars.set(k, car);
    }
  }

  update(dt, keys, activeCar, trafficMgr, cityInfoFn) {
    for (const car of this._cars.values()) {
      car.update(dt, car === activeCar ? keys : null, trafficMgr, cityInfoFn);
    }
  }
}

// ── BusStopManager ────────────────────────────────────────────────────────────

export class BusStopManager {
  constructor(scene) {
    this._scene = scene;
    this._stops = new Map(); // chunkKey → [{ group, data }]
  }

  spawnForChunk(chunkKey, spawns) {
    if (this._stops.has(chunkKey)) return;
    const postM   = new THREE.MeshLambertMaterial({ color: '#6b7280' });
    const canopyM = new THREE.MeshLambertMaterial({ color: '#1e3a5f' });
    const signM   = new THREE.MeshLambertMaterial({ color: '#fbbf24' });

    const entries = [];
    for (const data of spawns) {
      const group = new THREE.Group();

      // Two thin posts
      for (const ox of [-0.7, 0.7]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.0, 0.1), postM);
        post.position.set(ox, 1.0, 0);
        group.add(post);
      }
      // Canopy roof
      const canopy = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.15, 0.8), canopyM);
      canopy.position.set(0, 2.07, 0);
      group.add(canopy);
      // BUS sign plate on front post
      const signPlate = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.08), signM);
      signPlate.position.set(-0.7, 1.4, 0.09);
      group.add(signPlate);

      group.position.set(data.wx, 24, data.wz); // CITY_BASE_Y = 24
      this._scene.add(group);
      entries.push({ group, data });
    }
    this._stops.set(chunkKey, entries);
  }

  despawnChunk(chunkKey) {
    const entries = this._stops.get(chunkKey);
    if (!entries) return;
    for (const { group } of entries) {
      this._scene.remove(group);
      group.traverse(o => {
        if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); }
      });
    }
    this._stops.delete(chunkKey);
  }

  getNearest(playerPos, maxDist) {
    let best = null, bd = maxDist * maxDist;
    for (const entries of this._stops.values()) {
      for (const { data } of entries) {
        const dx = playerPos.x - data.wx;
        const dz = playerPos.z - data.wz;
        const d2 = dx * dx + dz * dz;
        if (d2 < bd) { bd = d2; best = data; }
      }
    }
    return best;
  }
}
