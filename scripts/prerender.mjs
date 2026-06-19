import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  PRERENDER_ROUTES,
  SITE_NAME,
  SITE_URL,
  getJsonLd,
  getRouteMeta,
  render,
} from "../dist-server/entry-server.js";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(rootDir, "dist");
const template = readFileSync(join(distDir, "index.html"), "utf8");

for (const marker of ["<title>", "</head>", '<div id="root"></div>']) {
  if (!template.includes(marker)) {
    throw new Error(`prerender: template dist/index.html is missing ${marker}`);
  }
}

function escapeAttr(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function headTags(meta, jsonLd) {
  const url = `${SITE_URL}${meta.canonicalPath}`;
  const tags = [
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.ogDescription)}" />`,
    `<meta property="og:image" content="${escapeAttr(meta.ogImage)}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.ogDescription)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(meta.ogImage)}" />`,
  ];
  for (const ld of jsonLd) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`,
    );
  }
  return tags.join("\n    ");
}

function buildHtml(route) {
  const meta = getRouteMeta(route);
  const appHtml = render(route);
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
  );
  html = html.replace("</head>", `    ${headTags(meta, getJsonLd(route))}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return html;
}

function targetFile(route) {
  return route === "/" ? "index.html" : `${route.replace(/^\//, "")}.html`;
}

for (const route of PRERENDER_ROUTES) {
  const outPath = join(distDir, targetFile(route));
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buildHtml(route), "utf8");
  console.log(`prerendered ${route} -> ${targetFile(route)}`);
}

writeFileSync(
  join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  "utf8",
);

const sitemapUrls = PRERENDER_ROUTES.map(
  (route) => `  <url><loc>${SITE_URL}${getRouteMeta(route).canonicalPath}</loc></url>`,
).join("\n");
writeFileSync(
  join(distDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
  "utf8",
);
console.log("wrote robots.txt + sitemap.xml");
