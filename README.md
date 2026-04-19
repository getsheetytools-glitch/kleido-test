# Sheety KLEIDO

Work style assessment site built with [Eleventy](https://www.11ty.dev/) (11ty).

---

## Quick start

```bash
npm install
npm start        # dev server at http://localhost:8080
npm run build    # production build → _site/
```

---

## How to update content

Almost everything lives in `src/_data/`. You rarely need to touch the templates.

### Change a dimension name, description, or poles
Edit `src/_data/dimensions.json`. Each entry:

```json
{
  "key":         "K",
  "name":        "Knowledge",
  "description": "How you take in and apply new information",
  "poles":       { "low": "Experiential", "high": "Studied" },
  "color":       "#2dd4bf",
  "dark":        "#041f1d",
  "mid":         "#0d9488",
  "sample":      28,
  "sampleLabel": "Experiential (28)"
}
```

- `key` — the single letter shown in the UI (keep uppercase)
- `color` — main hex used for the label, slider thumb, profile bar
- `dark` / `mid` — used in the SVG kaleidoscope pattern for this dimension
- `sample` / `sampleLabel` — the dummy value shown in the profile card preview

### Change pricing tiers
Edit `src/_data/pricing.json`. Add, remove, or reorder plans freely.
Set `"featured": true` on the plan you want highlighted.

### Change marketing copy
Edit `src/_data/site.json` — tagline, subheadings, step descriptions, footer CTA.

### Change a kaleidoscope pattern
Each dimension has its own SVG in `src/_includes/patterns/`.
Edit `K.njk`, `L.njk`, etc. independently without touching anything else.

---

## Deployment (Netlify + GitHub Actions)

1. Create a new Netlify site (blank, no auto-deploy needed)
2. In Netlify → Site settings → Domain management → add `kleido.sheety.tools`
3. In your DNS provider add: `CNAME kleido → your-site.netlify.app`
4. In your GitHub repo → Settings → Secrets → add:
   - `NETLIFY_AUTH_TOKEN` (from Netlify user settings → Personal access tokens)
   - `NETLIFY_SITE_ID` (from Netlify site settings → General → Site ID)
5. Push to `main` → GitHub Actions builds and deploys automatically

---

## Project structure

```
sheety-kleido/
├── src/
│   ├── _data/
│   │   ├── dimensions.json   ← edit dimensions here
│   │   ├── pricing.json      ← edit pricing here
│   │   └── site.json         ← edit all copy here
│   ├── _includes/
│   │   ├── base.njk          ← nav + footer layout
│   │   └── patterns/
│   │       ├── K.njk         ← SVG for Knowledge
│   │       ├── L.njk         ← SVG for Load
│   │       ├── E.njk         ← SVG for Exchange
│   │       ├── I.njk         ← SVG for Interaction
│   │       ├── D.njk         ← SVG for Drive
│   │       └── O.njk         ← SVG for Output
│   ├── assets/
│   │   ├── css/main.css      ← all styles
│   │   └── js/main.js        ← slide viewer + scroll reveal
│   └── index.njk             ← main page template
├── .eleventy.js
├── netlify.toml
├── package.json
└── .github/workflows/deploy.yml
```
