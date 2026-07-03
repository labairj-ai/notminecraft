import * as THREE from 'three';
import * as B from './blocks.js';

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

    this.health  = 20;
    this.maxHealth = 20;

    this.hotbar  = [...B.DEFAULT_HOTBAR];
    this.selectedSlot = 0;

    this.target  = null; // { wx, wy, wz, face }
    this.breakProgress = 0;
    this.breakTarget   = null;

    this.keys    = {};
    this.spawned = false;

    this._dir    = new THREE.Vector3();
    this._euler  = new THREE.Euler(0, 0, 0, 'YXZ');

    this._bindInput();
  }

  _bindInput() {
    document.addEventListener('keydown', e => {
      if (!this.active) return;
      this.keys[e.code] = true;

      if (e.code === 'KeyF') {
        this.flying = !this.flying;
        this.vel.set(0, 0, 0);
      }
      if (e.code === 'Space' && !this.flying && this.onGround) {
        this.vel.y = JUMP_VEL;
        this.onGround = false;
      }
      if (e.code === 'Space' && this.flying) {
        this.vel.y = FLY_SPEED;
      }
      // Number keys 1-9
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
      const delta = Math.sign(e.deltaY);
      this.selectedSlot = (this.selectedSlot + delta + 9) % 9;
      this._onSlotChange();
    });

    document.addEventListener('mousedown', e => {
      if (!this.active) return;
      if (e.button === 0) this._startBreak();
      if (e.button === 2) this._placeBlock();
    });

    document.addEventListener('mouseup', e => {
      if (!this.active) return;
      if (e.button === 0) { this.breakTarget = null; this.breakProgress = 0; }
    });

    document.addEventListener('contextmenu', e => e.preventDefault());
  }

  _onSlotChange() {
    // Dispatch event for UI
    document.dispatchEvent(new CustomEvent('slotChange', { detail: this.selectedSlot }));
  }

  _startBreak() {
    if (!this.target) return;
    const { wx, wy, wz } = this.target;
    const id = this.world.getBlock(wx, wy, wz);
    if (B.getDef(id)?.unbreakable) return;
    this.breakTarget   = { wx, wy, wz };
    this.breakProgress = 0;
  }

  _placeBlock() {
    if (!this.target) return;
    const { wx, wy, wz, face } = this.target;
    if (!face) return;
    const nx = wx + face[0];
    const ny = wy + face[1];
    const nz = wz + face[2];

    // Don't place inside player
    const px = Math.floor(this.pos.x);
    const py = Math.floor(this.pos.y);
    const pz = Math.floor(this.pos.z);
    if (ny === py || ny === py + 1) {
      if (nx === px && nz === pz) return;
    }

    const id = this.hotbar[this.selectedSlot];
    if (!id || id === B.AIR) return;
    this.world.setBlock(nx, ny, nz, id);
  }

  update(dt) {
    this._updateLook();
    this._updateMovement(dt);
    this._updateBreaking(dt);
    this._updateTarget();
    this._applyCamera();
  }

  _updateLook() {
    // Nothing needed — yaw/pitch updated in mousemove
  }

  _updateMovement(dt) {
    const speed = this.flying ? FLY_SPEED : (this.keys['ShiftLeft'] || this.keys['ShiftRight'] ? SPRINT_SPD : WALK_SPEED);

    // Horizontal movement (yaw only)
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right   = new THREE.Vector3( Math.cos(this.yaw), 0, -Math.sin(this.yaw));

    const moveDir = new THREE.Vector3();
    if (this.keys['KeyW'] || this.keys['ArrowUp'])    moveDir.add(forward);
    if (this.keys['KeyS'] || this.keys['ArrowDown'])  moveDir.sub(forward);
    if (this.keys['KeyD'] || this.keys['ArrowRight']) moveDir.add(right);
    if (this.keys['KeyA'] || this.keys['ArrowLeft'])  moveDir.sub(right);

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize().multiplyScalar(speed);
    }

    this.vel.x = moveDir.x;
    this.vel.z = moveDir.z;

    if (this.flying) {
      if (this.keys['Space'])     this.vel.y =  FLY_SPEED;
      else if (this.keys['ControlLeft'] || this.keys['ControlRight']) this.vel.y = -FLY_SPEED;
      else this.vel.y = 0;
    } else {
      // Gravity
      this.vel.y -= GRAVITY * dt;
      if (this.vel.y < -40) this.vel.y = -40;
    }

    // Resolve X
    const nx = this.pos.x + this.vel.x * dt;
    if (!this._collide(nx, this.pos.y, this.pos.z)) {
      this.pos.x = nx;
    } else {
      this.vel.x = 0;
    }

    // Resolve Y
    const ny = this.pos.y + this.vel.y * dt;
    if (!this._collide(this.pos.x, ny, this.pos.z)) {
      this.pos.y = ny;
      if (!this.flying) this.onGround = false;
    } else {
      if (this.vel.y < 0) { this.onGround = true; }
      this.vel.y = 0;
    }

    // Resolve Z
    const nz = this.pos.z + this.vel.z * dt;
    if (!this._collide(this.pos.x, this.pos.y, nz)) {
      this.pos.z = nz;
    } else {
      this.vel.z = 0;
    }

    // Keep above bedrock
    if (this.pos.y < 1) { this.pos.y = 1; this.vel.y = 0; this.onGround = true; }

    // Fall damage / void
    if (this.pos.y < -10) {
      this.health = 0;
      this.pos.set(0, 60, 0);
      this.vel.set(0, 0, 0);
    }
  }

  _collide(px, py, pz) {
    const minX = px - HALF_W, maxX = px + HALF_W;
    const minY = py,          maxY = py + PLAYER_H;
    const minZ = pz - HALF_W, maxZ = pz + HALF_W;

    for (let bx = Math.floor(minX); bx <= Math.floor(maxX - 0.001); bx++) {
      for (let by = Math.floor(minY); by <= Math.floor(maxY - 0.001); by++) {
        for (let bz = Math.floor(minZ); bz <= Math.floor(maxZ - 0.001); bz++) {
          if (this.world.isSolid(bx, by, bz)) return true;
        }
      }
    }
    return false;
  }

  _updateBreaking(dt) {
    if (!this.breakTarget) return;
    const { wx, wy, wz } = this.breakTarget;
    // Cancel if look moved away
    if (!this.target || this.target.wx !== wx || this.target.wy !== wy || this.target.wz !== wz) {
      this.breakTarget = null; this.breakProgress = 0; return;
    }
    this.breakProgress += dt;
    const breakTime = 0.6; // seconds
    if (this.breakProgress >= breakTime) {
      const id = this.world.getBlock(wx, wy, wz);
      if (id !== B.AIR && !B.getDef(id)?.unbreakable) {
        this.world.setBlock(wx, wy, wz, B.AIR);
        // Auto-add to hotbar if slot is empty
        const empty = this.hotbar.findIndex(b => b === B.AIR || !b);
        if (empty >= 0) this.hotbar[empty] = id;
      }
      this.breakTarget = null; this.breakProgress = 0;
    }
  }

  _updateTarget() {
    const origin = this.camera.position.clone();
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion).normalize();
    this.target = this.world.raycast(origin, dir, REACH);
  }

  _applyCamera() {
    this._euler.set(this.pitch, this.yaw, 0, 'YXZ');
    this.camera.quaternion.setFromEuler(this._euler);
    this.camera.position.set(
      this.pos.x,
      this.pos.y + EYE_HEIGHT,
      this.pos.z
    );
  }

  getBreakProgress() {
    if (!this.breakTarget) return 0;
    return Math.min(1, this.breakProgress / 0.6);
  }

  spawn(world) {
    if (this.spawned) return;
    // Wait until spawn chunk is loaded
    const spawnY = world.getSpawnY(8, 8);
    if (spawnY > 1) {
      this.pos.set(8, spawnY, 8);
      this.spawned = true;
    }
  }
}
