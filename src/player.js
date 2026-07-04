import * as THREE from 'three';
import * as B from './blocks.js';
import { getToolAction, BLOCK_DROPS } from './blocks.js';

const GRAVITY    = 28;
const JUMP_VEL   = 9;
const WALK_SPEED = 5;
const SPRINT_SPD = 9;
const FLY_SPEED  = 12;
const EYE_HEIGHT = 1.62;
const HALF_W     = 0.3;
const PLAYER_H   = 1.8;
const REACH      = 5;

export class Player {
  constructor(camera, world) {
    this.camera  = camera;
    this.world   = world;

    this.pos     = new THREE.Vector3(0, 30, 0);
    this.vel     = new THREE.Vector3();
    this.yaw     = 0;
    this.pitch   = 0;
    this.onGround = false;
    this.flying  = false;
    this.sprinting = false;

    this.health    = 20;
    this.maxHealth = 20;

    // Slots store { id:Number, count:Number } or null
    this.hotbar    = Array(9).fill(null);
    this.inventory = Array(18).fill(null); // 2 extra rows below hotbar

    this.selectedSlot = 0;

    // Crafting grid (9 slots for 3×3; only first 4 used in 2×2 mode)
    this.craftGrid     = Array(9).fill(null);
    this.craftGridSize = 2; // 2 = pocket, 3 = at a crafting table

    this.target             = null;
    this.breakProgress      = 0;
    this.effectiveBreakTime = 0.6;
    this.breakTarget        = null;
    this.breakable          = false;

    this.keys    = {};
    this.spawned = false;

    // Give starting coins
    this.addItem(B.GOLD_COIN, 50);

    this._dir   = new THREE.Vector3();
    this._euler = new THREE.Euler(0, 0, 0, 'YXZ');

    this._scrollAccum = 0;

    this._bindInput();
  }

  // ── Inventory helpers ──────────────────────────────────────────────────────

  // Add `count` of item `id` to inventory (hotbar first, then main inventory).
  // Stacks up to B.maxStack(id); extras are silently lost if no space.
  addItem(id, count = 1) {
    const max = B.maxStack(id);
    let remaining = count;

    const tryStack = (arr) => {
      for (const slot of arr) {
        if (!slot || slot.id !== id || slot.count >= max) continue;
        const add = Math.min(remaining, max - slot.count);
        slot.count += add;
        remaining  -= add;
        if (remaining === 0) return;
      }
    };
    const tryEmpty = (arr) => {
      for (let i = 0; i < arr.length && remaining > 0; i++) {
        if (arr[i]) continue;
        const add = Math.min(remaining, max);
        arr[i]    = { id, count: add };
        remaining -= add;
      }
    };

    tryStack(this.hotbar);
    tryStack(this.inventory);
    tryEmpty(this.hotbar);
    tryEmpty(this.inventory);
  }

  // Remove `count` of item `id` (hotbar first).  Returns how many were removed.
  removeItem(id, count) {
    let remaining = count;
    const drain = (arr) => {
      for (let i = 0; i < arr.length && remaining > 0; i++) {
        const slot = arr[i];
        if (!slot || slot.id !== id) continue;
        const take  = Math.min(remaining, slot.count);
        slot.count -= take;
        remaining  -= take;
        if (slot.count === 0) arr[i] = null;
      }
    };
    drain(this.hotbar);
    drain(this.inventory);
    return count - remaining;
  }

  // Count how many of item `id` are in the full inventory.
  countItem(id) {
    let n = 0;
    for (const slot of [...this.hotbar, ...this.inventory]) {
      if (slot?.id === id) n += slot.count;
    }
    return n;
  }

  // ── Input ──────────────────────────────────────────────────────────────────

