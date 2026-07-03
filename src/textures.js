// Generates a 256x64 texture atlas (16 cols x 4 rows, 16x16px each)
// flipY = false: canvas y=0 → UV v=0

export const ATLAS_COLS = 16;
export const ATLAS_ROWS = 4;
export const TEX_SIZE = 16;

function rng(seed) {
  let s = (seed * 1664525 + 1013904223) >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0xffffffff; };
}

function fill(ctx, col, row, color) {
  ctx.fillStyle = color;
  ctx.fillRect(col * TEX_SIZE, row * TEX_SIZE, TEX_SIZE, TEX_SIZE);
}

function px(ctx, col, row, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(col * TEX_SIZE + x, row * TEX_SIZE + y, 1, 1);
}

function noise(ctx, col, row, colors, density = 0.3, seed = 0) {
  const r = rng(col * 100 + row * 1000 + seed);
  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      if (r() < density) {
        px(ctx, col, row, x, y, colors[Math.floor(r() * colors.length)]);
      }
    }
  }
}

function hLine(ctx, col, row, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(col * TEX_SIZE, row * TEX_SIZE + y, TEX_SIZE, 1);
}

function vLine(ctx, col, row, x, color) {
  ctx.fillStyle = color;
  ctx.fillRect(col * TEX_SIZE + x, row * TEX_SIZE, 1, TEX_SIZE);
}

