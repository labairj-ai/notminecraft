// ── Block IDs ──────────────────────────────────────────────────────────────────
export const AIR           = 0;
export const GRASS         = 1;
export const DIRT          = 2;
export const STONE         = 3;
export const SAND          = 4;
export const GRAVEL        = 5;
export const WOOD          = 6;
export const LEAVES        = 7;
export const PLANKS        = 8;
export const COBBLESTONE   = 9;
export const BEDROCK       = 10;
export const GLASS         = 11;
export const SNOW_BLOCK    = 12;
export const ICE           = 13;
export const WATER         = 14;
export const CRAFTING      = 15;
export const FURNACE       = 16;
export const COAL_ORE      = 17;
export const IRON_ORE      = 18;
export const GOLD_ORE      = 19;
export const DIAMOND_ORE   = 20;
export const LAVA          = 21;
export const GLOWSTONE     = 22;
export const TNT           = 23;
export const OBSIDIAN      = 24;
export const BRICK         = 25;
export const BOOKSHELF     = 26;
export const MOSSY_COBBLE  = 27;
export const SPONGE        = 28;
export const WOOL          = 29;
export const TORCH         = 30;
export const CHEST         = 31;
export const BED           = 32;
export const CONCRETE      = 33;  // city building material
export const ASPHALT       = 34;  // city road
export const DOOR_CLOSED   = 35;  // wooden door (solid, right-click to open)
export const DOOR_OPEN     = 36;  // open doorway (passable, right-click to close)
export const SIDEWALK      = 37;  // city pavement
export const CLAY          = 38;  // raw clay (found underwater)
export const CHAIR         = 39;
export const TABLE         = 40;
export const LAMP          = 41;  // emissive amber
export const COUNTER       = 42;  // kitchen/bar counter
export const DESK          = 43;
export const TV            = 44;  // dark screen
export const STOOL         = 45;  // bar/office stool
export const FILING_CABINET = 46;
export const ESCALATOR_UP  = 47;

// ── Tool / material item IDs (not placeable blocks) ──────────────────────────
export const TOOL_PICKAXE  = 50;
export const TOOL_AXE      = 51;
export const TOOL_SHOVEL   = 52;
export const STICK         = 53;  // crafting material
export const COAL          = 54;  // drops from COAL_ORE; crafts torches
export const TOOL_SWORD    = 55;
export const TOOL_HOE      = 56;
export const GOLD_COIN     = 57;  // currency
export const IRON_INGOT    = 60;  // crafted from iron ore
export const STEEL_INGOT   = 61;  // iron ingot + coal
export const VEHICLE       = 62;  // deployable car