  _bindInput() {
    document.addEventListener('keydown', e => {
      if (!this.active) return;
      this.keys[e.code] = true;

      if (e.code === 'KeyG') {
        this.flying = !this.flying;
        this.vel.set(0, 0, 0);
      }
      if (e.code === 'Space' && !this.flying && this.onGround) {
        this.vel.y = JUMP_VEL;
        this.onGround = false;
      }
      if (e.code === 'Space' && this.flying) this.vel.y = FLY_SPEED;

      for (let i = 1; i <= 9; i++) {
        if (e.code === `Digit${i}`) {
          this.selectedSlot = i - 1;
          this._onSlotChange();
        }
      }
    });

    document.addEventListener('keyup', e => {
      this.keys[e.code] = false;
      if (e.code === 'Space' && this.flying) this.vel.y = 0;
    });

    document.addEventListener('mousemove', e => {
      if (!this.active) return;
      const sens = 0.002;
      this.yaw   -= e.movementX * sens;
      this.pitch -= e.movementY * sens;
      this.pitch  = Math.max(-Math.PI/2 + 0.01, Math.min(Math.PI/2 - 0.01, this.pitch));
    });

    document.addEventListener('wheel', e => {
      if (!this.active) return;
      const px = e.deltaMode === 1 ? e.deltaY * 40
               : e.deltaMode === 2 ? e.deltaY * 400
               : e.deltaY;
      this._scrollAccum += px;
      if (Math.abs(this._scrollAccum) >= 120) {
        const step = Math.sign(this._scrollAccum);
        this.selectedSlot = (this.selectedSlot + step + 9) % 9;
        this._onSlotChange();
        this._scrollAccum = 0;
      }
    });

    document.addEventListener('mousedown', e => {
      if (!this.active) return;
      if (e.button === 0) this._startBreak();
      if (e.button === 2) this._interact();
    });

    document.addEventListener('mouseup', e => {
      if (!this.active) return;
      if (e.button === 0) { this.breakTarget = null; this.breakProgress = 0; }
    });

    document.addEventListener('contextmenu', e => e.preventDefault());
  }

  _onSlotChange() {
    document.dispatchEvent(new CustomEvent('slotChange', { detail: this.selectedSlot }));
  }

  // ── Block interaction (right-click) ───────────────────────────────────────

  _interact() {
    if (!this.target) return;
    const { wx, wy, wz, face } = this.target;
    const targetId = this.world.getBlock(wx, wy, wz);

    // Right-click on crafting table → open 3×3 crafting screen
    if (targetId === B.CRAFTING) {
      this.craftGridSize = 3;
      document.dispatchEvent(new CustomEvent('openCrafting', { detail: 3 }));
      return;
    }

    // Right-click DOOR_CLOSED → open (both this block and the one above)
    if (targetId === B.DOOR_CLOSED) {
      this.world.setBlock(wx, wy, wz, B.DOOR_OPEN);
      if (this.world.getBlock(wx, wy + 1, wz) === B.DOOR_CLOSED)
        this.world.setBlock(wx, wy + 1, wz, B.DOOR_OPEN);
      return;
    }

    // Right-click DOOR_OPEN → close it (and companion block)
    if (targetId === B.DOOR_OPEN) {
      this.world.setBlock(wx, wy, wz, B.DOOR_CLOSED);
      const above = this.world.getBlock(wx, wy + 1, wz);
      const below = this.world.getBlock(wx, wy - 1, wz);
      if (above === B.DOOR_OPEN) this.world.setBlock(wx, wy + 1, wz, B.DOOR_CLOSED);
      else if (below === B.DOOR_OPEN) this.world.setBlock(wx, wy - 1, wz, B.DOOR_CLOSED);
      return;
    }

    // VEHICLE item → deploy a car on the road surface you're looking at
    {
      const slot = this.hotbar[this.selectedSlot];
      if (slot?.id === B.VEHICLE && targetId === B.ASPHALT) {
        const spawnY = wy + 1.26;
        const heading = Math.round(this.yaw / (Math.PI / 2)) * (Math.PI / 2);
        this.world.cars.deployAt(this.world.scene, wx + 0.5, spawnY, wz + 0.5, heading);
        slot.count--;
        if (slot.count === 0) this.hotbar[this.selectedSlot] = null;
        return;
      }
    }

    // Otherwise place a block on the adjacent face
    if (!face) return;
    const nx = wx + face[0];
    const ny = wy + face[1];
    const nz = wz + face[2];

    // Don't place inside player
    const px = Math.floor(this.pos.x), py = Math.floor(this.pos.y), pz = Math.floor(this.pos.z);
    if ((ny === py || ny === py + 1) && nx === px && nz === pz) return;

    const slot = this.hotbar[this.selectedSlot];
    const id   = slot?.id;
    if (!id) return;
    if (B.TOOL_DEFS[id] || B.ITEM_DEFS[id]) return; // can't place tools/materials

    this.world.setBlock(nx, ny, nz, id);
    // Consume one from the stack
    slot.count--;
    if (slot.count === 0) this.hotbar[this.selectedSlot] = null;
  }

