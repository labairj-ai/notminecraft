// ── Crafting recipes ──────────────────────────────────────────────────────────
//
// Shaped recipe   { size, rows: [[id|null,...],…], result:{id,count} }
//   rows describes the bounding-box of the filled cells (null = empty within it).
//   The matcher trims the grid to its bounding box before comparing, so a recipe
//   placed anywhere in a larger grid still matches.
//
// Shapeless recipe { size, shapeless:true, ingredients:[id,…], result:{id,count} }
//   ingredients may repeat (e.g. [PLANKS,PLANKS] = exactly two planks, no extras).
//
// size = minimum grid dimension required (2 or 3).

import {
  WOOD, PLANKS, COBBLESTONE, STONE, SAND, GRAVEL, CRAFTING, FURNACE, LEAVES,
  WOOL, TORCH, CHEST, BED, GLASS, BRICK, MOSSY_COBBLE, CONCRETE, ASPHALT,
  DOOR_CLOSED, SIDEWALK, CLAY,
  STICK, COAL, TOOL_PICKAXE, TOOL_AXE, TOOL_SHOVEL, TOOL_SWORD, TOOL_HOE,
} from './blocks.js';

const P  = PLANKS;
const S  = STICK;
const C  = COBBLESTONE;
const W  = WOOD;
const L  = LEAVES;

export const RECIPES = [
  // ── 2×2 pocket (or 3×3 table) ─────────────────────────────────────────────

  // 1 log → 4 planks (shapeless)
  { size: 2, shapeless: true, ingredients: [W],
    result: { id: P, count: 4 } },

  // 2 planks vertically → 4 sticks
  { size: 2, rows: [[P], [P]],
    result: { id: S, count: 4 } },

  // 4 planks in 2×2 → crafting table
  { size: 2, rows: [[P, P], [P, P]],
    result: { id: CRAFTING, count: 1 } },

  // ── 3×3 crafting table only ────────────────────────────────────────────────

  // Pickaxe — wooden: PPP / _S_ / _S_
  { size: 3, rows: [[P, P, P], [null, S, null], [null, S, null]],
    result: { id: TOOL_PICKAXE, count: 1 } },

  // Pickaxe — stone:  CCC / _S_ / _S_
  { size: 3, rows: [[C, C, C], [null, S, null], [null, S, null]],
    result: { id: TOOL_PICKAXE, count: 1 } },

  // Axe — wooden left: PP / PS / _S
  { size: 3, rows: [[P, P], [P, S], [null, S]],
    result: { id: TOOL_AXE, count: 1 } },

  // Axe — wooden right (mirror): PP / SP / S_
  { size: 3, rows: [[P, P], [S, P], [S, null]],
    result: { id: TOOL_AXE, count: 1 } },

  // Axe — stone left / right
  { size: 3, rows: [[C, C], [C, S], [null, S]],
    result: { id: TOOL_AXE, count: 1 } },
  { size: 3, rows: [[C, C], [S, C], [S, null]],
    result: { id: TOOL_AXE, count: 1 } },

  // Shovel — wooden: _P_ / _S_ / _S_  (1×3 column)
  { size: 3, rows: [[P], [S], [S]],
    result: { id: TOOL_SHOVEL, count: 1 } },

  // Shovel — stone
  { size: 3, rows: [[C], [S], [S]],
    result: { id: TOOL_SHOVEL, count: 1 } },

  // ── Sword ─────────────────────────────────────────────────────────────────
  // Wooden sword: P / P / S  (1×3 column)
  { size: 3, rows: [[P], [P], [S]],
    result: { id: TOOL_SWORD, count: 1 } },

  // Stone sword: C / C / S
  { size: 3, rows: [[C], [C], [S]],
    result: { id: TOOL_SWORD, count: 1 } },

  // ── Hoe ───────────────────────────────────────────────────────────────────
  // Wooden hoe left: PP / _S / _S
  { size: 3, rows: [[P, P], [null, S], [null, S]],
    result: { id: TOOL_HOE, count: 1 } },

  // Wooden hoe right: PP / S_ / S_
  { size: 3, rows: [[P, P], [S, null], [S, null]],
    result: { id: TOOL_HOE, count: 1 } },

  // Stone hoe left / right
  { size: 3, rows: [[C, C], [null, S], [null, S]],
    result: { id: TOOL_HOE, count: 1 } },
  { size: 3, rows: [[C, C], [S, null], [S, null]],
    result: { id: TOOL_HOE, count: 1 } },

  // ── Torch ─────────────────────────────────────────────────────────────────
  // 1 coal + 1 stick (vertical, 2×2 or 3×3)
  { size: 2, rows: [[COAL], [S]],
    result: { id: TORCH, count: 4 } },

  // ── Chest — 8 planks in a ring ────────────────────────────────────────────
  { size: 3, rows: [[P, P, P], [P, null, P], [P, P, P]],
    result: { id: CHEST, count: 1 } },

  // ── Furnace — 8 cobblestone ring ──────────────────────────────────────────
  { size: 3, rows: [[C, C, C], [C, null, C], [C, C, C]],
    result: { id: FURNACE, count: 1 } },

  // ── Bed — 3 wool + 3 planks (canonical)  ──────────────────────────────────
  { size: 3, rows: [[WOOL, WOOL, WOOL], [P, P, P]],
    result: { id: BED, count: 1 } },

  // Bed — leaves variant (accessible from day 1 with just wood + leaves)
  { size: 3, rows: [[L, L, L], [P, P, P]],
    result: { id: BED, count: 1 } },

  // ── City materials ────────────────────────────────────────────────────────

  // Glass: 3 sand in a row (3×3 table) → 3 glass
  { size: 3, rows: [[SAND, SAND, SAND]],
    result: { id: GLASS, count: 3 } },

  // Brick block: 4 cobblestone 2×2 → 2 brick (compressed stone → fired brick look)
  { size: 2, rows: [[C, C], [C, C]],
    result: { id: BRICK, count: 2 } },

  // Brick block from clay: 4 clay 2×2 → 2 brick (clay kiln-fired)
  { size: 2, rows: [[CLAY, CLAY], [CLAY, CLAY]],
    result: { id: BRICK, count: 2 } },

  // Mossy cobblestone: cobblestone + leaves (shapeless, 2×2)
  { size: 2, shapeless: true, ingredients: [C, LEAVES],
    result: { id: MOSSY_COBBLE, count: 1 } },

  // Concrete: 2 gravel + 2 stone → 4 concrete (shapeless, 2×2)
  { size: 2, shapeless: true, ingredients: [GRAVEL, GRAVEL, STONE, STONE],
    result: { id: CONCRETE, count: 4 } },

  // Asphalt: 3 gravel + 1 coal → 4 asphalt (shapeless, 2×2)
  { size: 2, shapeless: true, ingredients: [GRAVEL, GRAVEL, GRAVEL, COAL],
    result: { id: ASPHALT, count: 4 } },

  // Sidewalk: 4 stone 2×2 → 4 sidewalk paving slabs
  { size: 2, rows: [[STONE, STONE], [STONE, STONE]],
    result: { id: SIDEWALK, count: 4 } },

  // Door: 6 planks in 2×3 pattern (3×3 table) → 1 door
  { size: 3, rows: [[P, P], [P, P], [P, P]],
    result: { id: DOOR_CLOSED, count: 1 } },
];

