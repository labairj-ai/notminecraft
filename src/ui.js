import {
  BLOCK_DEFS, TOOL_DEFS, ITEM_DEFS, AIR, ALL_ITEMS,
  ACTION_LABELS, TOOL_NEEDED_LABEL, getItemName,
  TOOL_PICKAXE, TOOL_AXE, TOOL_SHOVEL, TOOL_SWORD, TOOL_HOE,
  STICK, COAL, GOLD_COIN,
} from './blocks.js';
import { SELL_PRICES } from './npc.js';
import { createAtlas, TEX_SIZE } from './textures.js';
import { matchRecipe } from './crafting.js';

// ── Icon rendering ─────────────────────────────────────────────────────────────

let _atlas = null;
function getAtlas() {
  if (!_atlas) _atlas = createAtlas();
  return _atlas;
}

function drawIcon(canvas, id, count) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 32, 32);
  if (!id) return;

  if (TOOL_DEFS[id]) {
    _drawToolIcon(ctx, id);
  } else if (ITEM_DEFS[id]) {
    _drawMaterialIcon(ctx, id);
  } else {
    _drawBlockIcon(ctx, id);
  }

  if (count != null && count > 1) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(count, 30, 30);
    ctx.fillStyle = '#fff';
    ctx.fillText(count, 29, 29);
  }
}

function _drawBlockIcon(ctx, id) {
  const def = BLOCK_DEFS[id];
  if (!def) return;
  const atlas = getAtlas();
  const [sc, sr] = def.textures.side || def.textures.all || [0,0];
  const [tc, tr] = def.textures.top  || def.textures.all || [0,0];

  // Transparent blocks (glass, ice, water, leaves, door-open) render semi-opaque
  const isTransp = def.transparent && id !== 0;
  if (isTransp) {
    // Draw a subtle checkered background so transparency reads visually
    ctx.fillStyle = '#6b7280'; ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#9ca3af';
    for (let cy = 0; cy < 32; cy += 6)
      for (let cx = 0; cx < 32; cx += 6)
        if ((Math.floor(cx/6) + Math.floor(cy/6)) % 2 === 0) ctx.fillRect(cx, cy, 6, 6);
    ctx.globalAlpha = 0.62;
  }

  ctx.drawImage(atlas, tc*TEX_SIZE, tr*TEX_SIZE, TEX_SIZE, TEX_SIZE, 1,  0, 30, 14);
  ctx.drawImage(atlas, sc*TEX_SIZE, sr*TEX_SIZE, TEX_SIZE, TEX_SIZE, 1, 14, 30, 18);
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.fillRect(1, 14, 30, 18);

  if (isTransp) ctx.globalAlpha = 1.0;
}

function _drawToolIcon(ctx, id) {
  const wood = '#9a6b3a', iron = '#c0c8d0', hilite = '#d8e0e8';
  if (id === TOOL_PICKAXE) {
    ctx.fillStyle = wood;  ctx.fillRect(13, 14, 5, 16);
    ctx.fillStyle = iron;  ctx.fillRect(4,   8, 24,  6);
    ctx.fillRect(4, 14, 6, 6);
    ctx.fillRect(22, 14, 6, 6);
    ctx.fillStyle = hilite; ctx.fillRect(4, 8, 24, 2);
  } else if (id === TOOL_AXE) {
    ctx.fillStyle = wood;  ctx.fillRect(13, 14, 5, 18);
    ctx.fillStyle = iron;  ctx.fillRect(13,  4, 14, 14);
    ctx.fillRect(10,  4,  3,  9);
    ctx.fillStyle = hilite; ctx.fillRect(25, 4, 2, 14);
  } else if (id === TOOL_SHOVEL) {
    ctx.fillStyle = wood;  ctx.fillRect(13,  8,  5, 24);
    ctx.fillStyle = iron;  ctx.fillRect(8,   2, 16, 10);
    ctx.fillRect(9, 12, 14, 2);
    ctx.fillRect(10, 14, 12, 2);
    ctx.fillStyle = hilite; ctx.fillRect(8, 2, 16, 2);
  } else if (id === TOOL_SWORD) {
    // Blade (narrow vertical strip)
    ctx.fillStyle = iron;  ctx.fillRect(13, 2, 6, 18);
    ctx.fillStyle = hilite; ctx.fillRect(14, 2, 2, 18);
    // Tip
    ctx.fillStyle = iron;  ctx.fillRect(14, 0, 4, 3);
    ctx.fillStyle = hilite; ctx.fillRect(15, 0, 2, 2);
    // Guard (horizontal crossbar)
    ctx.fillStyle = iron;  ctx.fillRect(6, 19, 20, 4);
    ctx.fillStyle = hilite; ctx.fillRect(6, 19, 20, 2);
    // Handle
    ctx.fillStyle = wood;  ctx.fillRect(13, 23, 6, 8);
    ctx.fillStyle = '#c89a60'; ctx.fillRect(14, 24, 3, 6);
  } else if (id === TOOL_HOE) {
    // Handle (long diagonal-ish stick)
    ctx.fillStyle = wood;  ctx.fillRect(13, 8, 5, 22);
    ctx.fillStyle = '#c89a60'; ctx.fillRect(14, 9, 3, 20);
    // Head (flat angled blade at top-right)
    ctx.fillStyle = iron;  ctx.fillRect(14, 2, 14, 5);
    ctx.fillStyle = hilite; ctx.fillRect(14, 2, 14, 2);
    // Neck connecting head to handle
    ctx.fillStyle = iron;  ctx.fillRect(14, 7, 5, 3);
  }
}

