import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

// Listed SEO routes to prerender at build. Add page-2 slug here when it ships.
export const SEO_PRERENDER_ROUTES = [
  "/sugar-craving-assessment",
  // "/stop-sugar-cravings-without-willpower",
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
    mode === "production" &&
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: SEO_PRERENDER_ROUTES,
        renderer: new vitePrerender.PuppeteerRenderer({
          headless: true,
          renderAfterDocumentEvent: "prerender-ready",
          args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        }),
        postProcess(renderedRoute) {
          // Keep the original route path (avoid redirect flattening).
          renderedRoute.route = renderedRoute.originalRoute;
          return renderedRoute;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
