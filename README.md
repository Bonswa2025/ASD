# Stadslab Suite – Hub (with modules)

React + Vite + Tailwind. Klaar voor GitHub, GitHub Pages én Vercel.

## Development
```bash
npm i
npm run dev
```

## Build (GitHub Pages)
```bash
npm run build   # gebruikt base=./
npm run preview
```

## Build (Vercel)
```bash
npm run build:vercel
```

## GitHub Pages deploy (automatisch)
- Push naar GitHub op branch **main**.
- In GitHub: **Settings → Pages → Source: GitHub Actions** (workflow is al inbegrepen).

## Vercel deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Import je GitHub-repo op https://vercel.com/new.
2. Build command: `npm run build:vercel` — Output: `dist`.
3. Deploy.

## Modules koppelen
Je echte modules staan al gekoppeld via props in `src/main.jsx`.