function _drawMaterialIcon(ctx, id) {
  if (id === STICK) {
    ctx.strokeStyle = '#9a6b3a';
    ctx.lineWidth   = 4;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(6, 6); ctx.lineTo(26, 26);
    ctx.stroke();
    ctx.strokeStyle = '#c89a60';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(6, 6); ctx.lineTo(26, 26);
    ctx.stroke();
  } else if (id === COAL) {
    // Irregular dark coal lump
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.moveTo(16, 4); ctx.lineTo(24, 8); ctx.lineTo(28, 16);
    ctx.lineTo(24, 24); ctx.lineTo(14, 28); ctx.lineTo(6, 22);
    ctx.lineTo(4, 12); ctx.lineTo(10, 5); ctx.closePath();
    ctx.fill();
    // Highlight
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(10, 8, 5, 4);
    ctx.fillRect(14, 7, 3, 2);
  } else if (id === GOLD_COIN) {
    // Gold coin (circle with star)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(16, 16, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d97706';
    ctx.beginPath(); ctx.arc(16, 16, 12, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(16, 16, 12, 0, Math.PI * 2); ctx.stroke();
    // $$
    ctx.fillStyle = '#92400e';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('¢', 16, 17);
  }
}

// ── UI class ───────────────────────────────────────────────────────────────────

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
    this.invScreen    = document.getElementById('inventory-screen');

    this.actionEl    = document.getElementById('action-indicator');
    this.actionLabel = document.getElementById('action-label');
    this.breakRingFg = document.getElementById('break-ring-fg');
    this._ringCirc   = 106.8;

    // Crafting UI elements
    this.craftGrid    = document.getElementById('craft-grid');
    this.craftOutput  = document.getElementById('craft-output');
    this.craftHint    = document.getElementById('craft-hint');
    this.craftSizeLbl = document.getElementById('craft-size-label');
    this.invMainGrid  = document.getElementById('inv-main-grid');
    this.invHotbarRow = document.getElementById('inv-hotbar-row');

    // Cursor / dragged item
    this.cursorEl     = document.getElementById('cursor-item');
    this.cursorCanvas = document.getElementById('cursor-canvas');
    this.cursorCount  = document.getElementById('cursor-count');
    this._held        = null; // { id, count } currently held on cursor

    this._craftCells  = []; // craft grid slot elements
    this._craftResult = null;

    this._blockNameTimer = 0;
    this._lastSlot = -1;

    this._buildHotbarIcons();

    document.addEventListener('slotChange', (e) => {
      this._updateSlotHighlight(e.detail);
      this._showItemName(e.detail);
    });

    // Track cursor position over inventory screen
    this.invScreen.addEventListener('mousemove', (e) => {
      if (this._held) {
        this.cursorEl.style.left = `${e.clientX + 10}px`;
        this.cursorEl.style.top  = `${e.clientY + 6}px`;
      }
    });

    document.getElementById('close-inventory').addEventListener('click', () => this.closeInventory());
  }

  // ── Hotbar icon drawing (always-visible bar) ──────────────────────────────

  _buildHotbarIcons() {
    this.slots.forEach((slot, i) => {
      const iconDiv = slot.querySelector('.slot-icon');
      iconDiv.innerHTML = '';
      const c = document.createElement('canvas');
      c.width = 32; c.height = 32;
      c.style.cssText = 'width:32px;height:32px;image-rendering:pixelated';
      iconDiv.appendChild(c);
      this._refreshHotbarSlot(i);
    });
  }

  _refreshHotbarSlot(i) {
    const slot  = this.slots[i];
    const icon  = slot.querySelector('canvas');
    if (!icon) return;
    const stack = this.player.hotbar[i];
    drawIcon(icon, stack?.id, stack?.count);
    const lbl = slot.querySelector('.slot-label');
    if (lbl) lbl.textContent = i + 1;
  }

  _updateSlotHighlight(sel) {
    this.slots.forEach((s, i) => s.classList.toggle('active', i === sel));
  }

  _showItemName(slot) {
    const stack = this.player.hotbar[slot];
    const name  = getItemName(stack?.id) || '';
    this.blockNameEl.textContent = name;
    this.blockNameEl.classList.toggle('show', !!name);
    this._blockNameTimer = 2;
  }

  // ── Inventory / crafting screen ───────────────────────────────────────────

  openInventory(gridSize = 2) {
    this.player.craftGridSize = gridSize;
    this._held = null;
    this._buildCraftGrid(gridSize);
    this._buildInventorySlots();
    this._refreshInventoryScreen();
    this.craftSizeLbl.textContent = gridSize === 3 ? '(3×3 Crafting Table)' : '(2×2 Pocket)';
    this.cursorEl.classList.add('hidden');
    this.invScreen.classList.remove('hidden');
  }

  closeInventory() {
    // Return held item to inventory
    if (this._held) { this.player.addItem(this._held.id, this._held.count); this._held = null; }
    this.cursorEl.classList.add('hidden');

    // Return all craft grid items to inventory
    for (let i = 0; i < this.player.craftGrid.length; i++) {
      const s = this.player.craftGrid[i];
      if (s) { this.player.addItem(s.id, s.count); this.player.craftGrid[i] = null; }
    }
    this.player.craftGridSize = 2;
    this.invScreen.classList.add('hidden');
    this._buildHotbarIcons();
    document.dispatchEvent(new CustomEvent('inventoryClosed'));
  }

  isInventoryOpen() { return !this.invScreen.classList.contains('hidden'); }

  // Build the crafting grid cells
  _buildCraftGrid(size) {
    this.craftGrid.innerHTML = '';
    this.craftGrid.className = `craft-grid-cells size-${size}`;
    this._craftCells = [];
    const total = size * size;
    for (let i = 0; i < total; i++) {
      const cell = this._makeSlotEl('craft', i);
      this._craftCells.push(cell);
      this.craftGrid.appendChild(cell);
    }
    // Output slot
    const outCanvas = this.craftOutput.querySelector('canvas');
    this.craftOutput.onclick = () => this._onOutputClick();
  }

  // Build the 18-slot main inventory + 9-slot hotbar mirror
  _buildInventorySlots() {
    this.invMainGrid.innerHTML = '';
    this.invHotbarRow.innerHTML = '';

    for (let i = 0; i < 18; i++) {
      this.invMainGrid.appendChild(this._makeSlotEl('inv', i));
    }
    for (let i = 0; i < 9; i++) {
      this.invHotbarRow.appendChild(this._makeSlotEl('hotbar', i));
    }
  }

  _makeSlotEl(type, index) {
    const el = document.createElement('div');
    el.className = 'inv-slot';
    const c = document.createElement('canvas');
    c.width = 32; c.height = 32;
    c.style.cssText = 'width:28px;height:28px;image-rendering:pixelated';
    el.appendChild(c);
    const badge = document.createElement('span');
    badge.className = 'slot-badge';
    el.appendChild(badge);
    el.addEventListener('click', () => this._onSlotClick(type, index, el));
    return el;
  }

  // Refresh all slots in the inventory screen
  _refreshInventoryScreen() {
    // Craft grid
    const size = this.player.craftGridSize;
    this._craftCells.forEach((cell, i) => {
      const realIdx = _craftIdx(i, size);
      const stack   = this.player.craftGrid[realIdx];
      _paintSlot(cell, stack);
    });

    // Compute recipe output
    const gridIds = this.player.craftGrid
      .slice(0, size * size)
      .map(s => s?.id ?? null);
    this._craftResult = matchRecipe(gridIds, size);
    const outCanvas = this.craftOutput.querySelector('canvas');
    drawIcon(outCanvas, this._craftResult?.id, this._craftResult?.count);
    this.craftOutput.classList.toggle('has-result', !!this._craftResult);

    // Recipe hint
    if (this._craftResult) {
      this.craftHint.textContent = `→ ${getItemName(this._craftResult.id)} ×${this._craftResult.count}`;
    } else {
      this.craftHint.textContent = '';
    }

    // Main inventory
    const invCells = this.invMainGrid.querySelectorAll('.inv-slot');
    invCells.forEach((cell, i) => _paintSlot(cell, this.player.inventory[i]));

    // Hotbar mirror
    const hbCells = this.invHotbarRow.querySelectorAll('.inv-slot');
    hbCells.forEach((cell, i) => _paintSlot(cell, this.player.hotbar[i]));
  }

  // ── Slot click handler ─────────────────────────────────────────────────────

  _onSlotClick(type, index, el) {
    if (type === 'craft') {
      const size     = this.player.craftGridSize;
      const realIdx  = _craftIdx(index, size);
      const slotData = this.player.craftGrid[realIdx];

      if (this._held) {
        // Place one or all of held into craft slot
        const existing = slotData;
        if (existing && existing.id === this._held.id && existing.count < 64) {
          existing.count++;
          this._held.count--;
          if (this._held.count === 0) this._held = null;
        } else {
          // Swap
          this.player.craftGrid[realIdx] = { id: this._held.id, count: this._held.count };
          this._held = existing ? { id: existing.id, count: existing.count } : null;
        }
      } else if (slotData) {
        // Pick up from craft slot
        this._held = { id: slotData.id, count: slotData.count };
        this.player.craftGrid[realIdx] = null;
      }
    } else {
      const arr   = type === 'hotbar' ? this.player.hotbar : this.player.inventory;
      const stack = arr[index];

      if (this._held) {
        if (stack && stack.id === this._held.id && stack.count < 64) {
          // Stack onto existing
          const space = 64 - stack.count;
          const move  = Math.min(this._held.count, space);
          stack.count    += move;
          this._held.count -= move;
          if (this._held.count === 0) this._held = null;
        } else {
          // Swap held ↔ slot
          arr[index] = this._held.count > 0 ? this._held : null;
          this._held = stack ? { id: stack.id, count: stack.count } : null;
        }
      } else if (stack) {
        // Pick up
        this._held = { id: stack.id, count: stack.count };
        arr[index] = null;
      }
    }

    // Update cursor icon
    if (this._held) {
      drawIcon(this.cursorCanvas, this._held.id, this._held.count);
      this.cursorEl.classList.remove('hidden');
    } else {
      this.cursorEl.classList.add('hidden');
    }

    this._refreshInventoryScreen();
    this._buildHotbarIcons();
  }

  _onOutputClick() {
    if (!this._craftResult) return;
    const { id, count } = this._craftResult;

    // Check inventory has space
    const size    = this.player.craftGridSize;
    const total   = size * size;

    // Consume 1 of each ingredient in grid
    for (let i = 0; i < total; i++) {
      const s = this.player.craftGrid[i];
      if (!s) continue;
      s.count--;
      if (s.count === 0) this.player.craftGrid[i] = null;
    }

    // Add result — prefer held item stacking, then inventory
    if (this._held && this._held.id === id && this._held.count + count <= 64) {
      this._held.count += count;
      drawIcon(this.cursorCanvas, this._held.id, this._held.count);
    } else if (!this._held) {
      this._held = { id, count };
      drawIcon(this.cursorCanvas, id, count);
      this.cursorEl.classList.remove('hidden');
    } else {
      // Drop into inventory
      this.player.addItem(id, count);
    }

    this._refreshInventoryScreen();
    this._buildHotbarIcons();
  }

  // ── HUD update (every frame) ──────────────────────────────────────────────

  show() { this.overlay.classList.add('active'); }
  hide() { this.overlay.classList.remove('active'); }

  update(dt) {
    const p = this.player;

    // Block name fade
    if (this._blockNameTimer > 0) {
      this._blockNameTimer -= dt;
      if (this._blockNameTimer <= 0) this.blockNameEl.classList.remove('show');
    }

    // Slot highlight
    if (p.selectedSlot !== this._lastSlot) {
      this._updateSlotHighlight(p.selectedSlot);
      this._lastSlot = p.selectedSlot;
    }

    // Hotbar icons
    for (let i = 0; i < 9; i++) this._refreshHotbarSlot(i);

    // Health bar
    this.healthEl.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      const h      = document.createElement('div');
      const filled = p.health - i * 2;
      h.className  = 'heart' + (filled >= 2 ? '' : filled >= 1 ? ' half' : ' empty');
      this.healthEl.appendChild(h);
    }

    // Break ring + action indicator
    const info = p.getBreakInfo();
    if (info) {
      if (!info.canBreak) {
        this.breakRingFg.style.strokeDashoffset = this._ringCirc;
        this.breakRingFg.style.stroke = '#ff4444';
        this.actionLabel.textContent  = TOOL_NEEDED_LABEL[info.needsTool] || 'Wrong tool';
        this.actionLabel.style.color  = '#ff6666';
        this.actionEl.classList.remove('hidden');
        this.actionEl.classList.add('visible');
      } else if (info.fraction > 0) {
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

    // Debug info
    const heldStack = p.hotbar[p.selectedSlot];
    this.debugEl.innerHTML =
      `XYZ: ${p.pos.x.toFixed(1)}, ${p.pos.y.toFixed(1)}, ${p.pos.z.toFixed(1)}<br>` +
      `${p.flying ? 'FLY' : (p.onGround ? 'GROUND' : 'AIR')} | ` +
      `Slot ${p.selectedSlot + 1}: ${getItemName(heldStack?.id) || 'Empty'}` +
      (heldStack?.count > 1 ? ` ×${heldStack.count}` : '');
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

  // ── Dialog ────────────────────────────────────────────────────────────────

  openDialog(npc) {
    this._dialogNPC  = npc;
    this._treeActive = !!npc.conversationTree;

    this._renderDialogHeader(npc);

    if (this._treeActive) {
      this._treeNode = npc.conversationTree.nodes[npc.conversationTree.start];
      document.getElementById('dialog-actions').classList.add('hidden');
      document.getElementById('dialog-options').classList.remove('hidden');
      this._renderTreeNode();
    } else {
      document.getElementById('dialog-options').classList.add('hidden');
      document.getElementById('dialog-actions').classList.remove('hidden');
      document.getElementById('dialog-text').textContent = npc.nextLine();
      const shopBtn = document.getElementById('dialog-shop-btn');
      shopBtn.classList.toggle('hidden', npc.type !== 'merchant');
    }

    document.getElementById('dialog-screen').classList.remove('hidden');
  }

  _renderDialogHeader(npc) {
    document.getElementById('dialog-npc-name').textContent = npc.name;
    const BADGES = {
      merchant: 'Merchant', builder: 'Builder', police: 'Officer',
      businessperson: 'Business', tourist: 'Tourist', citizen: 'Citizen',
      shopkeeper: 'Shopkeeper',
    };
    const ROLE_BADGES = {
      shopkeeper: 'Shopkeeper', chef: 'Chef',
      office_worker: 'Office Worker', researcher: 'Researcher',
    };
    document.getElementById('dialog-npc-badge').textContent =
      (npc.role && ROLE_BADGES[npc.role]) || BADGES[npc.type] || 'Citizen';

    const AVATAR_COLORS = {
      merchant: '#f59e0b', builder: '#d97706', police: '#1d4ed8',
      businessperson: '#4b5563', tourist: '#f472b6', citizen: '#3b82f6',
      shopkeeper: '#7c3aed',
    };
    const ROLE_COLORS = {
      shopkeeper: '#7c3aed', chef: '#ef4444',
      office_worker: '#0ea5e9', researcher: '#4b5563',
    };
    const bodyColor  = (npc.role && ROLE_COLORS[npc.role]) || AVATAR_COLORS[npc.type] || '#3b82f6';
    const shirtColor = bodyColor;

    const av  = document.getElementById('dialog-avatar');
    const ctx = av.getContext('2d');
    ctx.clearRect(0, 0, 48, 48);
    ctx.fillStyle = shirtColor;
    ctx.fillRect(10, 4, 28, 28);
    ctx.fillStyle = shirtColor;
    ctx.fillRect(8, 32, 32, 14);
    ctx.fillStyle = '#f0c898';
    ctx.fillRect(13, 8, 22, 20);
  }

  _renderTreeNode() {
    const node = this._treeNode;
    document.getElementById('dialog-text').textContent = node.text;
    const opts = document.getElementById('dialog-options');
    opts.innerHTML = '';
    for (const opt of node.options) {
      const btn = document.createElement('button');
      btn.className = 'dlg-opt';
      if (opt.action === 'buy')   btn.classList.add('action-buy');
      if (opt.action === 'sell')  btn.classList.add('action-sell');
      if (opt.action === 'close') btn.classList.add('action-close');
      btn.textContent = opt.text;
      btn.addEventListener('click', () => this._selectTreeOption(opt));
      opts.appendChild(btn);
    }
  }

  _selectTreeOption(opt) {
    if (opt.action === 'buy') {
      document.dispatchEvent(new CustomEvent('openShop', { detail: { mode: 'buy' } }));
      return;
    }
    if (opt.action === 'sell') {
      document.dispatchEvent(new CustomEvent('openShop', { detail: { mode: 'sell' } }));
      return;
    }
    if (opt.action === 'close' || !opt.next) {
      document.dispatchEvent(new CustomEvent('dialogClose'));
      return;
    }
    const nextNode = this._dialogNPC.conversationTree.nodes[opt.next];
    if (nextNode) { this._treeNode = nextNode; this._renderTreeNode(); }
  }

  closeDialog() {
    document.getElementById('dialog-screen').classList.add('hidden');
    document.getElementById('dialog-options').classList.add('hidden');
    document.getElementById('dialog-actions').classList.remove('hidden');
  }

  // ── Shop ──────────────────────────────────────────────────────────────────

  openShop(npc, player, mode = 'buy') {
    this._shopPlayer = player;
    this._shopNPC    = npc;
    this._shopMode   = mode;
    document.getElementById('shop-npc-name').textContent = npc.name;
    this._setShopTab(mode);
    this._refreshShop();
    document.getElementById('shop-screen').classList.remove('hidden');
    document.getElementById('dialog-screen').classList.add('hidden');

    document.getElementById('shop-tab-buy').onclick = () => {
      this._shopMode = 'buy';
      this._setShopTab('buy');
      this._refreshShop();
    };
    document.getElementById('shop-tab-sell').onclick = () => {
      this._shopMode = 'sell';
      this._setShopTab('sell');
      this._refreshShop();
    };
  }

  _setShopTab(mode) {
    document.getElementById('shop-tab-buy') .classList.toggle('active', mode === 'buy');
    document.getElementById('shop-tab-sell').classList.toggle('active', mode === 'sell');
    // Show sell tab only for NPCs that accept selling (have wares or are shopkeeper)
    const npc = this._shopNPC;
    const canSell = npc && (npc.wares || npc.type === 'shopkeeper');
    document.getElementById('shop-tab-sell').style.display = canSell ? '' : 'none';
  }

  _refreshShop() {
    const player = this._shopPlayer;
    const npc    = this._shopNPC;
    const coins  = player.countItem(GOLD_COIN);
    document.getElementById('shop-coin-count').textContent = coins;

    const grid = document.getElementById('shop-items-grid');
    grid.innerHTML = '';

    if (this._shopMode === 'sell') {
      this._renderSellGrid(player, grid);
    } else {
      this._renderBuyGrid(player, npc, coins, grid);
    }
  }

  _renderBuyGrid(player, npc, coins, grid) {
    if (!npc.wares) {
      const msg = document.createElement('p');
      msg.style.cssText = 'color:#888;text-align:center;padding:20px 0';
      msg.textContent = 'This vendor has nothing to sell.';
      grid.appendChild(msg);
      return;
    }
    for (const item of npc.wares) {
      const card = document.createElement('div');
      card.className = 'shop-item-card' + (coins < item.price ? ' cannot-afford' : '');

      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 32;
      drawIcon(canvas, item.id, item.count);
      card.appendChild(canvas);

      const lbl = document.createElement('span');
      lbl.className = 'shop-item-label';
      lbl.textContent = item.label;
      card.appendChild(lbl);

      const price = document.createElement('span');
      price.className = 'shop-item-price';
      price.textContent = `${item.price} coin${item.price !== 1 ? 's' : ''}`;
      card.appendChild(price);

      const btn = document.createElement('button');
      btn.className = 'shop-buy-btn';
      btn.textContent = 'Buy';
      btn.disabled = coins < item.price;
      btn.addEventListener('click', () => {
        const removed = player.removeItem(GOLD_COIN, item.price);
        if (removed < item.price) { player.addItem(GOLD_COIN, removed); return; }
        player.addItem(item.id, item.count);
        document.getElementById('shop-status').textContent = `Bought: ${item.label}`;
        this._refreshShop();
      });
      card.appendChild(btn);
      grid.appendChild(card);
    }
  }

  _renderSellGrid(player, grid) {
    // Gather all sellable items from hotbar + inventory
    const allSlots = [
      ...player.hotbar.map((s, i) => ({ s, src: 'hotbar', i })),
      ...player.inventory.map((s, i) => ({ s, src: 'inv', i })),
    ].filter(({ s }) => s && s.id && SELL_PRICES[s.id]);

    if (allSlots.length === 0) {
      const msg = document.createElement('p');
      msg.style.cssText = 'color:#888;text-align:center;padding:20px 0';
      msg.textContent = 'Nothing to sell. Mine or craft items first.';
      grid.appendChild(msg);
      return;
    }

    for (const { s, src, i } of allSlots) {
      const sellPrice = SELL_PRICES[s.id] || 1;
      const card = document.createElement('div');
      card.className = 'shop-item-card';

      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 32;
      drawIcon(canvas, s.id, s.count);
      card.appendChild(canvas);

      const lbl = document.createElement('span');
      lbl.className = 'shop-item-label';
      lbl.textContent = `${getItemName(s.id)} ×${s.count}`;
      card.appendChild(lbl);

      const price = document.createElement('span');
      price.className = 'shop-item-price';
      price.textContent = `${sellPrice * s.count} coin${sellPrice * s.count !== 1 ? 's' : ''}`;
      card.appendChild(price);

      const btn = document.createElement('button');
      btn.className = 'shop-buy-btn';
      btn.textContent = 'Sell All';
      btn.addEventListener('click', () => {
        const arr = src === 'hotbar' ? player.hotbar : player.inventory;
        const stack = arr[i];
        if (!stack) return;
        const total = sellPrice * stack.count;
        arr[i] = null;
        player.addItem(GOLD_COIN, total);
        document.getElementById('shop-status').textContent =
          `Sold ${getItemName(s.id)} ×${stack.count} for ${total} coins`;
        this._refreshShop();
      });
      card.appendChild(btn);
      grid.appendChild(card);
    }
  }

  closeShop() {
    document.getElementById('shop-screen').classList.add('hidden');
    this._shopPlayer = null;
    this._shopNPC    = null;
    this._shopMode   = 'buy';
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────

// Map visual cell index (0-based within the shown grid) to craftGrid array index
function _craftIdx(cellIndex, size) {
  return cellIndex; // craftGrid is always stored as size×size flat array
}

function _paintSlot(el, stack) {
  const c = el.querySelector('canvas');
  if (c) drawIcon(c, stack?.id, stack?.count);
  const badge = el.querySelector('.slot-badge');
  if (badge) badge.textContent = (stack?.count > 1) ? stack.count : '';
  el.classList.toggle('has-item', !!stack);
}
