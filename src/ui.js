import * as THREE from 'three';
import { BLOCK_DEFS, ALL_ITEMS, AIR, ACTION_LABELS, TOOL_NEEDED_LABEL,
         TOOL_DEFS, TOOL_PICKAXE, TOOL_AXE, TOOL_SHOVEL } from './blocks.js';
import { createAtlas, ATLAS_COLS, ATLAS_ROWS, TEX_SIZE } from './textures.js';

export class UI {
  constructor(player, world) {
    this.player = player;
    this.world  = world;

    this.overlay      = document.getElementById('overlay');
    this.hotbarEl     = document.getElementById('hotbar');
    this.slots        = Array.from(document.querySelectorAll('#hotbar .slot'));
    this.healthEl     = document.getElementById('health-bar');
    this.blockNameEl  = document.getElementById('block-name');
    this.debugEl      = document.getElementById('debug-info');
    this.coordsEl     = document.getElementById('coords');
    this.invScreen    = document.getElementById('inventory-screen');
    this.invGrid      = document.getElementById('inventory-grid');
    this.invHotbar    = document.getElementById('inventory-hotbar');

    // Break action UI
    this.actionEl     = document.getElementById('action-indicator');
    this.actionLabel  = document.getElementById('action-label');
    this.breakRingFg  = document.getElementById('break-ring-fg');
    this._ringCirc    = 106.8; // 2π × 17

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
    const itemId = this.player.hotbar[i];
    if (TOOL_DEFS[itemId]) {
      this._drawToolIcon(icon, itemId);
    } else {
      this._drawBlockIcon(icon, itemId);
    }
    const label = slot.querySelector('.slot-label');
    if (label) label.textContent = i + 1;
  }

  // Pixel-art tool icons drawn on a 32x32 canvas
  _drawToolIcon(canvas, toolId) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 32, 32);
    const wood = '#9a6b3a';
    const iron = '#c0c8d0';
    if (toolId === TOOL_PICKAXE) {
      // Handle
      ctx.fillStyle = wood; ctx.fillRect(13, 14, 5, 16);
      // Head bar
      ctx.fillStyle = iron; ctx.fillRect(4,  8, 24, 6);
      // Left tip
      ctx.fillRect(4, 14, 6, 6);
      // Right tip
      ctx.fillRect(22, 14, 6, 6);
    } else if (toolId === TOOL_AXE) {
      // Handle
      ctx.fillStyle = wood; ctx.fillRect(13, 14, 5, 18);
      // Blade
      ctx.fillStyle = iron; ctx.fillRect(13, 4, 14, 14);
      // Back nub
      ctx.fillRect(10, 4, 3, 9);
      // Edge highlight
      ctx.fillStyle = '#d8e0e8'; ctx.fillRect(25, 4, 2, 14);
    } else if (toolId === TOOL_SHOVEL) {
      // Handle
      ctx.fillStyle = wood; ctx.fillRect(13, 8, 5, 24);
      // Blade body
      ctx.fillStyle = iron; ctx.fillRect(8, 2, 16, 10);
      // Blade edge (rounded bottom)
      ctx.fillRect(9,  12, 14, 2);
      ctx.fillRect(10, 14, 12, 2);
    }
  }

  _updateSlotHighlight(selected) {
    this.slots.forEach((s, i) => s.classList.toggle('active', i === selected));
  }

  _showBlockName(slot) {
    const id   = this.player.hotbar[slot];
    const name = TOOL_DEFS[id]?.name || BLOCK_DEFS[id]?.name || '';
    this.blockNameEl.textContent = name;
    this.blockNameEl.classList.toggle('show', !!name);
    this._blockNameTimer = 2;
  }

  _buildInventory() {
    this.invGrid.innerHTML = '';
    ALL_ITEMS.forEach(id => {
      const div = document.createElement('div');
      div.className = 'inv-slot';
      div.title = TOOL_DEFS[id]?.name || BLOCK_DEFS[id]?.name || '';
      const c = document.createElement('canvas');
      c.width = 32; c.height = 32;
      c.style.cssText = 'width:28px;height:28px;image-rendering:pixelated';
      div.appendChild(c);
      if (TOOL_DEFS[id]) {
        this._drawToolIcon(c, id);
      } else {
        this._drawBlockIcon(c, id);
      }
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

  _ringColor(action) {
    return { dig:'#e8d99b', chop:'#c8a264', mine:'#5be8e8', break:'#fff' }[action] || '#fff';
  }

  _hideRing() {
    this.breakRingFg.style.strokeDashoffset = this._ringCirc;
    this.breakRingFg.style.stroke = 'white';
    this.actionEl.classList.remove('visible');
    this.actionEl.classList.add('hidden');
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

    // Break ring + action indicator
    const info = p.getBreakInfo();

    if (info) {
      if (!info.canBreak) {
        // Wrong tool — red ring + "Needs Pickaxe" label, no sweep
        this.breakRingFg.style.strokeDashoffset = this._ringCirc;
        this.breakRingFg.style.stroke = '#ff4444';
        this.actionLabel.textContent = TOOL_NEEDED_LABEL[info.needsTool] || 'Wrong tool';
        this.actionLabel.style.color = '#ff6666';
        this.actionEl.classList.remove('hidden');
        this.actionEl.classList.add('visible');
      } else if (info.fraction > 0) {
        // Correct tool — normal coloured sweep
        this.breakRingFg.style.strokeDashoffset = (this._ringCirc * (1 - info.fraction)).toFixed(2);
        this.breakRingFg.style.stroke = this._ringColor(info.action);
        const verb = ACTION_LABELS[info.action] || 'Breaking';
        this.actionLabel.textContent = `${verb} ${info.name}…`;
        this.actionLabel.style.color = this._ringColor(info.action);
        this.actionEl.classList.remove('hidden');
        this.actionEl.classList.add('visible');
      } else {
        this._hideRing();
      }
    } else {
      this._hideRing();
    }

    // Coords / debug
    const heldId   = p.hotbar[p.selectedSlot];
    const heldName = TOOL_DEFS[heldId]?.name || BLOCK_DEFS[heldId]?.name || 'Empty';
    this.debugEl.innerHTML =
      `XYZ: ${p.pos.x.toFixed(1)}, ${p.pos.y.toFixed(1)}, ${p.pos.z.toFixed(1)}<br>` +
      `${p.flying ? 'FLY' : (p.onGround ? 'GROUND' : 'AIR')} | ` +
      `Slot: ${p.selectedSlot + 1} — ${heldName}`;
  }
}
