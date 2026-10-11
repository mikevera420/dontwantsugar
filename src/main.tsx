import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";

const app = (
  <>
    <App />
    <Analytics />
  </>
);

const root = document.getElementById("root")!;

// Pages are prerendered at build time (scripts/prerender.mjs); hydrate when
// server HTML is present, fall back to a fresh render otherwise (vite dev).
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
