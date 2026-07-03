import * as THREE from 'three';

// Per-action swing parameters
const SWING = {
  mine:  { speed: 3.2, depth: 1.3, backTilt: 0.45 },
  chop:  { speed: 2.8, depth: 1.15, backTilt: 0.35 },
  dig:   { speed: 3.0, depth: 0.85, backTilt: 0.18 },
  break: { speed: 4.5, depth: 0.65, backTilt: 0.30 },
};

function easeIn(t)  { return t * t * t; }
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

// Swing angle for swingPivot.rotation.x
// positive = tool tips BACK (windup), negative = tool swings FORWARD/DOWN (strike)
function calcSwingAngle(t, depth, backTilt) {
  if (t < 0.28) {
    return backTilt * easeOut(t / 0.28);
  } else if (t < 0.50) {
    const f = (t - 0.28) / 0.22;
    return backTilt + (-depth - backTilt) * easeIn(f);
  } else {
    const f = (t - 0.50) / 0.50;
    return -depth * (1 - easeOut(f));
  }
}

export class FirstPersonHand {
  constructor(renderer) {
    this.renderer = renderer;

    // Separate scene — not affected by world fog or lighting
    this.scene  = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      70, window.innerWidth / window.innerHeight, 0.01, 10
    );

    // Lighting for the hand (bright so tool colours read clearly)
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const dl = new THREE.DirectionalLight(0xffffff, 0.85);
    dl.position.set(2, 4, 3);
    this.scene.add(dl);
    const fill = new THREE.DirectionalLight(0x88aaff, 0.25);
    fill.position.set(-2, -1, -2);
    this.scene.add(fill);

    // ── Materials ─────────────────────────────────────────────────────────────
    this._mats = {
      skin:  new THREE.MeshLambertMaterial({ color: 0xc8a474 }),
      wood:  new THREE.MeshLambertMaterial({ color: 0x9a6b3a }),
      iron:  new THREE.MeshLambertMaterial({ color: 0xb8c0c8 }),
      stone: new THREE.MeshLambertMaterial({ color: 0x909090 }),
      gold:  new THREE.MeshLambertMaterial({ color: 0xe8c830 }),
    };

    // ── Hierarchy ─────────────────────────────────────────────────────────────
    // handGroup → swingPivot → (arm, fist, toolMount → tool)
    this.handGroup  = new THREE.Group();
    this.swingPivot = new THREE.Group();
    this.toolMount  = new THREE.Group();
    this.scene.add(this.handGroup);
    this.handGroup.add(this.swingPivot);

