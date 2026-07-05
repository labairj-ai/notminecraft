// Mobile touch controls — dynamic joystick + swipe-to-look + action buttons

export const IS_MOBILE = typeof window !== 'undefined' && (
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia?.('(pointer: coarse)').matches ||
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent)
);

const SENS = 0.004;  // look sensitivity (rad / px)
const JR   = 52;     // max joystick stick displacement (px)
const DEAD = 10;     // deadzone (px)

function mk(tag, css, text) {
  const e = document.createElement(tag);
  if (css)             e.style.cssText = css;
  if (text !== void 0) e.textContent   = text;
  return e;
}

function btn(label, bg, size = 60) {
  return mk('div', [
    `background:${bg}cc`, 'color:#fff',
    `width:${size}px`, `height:${size}px`,
    'border-radius:50%',
    'display:flex', 'align-items:center', 'justify-content:center',
    'font-size:1.2em', 'font-weight:700',
    'border:2px solid rgba(255,255,255,0.3)',
    'pointer-events:auto', 'touch-action:none',
    'user-select:none', '-webkit-user-select:none',
    'box-shadow:0 3px 10px rgba(0,0,0,0.5)',
  ].join(';'), label);
}

export class MobileControls {
  constructor(player) {
    this.player    = player;
    this.onExitCar = null;
    this.onPause   = null;

    this._jId  = null;            // joystick touch id
    this._lId  = null;            // look touch id
    this._ll   = { x: 0, y: 0 }; // last look position
    this._jCX  = 0;
    this._jCY  = 0;               // dynamic joystick centre (where thumb landed)

    this._buildDOM();
    this._bindEvents();
  }

  _buildDOM() {
    const root = mk('div', [
      'position:fixed', 'inset:0', 'z-index:500',
      'pointer-events:none', 'touch-action:none',
      'display:none',
    ].join(';'));
    this._root = root;

    // Left 45 % of screen → joystick zone (transparent)
    const lz = mk('div', [
      'position:absolute', 'top:0', 'left:0',
      'width:45%', 'height:100%',
      'pointer-events:auto', 'touch-action:none',
    ].join(';'));
    root.appendChild(lz);
    this._lz = lz;

    // Right 55 % of screen → look zone (transparent)
    const rz = mk('div', [
      'position:absolute', 'top:0', 'right:0',
      'width:55%', 'height:100%',
      'pointer-events:auto', 'touch-action:none',
    ].join(';'));
    root.appendChild(rz);
    this._rz = rz;

    // Dynamic joystick — spawns wherever thumb touches, hidden by default
    const jBase = mk('div', [
      'position:absolute', 'pointer-events:none', 'display:none',
      'width:120px', 'height:120px', 'border-radius:50%',
      'background:rgba(255,255,255,0.1)',
      'border:2px solid rgba(255,255,255,0.35)',
      'transform:translate(-50%,-50%)',
    ].join(';'));
    const jKnob = mk('div', [
      'position:absolute', 'width:54px', 'height:54px',
      'border-radius:50%', 'background:rgba(255,255,255,0.5)',
      'top:50%', 'left:50%', 'transform:translate(-50%,-50%)',
      'box-shadow:0 2px 8px rgba(0,0,0,0.4)',
    ].join(';'));
    jBase.appendChild(jKnob);
    root.appendChild(jBase);
    this._jBase = jBase;
    this._jKnob = jKnob;

    // ── Top-left: pause ───────────────────────────────────────────────────────
    this._pauseBtn = mk('div', [
      'position:absolute', 'top:16px', 'left:16px', 'z-index:1',
      'background:rgba(0,0,0,0.45)', 'color:#fff',
      'width:46px', 'height:46px', 'border-radius:8px',
      'display:flex', 'align-items:center', 'justify-content:center',
      'font-size:1.3em',
      'border:1px solid rgba(255,255,255,0.25)',
      'pointer-events:auto', 'touch-action:none',
      'user-select:none', '-webkit-user-select:none',
    ].join(';'), '⏸');
    root.appendChild(this._pauseBtn);

    // ── Top-right: FLY ────────────────────────────────────────────────────────
    const tr = mk('div', [
      'position:absolute', 'top:16px', 'right:16px', 'z-index:1',
      'pointer-events:none',
    ].join(';'));
    this._flyBtn = btn('FLY', '#7c3aed', 54);
    tr.appendChild(this._flyBtn);
    root.appendChild(tr);

    // ── Bottom-right action buttons ───────────────────────────────────────────
    const br = mk('div', [
      'position:absolute', 'bottom:24px', 'right:16px', 'z-index:1',
      'display:flex', 'flex-direction:column', 'gap:12px',
      'align-items:flex-end', 'pointer-events:none',
    ].join(';'));

    // Row 1: sprint, F, INV
    const r1 = mk('div', 'display:flex;gap:10px;align-items:center;');
    this._sprintBtn = btn('⚡', '#b45309', 52);
    this._fBtn      = btn('F',  '#0f766e', 52);
    this._invBtn    = btn('☰',  '#0369a1', 52);
    r1.appendChild(this._sprintBtn);
    r1.appendChild(this._fBtn);
    r1.appendChild(this._invBtn);

    // Row 2: jump (large), break, place
    const r2 = mk('div', 'display:flex;gap:10px;align-items:center;');
    this._jumpBtn  = btn('↑',  '#15803d', 72);
    this._breakBtn = btn('⛏', '#dc2626', 60);
    this._placeBtn = btn('▣',  '#1d4ed8', 60);
    r2.appendChild(this._jumpBtn);
    r2.appendChild(this._breakBtn);
    r2.appendChild(this._placeBtn);

    br.appendChild(r1);
    br.appendChild(r2);
    root.appendChild(br);

    // ── Exit-car button (driving state only) ──────────────────────────────────
    this._exitBtn = mk('div', [
      'position:absolute', 'top:16px', 'left:50%', 'z-index:1',
      'transform:translateX(-50%)',
      'background:#dc2626cc', 'color:#fff',
      'padding:12px 28px', 'border-radius:8px',
      'font-weight:bold', 'font-size:1.1em',
      'border:2px solid rgba(255,255,255,0.3)',
      'pointer-events:auto', 'touch-action:none',
      'display:none', 'box-shadow:0 2px 8px rgba(0,0,0,0.5)',
      'user-select:none', '-webkit-user-select:none',
    ].join(';'), 'EXIT CAR');
    root.appendChild(this._exitBtn);

    document.body.appendChild(root);
  }

