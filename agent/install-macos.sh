#!/bin/sh
# Install Explorer as a per-user macOS LaunchAgent. Run from the repository root.
set -eu
ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
NODE="$(command -v node)"
PLIST="$HOME/Library/LaunchAgents/ai.labairj.notminecraft.explorer.plist"
LOGDIR="$HOME/Library/Logs"
mkdir -p "$HOME/Library/LaunchAgents" "$LOGDIR" "$ROOT/data"
cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>ai.labairj.notminecraft.explorer</string>
  <key>ProgramArguments</key><array>
    <string>$NODE</string><string>$ROOT/agent/server.js</string>
  </array>
  <key>WorkingDirectory</key><string>$ROOT</string>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$LOGDIR/notminecraft-explorer.log</string>
  <key>StandardErrorPath</key><string>$LOGDIR/notminecraft-explorer-error.log</string>
</dict></plist>
EOF
launchctl bootout "gui/$(id -u)" "$PLIST" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "Explorer installed: $PLIST"
echo "Read state: http://127.0.0.1:8787/state"
