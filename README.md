# Stadslab Vercel Demo

Een minimale Vite + React demo die 1-op-1 te vervangen is met jouw eigen bestanden.
Klaar voor **GitHub → Vercel**.

## Lokale ontwikkeling
```bash
npm install
npm run dev
```

## Deploy op Vercel (GitHub)
1. Maak een nieuwe, lege GitHub repo (public of private).
2. Push deze map:
   ```bash
   git init
   git add .
   git commit -m "init demo"
   git branch -M main
   git remote add origin <jouw-github-url>
   git push -u origin main
   ```
3. Ga naar **Vercel → Add New → Project → Import Git Repository** en kies je repo.
4. Framework: **Vite** (auto-detect). Output directory: **dist** (staat ook in `vercel.json`).
5. Deploy. Je krijgt een preview-URL en daarna een production domain.

## Bestanden vervangen met jouw code
Vervang stap voor stap de demo-bestanden in `src/` met jouw eigen versies. Commit & push — Vercel maakt automatisch een nieuwe preview aan. Als alles werkt, merge naar `main` voor productie.

### Relevante paden
- `src/modules/backoffice.jsx`
- `src/modules/foodtruck.jsx`
- `src/components/EmployeesContext.jsx`
- `src/components/EmployeeCard.jsx`
- `src/modules/rooster_module.js` (mock)
- `src/modules/klok_module.js` (mock)

## Node-versie
Vercel gebruikt standaard **Node 20**. Wil je pinnen, voeg toe aan `package.json`:
```json
"engines": { "node": ">=18 <=20" }
```

## Troubleshooting (snel)
- **Blank page** → check Build Output: staat `dist` als output? Staat `vite` in de dependencies?
- **Module not found '@/...'** → alias staat in `vite.config.js`. Hou paden hetzelfde.
- **lucide-react ontbreekt** → deze demo gebruikt een stub. Wil je echte iconen: `npm i lucide-react` en verwijder de alias in `vite.config.js`.
- **shadcn/ui ontbreekt** → de UI sits als simpele stubs onder `src/components/ui/*`.