// robots.txt : tout est autorisé, le sitemap est déclaré. L’exclusion des moteurs, tant que le site
// n’est pas prêt, passe par la balise robots de chaque page (réglage `indexable`), qu’un robot doit
// pouvoir lire.
import { absolu } from '../lib/chemins.mjs';

export const GET = () => new Response(
  `User-agent: *\nAllow: /\n\nSitemap: ${absolu('/sitemap.xml')}\n`,
  { headers: { 'content-type': 'text/plain; charset=utf-8' } },
);
