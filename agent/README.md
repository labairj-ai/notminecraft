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

The service runs with the browser closed. Each tick atomically saves the active objective, its route, position, inventory, memories, and block removals to `data/explorer.json`. The Explorer view applies those removals to both loaded and newly generated chunks. Browser player edits are local to their game session and aren't sent back to the agent. Explorer does not craft, fight, swim, or climb ladders.

## Local LLM

Explorer defaults to the existing Ollama service at `127.0.0.1:11434`, with `qwen2.5:7b` as its model. It asks the model to choose among feasible objectives when a new objective is needed and multiple options are available. Those options include exploration, gathering, revisiting an accessible remembered resource site, and resting when energy is low. The prompt includes inventory, energy, route lengths, and recent experiences and objective outcomes. A selected objective persists until it finishes or fails. Navigation, mining, inventory, and emergency rest use deterministic game rules.

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
