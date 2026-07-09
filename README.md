# Trending Table

"My Favorite Cooking Trends" — a personal page collecting viral recipe
videos, built with React + Vite.

Live site: https://sapnasudhir.github.io/ariv/

## Adding or updating videos

Edit `videos.txt` at the project root. One block per video, separated by a
blank line:

```
Title: Baked Feta Pasta
Creator: @viral_kitchen
Link: https://www.youtube.com/watch?v=xxxxxxxxxxx
```

The `Link` field accepts any YouTube URL format (`watch?v=`, `youtu.be/`,
`shorts/`, `embed/`, including share links with `?si=...`). Add or remove
blocks as needed. `src/data/videos.js` parses this file automatically, so
while the dev server is running your changes hot-reload immediately.

## Publishing changes

Once you're happy with your edits, publish them with either:

```
npm run publish
```

or, inside a Claude Code session, `/publish`.

This stages, commits, and pushes any changes (it's a no-op if nothing
changed). Pushing to `master` triggers a GitHub Actions workflow that
rebuilds the site and redeploys it to GitHub Pages — the live site updates
within about 30 seconds.

## Local development

```
npm install
npm run dev
```

## Project structure

- `videos.txt` — the video list you edit
- `src/data/videos.js` — parses `videos.txt` into the data the site uses
- `src/components/` — `Header`, `Hero`, `VideoGallery`, `VideoCard`, `Footer`
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on
  every push to `master`
- `scripts/publish.js` — the script behind `npm run publish`
