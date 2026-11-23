import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { organization, origin, pages, render } from "../node_modules/.cache/zolara-ssr/entry-server.js";

const template = await readFile("dist/index.html", "utf8");
const noIndex = process.env.ZOLARA_REVIEW === "1" || process.env.VERCEL_ENV === "preview";
const image = origin + "/social-preview-zh.jpg";

function escapeHtml(text) {
  return text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function pageHtml(path, metadata) {
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonical = path ? origin + path : "";
  const head = [
    `<meta name="description" content="${description}" />`,
    ...(path ? [
      `<link rel="canonical" href="${canonical}" />`,
      '<meta property="og:type" content="website" />',
      '<meta property="og:site_name" content="Zolara Holdings" />',
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:image" content="${image}" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      '<meta property="og:image:alt" content="Zolara Holdings wordmark and official gold ZH monogram" />',
      '<meta name="twitter:card" content="summary_large_image" />',
    ] : []),
    ...(noIndex || !path ? ['<meta name="robots" content="noindex, nofollow" />'] : []),
    ...(path === "/" ? [`<script type="application/ld+json">${JSON.stringify(organization)}</script>`] : []),
  ].join("\n    ");

  return template
    .replace("<title>Zolara Holdings Ltd</title>", `<title>${title}</title>`)
    .replace("<!--page-metadata-->", () => head)
    .replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`);
}

const routes = Object.entries(pages);
await Promise.all(routes.map(async ([path, metadata]) => {
  const output = join("dist", path.slice(1), "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, pageHtml(path, metadata));
}));

await writeFile("dist/404.html", pageHtml(null, {
  title: "Page unavailable | Zolara Holdings Ltd",
  description: "We couldn’t find the page you requested.",
}));

const sitemap = routes.map(([path]) => `  <url><loc>${origin}${path}</loc></url>`).join("\n");
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`);
await writeFile("dist/robots.txt", noIndex ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
