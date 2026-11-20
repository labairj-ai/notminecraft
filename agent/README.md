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

Open [NotMinecraft with Explorer](http://localhost:5177/notminecraft/?explorer). The panel shows activity, its destination, inventory, discoveries, recent outcomes and memories, and the last successful model decision. **Visit Explorer** takes you to the character.

The service runs with the browser closed. Each tick atomically saves position, inventory, memories, and block removals to `data/explorer.json`. The Explorer view applies those removals to both loaded and newly generated chunks. Browser player edits are local to their game session and aren't sent back to the agent. Explorer does not craft, fight, swim, or climb ladders.

## Local LLM

The agent consults the local model only when there are multiple viable goals, at most once every ten minutes. Navigation, block changes, and inventory use deterministic game rules. If the model is unavailable or returns an invalid choice, Explorer selects a goal deterministically.

```sh
LLM_URL=http://127.0.0.1:8080/v1/chat/completions LLM_MODEL=local npm run agent
```

Set `AGENT_LLM=off` to disable model requests. The server uses an OpenAI-compatible chat-completions endpoint and listens only on loopback.

## macOS service

The LaunchAgent starts when the user logs in and restarts on failure. The Mac must remain powered on and awake for continuous operation. Logs are in `~/Library/Logs/notminecraft-explorer*.log`. To stop the service, run:

```sh
launchctl bootout "gui/$(id -u)" "$HOME/Library/LaunchAgents/ai.labairj.notminecraft.explorer.plist"
```
