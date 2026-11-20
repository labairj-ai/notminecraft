# Persistent Explorer (first implementation)

This is the first continuously running autonomous character for NotMinecraft. It is intentionally small: **one simulated character**, three allowed actions (explore, inspect, rest), saved experiences and preferences, and optional local-model decision making. It does **not** yet simulate mining, crafting, collision-aware navigation, NPC encounters, combat, or a fully persistent voxel world. Its exploratory position is a lightweight headless simulation; the existing Three.js game displays it.

## Start on the Mac Studio

Requires Node.js 20 or newer. From the checkout:

```sh
npm install
npm run check:agent
npm run test:agent
npm run agent
```

The agent is available at http://127.0.0.1:8787/state. It saves automatically to `data/explorer.json`, preserving location, visited coordinates, actions and experiences across restarts. State writes are atomic. The service listens only on loopback.

## Observe the character in NotMinecraft

In a second terminal:

```sh
npm run dev
```

Open **http://localhost:5177/notminecraft/?explorer** (or the URL printed by Vite, adding `?explorer`). The Explorer panel shows its latest action, energy and recent outcome. Click **Visit Explorer** to teleport nearby. When `?explorer` is absent, the existing game is unchanged.

The viewer requires the local service. It intentionally does not use the public GitHub Pages site to reach the agent, nor expose the API to the internet. The character exists independently of the browser. It currently shares only the fixed world seed and position with the game; the full voxel environment is not simulated in the background.

## Local LLM

By default, the agent attempts an OpenAI-compatible local endpoint every **20 ticks** (roughly 10 minutes) and uses simple deterministic rules between model decisions. If inference fails it continues operating, so the character does not freeze during an outage. Override with:

```sh
LLM_URL=http://127.0.0.1:8080/v1/chat/completions LLM_MODEL=local npm run agent
```

Set `AGENT_LLM=off` to run without an LLM. The endpoint must be compatible with the OpenAI chat-completions API; adjust the URL/model for your MLX server.

## Keep running without a terminal

On macOS, with Node installed and this checkout at its permanent location:

```sh
sh agent/install-macos.sh
```

This installs a user LaunchAgent that launches at login and restarts on failure. Verify with `curl http://127.0.0.1:8787/state`. Logs are in `~/Library/Logs/notminecraft-explorer*.log`. Stop or remove it with:

```sh
launchctl bootout "gui/$(id -u)" "$HOME/Library/LaunchAgents/ai.labairj.notminecraft.explorer.plist"
rm "$HOME/Library/LaunchAgents/ai.labairj.notminecraft.explorer.plist"
```

For genuine 24/7 operation the Mac must remain powered and awake, with a user session available. The launch agent runs at login, not before a user logs in. If you later want a boot-time service, a system daemon is a separate change.

## Next step

Make the headless simulator consult shared terrain/collision and block data so moves and interactions have genuine game-world consequences. Only then add autonomous resource gathering and crafting. That is preferable to falsely representing abstract position updates as completed in-game actions.
