import { BLOCK_DEFS } from './blocks.js';
import { CHUNK_SIZE, CHUNK_HEIGHT } from './terrain.js';

const SIZE    = 128;  // canvas resolution (pixels)
const HALF    = SIZE / 2;
const SCALE   = 1;    // 1 pixel = 1 block → 64-block radius visible

// Parse BLOCK_DEFS hex colors → [r, g, b] once at load time
const _COLORS = BLOCK_DEFS.map(def => {
  if (!def || !def.color) return null;
  const c = def.color;
  if (c.startsWith('rgba')) return [60, 40, 15];
  const m = c.match(/^#([0-9a-f]{3,6})$/i);
  if (!m) return null;
  const h = m[1].length === 3
    ? m[1].split('').map(x => x + x).join('')
    : m[1];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
});

export class Minimap {
  constructor(canvas, world) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.world  = world;
    this._frame = 0;
    this._img   = this.ctx.createImageData(SIZE, SIZE);
    this._cx    = null; // last center x used for terrain bake
    this._cz    = null;

    // Precompute circle mask — which pixels are inside the circle
    this._inside = new Uint8Array(SIZE * SIZE);
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const dx = x - HALF + 0.5, dz = y - HALF + 0.5;
        if (dx * dx + dz * dz < HALF * HALF) this._inside[y * SIZE + x] = 1;
      }
    }

    // Pre-fill alpha for out-of-circle pixels (stays transparent)
    const d = this._img.data;
    for (let i = 0; i < SIZE * SIZE; i++) {
      if (!this._inside[i]) { d[i * 4 + 3] = 0; }
    }
  }

  render(playerX, playerZ, playerYaw, npcs) {
    this._frame++;

    const cx = Math.round(playerX);
    const cz = Math.round(playerZ);

    // Rebuild terrain only when the player has moved a few blocks, plus a slow
    // periodic refresh to pick up block edits and freshly loaded chunks.
    // (The bake scans 128×128 columns — doing it every few frames tanked FPS.)
    if (this._cx === null ||
        Math.abs(cx - this._cx) > 2 ||
        Math.abs(cz - this._cz) > 2 ||
        this._frame % 30 === 0) {
      this._cx = cx;
      this._cz = cz;
      this._bakeTerrain(cx, cz);
    }

    this.ctx.putImageData(this._img, 0, 0);
    this._drawNPCs(npcs, playerX, playerZ);
    this._drawPlayer(playerYaw);
    this._drawCompass();
  }

  _bakeTerrain(cx, cz) {
    const data   = this._img.data;
    const chunks = this.world.chunks;

    for (let py = 0; py < SIZE; py++) {
      for (let px = 0; px < SIZE; px++) {
        const i = py * SIZE + px;
        if (!this._inside[i]) continue;

        const wx = cx + (px - HALF);
        const wz = cz + (py - HALF);

        const ccx  = Math.floor(wx / CHUNK_SIZE);
        const ccz  = Math.floor(wz / CHUNK_SIZE);
        const chunk = chunks.get(`${ccx},${ccz}`);

        const i4 = i * 4;

        if (!chunk || !chunk.data) {
          // Unloaded area — dark
          data[i4]     = 20;
          data[i4 + 1] = 20;
          data[i4 + 2] = 22;
          data[i4 + 3] = 255;
          continue;
        }

        const lx     = wx - ccx * CHUNK_SIZE;
        const lz     = wz - ccz * CHUNK_SIZE;
        const base   = lx + lz * CHUNK_SIZE;
        const stride = CHUNK_SIZE * CHUNK_SIZE; // 256

        let cr = 20, cg = 20, cb = 22;
        let topY = -1;

        for (let y = CHUNK_HEIGHT - 1; y >= 0; y--) {
          const blockId = chunk.data[base + y * stride];
          if (blockId !== 0) {
            const col = _COLORS[blockId];
            if (col) {
              // Height-based shading: higher = brighter
              const shade = 0.65 + (y / (CHUNK_HEIGHT - 1)) * 0.45;
              cr = Math.min(255, (col[0] * shade) | 0);
              cg = Math.min(255, (col[1] * shade) | 0);
              cb = Math.min(255, (col[2] * shade) | 0);
              topY = y;
            }
            break;
          }
        }

        data[i4]     = cr;
        data[i4 + 1] = cg;
        data[i4 + 2] = cb;
        data[i4 + 3] = 255;
      }
    }
  }

  _drawNPCs(npcs, playerX, playerZ) {
    if (!npcs) return;
    const ctx = this.ctx;
    for (const [, npc] of npcs._npcs) {
      const dx = npc.pos.x - playerX;
      const dz = npc.pos.z - playerZ;
      if (Math.abs(dx) > HALF || Math.abs(dz) > HALF) continue;

      const sx = HALF + dx;
      const sy = HALF + dz;
      // stay inside circle
      if ((sx - HALF) * (sx - HALF) + (sy - HALF) * (sy - HALF) > (HALF - 3) * (HALF - 3)) continue;

      const isShopkeeper = npc.type === 'shopkeeper' || npc.type === 'merchant';
      ctx.beginPath();
      ctx.arc(sx, sy, isShopkeeper ? 3 : 2, 0, Math.PI * 2);
      ctx.fillStyle = isShopkeeper ? '#ffd700' : '#e0e0ff';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.7)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  _drawPlayer(yaw) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(HALF, HALF);
    // yaw=0 → facing -Z = north = up on map → no rotation
    ctx.rotate(-yaw);

    ctx.beginPath();
    ctx.moveTo(0, -8);   // forward tip
    ctx.lineTo(-5, 6);
    ctx.lineTo(0, 3);
    ctx.lineTo(5, 6);
    ctx.closePath();

    ctx.fillStyle   = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth   = 1.5;
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  _drawCompass() {
    const ctx = this.ctx;
    const r   = HALF - 6;
    ctx.font          = 'bold 8px monospace';
    ctx.textAlign     = 'center';
    ctx.textBaseline  = 'middle';
    ctx.shadowColor   = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur    = 3;

    ctx.fillStyle = '#ff5555';   // N in Fortnite-style red
    ctx.fillText('N', HALF, HALF - r);

    ctx.fillStyle = 'rgba(220,220,220,0.85)';
    ctx.fillText('S', HALF, HALF + r);
    ctx.fillText('W', HALF - r, HALF);
    ctx.fillText('E', HALF + r, HALF);

    ctx.shadowBlur = 0;
  }
}
