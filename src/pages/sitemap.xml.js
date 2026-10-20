// sitemap.xml : les pages du plan (src/donnees/plan.mjs) qui existent dans src/pages, à l’adresse
// du site (site.config.mjs, url).
import { pages } from '../donnees/plan.mjs';
import { absolu } from '../lib/chemins.mjs';

const sources = Object.keys(import.meta.glob('./**/*.astro'));
const routes = new Set(sources
  .filter((s) => !s.includes('['))
  .map((s) => s.replace(/^\./, '').replace(/\.astro$/, '').replace(/\/index$/, '') + '/')
  .map((r) => r.replace(/^\/+/, '/')));

export const GET = () => {
  const jour = new Date().toISOString().slice(0, 10);
  const urls = pages.filter((p) => routes.has(p.url))
    .map((p) => `  <url>\n    <loc>${absolu(p.url)}</loc>\n    <lastmod>${jour}</lastmod>\n  </url>`);
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
    { headers: { 'content-type': 'application/xml; charset=utf-8' } },
  );
};
