// Chemins du site. Toutes les adresses internes passent par lien() : sous GitHub Pages, le site vit
// dans un sous-dossier (BASE_PATH), et chaque lien doit le porter.
import reglages from '../../site.config.mjs';

const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

// '/demo/' → '/cclaires-site/demo/' sous un sous-dossier ; les ancres, mailto: et tel: restent tels quels.
export const lien = (chemin) => (chemin.startsWith('/') && !chemin.startsWith('//') ? base + chemin : chemin);

// Adresse absolue sur le domaine du site, pour la balise canonique, Open Graph, le JSON-LD et le sitemap.
export const absolu = (chemin) => new URL(chemin, reglages.url).href;

// Le site n’est qu’un aperçu tant qu’il est servi sous un sous-dossier.
export const sousDossier = base !== '';

// Dans du HTML écrit à la main (réponses de FAQ, textes des fichiers de données), les liens internes
// s’écrivent '/guides/…' : on leur ajoute le sous-dossier s’ils ne le portent pas déjà.
export const prefixer = (html) => (sousDossier
  ? html.replace(/(\s(?:href|src|action)=")\/(?!\/)/g, (m, debut, i) => (html.startsWith(base + '/', i + debut.length) ? m : `${debut}${base}/`))
  : html);
