import * as THREE from 'three';
import * as B from './blocks.js';

// Hostile mob types mirroring Minecraft's core hostile set
// Arrival: spawn at night (timeOfDay outside 0.2-0.8), 20-60 blocks from player
// Departure: >80 blocks away, killed, or daytime (burnable types burn & die)

const HOSTILE_CFG = {
  zombie:   { speed:1.4, hp:20, damage:1.5, range:1.8, aggroR:16, burnInDay:true,  color:0x4a7c59, eyeColor:0xff3333 },
  skeleton: { speed:1.6, hp:16, damage:2,   range:10,  aggroR:16, burnInDay:true,  color:0xddddcc, eyeColor:0x333399 },
  spider:   { speed:3.0, hp:16, damage:1,   range:1.5, aggroR:12, burnInDay:false, color:0x222222, eyeColor:0xff0000 },
  creeper:  { speed:2.2, hp:20, damage:5,   range:2.5, aggroR:12, burnInDay:false, color:0x44aa44, eyeColor:0x000000 },
};

// Simple humanoid mesh builders
function makeZombie(color, eyeColor) {
  const g = new THREE.Group();
  const mat = c => new THREE.MeshLambertMaterial({ color: c });

  // Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.75, 0.3), mat(color));
  body.position.y = 0.9;
  g.add(body);

  // Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), mat(color));
  head.position.y = 1.55;
  g.add(head);

  // Eyes
  const eyeM = mat(eyeColor);
  for (const x of [-0.1, 0.1]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.05), eyeM);
    eye.position.set(x, 1.6, 0.26);
    g.add(eye);
  }

  // Arms (outstretched for zombie)
  for (const side of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.22), mat(color));
    arm.position.set(side * 0.42, 1.0, 0.12);
    arm.rotation.x = -Math.PI / 3 * side; // outstretched
    g.add(arm);
  }

  // Legs
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.7, 0.24), mat(color));
    leg.position.set(side * 0.16, 0.35, 0);
    g.add(leg);
  }

  return g;
}

function makeSkeleton() {
  const g = new THREE.Group();
  const boneColor = 0xddddcc;
  const mat = () => new THREE.MeshLambertMaterial({ color: boneColor });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.2), mat());
  body.position.y = 0.9;
  g.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), mat());
  head.position.y = 1.5;
  g.add(head);

  const eyeM = new THREE.MeshLambertMaterial({ color: 0x111133, emissive: 0x333399 });
  for (const x of [-0.09, 0.09]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.05), eyeM);
    eye.position.set(x, 1.54, 0.24);
    g.add(eye);
  }

  for (const side of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.6, 0.14), mat());
    arm.position.set(side * 0.32, 0.95, 0);
    g.add(arm);
  }

  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.65, 0.14), mat());
    leg.position.set(side * 0.1, 0.33, 0);
    g.add(leg);
  }

  return g;
}

function makeSpider() {
  const g = new THREE.Group();
  const mat = c => new THREE.MeshLambertMaterial({ color: c });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.6), mat(0x222222));
  body.position.y = 0.5;
  g.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.5), mat(0x222222));
  head.position.set(0, 0.52, -0.4);
  g.add(head);

  // 8 eyes (4 pairs)
  const eyeM = mat(0xff0000);
  for (const x of [-0.15, -0.05, 0.05, 0.15]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.04), eyeM);
    eye.position.set(x, 0.6, -0.64);
    g.add(eye);
  }

  // 8 legs
  for (let i = 0; i < 4; i++) {
    for (const side of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), mat(0x1a1a1a));
      const angle = (i / 3) * Math.PI * 0.5 - Math.PI * 0.25;
      leg.position.set(side * 0.55, 0.45, (i - 1.5) * 0.2);
      leg.rotation.z = side * (0.6 + angle * 0.3);
      g.add(leg);
    }
  }

  return g;
}