export function createAtlas() {
  const W = ATLAS_COLS * TEX_SIZE;
  const H = ATLAS_ROWS * TEX_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // ── ROW 0 ──────────────────────────────────────────────────────────────────

  // [0,0] grass_top
  fill(ctx, 0, 0, '#5d9c33');
  noise(ctx, 0, 0, ['#6aad3a','#4f8a2d','#72b840','#3d7020'], 0.4, 1);

  // [1,0] grass_side
  fill(ctx, 1, 0, '#8B5E3C');
  noise(ctx, 1, 0, ['#7a5230','#9e6b42'], 0.25, 2);
  // green top strip
  for (let x = 0; x < 16; x++) {
    const h = 3 + Math.floor(rng(x * 7)() * 3);
    for (let y = 0; y < h; y++) {
      px(ctx, 1, 0, x, y, ['#5d9c33','#4f8a2d','#6aad3a'][Math.floor(rng(x*3+y)() * 3)]);
    }
  }

  // [2,0] dirt
  fill(ctx, 2, 0, '#8B5E3C');
  noise(ctx, 2, 0, ['#7a5230','#9e6b42','#6b4820','#a07040'], 0.35, 3);

  // [3,0] stone
  fill(ctx, 3, 0, '#888');
  noise(ctx, 3, 0, ['#999','#777','#6a6a6a','#aaa'], 0.3, 4);

  // [4,0] sand
  fill(ctx, 4, 0, '#e8d99b');
  noise(ctx, 4, 0, ['#f0e4a8','#d8c880','#e0d090'], 0.3, 5);

  // [5,0] gravel
  fill(ctx, 5, 0, '#909090');
  noise(ctx, 5, 0, ['#808080','#a0a0a0','#787878','#b0b0b0'], 0.4, 6);
  // gravel clumps
  { const r = rng(60);
    for (let i = 0; i < 8; i++) {
      const x = Math.floor(r() * 14); const y = Math.floor(r() * 14);
      ctx.fillStyle = '#b8b8b8';
      ctx.fillRect(5 * TEX_SIZE + x, 0 * TEX_SIZE + y, 2, 2);
    }
  }

  // [6,0] wood_top (log cross-section rings)
  fill(ctx, 6, 0, '#c8a060');
  { const cx = 6*16+8, cy = 0*16+8;
    ctx.strokeStyle = '#8B5E3C'; ctx.lineWidth = 1;
    for (let r2 = 2; r2 <= 6; r2 += 2) {
      ctx.beginPath(); ctx.arc(cx, cy, r2, 0, Math.PI*2); ctx.stroke();
    }
    ctx.fillStyle = '#6b4820';
    ctx.fillRect(cx-1, cy-1, 2, 2);
  }

  // [7,0] wood_side (vertical grain)
  fill(ctx, 7, 0, '#a07030');
  { const r = rng(70);
    for (let x = 0; x < 16; x++) {
      const shade = ['#a07030','#8B5E20','#b08040','#956030'][Math.floor(r() * 4)];
      vLine(ctx, 7, 0, x, shade);
    }
  }

  // [8,0] leaves
  fill(ctx, 8, 0, '#2d7a1f');
  noise(ctx, 8, 0, ['#1f6015','#3a9028','#256618','#48a830'], 0.5, 8);
  // sparse transparent holes
  { const r = rng(80);
    for (let i = 0; i < 8; i++) {
      px(ctx, 8, 0, Math.floor(r()*16), Math.floor(r()*16), 'rgba(0,0,0,0)');
    }
  }

  // [9,0] planks (horizontal grain)
  fill(ctx, 9, 0, '#c8a264');
  for (let y = 0; y < 16; y += 4) {
    hLine(ctx, 9, 0, y, '#8B6030');
    noise(ctx, 9, 0, ['#d4ac70','#bc9858'], 0.2, y + 90);
  }
  { const r = rng(95);
    vLine(ctx, 9, 0, 8, '#a07840' + '88');
    for (let y = 0; y < 16; y++) {
      if (r() < 0.15) px(ctx, 9, 0, 8, y, '#a07840');
    }
  }

  // [10,0] cobblestone
  fill(ctx, 10, 0, '#777');
  { const r = rng(100);
    // draw mortar lines
    for (let y = 0; y < 16; y += 4) hLine(ctx, 10, 0, y, '#555');
    for (let y2 = 0; y2 < 4; y2++) {
      const offset = y2 % 2 === 0 ? 0 : 8;
      for (let x = offset; x < 16; x += 8) {
        vLine(ctx, 10, 0, x === 0 ? 0 : x, '#555');
      }
    }
    noise(ctx, 10, 0, ['#888','#666','#999'], 0.2, 101);
  }

  // [11,0] bedrock
  fill(ctx, 11, 0, '#222');
  noise(ctx, 11, 0, ['#333','#111','#444','#2a2a2a'], 0.5, 110);

  // [12,0] snow
  fill(ctx, 12, 0, '#eef4ff');
  noise(ctx, 12, 0, ['#dde8f8','#f8fcff','#c8d8f0'], 0.2, 120);

  // [13,0] glass (transparent window pane — used by GLASS block id=11)
  fill(ctx, 13, 0, 'rgba(185,228,248,0.17)'); // very transparent tint
  ctx.strokeStyle = 'rgba(130,195,228,0.92)'; // visible frame
  ctx.lineWidth = 1.5;
  ctx.strokeRect(13*TEX_SIZE+0.75, 0*TEX_SIZE+0.75, TEX_SIZE-1.5, TEX_SIZE-1.5);
  // cross-pane dividers
  ctx.strokeStyle = 'rgba(150,210,240,0.7)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(13*TEX_SIZE+8, 0*TEX_SIZE+1);
  ctx.lineTo(13*TEX_SIZE+8, 0*TEX_SIZE+TEX_SIZE-1);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(13*TEX_SIZE+1, 0*TEX_SIZE+8);
  ctx.lineTo(13*TEX_SIZE+TEX_SIZE-1, 0*TEX_SIZE+8);
  ctx.stroke();
  // subtle highlight in top-left corner (light reflection)
  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  ctx.fillRect(13*TEX_SIZE+2, 0*TEX_SIZE+2, 4, 2);

  // [14,0] ice
  fill(ctx, 14, 0, 'rgba(140,190,230,0.7)');
  noise(ctx, 14, 0, ['rgba(160,210,240,0.5)','rgba(120,170,210,0.5)'], 0.2, 140);
  ctx.strokeStyle = 'rgba(180,220,255,0.8)';
  ctx.lineWidth = 1;
  ctx.strokeRect(14*TEX_SIZE+0.5, 0*TEX_SIZE+0.5, TEX_SIZE-1, TEX_SIZE-1);

  // [15,0] water
  fill(ctx, 15, 0, 'rgba(30,80,200,0.75)');
  noise(ctx, 15, 0, ['rgba(20,60,180,0.6)','rgba(50,110,220,0.7)'], 0.3, 150);
  for (let y = 2; y < 16; y += 5) hLine(ctx, 15, 0, y, 'rgba(80,140,240,0.5)');

  // ── ROW 1 ──────────────────────────────────────────────────────────────────

  // [0,1] crafting_top (cross pattern)
  fill(ctx, 0, 1, '#c8a264');
  for (let y = 0; y < 16; y += 4) hLine(ctx, 0, 1, y, '#8B6030');
  { const cx = 0*TEX_SIZE, cy = 1*TEX_SIZE;
    ctx.fillStyle = '#5a3a10';
    // 3x3 grid of craft slots
    for (let gx = 0; gx < 3; gx++) {
      for (let gy = 0; gy < 3; gy++) {
        ctx.fillRect(cx + 2 + gx*5, cy + 2 + gy*5, 3, 3);
      }
    }
  }

  // [1,1] crafting_side
  fill(ctx, 1, 1, '#c8a264');
  for (let y = 0; y < 16; y += 4) hLine(ctx, 1, 1, y, '#8B6030');
  // "CRAFTING" stripe
  ctx.fillStyle = '#5a3a10';
  ctx.fillRect(1*TEX_SIZE+1, 1*TEX_SIZE+5, TEX_SIZE-2, 6);
  ctx.fillStyle = '#c8a264';
  ctx.fillRect(1*TEX_SIZE+2, 1*TEX_SIZE+6, TEX_SIZE-4, 4);

  // [2,1] furnace_top
  fill(ctx, 2, 1, '#777');
  noise(ctx, 2, 1, ['#888','#666'], 0.25, 21);

  // [3,1] furnace_front
  fill(ctx, 3, 1, '#777');
  noise(ctx, 3, 1, ['#888','#666'], 0.2, 31);
  // furnace opening (dark square)
  ctx.fillStyle = '#111';
  ctx.fillRect(3*TEX_SIZE+3, 1*TEX_SIZE+3, 10, 10);
  ctx.fillStyle = '#f04010';
  ctx.fillRect(3*TEX_SIZE+5, 1*TEX_SIZE+9, 6, 4);

  // [4,1] furnace_side
  fill(ctx, 4, 1, '#777');
  noise(ctx, 4, 1, ['#888','#666'], 0.2, 41);
  ctx.fillStyle = '#555';
  ctx.fillRect(4*TEX_SIZE+3, 1*TEX_SIZE+3, TEX_SIZE-6, TEX_SIZE-6);

  // [5,1] coal_ore
  fill(ctx, 5, 1, '#888');
  noise(ctx, 5, 1, ['#999','#777'], 0.2, 51);
  { const r = rng(510);
    for (let i = 0; i < 6; i++) {
      const x = Math.floor(r()*12)+2; const y = Math.floor(r()*12)+2;
      ctx.fillStyle = '#111';
      ctx.fillRect(5*TEX_SIZE+x, 1*TEX_SIZE+y, 2, 2);
    }
  }

  // [6,1] iron_ore
  fill(ctx, 6, 1, '#888');
  noise(ctx, 6, 1, ['#999','#777'], 0.2, 61);
  { const r = rng(610);
    for (let i = 0; i < 5; i++) {
      const x = Math.floor(r()*12)+2; const y = Math.floor(r()*12)+2;
      ctx.fillStyle = '#c09080';
      ctx.fillRect(6*TEX_SIZE+x, 1*TEX_SIZE+y, 2, 2);
    }
  }

  // [7,1] gold_ore
  fill(ctx, 7, 1, '#888');
  noise(ctx, 7, 1, ['#999','#777'], 0.2, 71);
  { const r = rng(710);
    for (let i = 0; i < 5; i++) {
      const x = Math.floor(r()*12)+2; const y = Math.floor(r()*12)+2;
      ctx.fillStyle = '#e8c830';
      ctx.fillRect(7*TEX_SIZE+x, 1*TEX_SIZE+y, 2, 2);
    }
  }

  // [8,1] diamond_ore
  fill(ctx, 8, 1, '#888');
  noise(ctx, 8, 1, ['#999','#777'], 0.2, 81);
  { const r = rng(810);
    for (let i = 0; i < 5; i++) {
      const x = Math.floor(r()*12)+2; const y = Math.floor(r()*12)+2;
      ctx.fillStyle = '#30e8e8';
      ctx.fillRect(8*TEX_SIZE+x, 1*TEX_SIZE+y, 2, 2);
    }
  }

  // [9,1] lava
  fill(ctx, 9, 1, '#f04010');
  noise(ctx, 9, 1, ['#f86020','#d83000','#ff8030','#e05000'], 0.4, 91);
  { const r = rng(912);
    for (let i = 0; i < 6; i++) {
      const x = Math.floor(r()*14)+1; const y = Math.floor(r()*14)+1;
      ctx.fillStyle = '#ffcc40';
      ctx.fillRect(9*TEX_SIZE+x, 1*TEX_SIZE+y, 2, 2);
    }
  }

  // [10,1] glowstone
  fill(ctx, 10, 1, '#f0d060');
  noise(ctx, 10, 1, ['#e8c840','#fff080','#d8a830'], 0.35, 101);
  { const r = rng(1010);
    for (let i = 0; i < 4; i++) {
      const x = Math.floor(r()*14)+1; const y = Math.floor(r()*14)+1;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(10*TEX_SIZE+x, 1*TEX_SIZE+y, 1, 1);
    }
  }

  // [11,1] tnt_top
  fill(ctx, 11, 1, '#e04040');
  ctx.fillStyle = '#fff';
  ctx.fillRect(11*TEX_SIZE+4, 1*TEX_SIZE+4, 8, 8);

  // [12,1] tnt_side
  fill(ctx, 12, 1, '#e04040');
  // white/red stripes
  for (let y = 0; y < 16; y += 4) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(12*TEX_SIZE, 1*TEX_SIZE+y, TEX_SIZE, 2);
  }
  ctx.fillStyle = '#222';
  ctx.fillRect(12*TEX_SIZE+2, 1*TEX_SIZE+5, 12, 6);
  ctx.fillStyle = '#e04040';
  ctx.fillRect(12*TEX_SIZE+3, 1*TEX_SIZE+6, 10, 4);

  // [13,1] tnt_bottom
  fill(ctx, 13, 1, '#e04040');
  ctx.fillStyle = '#fff';
  ctx.fillRect(13*TEX_SIZE+4, 1*TEX_SIZE+4, 8, 8);

  // [14,1] obsidian
  fill(ctx, 14, 1, '#1a0a2e');
  noise(ctx, 14, 1, ['#2a1040','#0e0620','#3a1860'], 0.3, 141);
  { const r = rng(1410);
    for (let i = 0; i < 4; i++) {
      px(ctx, 14, 1, Math.floor(r()*16), Math.floor(r()*16), '#6030a0');
    }
  }

  // [15,1] brick
  fill(ctx, 15, 1, '#a0503c');
  noise(ctx, 15, 1, ['#b06048','#905038'], 0.2, 151);
  // mortar lines
  for (let y = 0; y < 16; y += 4) hLine(ctx, 15, 1, y, '#7a3828');
  for (let row2 = 0; row2 < 4; row2++) {
    const offset = row2 % 2 === 0 ? 4 : 0;
    vLine(ctx, 15, 1, (offset + 8) % 16, '#7a3828');
  }

  // ── ROW 2 ──────────────────────────────────────────────────────────────────

  // [0,2] bookshelf_side
  fill(ctx, 0, 2, '#c8a264');
  for (let y = 0; y < 16; y += 4) hLine(ctx, 0, 2, y, '#8B6030');
  // book spines
  const bookColors = ['#a02020','#2040c0','#208040','#c08000','#802080'];
  { const r = rng(200);
    for (let bx = 1; bx < 15; bx += 3) {
      const color = bookColors[Math.floor(r() * bookColors.length)];
      ctx.fillStyle = color;
      ctx.fillRect(0*TEX_SIZE+bx, 2*TEX_SIZE+1, 2, 14);
    }
  }

  // [1,2] mossy_cobblestone
  fill(ctx, 1, 2, '#777');
  for (let y = 0; y < 16; y += 4) hLine(ctx, 1, 2, y, '#555');
  { const r2 = rng(120);
    for (let x = 0; x < 16; x += 8) vLine(ctx, 1, 2, x, '#555');
    noise(ctx, 1, 2, ['#4a7a30','#3a6020','#5a8838'], 0.25, 122);
  }

  // [2,2] sponge
  fill(ctx, 2, 2, '#c8c040');
  noise(ctx, 2, 2, ['#d0cc50','#b8b030'], 0.25, 220);
  { const r = rng(222);
    for (let i = 0; i < 20; i++) {
      px(ctx, 2, 2, Math.floor(r()*16), Math.floor(r()*16), '#888820');
    }
  }

  // ── ROW 2 continued ────────────────────────────────────────────────────────

  // [3,2] wool (soft white)
  fill(ctx, 3, 2, '#e8e8f0');
  noise(ctx, 3, 2, ['#d8d8e8','#f4f4ff','#ccccdd','#f0f0fc'], 0.35, 320);

  // [4,2] torch (glowing amber)
  fill(ctx, 4, 2, '#f0c040');
  noise(ctx, 4, 2, ['#ffe060','#d8a020','#fff080','#e8b030'], 0.4, 420);
  // bright core
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(4*TEX_SIZE+6, 2*TEX_SIZE+5, 4, 4);
  ctx.fillStyle = '#ffe880';
  ctx.fillRect(4*TEX_SIZE+5, 2*TEX_SIZE+4, 6, 6);

  // [5,2] chest_top
  fill(ctx, 5, 2, '#b08840');
  noise(ctx, 5, 2, ['#c09850','#a07830'], 0.2, 520);
  for (let y2 = 0; y2 < 16; y2 += 4) hLine(ctx, 5, 2, y2, '#8B6020');
  ctx.strokeStyle = '#604010'; ctx.lineWidth = 1;
  ctx.strokeRect(5*TEX_SIZE+0.5, 2*TEX_SIZE+0.5, TEX_SIZE-1, TEX_SIZE-1);
  ctx.fillStyle = '#555'; ctx.fillRect(5*TEX_SIZE+6, 2*TEX_SIZE+6, 4, 4);
  ctx.fillStyle = '#888'; ctx.fillRect(5*TEX_SIZE+7, 2*TEX_SIZE+7, 2, 2);

  // [6,2] chest_side
  fill(ctx, 6, 2, '#b08840');
  noise(ctx, 6, 2, ['#c09850','#a07830'], 0.2, 620);
  for (let y2 = 0; y2 < 16; y2 += 4) hLine(ctx, 6, 2, y2, '#8B6020');
  ctx.strokeStyle = '#604010'; ctx.lineWidth = 1;
  ctx.strokeRect(6*TEX_SIZE+0.5, 2*TEX_SIZE+0.5, TEX_SIZE-1, TEX_SIZE-1);
  ctx.fillStyle = '#909090'; ctx.fillRect(6*TEX_SIZE+1, 2*TEX_SIZE+7, 14, 2);
  ctx.fillStyle = '#686868'; ctx.fillRect(6*TEX_SIZE+6, 2*TEX_SIZE+4, 4, 7);
  ctx.fillStyle = '#404040'; ctx.fillRect(6*TEX_SIZE+7, 2*TEX_SIZE+6, 2, 4);

  // [8,2] concrete (smooth gray panels)
  fill(ctx, 8, 2, '#8e8e8e');
  noise(ctx, 8, 2, ['#9a9a9a','#828282','#959595'], 0.15, 820);
  // Subtle panel lines
  hLine(ctx, 8, 2, 0,  '#7a7a7a');
  hLine(ctx, 8, 2, 8,  '#7a7a7a');
  vLine(ctx, 8, 2, 0,  '#7a7a7a');
  vLine(ctx, 8, 2, 8,  '#7a7a7a');

  // [9,2] asphalt (dark road surface)
  fill(ctx, 9, 2, '#2c2c2c');
  noise(ctx, 9, 2, ['#383838','#222222','#303030'], 0.3, 920);
  { const rr = rng(921);
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = 'rgba(80,80,80,0.5)';
      ctx.fillRect(9*TEX_SIZE + Math.floor(rr()*15), 2*TEX_SIZE + Math.floor(rr()*15), 1, 1);
    }
  }

  // [10,2] door_closed (wooden door panel with frame and knob)
  fill(ctx, 10, 2, '#8B4513');
  noise(ctx, 10, 2, ['#7a3a0a','#9a4a18','#6e3208'], 0.2, 1020);
  // frame border
  ctx.strokeStyle = '#4a2000'; ctx.lineWidth = 1;
  ctx.strokeRect(10*TEX_SIZE+0.5, 2*TEX_SIZE+0.5, TEX_SIZE-1, TEX_SIZE-1);
  // upper panel
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(10*TEX_SIZE+3, 2*TEX_SIZE+2, TEX_SIZE-6, 5);
  // lower panel
  ctx.fillRect(10*TEX_SIZE+3, 2*TEX_SIZE+9, TEX_SIZE-6, 5);
  // centre rail
  hLine(ctx, 10, 2, 8, '#4a2000');
  // door knob (gold)
  ctx.fillStyle = '#fbbf24'; ctx.fillRect(10*TEX_SIZE+11, 2*TEX_SIZE+8, 2, 2);
  ctx.fillStyle = '#ca8a04'; ctx.fillRect(10*TEX_SIZE+12, 2*TEX_SIZE+9, 1, 1);

  // [11,2] door_open (ghost — thin frame outline only, center transparent)
  // leave center pixels as canvas-default transparent (alphaTest culls them)
  ctx.strokeStyle = 'rgba(100,55,10,0.5)'; ctx.lineWidth = 2;
  ctx.strokeRect(11*TEX_SIZE+1.5, 2*TEX_SIZE+1.5, TEX_SIZE-3, TEX_SIZE-3);

  // [7,2] bed (red with pillow)
  fill(ctx, 7, 2, '#cc3333');
  noise(ctx, 7, 2, ['#dd4444','#bb2222'], 0.2, 720);
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillRect(7*TEX_SIZE+0, 2*TEX_SIZE+5, 16, 3);
  ctx.fillRect(7*TEX_SIZE+0, 2*TEX_SIZE+11, 16, 2);
  ctx.fillStyle = '#eeeeff';
  ctx.fillRect(7*TEX_SIZE+2, 2*TEX_SIZE+1, 12, 4);
  noise(ctx, 7, 2, ['rgba(200,200,230,0.5)'], 0.2, 721);

  return canvas;
}

export function getAtlasUV(col, row) {
  const u0 = col / ATLAS_COLS;
  const u1 = (col + 1) / ATLAS_COLS;
  const v0 = row / ATLAS_ROWS;
  const v1 = (row + 1) / ATLAS_ROWS;
  return { u0, u1, v0, v1 };
}
