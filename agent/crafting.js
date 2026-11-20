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

// Select the actual wooden recipe. The stone recipe uses the same output ID.
const pickaxe = RECIPES.find(recipe => recipe.result.id === B.TOOL_PICKAXE && recipe.rows[0].includes(B.PLANKS));
const planks = RECIPES.find(recipe => recipe.result.id === B.PLANKS);
const sticks = RECIPES.find(recipe => recipe.result.id === B.STICK);
const table = RECIPES.find(recipe => recipe.result.id === B.CRAFTING);

const ingredients = recipe => (recipe.ingredients ?? recipe.rows.flat()).filter(id => id != null);
const amount = (recipe, id) => ingredients(recipe).filter(item => item === id).length;

export function pickaxeStep(inventory, tableAvailable) {
  if (countItem(inventory, B.TOOL_PICKAXE)) return { kind: 'equip', missing: [] };

  const needSticks = countItem(inventory, B.STICK) < amount(pickaxe, B.STICK);
  const needTable = !tableAvailable && !countItem(inventory, B.CRAFTING);
  const requiredPlanks = amount(pickaxe, B.PLANKS) +
    (needSticks ? amount(sticks, B.PLANKS) : 0) + (needTable ? amount(table, B.PLANKS) : 0);
  const lackingPlanks = Math.max(0, requiredPlanks - countItem(inventory, B.PLANKS));
  const lackingLogs = Math.max(0, Math.ceil(lackingPlanks / planks.result.count) - countItem(inventory, B.WOOD));
  const missing = lackingLogs ? [{ id: B.WOOD, count: lackingLogs }] : [];

  if (lackingPlanks && countItem(inventory, B.WOOD)) return { kind: 'craft', recipe: planks, missing };
  if (lackingPlanks) return { kind: 'gather', missing };
  if (needSticks) return { kind: 'craft', recipe: sticks, missing };
  if (needTable) return { kind: 'craft', recipe: table, missing };
  if (!tableAvailable) return { kind: 'place', missing };
  return { kind: 'craft', recipe: pickaxe, missing };
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
