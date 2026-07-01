#!/usr/bin/env bash
# Serve the IRS prototypes over a local HTTP server so links resolve cleanly
# (opening files via file:// shows the filesystem listing when you click a
# folder link — a local server serves each folder's index.html instead).
#
#   ./serve.sh           # serves on http://localhost:8000
#   ./serve.sh 4000      # custom port
#
# Requires Python 3 (preinstalled on macOS/Linux).
set -e
cd "$(dirname "$0")"
PORT="${1:-8000}"
URL="http://localhost:${PORT}"
echo "Serving IRS prototypes at ${URL}  (Ctrl+C to stop)"
# open the browser once the server is up (macOS: open, Linux: xdg-open)
( sleep 1; (command -v open >/dev/null && open "$URL") || (command -v xdg-open >/dev/null && xdg-open "$URL") ) >/dev/null 2>&1 &
exec python3 -m http.server "$PORT"
