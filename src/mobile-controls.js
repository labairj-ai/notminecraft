// Mobile touch controls overlay — joystick, look zone, action buttons

export const IS_MOBILE = typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const SENS = 0.004;   // look sensitivity (radians per pixel)
const JR   = 48;      // joystick max stick displacement (px)
const DEAD = 12;      // joystick deadzone (px)

function el(tag, css, text) {
  const e = document.createElement(tag);
  if (css)             e.style.cssText = css;
  if (text !== void 0) e.textContent   = text;
  return e;
}

function aBtn(label, bg, size = 54) {
  return el('div', [
    `background:${bg}c8`, 'color:#fff',
    `width:${size}px`, `height:${size}px`,
    'border-radius:50%',
    'display:flex', 'align-items:center', 'justify-content:center',
    'font-size:1.1em', 'font-weight:700',
    'border:2px solid rgba(255,255,255,0.3)',
    'pointer-events:auto', 'touch-action:none',
    'user-select:none', '-webkit-user-select:none',
    'box-shadow:0 2px 6px rgba(0,0,0,0.45)',
  ].join(';'), label);
}

export class MobileControls {
  constructor(player) {
    this.player = player;
    this.onExitCar = null;
    this.onPause   = null;

    this._jId  = null;          // joystick touch id
    this._lId  = null;          // look touch id
    this._ll   = { x: 0, y: 0 };
    this._jCX  = 0; this._jCY = 0;

    this._buildDOM();
    this._bindEvents();
  }

  // ── DOM ───────────────────────────────────────────────────────────────────────
  _buildDOM() {
    const root = el('div', [
      'position:fixed', 'inset:0', 'z-index:500',
      'pointer-events:none', 'touch-action:none',
      'display:none',
    ].join(';'));
    this._root = root;

    // Full-screen look zone (lowest layer)
    const look = el('div', 'position:absolute;inset:0;pointer-events:auto;touch-action:none;');
    root.appendChild(look);
    this._look = look;

    // ── Joystick ──────────────────────────────────────────────────────────────
    const jBase = el('div', [
      'position:absolute', 'bottom:28px', 'left:28px',
      'width:134px', 'height:134px', 'border-radius:50%',
      'background:rgba(255,255,255,0.07)',
      'border:2px solid rgba(255,255,255,0.2)',
      'pointer-events:auto', 'touch-action:none', 'z-index:1',
    ].join(';'));
    const jKnob = el('div', [
      'position:absolute', 'width:56px', 'height:56px',
      'border-radius:50%', 'background:rgba(255,255,255,0.4)',
      'top:50%', 'left:50%', 'transform:translate(-50%,-50%)',
      'pointer-events:none', 'box-shadow:0 2px 8px rgba(0,0,0,0.3)',
    ].join(';'));
    jBase.appendChild(jKnob);
    root.appendChild(jBase);
    this._jBase = jBase; this._jKnob = jKnob;

    // ── Top-left: pause ───────────────────────────────────────────────────────
    this._pauseBtn = el('div', [
      'position:absolute', 'top:16px', 'left:16px',
      'background:rgba(0,0,0,0.4)', 'color:#fff',
      'width:44px', 'height:44px', 'border-radius:8px',
      'display:flex', 'align-items:center', 'justify-content:center',
      'font-size:1.3em',
      'border:1px solid rgba(255,255,255,0.25)',
      'pointer-events:auto', 'touch-action:none', 'z-index:1',
      'user-select:none', '-webkit-user-select:none',
    ].join(';'), '⏸');
    root.appendChild(this._pauseBtn);

    // ── Top-right: FLY + INV ──────────────────────────────────────────────────
    const tr = el('div', [
      'position:absolute', 'top:16px', 'right:16px',
      'display:flex', 'gap:10px', 'pointer-events:none', 'z-index:1',
    ].join(';'));
    this._flyBtn = aBtn('FLY', '#7c3aed');
    this._invBtn = aBtn('INV', '#0369a1');
    tr.appendChild(this._flyBtn);
    tr.appendChild(this._invBtn);
    root.appendChild(tr);

    // ── Bottom-right action cluster ───────────────────────────────────────────
    const br = el('div', [
      'position:absolute', 'bottom:28px', 'right:16px',
      'display:flex', 'flex-direction:column', 'gap:10px',
      'align-items:flex-end', 'pointer-events:none', 'z-index:1',
    ].join(';'));

    const r1 = el('div', 'display:flex;gap:10px;');
    this._sprintBtn = aBtn('⚡', '#b45309');
    this._fBtn      = aBtn('F',  '#0f766e');
    r1.appendChild(this._sprintBtn);
    r1.appendChild(this._fBtn);

    const r2 = el('div', 'display:flex;gap:10px;');
    this._jumpBtn  = aBtn('↑',  '#15803d', 62);
    this._breakBtn = aBtn('⛏', '#dc2626');
    this._placeBtn = aBtn('▣',  '#1d4ed8');
    r2.appendChild(this._jumpBtn);
    r2.appendChild(this._breakBtn);
    r2.appendChild(this._placeBtn);

    br.appendChild(r1);
    br.appendChild(r2);
    root.appendChild(br);

    // ── Exit-car button (driving state only) ──────────────────────────────────
    this._exitBtn = el('div', [
      'position:absolute', 'top:16px', 'left:50%',
      'transform:translateX(-50%)',
      'background:#dc2626cc', 'color:#fff',
      'padding:10px 24px', 'border-radius:8px',
      'font-weight:bold', 'font-size:1em',
      'border:2px solid rgba(255,255,255,0.3)',
      'pointer-events:auto', 'touch-action:none',
      'z-index:1', 'display:none',
      'box-shadow:0 2px 6px rgba(0,0,0,0.5)',
    ].join(';'), 'EXIT CAR');
    root.appendChild(this._exitBtn);

    document.body.appendChild(root);
  }