  // ── Block breaking ─────────────────────────────────────────────────────────

  _startBreak() {
    if (!this.target) return;
    const { wx, wy, wz } = this.target;
    const id  = this.world.getBlock(wx, wy, wz);
    const def = B.getDef(id);
    if (!def || def.unbreakable) return;
    this.breakTarget        = { wx, wy, wz, id };
    this.breakProgress      = 0;
    this.effectiveBreakTime = def.breakTime;
    this.breakable          = true;
  }

  _updateBreaking(dt) {
    if (!this.breakTarget) return;
    const { wx, wy, wz } = this.breakTarget;

    if (!this.target || this.target.wx !== wx || this.target.wy !== wy || this.target.wz !== wz) {
      this.breakTarget = null; this.breakProgress = 0; return;
    }

    const id  = this.world.getBlock(wx, wy, wz);
    const def = B.getDef(id);
    if (!def || def.unbreakable) { this.breakTarget = null; this.breakProgress = 0; return; }

    const toolAction  = getToolAction(this.hotbar[this.selectedSlot]?.id);
    const correctTool = toolAction === def.action;
    this.breakable    = !def.requiresTool || correctTool;

    if (!this.breakable) {
      this.breakProgress      = 0;
      this.effectiveBreakTime = Infinity;
      return;
    }

    const toolDef  = B.TOOL_DEFS[this.hotbar[this.selectedSlot]?.id];
    const speed    = correctTool ? (toolDef?.speed ?? 1.0) : 1.0;
    const mult     = correctTool ? 1.0 : (def.handMult ?? 3.0);
    this.effectiveBreakTime = (def.breakTime * mult) / speed;
    this.breakProgress += dt;

    if (this.breakProgress >= this.effectiveBreakTime) {
      if (id !== B.AIR && !B.getDef(id)?.unbreakable) {
        this.world.setBlock(wx, wy, wz, B.AIR);
        const drop = BLOCK_DROPS[id];
        if (drop) this.addItem(drop.id, drop.count);
        else      this.addItem(id, 1);
      }
      this.breakTarget = null; this.breakProgress = 0;
    }
  }

  // ── Physics / movement ─────────────────────────────────────────────────────

  update(dt) {
    this._updateLook();
    this._updateMovement(dt);
    this._updateBreaking(dt);
    this._updateTarget();
    this._applyCamera();
  }

  _updateLook() {}

