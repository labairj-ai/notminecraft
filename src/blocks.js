// Block IDs
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

// Atlas layout: 16 columns x 4 rows, each texture 16x16 px → 256x64 canvas
// textures: { top:[col,row], side:[col,row], bottom:[col,row] }
// shorthand 'all' sets top/side/bottom to same coords
// action: what verb/tool applies  breakTime: seconds to break
export const BLOCK_DEFS = [
  null, // 0 = AIR
  { name: 'Grass',         solid: true,  action:'dig',   breakTime:0.5,  textures: { top:[0,0], side:[1,0], bottom:[2,0] }, color:'#5d9c33' },
  { name: 'Dirt',          solid: true,  action:'dig',   breakTime:0.5,  textures: { all:[2,0] },                            color:'#8B5E3C' },
  { name: 'Stone',         solid: true,  action:'mine',  breakTime:1.5,  textures: { all:[3,0] },                            color:'#888' },
  { name: 'Sand',          solid: true,  action:'dig',   breakTime:0.4,  textures: { all:[4,0] },                            color:'#e8d99b' },
  { name: 'Gravel',        solid: true,  action:'dig',   breakTime:0.5,  textures: { all:[5,0] },                            color:'#999' },
  { name: 'Wood Log',      solid: true,  action:'chop',  breakTime:1.0,  textures: { top:[6,0], side:[7,0], bottom:[6,0] },  color:'#6b4c2a' },
  { name: 'Leaves',        solid: true,  action:'break', breakTime:0.2,  transparent:true, textures:{ all:[8,0] },           color:'#2d7a1f' },
  { name: 'Planks',        solid: true,  action:'chop',  breakTime:0.75, textures: { all:[9,0] },                            color:'#c8a264' },
  { name: 'Cobblestone',   solid: true,  action:'mine',  breakTime:1.5,  textures: { all:[10,0] },                           color:'#777' },
  { name: 'Bedrock',       solid: true,  action:'mine',  breakTime:999,  unbreakable:true, textures:{ all:[11,0] },          color:'#333' },
  { name: 'Glass',         solid: true,  action:'break', breakTime:0.5,  transparent:true, textures:{ all:[12,0] },          color:'#9dcfe8' },
  { name: 'Snow Block',    solid: true,  action:'dig',   breakTime:0.3,  textures: { top:[13,0], side:[13,0], bottom:[2,0]}, color:'#eef' },
  { name: 'Ice',           solid: true,  action:'mine',  breakTime:0.8,  transparent:true, textures:{ all:[14,0] },          color:'#9bc8e8' },
  { name: 'Water',         solid: false, action:'break', breakTime:0.5,  transparent:true, liquid:true, textures:{ all:[15,0] }, color:'#2255aa' },
  { name: 'Crafting Table',solid: true,  action:'chop',  breakTime:1.0,  textures:{ top:[0,1], side:[1,1], bottom:[2,0] },   color:'#c8a264' },
  { name: 'Furnace',       solid: true,  action:'mine',  breakTime:1.25, textures:{ top:[2,1], side:[4,1], bottom:[2,0] },   color:'#777' },
  { name: 'Coal Ore',      solid: true,  action:'mine',  breakTime:2.0,  textures:{ all:[5,1] },                             color:'#555' },
  { name: 'Iron Ore',      solid: true,  action:'mine',  breakTime:2.0,  textures:{ all:[6,1] },                             color:'#c8a090' },
  { name: 'Gold Ore',      solid: true,  action:'mine',  breakTime:2.0,  textures:{ all:[7,1] },                             color:'#e8c830' },
  { name: 'Diamond Ore',   solid: true,  action:'mine',  breakTime:3.0,  textures:{ all:[8,1] },                             color:'#5be8e8' },
  { name: 'Lava',          solid: false, action:'break', breakTime:0.5,  liquid:true, emissive:true, textures:{ all:[9,1] }, color:'#f04010' },
  { name: 'Glowstone',     solid: true,  action:'mine',  breakTime:0.75, emissive:true, textures:{ all:[10,1] },             color:'#f0d060' },
  { name: 'TNT',           solid: true,  action:'break', breakTime:0.5,  textures:{ top:[11,1], side:[12,1], bottom:[13,1]}, color:'#e04040' },
  { name: 'Obsidian',      solid: true,  action:'mine',  breakTime:5.0,  textures:{ all:[14,1] },                            color:'#1a0a2e' },
  { name: 'Brick',         solid: true,  action:'mine',  breakTime:1.5,  textures:{ all:[15,1] },                            color:'#a0503c' },
  { name: 'Bookshelf',     solid: true,  action:'chop',  breakTime:1.0,  textures:{ top:[9,0], side:[0,2], bottom:[9,0] },   color:'#c8a264' },
  { name: 'Mossy Cobble',  solid: true,  action:'mine',  breakTime:1.5,  textures:{ all:[1,2] },                             color:'#5a7a5a' },
  { name: 'Sponge',        solid: true,  action:'dig',   breakTime:0.5,  textures:{ all:[2,2] },                             color:'#d0cc60' },
];

export const ACTION_LABELS = {
  dig:   'Digging',
  chop:  'Chopping',
  mine:  'Mining',
  break: 'Breaking',
};

export function getDef(id) { return BLOCK_DEFS[id] || null; }
export function isSolid(id) { return id > 0 && !!BLOCK_DEFS[id]?.solid; }
export function isTransparent(id) { return id === AIR || !!(BLOCK_DEFS[id]?.transparent); }
export function isLiquid(id) { return !!(BLOCK_DEFS[id]?.liquid); }
export function isEmissive(id) { return !!(BLOCK_DEFS[id]?.emissive); }

export function getTexCoord(id, face) {
  const def = BLOCK_DEFS[id];
  if (!def) return [0, 0];
  const t = def.textures;
  if (t.all) return t.all;
  if (face === 'top' && t.top) return t.top;
  if (face === 'bottom' && t.bottom) return t.bottom;
  if (t.side) return t.side;
  return t.top || [0, 0];
}

// Default hotbar contents
export const DEFAULT_HOTBAR = [
  GRASS, DIRT, STONE, WOOD, PLANKS, COBBLESTONE, GLASS, TNT, GLOWSTONE
];

// All placeable block types for inventory
export const ALL_BLOCKS = [
  GRASS, DIRT, STONE, SAND, GRAVEL, WOOD, LEAVES, PLANKS,
  COBBLESTONE, GLASS, SNOW_BLOCK, ICE, CRAFTING, FURNACE,
  COAL_ORE, IRON_ORE, GOLD_ORE, DIAMOND_ORE, GLOWSTONE, TNT,
  OBSIDIAN, BRICK, BOOKSHELF, MOSSY_COBBLE, SPONGE, LAVA
];
