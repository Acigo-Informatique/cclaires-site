# Actions manuelles avant la mise en ligne

Tout ce que la refonte ne peut pas produire elle-même. Sur les pages, chaque emplacement est un bloc
`.a-completer` bien visible (pointillés orange, fond jaune pâle) avec son identifiant (`data-todo`) et un
commentaire `<!-- TODO-MANUEL ID : … -->` dans le source. `npm run verifier` liste ceux qui restent.
Rien ne doit être inventé : ni témoignage, ni client, ni chiffre, ni citation.

Priorité : **haute** = bloque la mise en ligne ; **moyenne** = à faire dans le premier mois ; **basse** = quand possible.

## Réglages (site.config.mjs)

Une valeur renseignée dans `site.config.mjs` fait disparaître l’emplacement sur toutes les pages.

Téléphone (TEL-01), adresse Formspree (FORM-01), délai de réponse (DELAI-01) et directeur de la
publication (DIRPUB-01) sont renseignés.

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| FORM-02 | /demo/, accueil | Le formulaire Formspree existe (`formulaire.endpoint`). À vérifier dans ses réglages : reCAPTCHA désactivé (envoi par script), cclaires.fr dans les domaines autorisés une fois le domaine branché ; puis envoyer une demande d’essai depuis le site en ligne et vérifier sa réception | haute |
| AUDIENCE-01 | Toutes | Mesure d’audience sans cookie (`audience`) : Plausible ou Matomo, puis ajouter son domaine à la CSP de `vercel.json` si le site part sur Vercel. En attente : aucune mesure pour l’instant (décision du 20/10/2026) | moyenne |

## Domaine et indexation

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| DNS-01 | — | Brancher le DNS de cclaires.fr sur GitHub Pages (enregistrements A/AAAA de GitHub, ou CNAME pour www) | haute |
| CNAME-01 | — | Une fois le DNS en place : renseigner « Custom domain » dans les réglages Pages du dépôt (ou ajouter `public/CNAME` contenant `cclaires.fr`), puis cocher « Enforce HTTPS ». Pas avant : GitHub redirigerait vers un domaine qui ne répond pas | haute |
| INDEX-01 | Toutes | Après DNS-01 et CNAME-01 : passer `indexable: true` dans `site.config.mjs` (les pages passent de `noindex` à `index, follow`) | haute |
| GSC-01 | — | Déclarer cclaires.fr dans Google Search Console et y soumettre `https://cclaires.fr/sitemap.xml` | moyenne |
| BING-01 | — | Même chose dans Bing Webmaster Tools (import possible depuis Search Console) | moyenne |
| GBP-01 | — | Fiche Google Business Profile d’ACIGO Informatique (Saint-Lô), avec le lien vers cclaires.fr | moyenne |

## Contenus à fournir

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| PHOTOS-01 | Toutes | Remplacer, si possible, les photos libres (Ifremer, Wikimedia Commons) par les vôtres ; retirer alors leur crédit du pied de page et des mentions légales | basse |

## Captures d’écran du logiciel

Chaque emplacement est un cadre au bon ratio (16:10), avec sa légende et le texte alternatif déjà
rédigés dans le fichier de données de la page. Déposer l’image dans `src/assets/captures/` (PNG ou JPEG,
1600 px de large au moins, sans données réelles de clients) et remplacer le composant `<Capture>` par
l’image, en reprenant le même texte alternatif.

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| CAPT-01 | /fonctionnalites/commandes-bons-de-livraison/ | Saisie d’une commande pré-remplie d’après les habitudes du client | haute |
| CAPT-02 | /logiciel-mareyage/, /fonctionnalites/etiquette-sanitaire/ | Éditeur de modèles d’étiquettes, un modèle ouvert avec ses variables | haute |
| CAPT-03 | /logiciel-ostreicole/, /logiciel-mytilicole/, /fonctionnalites/etiquette-sanitaire/ | Fenêtre d’impression des étiquettes ouverte depuis un bon de livraison | haute |
| CAPT-04 | /fonctionnalites/palettisation-sscc/ | Palettisation d’un BL : palettes proposées, SSCC attribué | haute |
| CAPT-05 | /logiciel-ostreicole/, /fonctionnalites/parcs-claires/ | Vue graphique des parcs et des claires, une claire sélectionnée | haute |
| CAPT-06 | /logiciel-ostreicole/, /logiciel-mytilicole/, /fonctionnalites/tracabilite/ | Fiche de traçabilité d’un lot, de la réception aux clients livrés | haute |
| CAPT-07 | /logiciel-mytilicole/, /logiciel-mareyage/ | Bon de livraison en poids variable : poids estimé et poids réel de chaque ligne | moyenne |
| CAPT-08 | /logiciel-mareyage/ | Réception d’un achat de marée, avec les lots créés par espèce | moyenne |
| CAPT-09 | /fonctionnalites/facture-electronique/ | Export des écritures comptables d’une période | moyenne |
| CAPT-10 | /fonctionnalites/edi-grande-distribution/ | Liste des messages EDI d’une journée : factures et ordres de transport | moyenne |