// ── Block definitions ─────────────────────────────────────────────────────────
// action      – which tool class applies ('dig'|'chop'|'mine'|'break')
// breakTime   – seconds to break WITH the correct tool
// requiresTool – if true, wrong tool or bare hands = no progress at all
// handMult    – multiplier applied when no correct tool (ignored if requiresTool)
//               lower = easier to hand-break; typical range 1.5–6
export const BLOCK_DEFS = [
  null, // 0 = AIR
  //                          action   bt    req    hmul  textures                                              color
  { name:'Grass',         solid:true,  action:'dig',   breakTime:0.4,  requiresTool:false, handMult:2.5,  textures:{ top:[0,0], side:[1,0], bottom:[2,0] }, color:'#5d9c33' },
  { name:'Dirt',          solid:true,  action:'dig',   breakTime:0.4,  requiresTool:false, handMult:2.5,  textures:{ all:[2,0] },                            color:'#8B5E3C' },
  { name:'Stone',         solid:true,  action:'mine',  breakTime:1.5,  requiresTool:true,               textures:{ all:[3,0] },                            color:'#888' },
  { name:'Sand',          solid:true,  action:'dig',   breakTime:0.5,  requiresTool:false, handMult:2.0,  textures:{ all:[4,0] },                            color:'#e8d99b' },
  { name:'Gravel',        solid:true,  action:'dig',   breakTime:0.6,  requiresTool:false, handMult:2.0,  textures:{ all:[5,0] },                            color:'#999' },
  { name:'Wood Log',      solid:true,  action:'chop',  breakTime:2.0,  requiresTool:false, handMult:4.0,  textures:{ top:[6,0], side:[7,0], bottom:[6,0] },  color:'#6b4c2a' },
  { name:'Leaves',        solid:true,  action:'break', breakTime:0.2,  requiresTool:false, handMult:1.0,  transparent:true, textures:{ all:[8,0] },           color:'#2d7a1f' },
  { name:'Planks',        solid:true,  action:'chop',  breakTime:1.5,  requiresTool:false, handMult:3.5,  textures:{ all:[9,0] },                            color:'#c8a264' },
  { name:'Cobblestone',   solid:true,  action:'mine',  breakTime:2.0,  requiresTool:true,               textures:{ all:[10,0] },                           color:'#777' },
  { name:'Bedrock',       solid:true,  action:'mine',  breakTime:999,  requiresTool:true,  unbreakable:true, textures:{ all:[11,0] },                       color:'#333' },
  { name:'Glass',         solid:true,  action:'break', breakTime:0.3,  requiresTool:false, handMult:1.0,  transparent:true, textures:{ all:[13,0] },          color:'#9dcfe8' },
  { name:'Snow Block',    solid:true,  action:'dig',   breakTime:0.3,  requiresTool:false, handMult:1.5,  textures:{ top:[12,0], side:[12,0], bottom:[2,0]}, color:'#eef' },
  { name:'Ice',           solid:true,  action:'mine',  breakTime:0.5,  requiresTool:false, handMult:3.0,  transparent:true, textures:{ all:[14,0] },          color:'#9bc8e8' },
  { name:'Water',         solid:false, action:'break', breakTime:0.1,  requiresTool:false, handMult:1.0,  transparent:true, liquid:true, textures:{ all:[15,0] }, color:'#2255aa' },
  { name:'Crafting Table',solid:true,  action:'chop',  breakTime:1.5,  requiresTool:false, handMult:3.5,  textures:{ top:[0,1], side:[1,1], bottom:[2,0] },  color:'#c8a264' },
  { name:'Furnace',       solid:true,  action:'mine',  breakTime:1.25, requiresTool:true,               textures:{ top:[2,1], side:[4,1], bottom:[2,0] },   color:'#777' },
  { name:'Coal Ore',      solid:true,  action:'mine',  breakTime:2.5,  requiresTool:true,               textures:{ all:[5,1] },                             color:'#555' },
  { name:'Iron Ore',      solid:true,  action:'mine',  breakTime:3.0,  requiresTool:true,               textures:{ all:[6,1] },                             color:'#c8a090' },
  { name:'Gold Ore',      solid:true,  action:'mine',  breakTime:3.0,  requiresTool:true,               textures:{ all:[7,1] },                             color:'#e8c830' },
  { name:'Diamond Ore',   solid:true,  action:'mine',  breakTime:5.0,  requiresTool:true,               textures:{ all:[8,1] },                             color:'#5be8e8' },
  { name:'Lava',          solid:false, action:'break', breakTime:0.5,  requiresTool:false, handMult:1.0,  liquid:true, emissive:true, textures:{ all:[9,1] }, color:'#f04010' },
  { name:'Glowstone',     solid:true,  action:'mine',  breakTime:0.75, requiresTool:true,               textures:{ all:[10,1] },                            color:'#f0d060' },
  { name:'TNT',           solid:true,  action:'break', breakTime:0.5,  requiresTool:false, handMult:1.0,  textures:{ top:[11,1], side:[12,1], bottom:[13,1]}, color:'#e04040' },
  { name:'Obsidian',      solid:true,  action:'mine',  breakTime:10.0, requiresTool:true,               textures:{ all:[14,1] },                            color:'#1a0a2e' },
  { name:'Brick',         solid:true,  action:'mine',  breakTime:1.5,  requiresTool:true,               textures:{ all:[15,1] },                            color:'#a0503c' },
  { name:'Bookshelf',     solid:true,  action:'chop',  breakTime:1.5,  requiresTool:false, handMult:3.5,  textures:{ top:[9,0], side:[0,2], bottom:[9,0] },  color:'#c8a264' },
  { name:'Mossy Cobble',  solid:true,  action:'mine',  breakTime:2.0,  requiresTool:true,               textures:{ all:[1,2] },                             color:'#5a7a5a' },
  { name:'Sponge',        solid:true,  action:'dig',   breakTime:0.5,  requiresTool:false, handMult:1.5,  textures:{ all:[2,2] },                            color:'#d0cc60' },
  { name:'Wool',          solid:true,  action:'break', breakTime:0.2,  requiresTool:false, handMult:1.0,  textures:{ all:[3,2] },                            color:'#eeeeff' },
  { name:'Torch',         solid:true,  action:'break', breakTime:0.05, requiresTool:false, handMult:1.0,  emissive:true, textures:{ all:[4,2] },             color:'#f0c040' },
  { name:'Chest',         solid:true,  action:'chop',  breakTime:1.5,  requiresTool:false, handMult:3.5,  textures:{ top:[5,2], side:[6,2], bottom:[5,2] }, color:'#a07030' },
  { name:'Bed',           solid:true,  action:'break', breakTime:0.2,  requiresTool:false, handMult:1.0,  textures:{ all:[7,2] },                            color:'#cc4444' },
  { name:'Concrete',      solid:true,  action:'mine',  breakTime:2.0,  requiresTool:true,               textures:{ all:[8,2] },                            color:'#909090' },
  { name:'Asphalt',       solid:true,  action:'mine',  breakTime:1.5,  requiresTool:true,               textures:{ all:[9,2] },                            color:'#2c2c2c' },
  { name:'Door',          solid:true,  action:'chop',  breakTime:1.0,  requiresTool:false, handMult:3.0, textures:{ all:[10,2] },                           color:'#7a4010' },
  { name:'Door (Open)',   solid:false, action:'break', breakTime:0.1,  requiresTool:false, handMult:1.0, transparent:true, textures:{ all:[11,2] },          color:'rgba(120,70,20,0.15)' },
  { name:'Sidewalk',      solid:true,  action:'mine',  breakTime:1.0,  requiresTool:true,               textures:{ all:[12,2] },                            color:'#c8c8c4' },
  { name:'Clay',          solid:true,  action:'dig',   breakTime:0.5,  requiresTool:false, handMult:1.5, textures:{ all:[13,2] },                            color:'#8090a8' },
  { name:'Chair',          solid:true, action:'chop', breakTime:0.8, requiresTool:false, handMult:3.0, textures:{ all:[0,3] }, color:'#8B6030' },
  { name:'Table',          solid:true, action:'chop', breakTime:1.0, requiresTool:false, handMult:3.5, textures:{ all:[1,3] }, color:'#c8a264' },
  { name:'Lamp',           solid:true, action:'break', breakTime:0.3, requiresTool:false, handMult:1.0, emissive:true, textures:{ all:[2,3] }, color:'#f0c040' },
  { name:'Counter',        solid:true, action:'mine', breakTime:1.5, requiresTool:true, textures:{ all:[3,3] }, color:'#909090' },
  { name:'Desk',           solid:true, action:'chop', breakTime:1.0, requiresTool:false, handMult:3.5, textures:{ all:[4,3] }, color:'#a07030' },
  { name:'TV',             solid:true, action:'break', breakTime:0.5, requiresTool:false, handMult:1.0, emissive:true, textures:{ top:[5,3], side:[5,3], bottom:[5,3] }, color:'#111111' },
  { name:'Stool',          solid:true, action:'chop', breakTime:0.6, requiresTool:false, handMult:3.0, textures:{ all:[6,3] }, color:'#7a5230' },
  { name:'Filing Cabinet', solid:true, action:'mine', breakTime:1.5, requiresTool:true, textures:{ all:[7,3] }, color:'#808080' },
  { name:'Escalator',     solid:false, action:'break', breakTime:0.3, requiresTool:false, handMult:1.0, emissive:true, textures:{ all:[8,3] }, color:'#f0c040' },
];

