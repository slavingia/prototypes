---
name: serve
description: Serve these IRS prototypes over a local HTTP server (http://localhost) so links resolve to each folder's index.html instead of opening the filesystem listing you get with file://. Use when asked to run, preview, or serve the prototypes locally.
---

# Serve the prototypes locally

Opening the HTML files directly (`file://`) works, but clicking a folder link
shows the raw filesystem listing. Serving over HTTP fixes that.

From the repo root, run:

```bash
./serve.sh           # http://localhost:8000
./serve.sh 4000      # custom port
```

`serve.sh` is a thin wrapper over `python3 -m http.server` that also opens the
browser. If the script isn't executable yet: `chmod +x serve.sh`.

Then open **http://localhost:8000** and navigate normally. Stop with Ctrl+C.