    // Arm (extends downward from pivot — mostly off-screen, just wrist visible)
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.72, 0.22),
      this._mats.skin
    );
    arm.position.set(0, -0.36, 0);
    this.swingPivot.add(arm);

    // Fist / grip knuckles at bottom of visible area
    const fist = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.21, 0.24),
      this._mats.skin
    );
    fist.position.set(0.02, -0.10, 0.04);
    this.swingPivot.add(fist);

    // Tool mounts above the fist
    this.toolMount.position.set(0, 0.10, 0);
    this.swingPivot.add(this.toolMount);

    // Pre-build tool geometries
    this._tools = {
      mine:  this._buildPickaxe(),
      chop:  this._buildAxe(),
      dig:   this._buildShovel(),
      break: null,  // bare fist
    };

    // ── Default placement (lower-right of screen) ──────────────────────────
    // Camera looks -Z; hand is to the right (+X) and below (-Y)
    this._basePos = new THREE.Vector3(0.78, -0.20, -1.0);
    this._baseRot = new THREE.Euler(0.10, -0.52, 0.13);

    // ── Animation state ───────────────────────────────────────────────────────
    this.action       = null;
    this._swingT      = 0;
    this._isSwinging  = false;
    this._bobT        = 0;
    this._idleT       = 0;

    this._applyTool(null);
  }

  // ── Tool builders ──────────────────────────────────────────────────────────

  _buildPickaxe() {
    const g = new THREE.Group();
    const { wood, iron } = this._mats;

    // Handle
    g.add(this._box(0.058, 0.56, 0.058, wood, 0, 0, 0));

    // Cross-bar (horizontal head)
    g.add(this._box(0.36, 0.068, 0.068, iron, 0, 0.30, 0));

    // Left pick tip (angled forward)
    g.add(this._box(0.068, 0.068, 0.22, iron, -0.15, 0.30, -0.10));

    // Right pick tip
    g.add(this._box(0.068, 0.068, 0.22, iron,  0.15, 0.30, -0.10));

    return g;
  }

  _buildAxe() {
    const g = new THREE.Group();
    const { wood, iron } = this._mats;

    // Handle
    g.add(this._box(0.058, 0.60, 0.058, wood, 0, 0, 0));

    // Blade body (left of handle)
    g.add(this._box(0.30, 0.36, 0.068, iron, 0.12, 0.24, 0));

    // Blade edge bevel
    g.add(this._box(0.06, 0.36, 0.04, iron, 0.27, 0.24, -0.055));

    // Back nub
    g.add(this._box(0.10, 0.16, 0.068, iron, -0.06, 0.24, 0));

    return g;
  }

  _buildShovel() {
    const g = new THREE.Group();
    const { wood, iron } = this._mats;

    // Handle
    g.add(this._box(0.058, 0.62, 0.058, wood, 0, 0, 0));

    // Blade (flat rectangle at top of handle)
    g.add(this._box(0.24, 0.32, 0.050, iron, 0, 0.44, 0));

    // Rounded bottom edge of blade
    g.add(this._box(0.20, 0.040, 0.050, iron, 0, 0.26, 0));

    return g;
  }

  _box(w, h, d, mat, x = 0, y = 0, z = 0) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    return m;
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  startBreaking(action) {
    if (action !== this.action) this._applyTool(action);
    this._isSwinging = true;
  }

  stopBreaking() {
    this._isSwinging = false;
  }

  switchTool(action) {
    if (action !== this.action) this._applyTool(action);
  }

  update(dt, isMoving) {
    this._bobT  += dt;
    this._idleT += dt * 0.5;

    const params = SWING[this.action] || SWING.break;

    if (this._isSwinging) {
      this._swingT += dt * params.speed;
      if (this._swingT >= 1) this._swingT -= 1;
    } else {
      // Ease back to rest: multiply by decay factor each frame
      this._swingT *= Math.pow(0.001, dt);
    }

    // ── Swing angle ────────────────────────────────────────────────────────
    const angle = this._isSwinging
      ? calcSwingAngle(this._swingT, params.depth, params.backTilt)
      : calcSwingAngle(this._swingT, params.depth, params.backTilt) * this._swingT;

    this.swingPivot.rotation.x = angle;

    // Slight Z roll during chop (sideways arc)
    this.swingPivot.rotation.z = (this.action === 'chop') ? angle * 0.18 : 0;

    // Slight forward lean at strike
    this.swingPivot.position.z = Math.min(0, angle * -0.06);

    // ── Walk bob ───────────────────────────────────────────────────────────
    const bobY = isMoving ? Math.sin(this._bobT * 9.0) * 0.013 : 0;
    const bobX = isMoving ? Math.sin(this._bobT * 4.5) * 0.007 : 0;

    // ── Idle sway (very subtle) ────────────────────────────────────────────
    const idleX = Math.sin(this._idleT * 1.1) * 0.004;
    const idleY = Math.sin(this._idleT * 0.7) * 0.003;

    this.handGroup.position.set(
      this._basePos.x + bobX + idleX,
      this._basePos.y + bobY + idleY,
      this._basePos.z
    );
    this.handGroup.rotation.copy(this._baseRot);
  }

  render() {
    this.renderer.clearDepth();
    this.renderer.render(this.scene, this.camera);
  }

  resize(aspect) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _applyTool(action) {
    // Remove current tool
    while (this.toolMount.children.length > 0) {
      this.toolMount.remove(this.toolMount.children[0]);
    }
    const tool = this._tools[action];
    if (tool) this.toolMount.add(tool);
    this.action = action;
  }
}
