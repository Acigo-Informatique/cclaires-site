# C’Claires — site vitrine

Site construit par [Astro](https://astro.build) en pages HTML statiques (`dist/`), sans framework côté
navigateur : un fichier CSS, un petit script. Publié sur GitHub Pages ; Vercel reste possible
(`vercel.json`). L’adresse retenue pour les balises canoniques, Open Graph, le JSON-LD et le sitemap est
celle de `site.config.mjs` (`https://cclaires.fr`).

## Réglages : `site.config.mjs`

Le seul fichier à toucher pour les réglages : adresse du site, **indexation** (`indexable`, à passer à
`true` une fois le domaine branché), téléphone, adresse du formulaire de devis, délai de réponse,
mesure d’audience, directeur de la publication. Une valeur laissée à `null` affiche à sa place un
emplacement « À COMPLÉTER » sur les pages. La liste de tout ce qui reste à fournir est dans
[`TODO-MANUEL.md`](TODO-MANUEL.md).

## Arborescence

| Chemin | Rôle |
|---|---|
| `src/pages/` | une page par fichier, son adresse suit son chemin (`logiciel-ostreicole.astro` → `/logiciel-ostreicole/`) ; `robots.txt`, `sitemap.xml` et le manifeste y sont générés |
| `src/layouts/Base.astro` | gabarit commun : `<head>` (title, description, canonique, robots, Open Graph, JSON-LD), en-tête, pied de page |
| `src/components/` | en-tête et menus, pied de page, fil d’Ariane, premier écran des pages intérieures, parcours « de la commande à la facture », documents et fragments d’interface (`documents/`), formulaire de démo et de devis, FAQ, offre, photo, emplacements à compléter, écrans simplifiés du logiciel (`Ecran.astro` et `ecrans/`, sans capture réelle), témoignages et logos, appel final |
| `src/lib/typographie.mjs` | la dernière main sur chaque page : espaces insécables, nom de marque protégé de la traduction automatique |
| `src/donnees/plan.mjs` | **le plan du site** : chaque page, son libellé, sa parente. Il nourrit le menu, le pied de page, les fils d’Ariane, le sitemap et le contrôle des liens. Une nouvelle page s’y ajoute d’abord |
| `src/donnees/parcours/` | les commandes d’exemple de la démonstration à cliquer (huîtres, moules, marée) |
| `src/donnees/metiers/`, `src/donnees/fonctions/` | le contenu des pages métier et des pages fonctionnalité, rendu par `PageMetier` et `PageFonction` |
| `src/donnees/preuves.mjs` | témoignages, logos de clients, étude de cas, photo de l’équipe : vides tant que rien n’est fourni avec accord écrit ; leurs blocs, et la page /clients/, n’apparaissent qu’une fois renseignés |
| `src/content/guides/` | les guides, un fichier Markdown par guide (schéma dans `src/content.config.ts`) |
| `src/donnees/schemas.mjs` | les données structurées communes (éditeur, site, fil d’Ariane, questions) |
| `src/styles/site.css` | jetons de la charte, mise en page, fragments d’interface (`[data-ui]`) |
| `src/scripts/site.js` | apparitions au défilement, menus, démonstration, onglets des documents, interrupteurs |
| `src/assets/photos/` | photos sources, déclinées à la construction en AVIF, WebP et JPEG à plusieurs largeurs ; `credits.json` (source, auteur, licence) |
| `public/` | copié tel quel : polices (OFL), logos, codes-barres, icônes, image de partage |
| `tools/` | outils de travail, non publiés (voir plus bas) |

Les documents montrés (étiquette, BL, fiche palette, traçabilité, CERFA) utilisent des données fictives :
exploitation « des Trois Claires », clients « Poissonnerie de la Halle », « Restaurant Le Bouchot »,
« Marée d’Auge », agrément `FR 17.999.001 CE`, GTIN `02000012345678`, SSCC `320000120000014827`
(préfixes de circulation restreinte). Une note en pied de page les dit fictifs.

## Travailler en local

```powershell
npm install
node tools/serveur-local.mjs
```

puis <http://127.0.0.1:4321/>. Le serveur construit le site, le sert depuis `dist/` et le reconstruit à
chaque modification. Pour une seule construction contrôlée :

```powershell
npm run construire
```

`npm run construire` enchaîne `astro build` et `tools/verifier.mjs`, qui contrôle le site construit : un
seul H1 par page, liens et ancres, titres et descriptions (150 à 160 caractères, uniques), images (alt,
dimensions), JSON-LD, balise robots, et les règles du contenu (aucune fonction à venir hors de la feuille
de route, aucun prix, espaces insécables).

## Mettre en ligne

**GitHub Pages** : `.github/workflows/pages.yml` construit, vérifie et publie à chaque push sur `dev`
(ou à la demande, onglet Actions). Tant que le site est servi sous `https://<compte>.github.io/<dépôt>/`,
le sous-dossier est passé à Astro (`BASE_PATH`) et les pages restent exclues des moteurs. Le domaine se
branche ensuite dans les réglages Pages (TODO-MANUEL DNS-01 et CNAME-01). GitHub Pages ne pose pas les
en-têtes de `vercel.json` (cache, CSP).

**Vercel** : le projet se détecte comme Astro ; `vercel.json` fixe la commande (`npm run construire`),
le dossier `dist`, le cache et les en-têtes de sécurité.

## Outils (`tools/`)

| Outil | Usage |
|---|---|
| `verifier.mjs` | contrôle de `dist/` (voir plus haut) |
| `serveur-local.mjs` | serveur local ; avec `?sonde=1`, fait tourner la sonde de l’inspecteur du skill taste-skill |
| `marque.mjs` | `node tools/marque.mjs <dossier des logos de la charte>` : logo blanc, logo paon, symbole, icône et favicon (dans `public/`) |
| `codes-barres.mjs` | `node tools/codes-barres.mjs` : codes GS1-128 réels des étiquettes et de la fiche palette |
| `carte.mjs` | `node tools/carte.mjs <france.svg>` : carte de France (domaine public) avec Saint-Lô |
| `recadrer.ps1` | recadre une photo avant de la déposer dans `src/assets/photos/` (une seule largeur suffit, la plus grande : Astro décline les autres) |
| `remplir-cerfa.mjs` | remplit le CERFA officiel avec la commande d’exemple ; nécessite `npm i --no-save pdf-lib@1.17.1` |
| `images.html` | ouverte via le serveur local (`/tools/images.html`, puis `generer()` dans la console) : régénère l’image de partage et les icônes PNG |