  // ── Events ────────────────────────────────────────────────────────────────────
  _bindEvents() {
    const p = this.player;

    // Joystick touchstart — stops propagation so look zone doesn't also fire
    this._jBase.addEventListener('touchstart', e => {
      e.preventDefault(); e.stopPropagation();
      if (this._jId !== null) return;
      const t = e.changedTouches[0];
      this._jId = t.identifier;
      const r  = this._jBase.getBoundingClientRect();
      this._jCX = r.left + r.width  / 2;
      this._jCY = r.top  + r.height / 2;
    }, { passive: false });

    // Look zone touchstart
    this._look.addEventListener('touchstart', e => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (this._lId === null) {
          this._lId = t.identifier;
          this._ll  = { x: t.clientX, y: t.clientY };
          break;
        }
      }
    }, { passive: false });

    // Global touchmove — only prevents default for touches we own
    document.addEventListener('touchmove', e => {
      let used = false;
      for (const t of e.changedTouches) {
        if (t.identifier === this._jId) {
          used = true;
          const dx  = t.clientX - this._jCX;
          const dy  = t.clientY - this._jCY;
          const len = Math.hypot(dx, dy);
          const nx  = len > JR ? dx / len * JR : dx;
          const ny  = len > JR ? dy / len * JR : dy;
          this._jKnob.style.transform =
            `translate(calc(-50% + ${nx}px),calc(-50% + ${ny}px))`;
          p.keys['KeyW'] = ny < -DEAD;
          p.keys['KeyS'] = ny >  DEAD;
          p.keys['KeyA'] = nx < -DEAD;
          p.keys['KeyD'] = nx >  DEAD;
        }
        if (t.identifier === this._lId) {
          used = true;
          const dx = t.clientX - this._ll.x;
          const dy = t.clientY - this._ll.y;
          p.yaw   -= dx * SENS;
          p.pitch  = Math.max(-1.56, Math.min(1.56, p.pitch - dy * SENS));
          this._ll = { x: t.clientX, y: t.clientY };
        }
      }
      if (used) e.preventDefault();
    }, { passive: false });

    // Global touchend/cancel
    const clearTouch = e => {
      for (const t of e.changedTouches) {
        if (t.identifier === this._jId) {
          this._jId = null;
          this._jKnob.style.transform = 'translate(-50%,-50%)';
          p.keys['KeyW'] = p.keys['KeyS'] = p.keys['KeyA'] = p.keys['KeyD'] = false;
        }
        if (t.identifier === this._lId) this._lId = null;
      }
    };
    document.addEventListener('touchend',    clearTouch, { passive: true });
    document.addEventListener('touchcancel', clearTouch, { passive: true });

    // ── Action buttons ────────────────────────────────────────────────────────

    // Jump
    this._tap(this._jumpBtn, () => {
      if (!p.flying && p.onGround) {
        p.vel.y = 9; p.onGround = false;
      } else if (p.flying) {
        p.vel.y = 12;
        setTimeout(() => { if (p.flying) p.vel.y = 0; }, 150);
      }
    });

    // Break (hold)
    this._breakBtn.addEventListener('touchstart', e => {
      e.preventDefault(); e.stopPropagation();
      p._startBreak();
    }, { passive: false });
    this._breakBtn.addEventListener('touchend', e => {
      e.preventDefault();
      p.breakTarget = null; p.breakProgress = 0;
    }, { passive: false });

    // Place / interact
    this._tap(this._placeBtn, () => p._interact());

    // Fly toggle
    this._tap(this._flyBtn, () => {
      p.flying = !p.flying;
      p.vel.set(0, 0, 0);
      this._flyBtn.style.background = p.flying ? '#6d28d9e8' : '#7c3aedc8';
    });

    // Sprint toggle
    this._tap(this._sprintBtn, () => {
      const on = !p.keys['ShiftLeft'];
      p.keys['ShiftLeft'] = on;
      this._sprintBtn.style.background = on ? '#d97706e8' : '#b45309c8';
    });

    // Inventory
    this._tap(this._invBtn, () =>
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE', bubbles: true }))
    );

    // F key (NPC / bus routes)
    this._tap(this._fBtn, () =>
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyF', bubbles: true }))
    );

    // Pause
    this._tap(this._pauseBtn, () => { if (this.onPause) this.onPause(); });

    // Exit car
    this._tap(this._exitBtn, () => { if (this.onExitCar) this.onExitCar(); });
  }

  _tap(el, fn) {
    el.addEventListener('touchstart', e => {
      e.preventDefault(); e.stopPropagation(); fn();
    }, { passive: false });
  }

  // ── State transitions ─────────────────────────────────────────────────────────
  showPlaying() {
    this._root.style.display     = '';
    this._exitBtn.style.display  = 'none';
    this._breakBtn.style.display = '';
    this._placeBtn.style.display = '';
    this._pauseBtn.style.display = '';
    this.player.active = true;
    // Clear stale movement keys
    this.player.keys['KeyW'] = this.player.keys['KeyS'] =
    this.player.keys['KeyA'] = this.player.keys['KeyD'] = false;
  }

  showDriving() {
    this._root.style.display     = '';
    this._exitBtn.style.display  = '';
    this._breakBtn.style.display = 'none';
    this._placeBtn.style.display = 'none';
    this._pauseBtn.style.display = 'none';
    // Joystick controls WASD → car uses player.keys directly
  }

  hide() {
    this._root.style.display = 'none';
  }
}