function makeCreeper() {
  const g = new THREE.Group();
  const mat = c => new THREE.MeshLambertMaterial({ color: c });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.5), mat(0x44aa44));
  body.position.y = 0.9;
  g.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), mat(0x44aa44));
  head.position.y = 1.6;
  g.add(head);

  // Creeper face: dark angry eyes
  const faceM = mat(0x1a4d1a);
  for (const x of [-0.12, 0.12]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.13, 0.04), faceM);
    eye.position.set(x, 1.65, 0.28);
    g.add(eye);
  }
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.04), faceM);
  mouth.position.set(0, 1.5, 0.28);
  g.add(mouth);

  // 4 short legs
  for (const [sx, sz] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.2), mat(0x44aa44));
    leg.position.set(sx * 0.15, 0.25, sz * 0.15);
    g.add(leg);
  }

  return g;
}

const BUILDERS = { zombie: makeZombie, skeleton: makeSkeleton, spider: makeSpider, creeper: makeCreeper };

// ── Hostile ────────────────────────────────────────────────────────────────────
const STATE_IDLE  = 0;
const STATE_CHASE = 1;
const STATE_ATTACK = 2;

class Hostile {
  constructor(scene, type, pos) {
    this.type     = type;
    this.pos      = pos.clone();
    this._scene   = scene;
    const cfg     = HOSTILE_CFG[type];
    this.hp       = cfg.hp;
    this._state   = STATE_IDLE;
    this._dying   = false;
    this._deathTimer = 0;
    this._hitFlash   = 0;
    this._attackCd   = 0;  // cooldown between attacks
    this._wanderTarget = pos.clone();
    this._wanderTimer  = Math.random() * 3;
    this._walkPh       = 0;
    this._burnTimer    = 0; // for daytime burning

    const color    = cfg.color;
    const eyeColor = cfg.eyeColor;
    const builder  = BUILDERS[type];
    this._group = (type === 'zombie') ? builder(color, eyeColor) : builder();
    this._group.position.copy(this.pos);
    this._group.castShadow = true;
    scene.add(this._group);
  }

  takeDamage(amount) {
    if (this._dying) return;
    this.hp -= amount;
    this._hitFlash = 0.2;
    if (this.hp <= 0) this._dying = true;
  }

