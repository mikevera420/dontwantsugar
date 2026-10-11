/**
 * Every route prerendered to static HTML at build time (scripts/prerender.mjs).
 * Vercel serves these files directly with no SPA fallback, so a page that is
 * not listed here returns 404 in production. Add new pages here AND in
 * <AppRoutes> in src/App.tsx.
 */
export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
};

const SITE = "https://idontwantsugar.com";

export const PRERENDER_ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "IDontWantSugar.com | Craving pattern check",
    description:
      "Map your sugar craving patterns in a few minutes. See them on this page. The Sugar Reset arrives in your email.",
    canonical: SITE,
    ogTitle: "What's Really Driving Your Sugar Cravings?",
    ogDescription:
      "Map your sugar craving patterns. See them on this page. The Sugar Reset arrives in your email.",
  },
  {
    path: "/sugar-craving-assessment",
    title: "Sugar Craving Assessment: Understand Your Pattern Without Judgment",
    description:
      "Use a nonjudgmental sugar craving assessment to explore stress, energy, habit, and reward patterns—without turning reflection into a diagnosis.",
    canonical: `${SITE}/sugar-craving-assessment`,
  },
  {
    path: "/stop-sugar-cravings-without-willpower",
    title: "How to Stop Sugar Cravings Without Willpower: Start With the Pattern",
    description:
      "Learn what to do when a sugar craving hits, then explore stress response, energy patterns, habit loops, and reward circuits without rigid rules or shame.",
    canonical: `${SITE}/stop-sugar-cravings-without-willpower`,
  },
];

export const NOT_FOUND_META: RouteMeta = {
  path: "/__not-found__",
  title: "Page not found | IDontWantSugar.com",
  description: "That page doesn't exist. Head back to the craving pattern check.",
  canonical: SITE,
};
