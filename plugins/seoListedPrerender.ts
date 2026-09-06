import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

export type SeoPrerenderPage = {
  /** URL path, e.g. "/sugar-craving-assessment" */
  route: string;
  title: string;
  description: string;
  canonical: string;
  /** Absolute path to an HTML fragment injected into #root for crawlers */
  bodyFile: string;
};

/**
 * Listed-route prerender at build (Vercel-safe, no Puppeteer).
 * Writes dist/<route>/index.html with title/meta/canonical + static body HTML
 * so crawlers see content before client JS hydrates.
 *
 * Add new SEO pages to the pages array (room for
 * /stop-sugar-cravings-without-willpower).
 */
export function seoListedPrerender(pages: SeoPrerenderPage[]): Plugin {
  return {
    name: "seo-listed-prerender",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");
      const indexPath = path.join(distDir, "index.html");
      if (!fs.existsSync(indexPath)) {
        console.warn("[seo-listed-prerender] dist/index.html missing; skip");
        return;
      }
      const shell = fs.readFileSync(indexPath, "utf8");

      for (const page of pages) {
        if (!fs.existsSync(page.bodyFile)) {
          throw new Error(`[seo-listed-prerender] missing body file: ${page.bodyFile}`);
        }
        const bodyHtml = fs.readFileSync(page.bodyFile, "utf8");
        let html = shell;

        html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);

        if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
          html = html.replace(
            /<meta\s+name=["']description["'][^>]*>/i,
            `<meta name="description" content="${escapeAttr(page.description)}" />`,
          );
        } else {
          html = html.replace(
            /<\/head>/i,
            `  <meta name="description" content="${escapeAttr(page.description)}" />\n  </head>`,
          );
        }

        if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
          html = html.replace(
            /<link\s+rel=["']canonical["'][^>]*>/i,
            `<link rel="canonical" href="${escapeAttr(page.canonical)}" />`,
          );
        } else {
          html = html.replace(
            /<\/head>/i,
            `  <link rel="canonical" href="${escapeAttr(page.canonical)}" />\n  </head>`,
          );
        }

        if (/property=["']og:title["']/.test(html)) {
          html = html.replace(
            /<meta\s+property=["']og:title["'][^>]*>/i,
            `<meta property="og:title" content="${escapeAttr(page.title)}" />`,
          );
        }
        if (/property=["']og:description["']/.test(html)) {
          html = html.replace(
            /<meta\s+property=["']og:description["'][^>]*>/i,
            `<meta property="og:description" content="${escapeAttr(page.description)}" />`,
          );
        }
        if (/property=["']og:url["']/.test(html)) {
          html = html.replace(
            /<meta\s+property=["']og:url["'][^>]*>/i,
            `<meta property="og:url" content="${escapeAttr(page.canonical)}" />`,
          );
        }

        if (!/<div id="root"><\/div>/.test(html)) {
          throw new Error('[seo-listed-prerender] expected <div id="root"></div> in index.html');
        }
        html = html.replace(
          '<div id="root"></div>',
          `<div id="root">${bodyHtml}</div>`,
        );

        const outDir = path.join(distDir, page.route.replace(/^\//, ""));
        fs.mkdirSync(outDir, { recursive: true });
        const outFile = path.join(outDir, "index.html");
        fs.writeFileSync(outFile, html);
        console.log(`[seo-listed-prerender] wrote ${path.relative(process.cwd(), outFile)}`);
      }
    },
  };
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s: string) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}
