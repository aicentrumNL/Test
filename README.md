# Gouw Gesmeerd — website

Marketingwebsite voor **Stukadoor Gouw Gesmeerd** (Gouda), gericht op aannemers,
projectontwikkelaars en verzekeraars/schadeherstel. Gebouwd met React + Vite.

## Ontwikkelen

```bash
npm install
npm run dev      # lokale dev-server
npm run build    # productie-build naar /dist
npm run preview  # productie-build lokaal bekijken
npm run lint     # eslint
```

## Structuur

- `src/data/site.js` — **centrale bron** voor bedrijfsgegevens, diensten, doelgroepen
  en projecten. Pas hier teksten en projecten aan.
- `src/pages/` — pagina's: Home, Diensten, Projecten, Aannemers, Schadeherstel, Over ons, Contact.
- `src/components/` — gedeelde UI (Header, Footer, CtaBand, Reveal, Placeholder, …).
- `src/styles/` — `tokens.css` (designtokens) en `global.css`.
- `public/images/` — plaats hier de foto's (zie `public/images/README.md`).

## Foto's

De site werkt direct met nette placeholders. Zodra foto's met de juiste bestandsnamen
in `public/images/` staan, verschijnen ze automatisch. Zie `public/images/README.md`.

## Deploy

Single-page app met client-side routing; `vercel.json` bevat de SPA-rewrite. Hosten op
Vercel (of een andere statische host met SPA-fallback naar `index.html`).