  _bindEvents() {
    const p = this.player;

    // Joystick zone — dynamic: base appears where thumb lands
    this._lz.addEventListener('touchstart', e => {
      e.preventDefault();
      if (this._jId !== null) return;
      const t       = e.changedTouches[0];
      this._jId     = t.identifier;
      this._jCX     = t.clientX;
      this._jCY     = t.clientY;
      this._jBase.style.left    = t.clientX + 'px';
      this._jBase.style.top     = t.clientY + 'px';
      this._jBase.style.display = '';
      this._jKnob.style.transform = 'translate(-50%,-50%)';
    }, { passive: false });

    // Look zone
    this._rz.addEventListener('touchstart', e => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (this._lId === null) {
          this._lId = t.identifier;
          this._ll  = { x: t.clientX, y: t.clientY };
          break;
        }
      }
    }, { passive: false });

    // Global touchmove
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
            `translate(calc(-50% + ${nx}px), calc(-50% + ${ny}px))`;
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

    // Global touchend / cancel
    const endTouch = e => {
      for (const t of e.changedTouches) {
        if (t.identifier === this._jId) {
          this._jId = null;
          this._jBase.style.display = 'none';
          p.keys['KeyW'] = p.keys['KeyS'] = p.keys['KeyA'] = p.keys['KeyD'] = false;
        }
        if (t.identifier === this._lId) this._lId = null;
      }
    };
    document.addEventListener('touchend',    endTouch, { passive: true });
    document.addEventListener('touchcancel', endTouch, { passive: true });

    // ── Action button bindings ────────────────────────────────────────────────

    this._tap(this._jumpBtn, () => {
      if (!p.flying && p.onGround) { p.vel.y = 9; p.onGround = false; }
      else if (p.flying) { p.vel.y = 12; setTimeout(() => { if (p.flying) p.vel.y = 0; }, 150); }
    });

    this._breakBtn.addEventListener('touchstart', e => {
      e.preventDefault(); e.stopPropagation(); p._startBreak();
    }, { passive: false });
    this._breakBtn.addEventListener('touchend', e => {
      e.preventDefault(); p.breakTarget = null; p.breakProgress = 0;
    }, { passive: false });

    this._tap(this._placeBtn,  () => p._interact());

    this._tap(this._flyBtn, () => {
      p.flying = !p.flying; p.vel.set(0, 0, 0);
      this._flyBtn.style.background = p.flying ? '#6d28d9ec' : '#7c3aedcc';
    });

    this._tap(this._sprintBtn, () => {
      const on = !p.keys['ShiftLeft']; p.keys['ShiftLeft'] = on;
      this._sprintBtn.style.background = on ? '#d97706ec' : '#b45309cc';
    });

    this._tap(this._invBtn, () =>
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE', bubbles: true }))
    );
    this._tap(this._fBtn, () =>
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyF', bubbles: true }))
    );
    this._tap(this._pauseBtn, () => { if (this.onPause) this.onPause(); });
    this._tap(this._exitBtn,  () => { if (this.onExitCar) this.onExitCar(); });
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
    this.player.keys['KeyW'] = this.player.keys['KeyS'] =
    this.player.keys['KeyA'] = this.player.keys['KeyD'] = false;
  }

  showDriving() {
    this._root.style.display     = '';
    this._exitBtn.style.display  = '';
    this._breakBtn.style.display = 'none';
    this._placeBtn.style.display = 'none';
    this._pauseBtn.style.display = 'none';
  }

  hide() {
    this._root.style.display = 'none';
  }
}
