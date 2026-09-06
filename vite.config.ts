import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { seoListedPrerender } from "./plugins/seoListedPrerender";

/**
 * Listed SEO routes prerendered at build into dist/<route>/index.html.
 * Uncomment page 2 when that route ships.
 */
const SEO_PRERENDER_PAGES = [
  {
    route: "/sugar-craving-assessment",
    title: "Sugar Craving Assessment: Understand Your Pattern Without Judgment",
    description:
      "Use a nonjudgmental sugar craving assessment to explore stress, energy, habit, and reward patterns—without turning reflection into a diagnosis.",
    canonical: "https://idontwantsugar.com/sugar-craving-assessment",
    bodyFile: path.resolve(__dirname, "src/seo/content/sugar-craving-assessment.body.html"),
  },
  // {
  //   route: "/stop-sugar-cravings-without-willpower",
  //   title: "How to Stop Sugar Cravings Without Willpower: Start With the Pattern",
  //   description:
  //     "Learn what to do when a sugar craving hits, then explore stress response, energy patterns, habit loops, and reward circuits without rigid rules or shame.",
  //   canonical: "https://idontwantsugar.com/stop-sugar-cravings-without-willpower",
  //   bodyFile: path.resolve(__dirname, "src/seo/content/stop-sugar-cravings-without-willpower.body.html"),
  // },
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && seoListedPrerender(SEO_PRERENDER_PAGES),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
