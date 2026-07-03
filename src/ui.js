import * as THREE from 'three';
import { BLOCK_DEFS, ALL_BLOCKS, AIR } from './blocks.js';
import { createAtlas, ATLAS_COLS, ATLAS_ROWS, TEX_SIZE } from './textures.js';

export class UI {
  constructor(player, world) {
    this.player = player;
    this.world  = world;

    this.overlay    = document.getElementById('overlay');
    this.hotbarEl   = document.getElementById('hotbar');
    this.slots      = Array.from(document.querySelectorAll('#hotbar .slot'));
    this.healthEl   = document.getElementById('health-bar');
    this.blockNameEl= document.getElementById('block-name');
    this.debugEl    = document.getElementById('debug-info');
    this.coordsEl   = document.getElementById('coords');
    this.invScreen  = document.getElementById('inventory-screen');
    this.invGrid    = document.getElementById('inventory-grid');
    this.invHotbar  = document.getElementById('inventory-hotbar');

    this._blockNameTimer = 0;
    this._lastSlot = -1;
    this._atlasCanvas = null;

    this._buildSlotIcons();
    this._buildInventory();
    this._bindInventory();

    document.addEventListener('slotChange', (e) => {
      this._updateSlotHighlight(e.detail);
      this._showBlockName(e.detail);
    });
  }

  // Render a block icon onto a small canvas from the atlas
  _getAtlas() {
    if (!this._atlasCanvas) this._atlasCanvas = createAtlas();
    return this._atlasCanvas;
  }

  _drawBlockIcon(canvas, blockId) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 32, 32);
    if (!blockId || blockId === AIR) return;
    const def = BLOCK_DEFS[blockId];
    if (!def) return;

    const atlas = this._getAtlas();
    const [sc, sr] = def.textures.side || def.textures.all || [0,0];
    const [tc, tr] = def.textures.top  || def.textures.all || [0,0];

    // Draw an isometric-ish 2D icon (top face + front face)
    // Top face (upper 14x14 squashed)
    ctx.drawImage(atlas,
      tc * TEX_SIZE, tr * TEX_SIZE, TEX_SIZE, TEX_SIZE,
      1, 0, 30, 14
    );
    // Side face (lower 14x18)
    ctx.drawImage(atlas,
      sc * TEX_SIZE, sr * TEX_SIZE, TEX_SIZE, TEX_SIZE,
      1, 14, 30, 18
    );
    // Subtle darkening on side
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(1, 14, 30, 18);
  }

  _buildSlotIcons() {
    this.slots.forEach((slot, i) => {
      const iconDiv = slot.querySelector('.slot-icon');
      iconDiv.innerHTML = '';
      const c = document.createElement('canvas');
      c.width = 32; c.height = 32;
      c.style.cssText = 'width:32px;height:32px;image-rendering:pixelated';
      iconDiv.appendChild(c);
      this._refreshSlotIcon(i);
    });
  }

  _refreshSlotIcon(i) {
    const slot = this.slots[i];
    const icon = slot.querySelector('canvas');
    if (!icon) return;
    const blockId = this.player.hotbar[i];
    this._drawBlockIcon(icon, blockId);
    const label = slot.querySelector('.slot-label');
    if (label) label.textContent = i + 1;
  }

  _updateSlotHighlight(selected) {
    this.slots.forEach((s, i) => s.classList.toggle('active', i === selected));
  }

  _showBlockName(slot) {
    const id = this.player.hotbar[slot];
    const name = BLOCK_DEFS[id]?.name || '';
    this.blockNameEl.textContent = name;
    this.blockNameEl.classList.toggle('show', !!name);
    this._blockNameTimer = 2;
  }

  _buildInventory() {
    this.invGrid.innerHTML = '';
    ALL_BLOCKS.forEach(id => {
      const div = document.createElement('div');
      div.className = 'inv-slot';
      div.title = BLOCK_DEFS[id]?.name || '';
      const c = document.createElement('canvas');
      c.width = 32; c.height = 32;
      c.style.cssText = 'width:28px;height:28px;image-rendering:pixelated';
      div.appendChild(c);
      this._drawBlockIcon(c, id);
      div.addEventListener('click', () => this._selectFromInv(id));
      this.invGrid.appendChild(div);
    });
  }

  _buildInvHotbar() {
    this.invHotbar.innerHTML = '';
    this.player.hotbar.forEach((id, i) => {
      const div = document.createElement('div');
      div.className = 'inv-slot' + (i === this.player.selectedSlot ? ' active' : '');
      div.style.cssText = 'width:46px;height:46px;background:rgba(0,0,0,0.5);border:2px solid #555;border-radius:3px;display:flex;align-items:center;justify-content:center;cursor:pointer;';
      const c = document.createElement('canvas');
      c.width = 32; c.height = 32;
      c.style.cssText = 'width:28px;height:28px;image-rendering:pixelated';
      this._drawBlockIcon(c, id);
      div.appendChild(c);
      div.addEventListener('click', () => {
        this.player.selectedSlot = i;
        document.dispatchEvent(new CustomEvent('slotChange', { detail: i }));
        this.closeInventory();
      });
      this.invHotbar.appendChild(div);
    });
  }

  _selectFromInv(id) {
    this.player.hotbar[this.player.selectedSlot] = id;
    this._refreshSlotIcon(this.player.selectedSlot);
    this._buildInvHotbar();
    this._showBlockName(this.player.selectedSlot);
  }

  _bindInventory() {
    document.getElementById('close-inventory').addEventListener('click', () => this.closeInventory());
  }

  openInventory() {
    this._buildInvHotbar();
    this.invScreen.classList.remove('hidden');
  }

  closeInventory() {
    this.invScreen.classList.add('hidden');
    this._buildSlotIcons(); // refresh hotbar icons
  }

  isInventoryOpen() {
    return !this.invScreen.classList.contains('hidden');
  }

  show() { this.overlay.classList.add('active'); }
  hide() { this.overlay.classList.remove('active'); }

  update(dt) {
    const p = this.player;

    // Block-name fade
    if (this._blockNameTimer > 0) {
      this._blockNameTimer -= dt;
      if (this._blockNameTimer <= 0) this.blockNameEl.classList.remove('show');
    }

    // Slot highlight
    if (p.selectedSlot !== this._lastSlot) {
      this._updateSlotHighlight(p.selectedSlot);
      this._lastSlot = p.selectedSlot;
    }

    // Refresh hotbar icons (in case blocks changed)
    for (let i = 0; i < 9; i++) this._refreshSlotIcon(i);

    // Health bar
    this.healthEl.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      const h = document.createElement('div');
      const filled = p.health - i * 2;
      h.className = 'heart' + (filled >= 2 ? '' : filled >= 1 ? ' half' : ' empty');
      this.healthEl.appendChild(h);
    }

    // Break progress overlay on target block
    const bp = p.getBreakProgress();
    document.getElementById('crosshair').textContent = bp > 0 ? '⊕' : '+';

    // Coords / debug
    this.debugEl.innerHTML =
      `XYZ: ${p.pos.x.toFixed(1)}, ${p.pos.y.toFixed(1)}, ${p.pos.z.toFixed(1)}<br>` +
      `${p.flying ? 'FLY' : (p.onGround ? 'GROUND' : 'AIR')} | ` +
      `Slot: ${p.selectedSlot + 1} — ${BLOCK_DEFS[p.hotbar[p.selectedSlot]]?.name || 'Empty'}`;
  }
}
