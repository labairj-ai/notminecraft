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
| Right Click | Place block / open door |
| 1–9 / Scroll | Switch hotbar slot |
| E | Open inventory / crafting |
| F | Interact with NPC |
| G | Toggle fly mode |
| Esc | Pause menu |

## Features

### World
- Infinite procedurally generated terrain with biomes (forest, desert, snowy, ocean)
- Mixed terrain: ~40–50% of the world is flat open plains, the rest is hilly/mountainous
- Caves, ore distribution (coal → iron → gold → diamond by depth)
- Day/night cycle with dynamic sky and lighting
- Water, lava, ice, snow
- Dirt exposed to air gradually regrows into grass over ~8 seconds

### Minimap
- Fortnite-style circular minimap in the top-right corner
- Height-shaded terrain colours updated every 4 frames
- Rotating player arrow at the centre
- NPC dots (gold for shopkeepers, blue-white for citizens)
- Compass rose (N/S/E/W) at the minimap edge

### Blocks & Tools
- 47+ block types including furniture and city infrastructure
- Tool tiers: hand → iron → gold → diamond for pickaxe, axe, shovel, sword
- Breaking grass drops **dirt** (grass and dirt are the same resource)
- Coal drops from coal ore; crafting materials stack up to 64
- Doors open and close as a single unit — right-click either half

### Crafting
- 2×2 pocket crafting grid (E key)
- 3×3 crafting table (right-click a Crafting Table block)
- Bounding-box recipe matching — place recipes anywhere in the grid
- Recipes: planks, sticks, all tool tiers, torches, chest, furnace, bed, furniture, vehicles, escalators, lanterns

### Cities
- Procedurally placed cities on a seeded ~600-block grid
- Building types: commercial, restaurant, office, residential — each with distinct interior layouts
- Multi-floor buildings with escalators flush with the floor that carry players upward
- Concrete skyscrapers with glass windows, asphalt streets, sidewalks, traffic lights

### NPCs & Dialogue
- **Street NPCs**: merchants, citizens, builders, businesspeople, police, tourists
- **Building workers**: shopkeepers, chefs, office workers, researchers — dedicated to their buildings and never leave
- NPCs stop wandering and face the player during conversation
- Branching conversation trees with selectable options:
  - **Easy** (shopkeeper): friendly, leads directly to the shop
  - **Tough** (chef): confrontational haggling path
  - **Dead-end** (office worker): dismissive, goes nowhere
  - **Informative** (researcher): teaches biomes, resources, city mechanics, crafting tips

### Shops & Economy
- Talk to a shopkeeper or merchant and navigate the dialogue to open the shop
- **Buy tab**: browse items with block-icon previews and gold coin prices
- **Sell tab**: sell materials from your inventory for half the buy price
- Three shop inventories: hardware, tools, general goods
- Gold Coins currency (start with 50)

### Escalators
- Amber glowing floor-level escalator tiles carry the player upward through multi-floor buildings
- Walk onto the escalator to ride; step sideways off at any floor
- Craftable: 2 iron ingots + 2 glowstone in a 2×2 grid → 4 escalator blocks

### Animals
- 11 animal types: sheep, cow, horse, dog, wolf, goat, rabbit, deer, frog, turtle, fish
- Biome-appropriate spawning: grassland, snowy, desert/sand, forest, water
- Full gravity and terrain-following physics — animals fall off cliffs, walk up slopes
- Flee behaviour: skittish animals sprint away when the player approaches
- Rabbits and frogs hop with a ballistic arc; fish school and glide in water
- Quadruped walk gait with diagonal-pair leg swing and head bob

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
