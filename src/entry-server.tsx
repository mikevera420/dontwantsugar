import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Analytics } from "@vercel/analytics/react";
import { AppProviders, AppRoutes } from "./App";

export { PRERENDER_ROUTES, NOT_FOUND_META } from "./seo/routes";

/** Render one route to HTML. Tree mirrors src/main.tsx so hydration matches. */
export function render(url: string): string {
  return renderToString(
    <>
      <AppProviders>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </AppProviders>
      <Analytics />
    </>,
  );
}
