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

function mk(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls)              e.className  = cls;
  if (text !== void 0)  e.textContent = text;
  return e;
}

// Create a circular button using CSS classes for responsive sizing
function mcBtn(label, bg, sizeClass = 'mc-btn-md') {
  const e = mk('div', `mc-btn ${sizeClass}`);
  e.style.background = bg + 'cc';
  e.textContent = label;
  return e;
}

// Create a pill-shaped button
function mcPill(label, bg) {
  const e = mk('div', 'mc-pill');
  e.style.background = bg + 'cc';
  e.textContent = label;
  return e;
}

export class MobileControls {
  constructor(player) {
    this.player    = player;
    this.onExitCar = null;
    this.onPause   = null;
    this.onTap     = null; // called when user taps the look zone (interact gesture)

    this._jId       = null;
    this._lId       = null;
    this._ll        = { x: 0, y: 0 };
    this._jCX       = 0;
    this._jCY       = 0;
    this._isDriving = false;
    this._moreOpen  = false;
    // Tap tracking for both zones — screen coords passed to onTap(x,y)
    this._tapX      = 0;
    this._tapY      = 0;
    this._tapT      = 0;
    this._jTapX     = 0;
    this._jTapY     = 0;
    this._jTapT     = 0;

    this._buildDOM();
    this._bindEvents();
  }

  _buildDOM() {
    const root = mk('div', 'mc-root');
    root.style.display = 'none';
    this._root = root;

    // Left 45% → joystick zone
    const lz = mk('div', 'mc-zone mc-zone-left');
    root.appendChild(lz);
    this._lz = lz;

    // Right 55% → look zone
    const rz = mk('div', 'mc-zone mc-zone-right');
    root.appendChild(rz);
    this._rz = rz;

    // Dynamic joystick visuals
    const jBase = mk('div', 'mc-joystick-base');
    const jKnob = mk('div', 'mc-joystick-knob');
    jBase.appendChild(jKnob);
    root.appendChild(jBase);
    this._jBase = jBase;
    this._jKnob = jKnob;

    // ── Pause button (top-left) ───────────────────────────────────────────────
    this._pauseBtn = mk('div', 'mc-pause-btn', '⏸');
    root.appendChild(this._pauseBtn);

    // ── Exit-car button (driving only, top-center) ────────────────────────────
    this._exitBtn = mk('div', 'mc-exit-btn', 'EXIT CAR');
    this._exitBtn.style.display = 'none';
    root.appendChild(this._exitBtn);

    // ── Action panel (bottom-right) ───────────────────────────────────────────
    const panel = mk('div', 'mc-action-panel');

    // Secondary tray — revealed by ⋯ button (Sprint + Fly-Down)
    const sec = mk('div', 'mc-row mc-secondary');
    this._downBtn   = mcBtn('↓', '#1e3a5f', 'mc-btn-sm');
    this._sprintBtn = mcBtn('⚡', '#b45309', 'mc-btn-sm');
    sec.appendChild(this._downBtn);
    sec.appendChild(this._sprintBtn);
    this._secondary = sec;

    // Fly row — always visible above primary
    const flyRow = mk('div', 'mc-row');
    this._flyBtn = mcPill('🛸 FLY', '#7c3aed');
    flyRow.appendChild(this._flyBtn);

    // Primary row — always visible
    const primary = mk('div', 'mc-row');
    this._moreBtn  = mcBtn('⋯', '#374151', 'mc-btn-sm');
    // INV button (compact two-line pill)
    this._invBtn = mk('div', 'mc-inv-btn');
    this._invBtn.style.background = '#0369a1cc';
    this._invBtn.innerHTML = '🎒<span class="mc-inv-label">INV</span>';
    this._breakBtn = mcBtn('⛏', '#dc2626', 'mc-btn-md');
    this._placeBtn = mcBtn('▣', '#1d4ed8', 'mc-btn-md');
    this._upBtn    = mcBtn('↑', '#15803d', 'mc-btn-lg');
    primary.appendChild(this._moreBtn);
    primary.appendChild(this._invBtn);
    primary.appendChild(this._breakBtn);
    primary.appendChild(this._placeBtn);
    primary.appendChild(this._upBtn);

    // Stack: secondary (top, hidden), fly (middle), primary (bottom)
    panel.appendChild(sec);
    panel.appendChild(flyRow);
    panel.appendChild(primary);
    root.appendChild(panel);

    document.body.appendChild(root);
  }

