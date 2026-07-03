# NotMinecraft

A browser-based Minecraft-style voxel game built with Three.js.

## Play

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5175`).

## Controls

| Key | Action |
|-----|--------|
| WASD | Move |
| Mouse | Look |
| Space | Jump / fly up |
| Shift | Sprint / fly down |
| Left Click | Break block |
| Right Click | Place block |
| 1–9 / Scroll | Switch hotbar slot |
| E | Open inventory / crafting |
| F | Interact with NPC |
| G | Toggle fly mode |
| Esc | Pause menu |

## Features

### World
- Infinite procedurally generated terrain with biomes (forest, desert, snowy, ocean)
- Caves, ore distribution (coal → iron → gold → diamond by depth)
- Day/night cycle with dynamic sky and lighting
- Water, lava, ice, snow

### Blocks & Tools
- 34 block types with distinct hardness and tool requirements
- Tool tiers: pickaxe (mining), axe (chopping), shovel (digging)
- Sword, hoe, and hand breaking
- Coal drops from coal ore; crafting materials stack up to 64

### Crafting
- 2×2 pocket crafting grid (E key)
- 3×3 crafting table (right-click a Crafting Table block)
- Bounding-box recipe matching — place recipes anywhere in the grid
- Recipes: planks, sticks, all tools, torches, chest, crafting table, furnace, bed

### Cities
- Procedurally placed cities on a seeded ~600-block grid
- Concrete skyscrapers with glass windows, asphalt streets, flat rooftops
- Cities blend into natural terrain at their edges

### NPCs
- Three NPC types: **Merchant**, **Citizen**, **Builder**
- Blocky humanoid characters with idle animation and player-facing rotation
- Walk up and press **F** to open a dialog

### Dialog & Shops
- Merchants run named shops (City Hardware, Tools & More, The General Store, etc.)
- Buy blocks, materials, and tools using **Gold Coins** (you start with 50)
- Three shop inventories: hardware, tools, general goods
- Citizens and builders share ambient city dialogue

### Inventory
- 9-slot hotbar + 18-slot main inventory
- Stack management (up to 64 per slot for blocks/materials, 1 for tools)
- Click-to-pick-up cursor dragging inside the inventory screen

## Tech Stack

- [Three.js](https://threejs.org/) r0.167 — rendering
- [simplex-noise](https://github.com/jwagner/simplex-noise) 4.x — terrain generation
- [Vite](https://vitejs.dev/) 5.x — dev server & bundler
- ES modules throughout, no TypeScript, no framework
