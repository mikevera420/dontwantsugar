#!/usr/bin/env node
/**
 * Build-time prerender. Runs after `vite build` (client) and
 * `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
 * Writes dist/<route>/index.html for every route in src/seo/routes.ts with the
 * real rendered page body plus that page's title, description, canonical and
 * og tags, and dist/404.html (served by Vercel with a 404 status for unknown
 * paths). React hydrates the HTML in the browser.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");
const { render, PRERENDER_ROUTES, NOT_FOUND_META } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);

const shell = readFileSync(join(dist, "index.html"), "utf8");
if (!shell.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s) => esc(s).replace(/"/g, "&quot;");

function setTag(html, re, tag) {
  if (!re.test(html)) throw new Error(`prerender: tag not found in index.html: ${re}`);
  return html.replace(re, tag);
}

function page(meta, url, extraHead = "") {
  let html = shell;
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${attr(meta.description)}" />`);
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${attr(meta.ogTitle ?? meta.title)}" />`);
  html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${attr(meta.ogDescription ?? meta.description)}" />`);
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${attr(meta.canonical)}" />`);
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${attr(meta.canonical)}" />`);
  if (extraHead) html = html.replace("</head>", `  ${extraHead}\n  </head>`);
  return html.replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`);
}

const seen = new Set();
for (const meta of PRERENDER_ROUTES) {
  if (seen.has(meta.path)) throw new Error(`prerender: duplicate route ${meta.path}`);
  seen.add(meta.path);
  const file = meta.path === "/" ? join(dist, "index.html") : join(dist, meta.path.slice(1), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(meta, meta.path));
}
writeFileSync(join(dist, "404.html"), page(NOT_FOUND_META, NOT_FOUND_META.path, '<meta name="robots" content="noindex" />'));

rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${PRERENDER_ROUTES.length} routes + 404.html`);
