---
name: publish
description: Commit and push local changes (e.g. edits to videos.txt) so GitHub Actions redeploys the site to GitHub Pages.
---

Run this command and report its output to the user verbatim (it prints what changed and the live site URL):

```
npm run publish
```

Do not add, remove, or rewrite any commit message logic — the script already handles staging, committing, and pushing. If it exits non-zero, show the error and stop; don't retry with `--force` or bypass hooks.