// ── Tool definitions ───────────────────────────────────────────────────────────
export const TOOL_DEFS = {
  [TOOL_PICKAXE]: { name:'Pickaxe', toolAction:'mine', isItem:true, maxStack:1 },
  [TOOL_AXE]:     { name:'Axe',     toolAction:'chop', isItem:true, maxStack:1 },
  [TOOL_SHOVEL]:  { name:'Shovel',  toolAction:'dig',  isItem:true, maxStack:1 },
  [TOOL_SWORD]:   { name:'Sword',   toolAction:'swing',isItem:true, maxStack:1 },
  [TOOL_HOE]:     { name:'Hoe',     toolAction:'till', isItem:true, maxStack:1 },
};

// ── Material item definitions ──────────────────────────────────────────────────
export const ITEM_DEFS = {
  [STICK]: { name:'Stick', isItem:true, maxStack:64 },
  [COAL]:      { name:'Coal',      isItem:true, maxStack:64 },
  [GOLD_COIN]: { name:'Gold Coin', isItem:true, maxStack:999 },
  [IRON_INGOT]:    { name:'Iron Ingot',   isItem:true, maxStack:64 },
  [STEEL_INGOT]:   { name:'Steel Ingot',  isItem:true, maxStack:64 },
  [VEHICLE]:       { name:'Vehicle',      isItem:true, maxStack:1  },
};

