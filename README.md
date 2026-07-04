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
- 47 block types including furniture and city infrastructure
- Tool tiers: pickaxe (mining), axe (chopping), shovel (digging)
- Sword, hoe, and hand breaking
- Coal drops from coal ore; crafting materials stack up to 64

### Crafting
- 2×2 pocket crafting grid (E key)
- 3×3 crafting table (right-click a Crafting Table block)
- Bounding-box recipe matching — place recipes anywhere in the grid
- Recipes: planks, sticks, all tools, torches, chest, furnace, bed, furniture, vehicles, escalators

### Cities
- Procedurally placed cities on a seeded ~600-block grid
- Building types: commercial, restaurant, office, residential — each with distinct interior layouts
- Multi-floor buildings with escalators to travel between floors
- Concrete skyscrapers with glass windows, asphalt streets, sidewalks, traffic lights

### NPCs & Dialogue
- **Street NPCs**: merchants, citizens, builders, businesspeople, police, tourists
- **Building workers**: shopkeepers, chefs, office workers, researchers — dedicated to their buildings and never leave
- Branching conversation trees with selectable options:
  - **Easy** (shopkeeper): friendly, leads directly to the shop
  - **Tough** (chef): confrontational haggling path
  - **Dead-end** (office worker): dismissive, goes nowhere
  - **Informative** (researcher): teaches biomes, resources, city mechanics, crafting tips
- All NPCs have idle animation and face the player when nearby

### Shops & Economy
- Talk to a shopkeeper or merchant and navigate the dialogue to open the shop
- **Buy tab**: browse items with block-icon previews and gold coin prices
- **Sell tab**: sell materials from your inventory for half the buy price
- Three shop inventories: hardware, tools, general goods
- Gold Coins currency (start with 50)

### Escalators
- Amber glowing escalator blocks carry the player upward through multi-floor buildings
- Walk into the escalator column to ride up; step off at any floor through the shaft opening
- Craftable: 2 iron ingots + 2 glowstone in a 2×2 grid → 4 escalator blocks

### Inventory
- 9-slot hotbar + 18-slot main inventory
- Stack management (up to 64 per slot for blocks/materials, 1 for tools)
- Click-to-pick-up cursor dragging inside the inventory screen

### Vehicles & Traffic
- Craftable vehicles (4 steel + 2 iron + 1 glass)
- City traffic system with AI cars on road lanes
- Traffic lights at intersections

## Tech Stack

- [Three.js](https://threejs.org/) r0.167 — rendering
- [simplex-noise](https://github.com/jwagner/simplex-noise) 4.x — terrain generation
- [Vite](https://vitejs.dev/) 5.x — dev server & bundler
- ES modules throughout, no TypeScript, no framework