## Preuve sociale et équipe

En attente (décision du 20/10/2026) : rien n’est encore fourni, ces blocs sont **masqués** au lieu d’être
signalés. Chaque élément s’ajoute au fur et à mesure dans `src/donnees/preuves.mjs` (format décrit en
commentaire) et apparaît alors sur ses pages. La page /clients/ (`src/pages/[clients].astro`) n’est
construite, et n’entre au menu, au pied de page et au sitemap, qu’à partir du premier témoignage, logo ou
étude de cas.

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| TEMO-01 | Accueil, /logiciel-ostreicole/, /clients/ | Témoignage d’un ostréiculteur client : citation de 20 à 40 mots, prénom et nom, entreprise, bassin, photo carrée (600 × 600 px minimum), accord écrit pour la publication | haute |
| TEMO-02 | Accueil, /logiciel-mytilicole/, /clients/ | Témoignage d’un mytiliculteur client, mêmes éléments | haute |
| TEMO-03 | Accueil, /logiciel-mareyage/, /clients/ | Témoignage d’un mareyeur client, mêmes éléments | haute |
| LOGOS-01 | Accueil, /clients/ | Logos de 6 à 8 clients qui ont donné leur accord, en SVG d’une seule couleur | moyenne |
| EQUIPE-01 | Accueil, /a-propos/ | Photo de l’équipe ACIGO à Saint-Lô (paysage 3:2, 1600 px de large au moins) et les prénoms pour la légende | moyenne |
| CAS-01 | /clients/ | Étude de cas chiffrée d’un client qui a donné son accord : entreprise, métier, bassin, situation de départ, mise en place, résultats mesurés et vérifiables, citation du dirigeant | moyenne |

## Guides

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| GUIDE-VERIF | /guides/mentions-obligatoires-etiquette-sanitaire/, /guides/cerfa-15063/ | Relire chaque point marqué [À VÉRIFIER] sur les textes en vigueur (règlements CE 853/2004, UE 1379/2013, UE 1169/2011, notice du CERFA 15063*04), corriger ou sourcer, puis retirer la marque | haute |
| GUIDE-01 | /guides/ (à créer) | Guide « Le règlement UE 1379/2013 expliqué aux mareyeurs » (information du consommateur : dénomination, nom scientifique, zone FAO, engin) | moyenne |
| GUIDE-02 | /guides/ (à créer) | Guide « Numéro de lot : comment le construire et le tenir » | moyenne |
| GUIDE-03 | /guides/ (à créer) | Guide « Zones A, B et C : classement sanitaire et purification » | moyenne |
| GUIDE-04 | /guides/ (à créer) | Guide « Facture électronique : le calendrier de la réforme pour les entreprises de la mer » | moyenne |
| GUIDE-05 | /guides/ (à créer) | Guide « Rappel de lot : que faire, dans quel ordre » | basse |

Un guide s’ajoute en déposant un fichier Markdown dans `src/content/guides/` (voir les deux existants et
`src/content.config.ts`), puis en le déclarant dans `src/donnees/plan.mjs` pour le menu, le pied de page
et le sitemap.

## Juridique

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| CONFID-01 | /confidentialite/ | Faire valider par un juriste chaque point marqué [À VÉRIFIER] : base légale, transfert hors UE par Formspree, durée de conservation, liste des droits, mesure d’audience sans cookie | haute |