// ── Recipe matcher ─────────────────────────────────────────────────────────────
// slots  – flat array of item IDs or null, length = gridSize * gridSize
// gridSize – 2 or 3
// Returns { id, count } or null.
export function matchRecipe(slots, gridSize) {
  // ── Bounding box of non-null cells ────────────────────────────────────────
  let minR = gridSize, maxR = -1, minC = gridSize, maxC = -1;
  for (let i = 0; i < slots.length; i++) {
    if (slots[i] != null) {
      const r = Math.floor(i / gridSize);
      const c = i % gridSize;
      if (r < minR) minR = r;
      if (r > maxR) maxR = r;
      if (c < minC) minC = c;
      if (c > maxC) maxC = c;
    }
  }
  if (maxR < 0) return null; // empty grid

  const bH = maxR - minR + 1;
  const bW = maxC - minC + 1;

  // Bounding box contents as 2-D array
  const bbox = [];
  for (let r = minR; r <= maxR; r++) {
    const row = [];
    for (let c = minC; c <= maxC; c++) {
      row.push(slots[r * gridSize + c] ?? null);
    }
    bbox.push(row);
  }

  for (const recipe of RECIPES) {
    if (recipe.size > gridSize) continue;

    if (recipe.shapeless) {
      // Count items in the grid exactly
      const have = {};
      for (const id of slots) if (id != null) have[id] = (have[id] || 0) + 1;
      const need = {};
      for (const id of recipe.ingredients) need[id] = (need[id] || 0) + 1;
      if (Object.keys(have).length !== Object.keys(need).length) continue;
      let ok = true;
      for (const [id, n] of Object.entries(need)) {
        if (have[id] !== n) { ok = false; break; }
      }
      if (ok) return recipe.result;

    } else {
      // Shaped: bounding box must match recipe dimensions
      const rH = recipe.rows.length;
      const rW = Math.max(...recipe.rows.map(r => r.length));
      if (bH !== rH || bW !== rW) continue;

      let ok = true;
      for (let r = 0; r < rH && ok; r++) {
        for (let c = 0; c < rW && ok; c++) {
          const expected = recipe.rows[r][c] ?? null;
          const actual   = bbox[r]?.[c] ?? null;
          if (expected !== actual) ok = false;
        }
      }
      if (ok) return recipe.result;
    }
  }
  return null;
}