  _updateMovement(dt) {
    const speed = this.flying
      ? FLY_SPEED
      : (this.keys['ShiftLeft'] || this.keys['ShiftRight'] ? SPRINT_SPD : WALK_SPEED);

    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right   = new THREE.Vector3( Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const moveDir = new THREE.Vector3();

    if (this.keys['KeyW'] || this.keys['ArrowUp'])    moveDir.add(forward);
    if (this.keys['KeyS'] || this.keys['ArrowDown'])  moveDir.sub(forward);
    if (this.keys['KeyD'] || this.keys['ArrowRight']) moveDir.add(right);
    if (this.keys['KeyA'] || this.keys['ArrowLeft'])  moveDir.sub(right);

    if (moveDir.lengthSq() > 0) moveDir.normalize().multiplyScalar(speed);
    this.vel.x = moveDir.x;
    this.vel.z = moveDir.z;

    if (this.flying) {
      if (this.keys['Space'])                                               this.vel.y =  FLY_SPEED;
      else if (this.keys['ControlLeft'] || this.keys['ControlRight'])      this.vel.y = -FLY_SPEED;
      else                                                                   this.vel.y = 0;
    } else {
      this.vel.y -= GRAVITY * dt;
      if (this.vel.y < -40) this.vel.y = -40;
    }

    // Escalator: carry player upward when inside an escalator block
    if (!this.flying) {
      const bx = Math.floor(this.pos.x);
      const bz = Math.floor(this.pos.z);
      if (this.world.getBlock(bx, Math.floor(this.pos.y),       bz) === B.ESCALATOR_UP ||
          this.world.getBlock(bx, Math.floor(this.pos.y + 0.9), bz) === B.ESCALATOR_UP) {
        this.vel.y = 5.5;
      }
    }

    const nx = this.pos.x + this.vel.x * dt;
    if (!this._collide(nx, this.pos.y, this.pos.z)) this.pos.x = nx; else this.vel.x = 0;

    const ny = this.pos.y + this.vel.y * dt;
    if (!this._collide(this.pos.x, ny, this.pos.z)) {
      this.pos.y = ny;
      if (!this.flying) this.onGround = false;
    } else {
      if (this.vel.y < 0) this.onGround = true;
      this.vel.y = 0;
    }

    const nz = this.pos.z + this.vel.z * dt;
    if (!this._collide(this.pos.x, this.pos.y, nz)) this.pos.z = nz; else this.vel.z = 0;

    if (this.pos.y < 1) { this.pos.y = 1; this.vel.y = 0; this.onGround = true; }
    if (this.pos.y < -10) { this.health = 0; this.pos.set(0, 60, 0); this.vel.set(0,0,0); }
  }

  _collide(px, py, pz) {
    const minX = px - HALF_W, maxX = px + HALF_W;
    const minY = py,          maxY = py + PLAYER_H;
    const minZ = pz - HALF_W, maxZ = pz + HALF_W;
    for (let bx = Math.floor(minX); bx <= Math.floor(maxX - 0.001); bx++)
      for (let by = Math.floor(minY); by <= Math.floor(maxY - 0.001); by++)
        for (let bz = Math.floor(minZ); bz <= Math.floor(maxZ - 0.001); bz++)
          if (this.world.isSolid(bx, by, bz)) return true;
    return false;
  }

  _updateTarget() {
    const origin = this.camera.position.clone();
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion).normalize();
    this.target = this.world.raycast(origin, dir, REACH);
  }

  _applyCamera() {
    this._euler.set(this.pitch, this.yaw, 0, 'YXZ');
    this.camera.quaternion.setFromEuler(this._euler);
    this.camera.position.set(this.pos.x, this.pos.y + EYE_HEIGHT, this.pos.z);
  }

  // ── Break info (for UI + hand) ─────────────────────────────────────────────

  getBreakProgress() {
    if (!this.breakTarget || !this.breakable) return 0;
    return Math.min(1, this.breakProgress / (this.effectiveBreakTime || 1));
  }

  getBreakInfo() {
    if (!this.breakTarget) return null;
    const def         = B.getDef(this.breakTarget.id);
    const toolAction  = getToolAction(this.hotbar[this.selectedSlot]?.id);
    const correctTool = toolAction === def?.action;
    const canBreak    = !def?.requiresTool || correctTool;
    return {
      fraction:       this.getBreakProgress(),
      action:         def?.action || 'break',
      heldToolAction: toolAction,
      name:           def?.name || '',
      canBreak,
      needsTool:      canBreak ? null : def?.action,
    };
  }

  // ── Spawn ──────────────────────────────────────────────────────────────────

  spawn(world) {
    if (this.spawned) return;
    const land = world.findLandSpawn();
    if (land) {
      this.pos.set(land.x, land.y, land.z);
      this.spawned = true;
    }
  }
}