// ── Block drop overrides (id → drop instead of the block itself) ───────────────
// Used when mining returns a different item than the block placed.
export const BLOCK_DROPS = {
  [COAL_ORE]: { id: COAL, count: 1 },
};

// Returns the def for any item ID (block, tool, or material).
export function getAnyDef(id) {
  return BLOCK_DEFS[id] || TOOL_DEFS[id] || ITEM_DEFS[id] || null;
}

export function getItemName(id) {
  return TOOL_DEFS[id]?.name || ITEM_DEFS[id]?.name || BLOCK_DEFS[id]?.name || '';
}

export function maxStack(id) {
  if (TOOL_DEFS[id]) return TOOL_DEFS[id].maxStack ?? 1;
  if (ITEM_DEFS[id]) return ITEM_DEFS[id].maxStack ?? 64;
  return 64; // default for blocks
}

// Which tool type (action) a held item provides. Returns null for bare hands / blocks.
export function getToolAction(itemId) {
  return TOOL_DEFS[itemId]?.toolAction ?? null;
}

// ── Action display labels ──────────────────────────────────────────────────────
export const ACTION_LABELS = {
  dig:   'Digging',
  chop:  'Chopping',
  mine:  'Mining',
  break: 'Breaking',
};

export const TOOL_NEEDED_LABEL = {
  mine: 'Needs a Pickaxe',
  chop: 'Needs an Axe',
  dig:  'Needs a Shovel',
};

// ── Block helpers ──────────────────────────────────────────────────────────────
export function getDef(id)        { return BLOCK_DEFS[id] || null; }
export function isSolid(id)       { return id > 0 && !!BLOCK_DEFS[id]?.solid; }
export function isTransparent(id) { return id === AIR || !!(BLOCK_DEFS[id]?.transparent); }
export function isLiquid(id)      { return !!(BLOCK_DEFS[id]?.liquid); }
export function isEmissive(id)    { return !!(BLOCK_DEFS[id]?.emissive); }

export function getTexCoord(id, face) {
  const def = BLOCK_DEFS[id];
  if (!def) return [0, 0];
  const t = def.textures;
  if (t.all) return t.all;
  if (face === 'top'    && t.top)    return t.top;
  if (face === 'bottom' && t.bottom) return t.bottom;
  if (t.side) return t.side;
  return t.top || [0, 0];
}

// ── Hotbar / inventory ─────────────────────────────────────────────────────────
// Player starts with an empty hotbar — pick up tools/blocks by mining or via inventory (E)
export const DEFAULT_HOTBAR = [AIR, AIR, AIR, AIR, AIR, AIR, AIR, AIR, AIR];

export const ALL_BLOCKS = [
  GRASS, DIRT, STONE, SAND, GRAVEL, WOOD, LEAVES, PLANKS,
  COBBLESTONE, GLASS, SNOW_BLOCK, ICE, CRAFTING, FURNACE,
  COAL_ORE, IRON_ORE, GOLD_ORE, DIAMOND_ORE, GLOWSTONE, TNT,
  OBSIDIAN, BRICK, BOOKSHELF, MOSSY_COBBLE, SPONGE, LAVA,
  WOOL, TORCH, CHEST, BED, CONCRETE, ASPHALT, DOOR_CLOSED, SIDEWALK, CLAY,
  CHAIR, TABLE, LAMP, COUNTER, DESK, TV, STOOL, FILING_CABINET, ESCALATOR_UP,
];

// All items shown in the creative picker (tools + materials + blocks)
export const ALL_ITEMS = [
  TOOL_PICKAXE, TOOL_AXE, TOOL_SHOVEL, TOOL_SWORD, TOOL_HOE,
  STICK, COAL, GOLD_COIN,
  ...ALL_BLOCKS,
];
