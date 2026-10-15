# C’Claires — site vitrine

Site statique (HTML, CSS, un peu de JavaScript, aucune dépendance ni étape de construction), prévu pour
être servi tel quel par Vercel. Le domaine retenu dans les balises canoniques, le sitemap et les
données structurées est `https://cclaires.fr`.

## Arborescence

| Chemin | Rôle |
|---|---|
| `index.html` | page d’accueil : premier écran, parcours d’une commande, documents, automatismes, normes, modules, éditeur, questions, appel final |
| `mentions-legales.html` | mentions légales, crédits (servie en `/mentions-legales`) |
| `404.html` | page introuvable |
| `assets/css/site.css` | jetons de la charte, mise en page, fragments d’interface (`[data-ui]`) |
| `assets/js/site.js` | apparitions au défilement, onglets des documents, interrupteurs, menu téléphone |
| `assets/fonts/` | Cairo (variable) et Barlow Condensed, auto-hébergées, licence OFL |
| `assets/img/` | logo dérivé de la charte, carte, codes-barres, image de partage, icônes |
| `assets/img/photos/` | photos recadrées, et `credits.json` (source, auteur, licence de chacune) |
| `vercel.json` | URL propres, cache, en-têtes de sécurité (dont la CSP) |
| `.vercelignore` | ce qui n’est pas publié : `tools/`, `.taste-skill/`, ce README |
| `tools/` | outils de travail (voir plus bas), non publiés |

## Voir le site en local

```powershell
node tools/serveur-local.mjs
```

puis <http://127.0.0.1:4321/>. N’importe quel serveur statique convient aussi
(`python -m http.server 4321`), à ceci près que `/mentions-legales` y demande l’extension `.html`.

## Mettre en ligne sur Vercel

Sans configuration de framework : « Other », aucune commande de build, dossier de sortie à la racine.
Soit en reliant le dépôt GitHub au projet Vercel, soit avec la CLI :

```powershell
npx vercel          # aperçu
npx vercel --prod   # production
```

Puis rattacher `cclaires.fr` au projet et rediriger `www.cclaires.fr` vers le domaine nu (réglage des
domaines dans Vercel).

## À remplacer avant la mise en ligne

- **Les photos** : ce sont des images libres de droits (Ifremer, Wikimedia Commons), en attendant les
  vôtres. Chaque crédit figure en pied de page et dans les mentions légales ; les retirer avec la photo.
  Les nouvelles photos se recadrent avec `tools/recadrer.ps1`.
- **Le directeur de la publication**, dans `mentions-legales.html` (marqué « à compléter »).
- **Les données d’exemple** des documents montrés : exploitation « des Trois Claires », clients
  « Poissonnerie de la Halle », « Restaurant Le Bouchot », « Marée d’Auge », numéros de pièces, lots,
  agrément `FR 17.999.001 CE`, GTIN `02000012345678` et SSCC `320000120000014827` (préfixes de
  circulation restreinte, donc sans collision avec de vrais produits). Une note en pied de page les dit
  fictifs.
- **Les fonctionnalités annoncées** : la page présente le logiciel complet. Plusieurs modules ne sont
  pas encore en production (voir le compte rendu de création du site) ; ajuster le texte si le site
  part avant eux.

## Outils (`tools/`)

| Outil | Usage |
|---|---|
| `marque.mjs` | `node tools/marque.mjs <dossier des logos de la charte>` : logo blanc, logo paon, symbole, icône et favicon, à partir des SVG d’origine (tracés recopiés, jamais redessinés) |
| `codes-barres.mjs` | `node tools/codes-barres.mjs` : codes GS1-128 réels de l’étiquette et de la fiche palette |
| `carte.mjs` | `node tools/carte.mjs <france.svg>` : carte de France (domaine public) avec Saint-Lô |
| `recadrer.ps1` | recadre et compresse une photo en plusieurs largeurs |
| `images.html` | ouverte via le serveur local (`/tools/images.html`, puis `generer()` dans la console) : régénère l’image de partage et les icônes PNG |
| `serveur-local.mjs` | serveur local ; avec `?sonde=1`, fait tourner la sonde de l’inspecteur du skill taste-skill |

## La suite

Documentation du logiciel, téléchargements, notes de version : le jour où elles arrivent, un
générateur de site statique (Astro, avec Starlight pour la documentation) reprendra ces pages sans
changer d’hébergeur ni d’URL.