  _bindEvents() {
    const p = this.player;

    // Joystick zone — also tracks taps (quick lift without dragging joystick)
    this._lz.addEventListener('touchstart', e => {
      e.preventDefault();
      if (this._jId !== null) return;
      const t   = e.changedTouches[0];
      this._jId  = t.identifier;
      this._jCX  = t.clientX;
      this._jCY  = t.clientY;
      this._jTapX = t.clientX;
      this._jTapY = t.clientY;
      this._jTapT = Date.now();
      this._jBase.style.left    = t.clientX + 'px';
      this._jBase.style.top     = t.clientY + 'px';
      this._jBase.classList.add('visible');
      this._jKnob.style.transform = 'translate(-50%,-50%)';
    }, { passive: false });

    // Look zone
    this._rz.addEventListener('touchstart', e => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (this._lId === null) {
          this._lId = t.identifier;
          this._ll  = { x: t.clientX, y: t.clientY };
          this._tapX = t.clientX;
          this._tapY = t.clientY;
          this._tapT = Date.now();
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
          if (this._isDriving) {
            const raw = nx / JR;
            p.keys['_analogSteer'] = Math.abs(nx) > DEAD * 1.5 ? -raw : 0;
            p.keys['KeyA'] = false;
            p.keys['KeyD'] = false;
          } else {
            p.keys['_analogSteer'] = undefined;
            p.keys['KeyA'] = nx < -DEAD;
            p.keys['KeyD'] = nx >  DEAD;
          }
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
          // Tap on left zone: finger down + up without joystick drag
          const jdx = t.clientX - this._jTapX;
          const jdy = t.clientY - this._jTapY;
          if (this.onTap && Math.hypot(jdx, jdy) < 25 && Date.now() - this._jTapT < 300) {
            this.onTap(this._jTapX, this._jTapY);
          }
          this._jId = null;
          this._jBase.classList.remove('visible');
          p.keys['KeyW'] = p.keys['KeyS'] = p.keys['KeyA'] = p.keys['KeyD'] = false;
          p.keys['_analogSteer'] = undefined;
        }
        if (t.identifier === this._lId) {
          // Tap on right zone: finger down + up without camera drag
          const dx = t.clientX - this._tapX;
          const dy = t.clientY - this._tapY;
          if (this.onTap && Math.hypot(dx, dy) < 25 && Date.now() - this._tapT < 300) {
            this.onTap(this._tapX, this._tapY);
          }
          this._lId = null;
        }
      }
    };
    document.addEventListener('touchend',    endTouch, { passive: true });
    document.addEventListener('touchcancel', endTouch, { passive: true });

    // ── Action buttons ────────────────────────────────────────────────────────

    // ↑ Jump / fly up
    this._upBtn.addEventListener('touchstart', e => {
      e.preventDefault(); e.stopPropagation();
      if (p.flying) {
        p.keys['Space'] = true;
      } else if (p.onGround) {
        p.vel.y = 9; p.onGround = false;
      }
    }, { passive: false });
    this._upBtn.addEventListener('touchend', e => {
      e.preventDefault();
      p.keys['Space'] = false;
    }, { passive: false });

    // ↓ Fly down
    this._downBtn.addEventListener('touchstart', e => {
      e.preventDefault(); e.stopPropagation();
      p.keys['ControlLeft'] = true;
    }, { passive: false });
    this._downBtn.addEventListener('touchend', e => {
      e.preventDefault();
      p.keys['ControlLeft'] = false;
    }, { passive: false });

    // Break (hold)
    this._breakBtn.addEventListener('touchstart', e => {
      e.preventDefault(); e.stopPropagation(); p._startBreak();
    }, { passive: false });
    this._breakBtn.addEventListener('touchend', e => {
      e.preventDefault(); p.breakTarget = null; p.breakProgress = 0;
    }, { passive: false });

    this._tap(this._placeBtn, () => p._interact());

    // FLY toggle
    this._tap(this._flyBtn, () => {
      p.flying = !p.flying; p.vel.set(0, 0, 0);
      p.keys['Space'] = false; p.keys['ControlLeft'] = false;
      this._updateFlyBtn();
    });

    // Sprint toggle
    this._tap(this._sprintBtn, () => {
      const on = !p.keys['ShiftLeft']; p.keys['ShiftLeft'] = on;
      this._sprintBtn.style.background = on ? '#d97706ec' : '#b45309cc';
    });

    this._tap(this._invBtn, () =>
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE', bubbles: true }))
    );

    // ⋯ more toggle
    this._tap(this._moreBtn, () => {
      this._moreOpen = !this._moreOpen;
      this._secondary.classList.toggle('open', this._moreOpen);
      this._moreBtn.style.background = this._moreOpen ? '#6b7280cc' : '#374151cc';
    });

    this._tap(this._pauseBtn, () => { if (this.onPause) this.onPause(); });
    this._tap(this._exitBtn,  () => { if (this.onExitCar) this.onExitCar(); });
  }

  _tap(el, fn) {
    el.addEventListener('touchstart', e => {
      e.preventDefault(); e.stopPropagation(); fn();
    }, { passive: false });
  }

  _updateFlyBtn() {
    if (this.player.flying) {
      this._flyBtn.textContent = '🛬 LAND';
      this._flyBtn.style.background = '#dc2626ec';
    } else {
      this._flyBtn.textContent = '🛸 FLY';
      this._flyBtn.style.background = '#7c3aedcc';
    }
  }

  // ── State transitions ─────────────────────────────────────────────────────────
  showPlaying() {
    this._root.style.display    = '';
    this._exitBtn.style.display = 'none';
    this._pauseBtn.style.display = '';
    this._isDriving = false;
    this._updateFlyBtn();
    this.player.active = true;
    this.player.keys['KeyW'] = this.player.keys['KeyS'] =
    this.player.keys['KeyA'] = this.player.keys['KeyD'] = false;
  }

  showDriving() {
    this._root.style.display     = '';
    this._exitBtn.style.display  = '';
    this._pauseBtn.style.display = 'none';
    this._isDriving = true;
  }

  hide() {
    this._root.style.display = 'none';
  }
}
