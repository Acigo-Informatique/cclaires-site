// Construction du site par Astro : des pages HTML statiques dans dist/, sans framework côté navigateur.
import { defineConfig } from 'astro/config';
import reglages from './site.config.mjs';

// Sur GitHub Pages, tant que le domaine n’est pas branché, le site est servi sous /<dépôt>/ :
// le workflow passe ce sous-dossier dans BASE_PATH. En local et sur cclaires.fr, il vaut « / ».
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: reglages.url,
  base,
  trailingSlash: 'always',
  // CSS et script en fichiers à part, jamais en ligne : mis en cache d’une page à l’autre, et
  // compatibles avec la politique de sécurité (CSP) de vercel.json
  build: { format: 'directory', inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  // espaces conservés entre éléments en ligne, comme dans du HTML écrit à la main
  compressHTML: true,
  devToolbar: { enabled: false },
});
