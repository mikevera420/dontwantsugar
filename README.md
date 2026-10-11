# IDontWantSugar.com

Sugar craving pattern check funnel (Vite + React, deployed on Vercel).

## Prerendering (read before adding pages)

`npm run build` prerenders every route to static HTML (`src/entry-server.tsx` + `scripts/prerender.mjs`) so crawlers and link previews see the real page text and per-page title, description, canonical and og tags. React then hydrates in the browser.

Vercel serves those files directly with no SPA fallback, and unknown paths get `dist/404.html` with a real 404 status. **Any new page must be added to `PRERENDER_ROUTES` in `src/seo/routes.ts`** (with its title/description/canonical) **and to `<AppRoutes>` in `src/App.tsx`**, or it will return 404 in production.
