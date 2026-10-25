# Demo: Masala Lane Kitchen (restaurant website)

- **Type:** Demo
- **Owner:** Jitender (PrimeCraft Labs)
- **Status:** built, committed locally, not pushed yet
- **Showable:** yes
- **Stack:** Next.js 16 (static export, basePath `/demo-restaurant`), Tailwind CSS 4, TypeScript
- **Live link:** https://jeetuwizard.github.io/demo-restaurant/ (after first push + Pages enabled)

## Brief
Showcase website for a **fictional** Delhi restaurant, used to show restaurant/café owners what
PrimeCraft Labs can build: menu, WhatsApp ordering, gallery, reviews, hours and directions.

## What's in it
- Home: hero, highlights, most-ordered dishes, gallery (emoji/CSS tiles, no photos), sample reviews, visit + hours
- `/menu/`: full menu with categories, veg/non-veg marks, prices and an add-to-order cart
- Cart -> "Order on WhatsApp" opens a preview modal of the pre-filled order message.
  It never messages a real restaurant number; the only real number is the owner's (CTA to PrimeCraft Labs).
- Demo banner on every page; phone shown masked (`+91 98XXX XXXXX`).

## Configuration (change one place, nothing hard-coded)
| What | Where |
|---|---|
| PrimeCraft Labs details (name, owner, WhatsApp, portfolio URL, repo path / basePath) | `jk/brand/brand.json`, then run `python jk/brand/sync.py` (writes `src/config/brand.json`, never edit that copy) |
| How the studio details are used (credit text, CTA WhatsApp message) | `src/config/studio.ts` |
| Restaurant details: name, tagline, intro, area, masked phone, maps query, hours, highlights, gallery tiles, sample reviews | `src/config/restaurant.ts` |
| Menu: categories, dishes, prices, veg/non-veg, popular | `src/config/menu.ts` |
| Colours (meaning documented at the top) and fonts | `src/app/globals.css` (tokens) + `src/app/layout.tsx` (fonts) |
| basePath | derived in `next.config.ts` from `brand.json` `projects.demoRestaurant.path` |

Only exception: `src/app/icon.svg` (favicon) has its two colours written in, because favicons can't read CSS tokens.

## Run / build
```
npm install
npm run dev     # http://localhost:3000/demo-restaurant/
npm run build   # static site in out/
```
Deploys automatically via `.github/workflows/deploy.yml` on push to `main`
(repo Settings -> Pages -> Source: **GitHub Actions**).

## Turning it into a real client site
Change `src/config/restaurant.ts` (name, area, hours, real phone) and `src/config/menu.ts`, replace the order
modal with a real `https://wa.me/<restaurant number>?text=...` link, remove the demo banner, add real photos.
