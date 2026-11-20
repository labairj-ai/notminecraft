# Persistent Explorer

Explorer uses NotMinecraft's seeded voxel generator to explore nearby terrain, navigate one cell at a time, inspect exposed resources, collect blocks, and rest. It checks for solid footing, headroom, liquids, and safe one-block changes in elevation. It starts with empty inventory and can gather exposed wood, clay, sand, gravel, snow, grass, and dirt using the game's break times, drops, and stack limits.

Explorer records discoveries, collections, obstacles, failed destinations, and revisits. Route searches skip remembered obstacles, reconsider edges near mined blocks, and prefer less-visited destinations when exploring.

## Run and observe

Requires Node.js 20 or newer. From the checkout:

```sh
npm install
npm run check:agent
npm run test:agent
npm run build
sh agent/install-macos.sh
curl http://127.0.0.1:8787/state
npm run dev -- --port 5177 --strictPort
```

Open [NotMinecraft with Explorer](http://localhost:5177/notminecraft/?explorer). The panel shows the active objective, source, reason, decision context, latest objective outcome, and time of the last successful model decision. It also displays activity, destination, inventory, and discoveries. **Visit Explorer** takes you to the character.

The service runs with the browser closed. Each tick atomically saves the active objective, its route, position, inventory, memories, and block placements and removals to `data/explorer.json`. The Explorer view applies those placements and removals to both loaded and newly generated chunks. On the local Explorer page at port 5177, ordinary placement and mining use the same saved world as Explorer. Edits carry the revision of the target block and are rejected if stale. The service accepts writes from the local Explorer page with a per-process session token. Ordinary game sessions remain separate. Explorer does not fight, swim, or climb ladders.

## Crafting a first tool

Explorer can choose the wooden pickaxe recipe as a multi-step objective. Starting with an empty inventory and no nearby table, it gathers three logs, turns them into twelve planks, spends two planks for four sticks and four planks for a crafting table, then places the table on a supported block. At the table it spends three planks and two sticks on the pickaxe. The game uses the same pickaxe item for the wooden and stone recipes and labels it **Pickaxe**. Existing inventory IDs and tool effectiveness are unchanged. The goal finishes when Explorer equips it and mines a block that requires a pickaxe.

The objective, progress, equipped tool, table, and mined blocks persist across restarts. Explorer derives its next step from the current inventory, with bounded searches for missing resources. It records failed objectives when materials, a supported table position, inventory space, or a tool-compatible block are unavailable.

## Building a shelter

Explorer can choose a shelter when its survey finds a dry, level foundation and enough nearby or stocked wood. Its construction plan uses 23 planks for two-block-high walls, an open entrance, and a roof over a natural foundation. Stocked planks count toward the requirement. The same recipe dependency code supplies planks for construction, basic supplies, and the pickaxe. Explorer places one supported block per tick, then checks the foundation, entrance, walls, and roof before recording the shelter. The site, progress, and placed blocks survive restarts. Remembered unsuitable sites are skipped in later surveys.

## Home and player changes

Explorer recognizes its first completed shelter as home, checks the structure when nearby, and tries to return through the entrance when energy is low and the route is short enough. If a player blocks the route, Explorer tries an alternate path. Nearby player edits can reveal resources or change the home's condition. Explorer remembers what it observes and clears affected route failures when terrain changes.

With Vite running on port 5177, run `npm run test:browser` to exercise normal Chrome controls against an isolated Explorer save. Set `AGENT_LLM=on` to also verify a real local model decision after the changes.

## Experience and preferences

Exploration, gathering, crafting, construction, and mining each start at 50 interest. Verified outcomes change interest by up to three points. Similar recent successes give smaller gains, and repeated failures carry no additional penalty while those failures remain recent. Competence is counted separately as successful and unsuccessful attempts, including navigation arrivals and failed routes. Existing saves keep their memories and begin counting from the first tick after upgrade.

Explorer includes interests, competence, recent choices, interest changes, and relevant memories in its model requests. The fallback also weighs these signals when ranking feasible choices. Routine movement, crafting, and recovery still use the existing game rules.

To compare the real Ollama model on two matched scenarios, run:

```sh
AGENT_REAL_LEARNING=on node --test --test-name-pattern='Real Ollama' agent/server.test.js
```

## Local LLM

Explorer defaults to the existing Ollama service at `127.0.0.1:11434`, with `qwen2.5:7b` as its model. It asks the model to choose among feasible objectives when a new objective is needed and multiple options are available. Those options include exploration, gathering, revisiting an accessible remembered resource site, crafting basic supplies or equipment, building a shelter, and resting when energy is low. The prompt includes inventory, energy, route lengths, and recent experiences and objective outcomes. A selected objective persists until it finishes or fails. Navigation, mining, inventory, and emergency rest use deterministic game rules.

If a request fails or returns an invalid choice, Explorer selects a deterministic objective and waits at least a minute before retrying at an objective boundary. Decision records identify the source. The displayed model reason is the model's explanation, and the displayed context comes from actual saved memories.

Override the endpoint and model for another OpenAI-compatible service, including MLX:

```sh
LLM_URL=http://127.0.0.1:11434/v1/chat/completions LLM_MODEL=qwen2.5:7b npm run agent
```

Set `AGENT_LLM=off` to disable model requests. Explorer's state API listens only on loopback.

## macOS service

The LaunchAgent starts when the user logs in and restarts on failure. The Mac must remain powered on and awake for continuous operation. Logs are in `~/Library/Logs/notminecraft-explorer*.log`. To stop the service, run:

```sh
launchctl bootout "gui/$(id -u)" "$HOME/Library/LaunchAgents/ai.labairj.notminecraft.explorer.plist"
```
