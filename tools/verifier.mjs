// Contrôle du site construit (dist/), après `astro build` :
//   - un seul H1 par page, des identifiants uniques ;
//   - liens et ancres internes (une page du plan pas encore construite n’est qu’un avertissement) ;
//   - title et meta description présents et uniques, description de 150 à 160 caractères ;
//   - images : alt, width et height ;
//   - balise canonique, balise robots conforme au réglage `indexable`, JSON-LD lisible,
//     fil d’Ariane hors accueil, FAQPage cohérent avec les questions affichées ;
//   - règle 1 (vérité des promesses) : « bientôt », « prévu », « en préparation », HACCP et statistiques
//     seulement sur /feuille-de-route/ ; chaque « Pennylane » et « électronique » listé pour relecture ;
//   - règle 2 (prix) : aucun « € » hors des fragments d’interface [data-ui] (montants de la commande d’exemple) ;
//   - typographie : espace insécable avant « : ; ? ! », apostrophes typographiques ;
//   - emplacements à compléter : chaque data-todo doit figurer dans TODO-MANUEL.md.
// Sortie : 1 si au moins un échec.
//   node tools/verifier.mjs [dist]
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import reglages from '../site.config.mjs';
import { pages as plan } from '../src/donnees/plan.mjs';

const racine = process.argv[2] || 'dist';
// construit sous un sous-dossier (GitHub Pages) : les liens portent ce préfixe, les fichiers non
const prefixe = (process.env.BASE_PATH || '').replace(/\/+$/, '');
const FEUILLE_DE_ROUTE = '/feuille-de-route/';
const VIDES = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

const fichiers = (d) => readdirSync(d, { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? fichiers(join(d, e.name)) : [join(d, e.name)]));
const html = fichiers(racine).filter((f) => f.endsWith('.html'));
const urlDe = (f) => '/' + relative(racine, f).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '');

// Retire les éléments dont la balise ouvrante vérifie `garder` (avec tout leur contenu).
function retirer(source, cible) {
  const re = /<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g;
  let sortie = '', depuis = 0, m;
  while ((m = re.exec(source))) {
    const [, fin, nom, attrs] = m;
    if (fin || VIDES.has(nom.toLowerCase()) || !cible(nom, attrs)) continue;
    let prof = 1, n;
    const re2 = new RegExp(`<(/?)${nom}\\b[^>]*>`, 'gi');
    re2.lastIndex = re.lastIndex;
    while (prof && (n = re2.exec(source))) prof += n[1] ? -1 : (n[0].endsWith('/>') ? 0 : 1);
    sortie += source.slice(depuis, m.index);
    depuis = n ? re2.lastIndex : source.length;
    re.lastIndex = depuis;
  }
  return sortie + source.slice(depuis);
}
const sansCode = (h) => retirer(h.replace(/<!--[\s\S]*?-->/g, ''), (n) => /^(script|style)$/i.test(n));
const texte = (h) => h.replace(/<\/?(span|a|b|i|em|strong|small|abbr|time|sup|sub)\b[^>]*>/gi, '').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&#8239;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, '\'').replace(/&quot;/g, '"');
const extrait = (t, i) => '« …' + t.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' ').trim() + '… »';

const echecs = [], alertes = [], relire = [];
const echec = (url, msg) => echecs.push(`${url}  ${msg}`);
const alerte = (url, msg) => alertes.push(`${url}  ${msg}`);

const contenus = new Map(html.map((f) => [urlDe(f), readFileSync(f, 'utf8')]));
const titres = new Map(), descriptions = new Map(), todos = new Set(), aVenir = new Set();
const todoManuel = existsSync('TODO-MANUEL.md') ? readFileSync('TODO-MANUEL.md', 'utf8') : '';
const prevues = new Set(plan.map((p) => p.url));