  // Returns true when fully dead (should be removed)
  update(dt, playerPos, timeOfDay, world) {
    const cfg = HOSTILE_CFG[this.type];

    // ── Death animation ──────────────────────────────────────────────────────
    if (this._dying) {
      this._deathTimer += dt;
      const t = Math.min(this._deathTimer / 0.4, 1);
      this._group.rotation.z = t * Math.PI / 2;
      if (this._deathTimer > 0.4) {
        const fade = Math.max(0, 1 - (this._deathTimer - 0.4) / 0.3);
        this._group.traverse(o => {
          if (o.isMesh) {
            if (!o._matCloned) { o.material = o.material.clone(); o._matCloned = true; }
            o.material.transparent = true; o.material.opacity = fade;
          }
        });
        if (this._deathTimer > 0.7) return true;
      }
      return false;
    }

    // ── Daytime burning (zombie / skeleton) ──────────────────────────────────
    if (cfg.burnInDay && timeOfDay > 0.22 && timeOfDay < 0.78) {
      this._burnTimer += dt;
      // Flash red
      const flash = Math.sin(this._burnTimer * 20) > 0;
      this._group.traverse(o => {
        if (o.isMesh && o.material.emissive) o.material.emissive.setHex(flash ? 0xff2200 : 0x000000);
      });
      if (this._burnTimer > 2.5) { this._dying = true; return false; }
    } else {
      this._burnTimer = 0;
    }

    // ── Hit flash ────────────────────────────────────────────────────────────
    if (this._hitFlash > 0) {
      this._hitFlash -= dt;
      const h = this._hitFlash > 0 ? 0xff4444 : 0x000000;
      this._group.traverse(o => { if (o.isMesh && o.material.emissive) o.material.emissive.setHex(h); });
    }

    // ── Cooldowns ────────────────────────────────────────────────────────────
    if (this._attackCd > 0) this._attackCd -= dt;

    const dx = playerPos.x - this.pos.x;
    const dz = playerPos.z - this.pos.z;
    const dist2 = dx*dx + dz*dz;
    const dist  = Math.sqrt(dist2);

    // ── Creeper: explode when very close ─────────────────────────────────────
    if (this.type === 'creeper' && dist < cfg.range) {
      if (!this._explodeTimer) this._explodeTimer = 0;
      this._explodeTimer += dt;
      // Flash white as fuse
      const flash = Math.sin(this._explodeTimer * (8 + this._explodeTimer * 4)) > 0;
      this._group.traverse(o => {
        if (o.isMesh && o.material.emissive) o.material.emissive.setHex(flash ? 0xffffff : 0x000000);
      });
      if (this._explodeTimer > 1.5) {
        this._dying = true;
        return { explode: true, pos: this.pos.clone(), damage: cfg.damage };
      }
    } else {
      this._explodeTimer = 0;
    }

    // ── AI state machine ─────────────────────────────────────────────────────
    if (dist < cfg.aggroR) {
      this._state = STATE_CHASE;
    } else if (dist > cfg.aggroR * 1.5) {
      this._state = STATE_IDLE;
    }

    // Skeleton ranged attack
    let attackResult = null;
    if (this.type === 'skeleton' && this._state === STATE_CHASE && dist < cfg.range) {
      if (this._attackCd <= 0) {
        this._attackCd = 2.0;
        attackResult = { type: 'projectile', damage: cfg.damage };
      }
    }

    // Melee attack
    if (this.type !== 'skeleton' && dist < cfg.range) {
      this._state = STATE_ATTACK;
      if (this._attackCd <= 0) {
        this._attackCd = 1.2;
        attackResult = { type: 'melee', damage: cfg.damage };
      }
    }

    // ── Movement ─────────────────────────────────────────────────────────────
    this._walkPh += dt * 6;
    let moved = false;

    if (this._state === STATE_CHASE || this._state === STATE_ATTACK) {
      if (dist > 1.0) {
        const speed = cfg.speed * dt;
        const nx = this.pos.x + (dx / dist) * speed;
        const nz = this.pos.z + (dz / dist) * speed;
        if (!this._blocked(nx, this.pos.z, world)) this.pos.x = nx;
        if (!this._blocked(this.pos.x, nz, world)) this.pos.z = nz;
        moved = true;
        // Face player
        this._group.rotation.y = Math.atan2(dx, dz);
      }
    } else {
      // Wander
      this._wanderTimer -= dt;
      if (this._wanderTimer <= 0) {
        const angle = Math.random() * Math.PI * 2;
        this._wanderTarget.set(this.pos.x + Math.cos(angle) * 8, this.pos.y, this.pos.z + Math.sin(angle) * 8);
        this._wanderTimer = 3 + Math.random() * 4;
      }
      const wtx = this._wanderTarget.x - this.pos.x;
      const wtz = this._wanderTarget.z - this.pos.z;
      const wd  = Math.sqrt(wtx*wtx + wtz*wtz);
      if (wd > 1.0) {
        const speed = cfg.speed * 0.4 * dt;
        const nx = this.pos.x + (wtx/wd) * speed;
        const nz = this.pos.z + (wtz/wd) * speed;
        if (!this._blocked(nx, this.pos.z, world)) this.pos.x = nx;
        if (!this._blocked(this.pos.x, nz, world)) this.pos.z = nz;
        moved = true;
        this._group.rotation.y = Math.atan2(wtx, wtz);
      }
    }

    // Snap to ground
    const gy = this._groundY(world);
    if (gy !== null) this.pos.y = gy;

    this._group.position.copy(this.pos);

    // Walking animation (leg swing for humanoids)
    if (moved && this.type !== 'spider') {
      const swing = Math.sin(this._walkPh) * 0.4;
      this._group.children.forEach((c, i) => {
        if (i >= 4) { // legs start at index 4 in humanoids
          c.rotation.x = (i % 2 === 0) ? swing : -swing;
        }
      });
    }

    return attackResult; // null or { type, damage } or { explode, pos, damage }
  }

  _blocked(nx, nz, world) {
    if (!world) return false;
    const by = Math.floor(this.pos.y) + 1;
    const cx = Math.floor(nx);
    const cz = Math.floor(nz);
    return world.isSolid(cx, by, cz) || world.isSolid(cx, by + 1, cz);
  }

  _groundY(world) {
    if (!world) return null;
    const gx = Math.floor(this.pos.x);
    const gz = Math.floor(this.pos.z);
    const startY = Math.floor(this.pos.y) + 2;
    for (let dy = 0; dy <= 4; dy++) {
      if (world.isSolid(gx, startY - dy, gz)) return startY - dy + 1;
    }
    return null;
  }

