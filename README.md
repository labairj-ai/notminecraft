# NotMinecraft

A browser-based Minecraft-style voxel game built with Three.js.

## Play

**Live:** https://labairj-ai.github.io/notminecraft/

Or run locally:

```bash
npm install
npm run dev
```

## Controls

| Key | Action |
|-----|--------|
| WASD | Move / drive |
| Mouse | Look |
| Space | Jump / fly up |
| Shift | Sprint / fly down |
| Left Click | Break block / attack NPC or animal |
| Right Click | Place block / open door |
| 1–9 / Scroll | Switch hotbar slot |
| E | Enter nearby vehicle / open inventory |
| E (in vehicle) | Exit vehicle |
| F | Talk to NPC / fish (with rod equipped) / view bus routes |
| R | Eat held food item |
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

### HUD
- **Target label** — small label above the crosshair shows the name of whatever the crosshair is aimed at: block name (e.g. "Stone", "Lamp", "Crafting Table"), NPC name, animal/hostile type, or vehicle model. Fades out when nothing is targeted
- **Minimap** — circular minimap in the top-right corner with height-shaded terrain, rotating player arrow, NPC dots, and compass rose (N/S/E/W)
- **Health bar** — 20 HP displayed as hearts in the HUD
- **Hotbar** — 9-slot quickbar with item icons and counts; selected item name briefly appears on pickup

### Blocks & Tools
- 47+ block types including furniture and city infrastructure
- Tool tiers: hand → iron → gold → diamond for pickaxe, axe, shovel, sword
- Breaking grass drops **dirt**; coal drops from coal ore
- Materials stack up to 64; tools are single-stack
- Doors open and close as a single unit — right-click either half to toggle

### Crafting
- 2×2 pocket crafting grid (E key) and 3×3 crafting table (right-click a Crafting Table)
- Bounding-box recipe matching — place recipes anywhere in the grid
- **Stack-spread matching** — pile all your planks in one slot; the system recognises you have enough material and picks the best recipe automatically
- Recipes include: planks, sticks, all tool tiers, torches, chest, furnace, bed, furniture, vehicles, escalators, lanterns, **fishing rod**

#### Fishing Rod
- **Recipe (3×3):** sticks along the diagonal + wool in the bottom-right corner as a line
- Equip the rod, face a body of water, press **F** to cast
- After 3–8 seconds you catch 1–2 Raw Fish

### Survival & Combat

#### Player Health
- You have 20 HP; displayed in the HUD
- Fall damage, hostile mob attacks, and lava reduce health
- **Eating** restores health — press **R** with food in your active hotbar slot
- **Death & respawn** — on death, you respawn at your spawn point with full health and a brief "You died!" notice

#### Food Items
| Item | Source | Health restored | Stack |
|------|--------|----------------|-------|
| Meat | Kill animals | +4 HP | 16 |
| Raw Fish | Fishing / kill fish | +2 HP | 16 |

Meat and raw fish are buyable and sellable at food shops.

#### Hunting Animals
- Left-click attacks the nearest animal within reach (sword deals most damage)
- Animals have 10 HP; a death animation plays when they are killed
- **Drop table by species:**

| Animal | Drops |
|--------|-------|
| Cow | 2–3 Meat + 1–2 Fur |
| Sheep | 1–2 Meat + 1–2 Fur |
| Deer | 2–3 Meat + 1–2 Fur |
| Horse | 2–3 Meat + 2–3 Fur |
| Goat | 1–2 Meat + 1 Fur |
| Rabbit | 1 Meat + 1 Fur |
| Wolf | 1 Fur |
| Fish | 1–2 Raw Fish |
| Dog / Frog / Turtle | — |

**Fur** (stackable ×64) is a sellable material with no other current use.

#### Hostile Mobs
Enemies spawn at night (when the sky is dark) within 20–60 blocks of the player, up to 20 active at once. They despawn when more than 90 blocks away.

| Mob | Behaviour | Damage | Special |
|-----|-----------|--------|---------|
| **Zombie** | Slow melee chaser | 1.5 HP | Burns and dies in daylight |
| **Skeleton** | Medium speed, ranged attack at ≤10 blocks | 2 HP | Burns and dies in daylight |
| **Spider** | Fast melee chaser | 1 HP | Stays hostile at night |
| **Creeper** | Approaches silently, flashes white as fuse | 5 HP | Explodes after 1.5 s |

- Player has **0.8 s invincibility frames** after each hit
- Kill hostiles with your sword; they have no drops currently