for (const [url, h] of contenus) {
  const est404 = url === '/404';
  const corps = sansCode(h);

  // structure
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) echec(url, `${h1} balise(s) H1 au lieu d’une`);
  const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of new Set(ids.filter((id, i) => ids.indexOf(id) !== i))) echec(url, `identifiant en double : #${id}`);

  // titre, description, canonique, robots
  const titre = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!titre) echec(url, 'pas de <title>');
  else { if (titres.has(titre)) echec(url, `title déjà utilisé par ${titres.get(titre)}`); titres.set(titre, url); }
  if (!desc) echec(url, 'pas de meta description');
  else if (!est404) {
    const n = [...texte(desc)].length;
    if (n < 150 || n > 160) echec(url, `meta description de ${n} caractères (150 à 160 attendus)`);
    if (descriptions.has(desc)) echec(url, `meta description déjà utilisée par ${descriptions.get(desc)}`);
    descriptions.set(desc, url);
  }
  const robots = (h.match(/<meta name="robots" content="([^"]*)"/) || [])[1];
  if (!robots) echec(url, 'pas de balise robots');
  else if ((!reglages.indexable || est404) && robots !== 'noindex') echec(url, `robots « ${robots} » alors que la page ne doit pas être indexée`);
  if (!est404) {
    const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    if (canon !== new URL(url.endsWith('/') ? url : url + '/', reglages.url).href) echec(url, `balise canonique inattendue : ${canon}`);
  }

  // JSON-LD
  const blocs = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let graphe = [];
  for (const b of blocs) { try { const j = JSON.parse(b[1]); graphe.push(...(j['@graph'] || [j])); } catch (e) { echec(url, 'JSON-LD illisible : ' + e.message); } }
  const types = graphe.map((n) => n['@type']);
  if (!types.includes('Organization')) echec(url, 'JSON-LD : pas d’Organization');
  if (url !== '/' && !est404 && !types.includes('BreadcrumbList')) echec(url, 'JSON-LD : pas de BreadcrumbList');
  const faq = graphe.find((n) => n['@type'] === 'FAQPage');
  const questionsVisibles = (h.match(/class="faq__q"/g) || []).length;
  if (faq && faq.mainEntity.length !== questionsVisibles) echec(url, `FAQPage déclare ${faq.mainEntity.length} questions, la page en affiche ${questionsVisibles}`);
  if (!faq && questionsVisibles) echec(url, 'questions affichées sans JSON-LD FAQPage');
  if (/"(price|offers|aggregateRating|review)"/.test(blocs.map((b) => b[1]).join(''))) echec(url, 'JSON-LD : prix, offre, note ou avis déclaré');

  // images
  for (const [img] of h.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt(=|[\s>])/.test(img)) echec(url, `image sans alt : ${img.slice(0, 90)}`);
    if (!/\swidth="\d+"/.test(img) || !/\sheight="\d+"/.test(img)) echec(url, `image sans width/height : ${img.slice(0, 90)}`);
  }

  // liens et ancres internes
  for (const [, cible] of h.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(cible)) continue;
    if (prefixe && cible.startsWith('/') && !cible.startsWith(prefixe + '/')) { echec(url, `lien sans le sous-dossier ${prefixe} : ${cible}`); continue; }
    const [chemin, ancre] = (prefixe && cible.startsWith(prefixe + '/') ? cible.slice(prefixe.length) : cible).split('#');
    const page = chemin === '' ? url : chemin.split('?')[0];
    if (chemin !== '' && page.startsWith('/')) {
      const f = join(racine, decodeURIComponent(page));
      const trouve = existsSync(f) && (statSync(f).isFile() || existsSync(join(f, 'index.html')));
      if (!trouve) {
        if (prevues.has(page)) aVenir.add(page);
        else echec(url, `lien cassé : ${cible}`);
        continue;
      }
      if (!page.endsWith('/') && existsSync(join(f, 'index.html'))) echec(url, `lien sans barre finale : ${cible}`);
    }
    if (ancre) {
      const cibleHtml = contenus.get(page);
      if (cibleHtml && !new RegExp(`\\sid="${ancre}"`).test(cibleHtml)) echec(url, `ancre introuvable : ${cible}`);
    }
  }

  // emplacements à compléter
  for (const [, id] of h.matchAll(/data-todo="([^"]+)"/g)) {
    todos.add(id);
    if (todoManuel && !todoManuel.includes(id)) alerte(url, `emplacement ${id} absent de TODO-MANUEL.md`);
  }

  // règles 1 et 2, sur le texte lu (sans les emplacements à compléter ni les commentaires)
  const lu = texte(retirer(corps, (n, a) => /class="[^"]*a-completer/.test(a)));
  const ldTexte = blocs.map((b) => b[1]).join(' ');
  if (url !== FEUILLE_DE_ROUTE) {
    for (const re of [/bient[ôo]t/gi, /\bprévu(e|s|es)?\b/gi, /en préparation/gi, /HACCP/g, /statistiques?/gi]) {
      for (const m of (lu + ' ' + ldTexte).matchAll(re)) echec(url, `règle 1 : ${extrait(lu + ' ' + ldTexte, m.index)}`);
    }
  }
  // à relire : chaque mention hors des menus (où « Facture électronique » n’est que le nom de la page)
  const horsMenus = texte(retirer(retirer(corps, (n) => n.toLowerCase() === 'nav'), (n, a) => /class="[^"]*a-completer/.test(a)));
  for (const m of horsMenus.matchAll(/Pennylane|électroniques?/gi)) relire.push(`${url}  ${extrait(horsMenus, m.index)}`);
  const horsUi = texte(retirer(retirer(corps, (n, a) => /\sdata-ui[\s=>]|\sdata-ui$/.test(a)), (n, a) => /class="[^"]*a-completer/.test(a)));
  for (const m of horsUi.matchAll(/€/g)) echec(url, `règle 2 : montant hors fragment d’interface ${extrait(horsUi, m.index)}`);
  if (/€/.test(ldTexte)) echec(url, 'règle 2 : montant dans le JSON-LD');

  // typographie française (hors fragments d’interface et emplacements à compléter)
  const typo = texte(retirer(retirer(corps, (n, a) => /\sdata-ui[\s=>]|\sdata-ui$/.test(a)), (n, a) => /class="[^"]*a-completer/.test(a)));
  const espaces = [...typo.matchAll(/[^\s  (]( )([:;?!])(?=[\s<]|$)/g)];
  if (espaces.length) alerte(url, `${espaces.length} espace(s) ordinaire(s) avant « : ; ? ! », ex. ${extrait(typo, espaces[0].index)}`);
  const droites = [...typo.matchAll(/\w'\w/g)];
  if (droites.length) alerte(url, `${droites.length} apostrophe(s) droite(s), ex. ${extrait(typo, droites[0].index)}`);
  const clics = [...typo.matchAll(/\d (clics?|étiquettes?|kg)\b/g)];
  if (clics.length) alerte(url, `${clics.length} nombre(s) séparé(s) de leur unité par une espace ordinaire, ex. ${extrait(typo, clics[0].index)}`);
}

// toutes les pages du plan construites ? (les liens vers elles sont alors seulement signalés)
const manquantes = plan.filter((p) => !contenus.has(p.url)).map((p) => p.url);
if (manquantes.length) alerte('(plan)', `${manquantes.length} page(s) du plan pas encore construite(s), liens vers elles tolérés : ${manquantes.join(' ')}`);
for (const p of aVenir) if (!manquantes.includes(p)) echec('(plan)', `lien vers ${p}, introuvable`);

const bloc = (titre, liste) => liste.length && console.log(`\n${titre} (${liste.length})\n` + liste.map((l) => '  ' + l).join('\n'));
console.log(`VÉRIFICATION · ${contenus.size} page(s) dans ${racine}/`);
bloc('ÉCHECS', echecs);
bloc('AVERTISSEMENTS', alertes);
bloc('À RELIRE (Pennylane, électronique : seules les formulations autorisées par la règle 1)', relire);
console.log(`\nEmplacements à compléter sur les pages : ${[...todos].sort().join(', ') || 'aucun'}`);
console.log(`\nRÉSULTAT : ${echecs.length} échec(s), ${alertes.length} avertissement(s)`);
process.exit(echecs.length ? 1 : 0);
