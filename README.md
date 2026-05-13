# 3D Portfolio (Vite + React + R3F)

Premium dark/glow portfolio with multi-page routing, smooth transitions, and procedural 3D scenes — deployable for free on GitHub Pages.

## Tech
- Vite + React (JavaScript)
- `react-router-dom` with `HashRouter` (GitHub Pages friendly)
- `framer-motion` for transitions + scroll reveals
- `three` + `@react-three/fiber` + `@react-three/drei` for 3D
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Customize content
Edit:
- `src/data/profile.js` (name, tagline, socials, projects)

## Deploy to GitHub Pages (two options)

### Option A — Manual deploy (gh-pages)
This publishes the `dist/` folder to the `gh-pages` branch.

```bash
npm run deploy
```

Then in GitHub repo settings:
- **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: **gh-pages / (root)**

### Option B — Auto deploy (GitHub Actions)
This repo includes `[.github/workflows/deploy.yml](.github/workflows/deploy.yml)` which deploys on every push to `main`.

In GitHub repo settings:
- **Settings → Pages**
- Source: **GitHub Actions**

## Notes
- `vite.config.js` is set to `base: './'` so assets work on both user pages and project pages.