### Villages
- Compact procedurally-placed villages (~160-block diameter, ~400 blocks apart)
- **Building types** with themed interiors, walkable doors, and wall materials:
  - **Residential** — beds, kitchen counter, furnace, desks
  - **Commercial (shop)** — display counter, chests, crafting table
  - **Restaurant** — bar counter, stools, dining tables and chairs
  - **Police station** (brick) — reception counter, officer desks, filing cabinets
  - **Fire station** (cobblestone) — open vehicle bay, equipment counters
  - **Community center** (stone) — reception, meeting tables, bookshelves
- **Parks** — ~25% of plots are open grass spaces with scattered trees
- Multi-floor buildings with flush amber escalator tiles
- Asphalt roads, concrete sidewalks, traffic lights at intersections
- Bus stops on village sidewalks (press F to view routes to other villages)

### NPCs & Dialogue
- **Street NPCs**: merchants, citizens, builders, businesspeople, police, tourists
- **Building workers**: shopkeepers, chefs, police officers, researchers — stay inside their buildings
- **Superhero-inspired characters** roam the streets as rare encounters, each with a unique look and conversation tree:
  - **Web-Walker** — red/blue suit, full-face mask. Friendly, shares navigation and crafting tips
  - **Shadow Knight** — all-black cowl, glowing eye slits, sweeping cape. Grim, gives underground survival advice
  - **Kid Crusader** — red/green outfit, yellow cape. Enthusiastic trainee cataloguing city merchants
  - **The Brute** — green skin, purple pants. Gruff but philosophical city protector
  - **Scrap Knight** — red/gold armor, glowing arc reactor. Cheerful inventor
- NPCs stop wandering and face the player during conversation
- Branching conversation trees with selectable options

### Shops & Economy
- Talk to a shopkeeper or merchant → navigate dialogue → open the shop
- **Buy tab**: browse items with block-icon previews and gold coin prices
- **Sell tab**: sell inventory items for half the buy price
- Shop types: hardware, tools, general goods, **food** (meat, fish, fur, fishing rods)
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

- AI traffic spawns a random mix of all types on city roads
- Traffic lights, stop signs, and red-light stopping for AI vehicles
- Real car physics: ground-following gravity, building collision with wall-sliding
- Press **E** near any vehicle to enter; **E** or **Esc** to exit
- Craftable: place a vehicle recipe on an asphalt road surface

### Bus Routes & Fast Travel
- Bus stop shelters appear on village sidewalks
- Walk within 3 blocks of a stop and press **F** to open the route panel
- Lists up to 4 nearby villages with direction and distance
- Click a destination to teleport there instantly

### Animals
- 11 animal types: sheep, cow, horse, dog, wolf, goat, rabbit, deer, frog, turtle, fish
- Biome-appropriate spawning: grassland, snowy, desert/sand, forest, water
- Full gravity and terrain-following physics
- Flee behaviour: skittish animals sprint away when the player approaches
- Rabbits and frogs hop with a ballistic arc; fish school and glide in water

### Inventory
- 9-slot hotbar + 18-slot main inventory
- Stack management (up to 64 per slot for blocks/materials, 1 for tools, 16 for food)
- Click-to-pick-up cursor dragging inside the inventory screen

### Mobile
- Dynamic joystick (appears where your thumb lands on the left 45% of screen)
- Swipe-to-look on the right side
- **Tap anywhere on screen** to interact with whatever is closest to your tap:
  - NPC visible on screen → open dialogue (screen-space projection, up to 12 blocks)
  - Vehicle visible on screen → enter it (up to 15 blocks)
  - Bus stop nearby → open route panel
  - Holding a fishing rod → cast line
- **🎒 INV** button opens the combined inventory + crafting screen
- **🛸 FLY / 🛬 LAND** toggle; hold **↑** to fly up, **↓** to fly down
- Analog steering in vehicles — joystick left/right steers
- Keyboard shortcut bar hidden on touch devices
- NPC dialog and shop display as full-width bottom sheets with large touch targets

## Tech Stack

- [Three.js](https://threejs.org/) r0.167 — rendering
- [simplex-noise](https://github.com/jwagner/simplex-noise) 4.x — terrain generation
- [Vite](https://vitejs.dev/) 5.x — dev server & bundler
- ES modules throughout, no TypeScript, no framework

## Development

```bash
npm run dev    # start dev server at localhost:5177/notminecraft/
npm run build  # production build → dist/
```

Each build stamps the service worker cache with the build timestamp, so deploying a new version automatically invalidates any stale cached assets on the user's next visit. The home screen displays the last build time.