  dispose() {
    this._group.parent?.remove(this._group);
    this._group.traverse(o => {
      if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); }
    });
  }
}

// ── HostileManager ─────────────────────────────────────────────────────────────
// Spawn model: dynamic pool, not chunk-based.
// At night: try to spawn near player if pool is small.
// Despawn: too far, or killed, or daytime burn.

const MAX_HOSTILES = 20;
const SPAWN_INTERVAL = 4; // seconds between spawn attempts at night
const SPAWN_MIN_DIST = 20;
const SPAWN_MAX_DIST = 60;
const DESPAWN_DIST   = 90;

export class HostileManager {
  constructor(scene, world) {
    this._scene    = scene;
    this._world    = world;
    this._hostiles = new Map();
    this._spawnTimer = 0;
    this._nextId     = 0;
  }

  update(dt, playerPos, timeOfDay, onDamage, onExplosion) {
    // ── Spawn ────────────────────────────────────────────────────────────────
    const isNight = timeOfDay < 0.22 || timeOfDay > 0.78;
    if (isNight && this._hostiles.size < MAX_HOSTILES) {
      this._spawnTimer -= dt;
      if (this._spawnTimer <= 0) {
        this._spawnTimer = SPAWN_INTERVAL;
        this._trySpawn(playerPos);
      }
    }

    // ── Update ───────────────────────────────────────────────────────────────
    for (const [k, h] of this._hostiles) {
      const result = h.update(dt, playerPos, timeOfDay, this._world);

      if (result === true) {
        // Fully dead
        this._hostiles.delete(k);
        continue;
      }

      if (result && result.explode) {
        if (onExplosion) onExplosion(result.pos, result.damage);
        this._hostiles.delete(k);
        continue;
      }

      if (result && result.type === 'melee') {
        if (onDamage) onDamage(result.damage);
      }

      if (result && result.type === 'projectile') {
        // Skeleton: simple line-of-sight check, if player in range deal damage
        const dx = playerPos.x - h.pos.x;
        const dz = playerPos.z - h.pos.z;
        if (Math.sqrt(dx*dx + dz*dz) < HOSTILE_CFG.skeleton.range) {
          if (onDamage) onDamage(result.damage);
        }
      }

      // ── Despawn ──────────────────────────────────────────────────────────
      const dx = h.pos.x - playerPos.x;
      const dz = h.pos.z - playerPos.z;
      if (dx*dx + dz*dz > DESPAWN_DIST * DESPAWN_DIST) {
        h.dispose();
        this._hostiles.delete(k);
      }
    }
  }

  _trySpawn(playerPos) {
    const angle = Math.random() * Math.PI * 2;
    const dist  = SPAWN_MIN_DIST + Math.random() * (SPAWN_MAX_DIST - SPAWN_MIN_DIST);
    const x = playerPos.x + Math.cos(angle) * dist;
    const z = playerPos.z + Math.sin(angle) * dist;

    // Find ground Y
    const gx = Math.floor(x), gz = Math.floor(z);
    let groundY = null;
    for (let y = 60; y >= 0; y--) {
      if (this._world.isSolid(gx, y, gz)) { groundY = y + 1; break; }
    }
    if (groundY === null) return;

    // Pick type weighted toward zombie
    const roll = Math.random();
    const type = roll < 0.45 ? 'zombie' : roll < 0.7 ? 'skeleton' : roll < 0.85 ? 'spider' : 'creeper';

    const pos = new THREE.Vector3(x, groundY, z);
    const key = `hostile_${this._nextId++}`;
    this._hostiles.set(key, new Hostile(this._scene, type, pos));
  }

  getNearest(pos, range) {
    let best = null, bestD2 = range * range;
    for (const h of this._hostiles.values()) {
      if (h._dying) continue;
      const dx = h.pos.x - pos.x;
      const dz = h.pos.z - pos.z;
      const d2 = dx*dx + dz*dz;
      if (d2 < bestD2) { bestD2 = d2; best = h; }
    }
    return best;
  }

  get _npcs() { return this._hostiles; } // for any future minimap integration

  dispose() {
    for (const h of this._hostiles.values()) h.dispose();
    this._hostiles.clear();
  }
}
