import * as B from '../src/blocks.js';
import { matchRecipe, RECIPES } from '../src/crafting.js';

const SLOTS = 27;
export const PICKAXE_GOAL = 'Craft and use a wooden-recipe pickaxe';

export function countItem(inventory, id) {
  return inventory.reduce((total, slot) => total + (slot.id === id ? slot.count : 0), 0);
}

export function availableSlot(inventory, { id, count }) {
  const existing = inventory.findIndex(slot => slot.id === id && slot.count + count <= B.maxStack(id));
  if (existing !== -1) return existing;
  return count <= B.maxStack(id) && inventory.length < SLOTS ? inventory.length : -1;
}

export function takeItems(inventory, id, count) {
  if (countItem(inventory, id) < count) return false;
  for (const slot of inventory) {
    if (slot.id !== id) continue;
    const taken = Math.min(count, slot.count);
    slot.count -= taken;
    count -= taken;
  }
  return true;
}

// The two basic pickaxe recipes share an item ID and stats. Explorer uses wood.
const recipes = new Map(RECIPES.filter(recipe =>
  [B.PLANKS, B.STICK, B.CRAFTING].includes(recipe.result.id) ||
  (recipe.result.id === B.TOOL_PICKAXE && recipe.rows[0].includes(B.PLANKS))
).map(recipe => [recipe.result.id, recipe]));

export function supplyStep(inventory, id, count, tableAvailable = false) {
  const stock = new Map(inventory.map(slot => [slot.id, countItem(inventory, slot.id)]));
  const missing = new Map();
  let first;
  let tableReady = tableAvailable;

  function ensure(item, required) {
    const have = stock.get(item) ?? 0;
    const recipe = recipes.get(item);
    if (have >= required) return;
    if (!recipe) {
      missing.set(item, (missing.get(item) ?? 0) + required - have);
      stock.set(item, required);
      first ??= { kind: 'gather', item };
      return;
    }
    const placeTable = recipe.size === 3 && !tableReady;
    if (placeTable) {
      ensure(B.CRAFTING, 1);
      stock.set(B.CRAFTING, stock.get(B.CRAFTING) - 1);
      tableReady = true;
    }
    const batches = Math.ceil((required - have) / recipe.result.count);
    const ingredients = (recipe.ingredients ?? recipe.rows.flat()).filter(id => id != null);
    for (let batch = 0; batch < batches; batch++) {
      for (const ingredient of new Set(ingredients)) {
        const units = ingredients.filter(id => id === ingredient).length;
        ensure(ingredient, units);
        stock.set(ingredient, stock.get(ingredient) - units);
      }
      first ??= placeTable ? { kind: 'place' } : { kind: 'craft', recipe };
    }
    stock.set(item, have + batches * recipe.result.count);
  }

  ensure(id, count);
  return { ...(first ?? { kind: 'ready' }), missing: [...missing].map(([id, count]) => ({ id, count })) };
}

export function pickaxeStep(inventory, tableAvailable) {
  const step = supplyStep(inventory, B.TOOL_PICKAXE, 1, tableAvailable);
  return step.kind === 'ready' ? { ...step, kind: 'equip' } : step;
}

export function craft(inventory, recipe, gridSize) {
  if (gridSize < recipe.size) return { error: 'A crafting table is required' };
  const grid = Array(gridSize ** 2).fill(null);
  if (recipe.shapeless) {
    recipe.ingredients.forEach((id, i) => { grid[i] = { id, count: 1 }; });
  } else {
    recipe.rows.forEach((row, y) => row.forEach((id, x) => {
      if (id != null) grid[y * gridSize + x] = { id, count: 1 };
    }));
  }
  const matched = matchRecipe(grid, gridSize);
  if (matched?.result.id !== recipe.result.id || matched.result.count !== recipe.result.count) {
    return { error: 'The game rejected the recipe' };
  }
  const next = inventory.map(slot => ({ ...slot }));
  const consumed = {};
  for (const [i, count] of matched.consume.entries()) {
    if (!count) continue;
    const { id } = grid[i];
    if (!takeItems(next, id, count)) return { error: `Missing ${B.getItemName(id)}` };
    consumed[id] = (consumed[id] ?? 0) + count;
  }
  const remaining = next.filter(slot => slot.count);
  const slot = availableSlot(remaining, matched.result);
  if (slot < 0) return { error: 'Inventory is full' };
  if (remaining[slot]) remaining[slot].count += matched.result.count;
  else remaining.push({ ...matched.result });
  return { inventory: remaining, consumed, produced: matched.result };
}
