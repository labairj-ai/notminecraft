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
| WASD | Move / drive |
| Mouse | Look |
| Space | Jump / fly up |
| Shift | Sprint / fly down |
| Left Click | Break block |
| Right Click | Place block / open door |
| 1–9 / Scroll | Switch hotbar slot |
| E | Enter nearby vehicle / open inventory |
| E (in vehicle) | Exit vehicle |
| F | Talk to NPC / view bus routes |
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
- Circular minimap in the top-right corner with height-shaded terrain
- Rotating player arrow, NPC dots, and compass rose (N/S/E/W)

### Blocks & Tools
- 47+ block types including furniture and city infrastructure
- Tool tiers: hand → iron → gold → diamond for pickaxe, axe, shovel, sword
- Breaking grass drops **dirt** (grass and dirt share one resource)
- Coal drops from coal ore; materials stack up to 64
- Doors open and close as a single unit — right-click either half to toggle the whole door

### Crafting
- 2×2 pocket crafting grid (E key) and 3×3 crafting table (right-click a Crafting Table)
- Bounding-box recipe matching — place recipes anywhere in the grid
- Recipes: planks, sticks, all tool tiers, torches, chest, furnace, bed, furniture, vehicles, escalators, lanterns

### Villages
- Compact procedurally-placed villages (~160-block diameter, ~400 blocks apart)
- **Building types** with themed interiors, walkable doors, and wall materials:
  - **Residential** — beds, kitchen counter, furnace, desks
  - **Commercial (shop)** — display counter, chests, crafting table
  - **Restaurant** — bar counter, stools, dining tables and chairs
  - **Police station** (brick) — reception counter, officer desks, filing cabinets, monitor
  - **Fire station** (cobblestone) — open vehicle bay, equipment counters
  - **Community center** (stone) — reception, meeting tables, bookshelves
- **Parks** — ~25% of plots are open grass spaces with scattered trees
- Multi-floor buildings with flush amber escalator tiles that carry players upward
- Asphalt roads, concrete sidewalks, traffic lights at intersections
- Bus stops on village sidewalks (press F to view routes to other villages)

### NPCs & Dialogue
- **Street NPCs**: merchants, citizens, builders, businesspeople, police, tourists
- **Building workers**: shopkeepers, chefs, police officers, researchers — stay inside their buildings
- **Superhero-inspired characters** roam the streets as rare encounters, each with a unique look and conversation tree:
  - **Web-Walker** *(spider_hero)* — red/blue suit, full-face mask, blue eye patches, chest web symbol, wrist shooter. Friendly, quippy, shares navigation and crafting tips
  - **Shadow Knight** *(shadow_knight)* — all-black cowl with bat ears, glowing eye slits, sweeping cape, utility belt. Grim and cryptic, gives underground survival advice
  - **Kid Crusader** *(kid_hero)* — red/green outfit, yellow cape, eye mask. Enthusiastic trainee cataloguing city merchants; shares price and crafting tips
  - **The Brute** *(brute)* — green skin, purple pants, torn shirt, furrowed brow. Gruff but gentle city protector; short sentences, surprisingly philosophical
  - **Scrap Knight** *(scrap_knight)* — red/gold armor, gold faceplate, glowing arc reactor, shoulder pauldrons. Cheerful inventor with a suit that mostly hops
- NPCs stop wandering and face the player during conversation
- Branching conversation trees with selectable options:
  - **Easy** (shopkeeper): friendly, leads directly to the shop
  - **Tough** (chef): confrontational haggling path
  - **Dead-end** (police/office): dismissive, goes nowhere
  - **Informative** (researcher): teaches biomes, resources, city mechanics, crafting tips
  - **Friendly** (Web-Walker): tips on biomes, navigation, and crafting
  - **Grim** (Shadow Knight): survival and underground warnings
  - **Enthusiastic** (Kid Crusader): merchant research, training anecdotes
  - **Gruff** (The Brute): city patrol, lava warnings, purple pants
  - **Inventive** (Scrap Knight): vehicle crafting guide, Mark VII suit progress

### Shops & Economy
- Talk to a shopkeeper or merchant → navigate dialogue → open the shop
- **Buy tab**: browse items with block-icon previews and gold coin prices
- **Sell tab**: sell inventory items for half the buy price
- Three shop inventories: hardware, tools, general goods
- Gold Coins currency (start with 50)

### Vehicles
Seven drivable vehicle types, each with a distinct 3D mesh and physics profile:

| Type | Description | Top Speed |
|------|-------------|-----------|
| **Car** | Standard sedan | 18 |
| **Truck** | Pickup with open cargo bed | 14 |
| **Monster Truck** | Massive wheels, high suspension | 16 |
| **Limo** | Extra-long, dark body, gold trim, 6 wheels | 22 |
| **Motorcycle** | Slim 2-wheeler, handlebars, exhaust pipe | 28 |
| **Bus** | Long yellow school-bus, 6 wheels | 10 |
| **Dog Car** | Novelty — brown body, snout, boxy ears, tail | 18 |

- AI traffic spawns a random mix of all types on city roads — each type uses its correct wheel-height offset so wheels always sit flush on the road
- Traffic lights, stop signs, and red-light stopping for AI vehicles
- Real car physics: ground-following gravity, building collision with wall-sliding
- Press **E** near any vehicle to enter; **E** or **Esc** to exit
- Exiting a car that fell into water safely places the player at road level with fly mode on
- Craftable: place a vehicle recipe on an asphalt road surface

### Bus Routes & Fast Travel
- Bus stop shelters (posts + canopy + sign) appear on village sidewalks
- Walk within 3 blocks of a stop and press **F** to open the route panel
- Lists up to 4 nearby villages with direction and distance
- Click a destination to teleport there instantly

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

### Mobile
- Dynamic joystick (appears where your thumb lands on the left 45% of screen)
- Swipe-to-look on the right side
- **🎒 INV / CRAFT** button opens the combined inventory + crafting screen
- **🛸 FLY / 🛬 LAND** toggle; hold **↑** to fly up, **↓** to fly down
- Analog steering in vehicles — joystick left = turn left, right = turn right
- Keyboard shortcut bar hidden on touch devices
- **Tappable context prompt**: walking near an NPC, vehicle, or bus stop shows a large pulsing button — `💬 Tap to talk`, `🚗 Tap to enter car`, `🚌 Tap for bus routes` — no need to find the F button
- **NPC dialog and shop** display as full-width bottom sheets with large (50px+) touch targets throughout

## Tech Stack

- [Three.js](https://threejs.org/) r0.167 — rendering
- [simplex-noise](https://github.com/jwagner/simplex-noise) 4.x — terrain generation
- [Vite](https://vitejs.dev/) 5.x — dev server & bundler
- ES modules throughout, no TypeScript, no framework
