# Actions manuelles avant la mise en ligne

Tout ce que la refonte ne peut pas produire elle-même. Sur les pages, chaque emplacement est un bloc
`.a-completer` bien visible (pointillés orange, fond jaune pâle) avec son identifiant (`data-todo`) et un
commentaire `<!-- TODO-MANUEL ID : … -->` dans le source. `npm run verifier` liste ceux qui restent.
Rien ne doit être inventé : ni témoignage, ni client, ni chiffre, ni citation.

Priorité : **haute** = bloque la mise en ligne ; **moyenne** = à faire dans le premier mois ; **basse** = quand possible.

## Réglages (site.config.mjs)

Une valeur renseignée dans `site.config.mjs` fait disparaître l’emplacement sur toutes les pages.

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| TEL-01 | Toutes (en-tête, pied de page), /demo/ | Numéro de téléphone affiché (`telephone`) | haute |
| FORM-01 | /demo/, accueil | Endpoint Formspree (`formulaire.endpoint`) : créer le formulaire sur formspree.io, désactiver le reCAPTCHA (envoi par script), ajouter cclaires.fr aux domaines autorisés | haute |
| DELAI-01 | /demo/, accueil | Délai de réponse au devis annoncé sous le bouton (`formulaire.delaiReponse`) | haute |
| DIRPUB-01 | /mentions-legales/ | Nom et fonction du directeur de la publication (`directeurPublication`) | haute |
| AUDIENCE-01 | Toutes | Mesure d’audience sans cookie (`audience`) : Plausible ou Matomo, puis ajouter son domaine à la CSP de `vercel.json` si le site part sur Vercel | moyenne |

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
| STATUT-01 | Toutes | Confirmer que ces fonctions, présentées au présent, sont livrées : encaissements, viviers, applications de préparation et de palettisation, CERFA 15063 prérempli depuis le BL, promotions du jour, documents dans la langue du client, contrôle des cahiers des charges IGP et Label Rouge, vérification du classement des zones A/B/C, simulateur des règles d’étiquette, journal des impressions | haute |
| ETIQ-01 | /tarifs/, accueil | Préciser ce que comprend la ligne « étiqueteuses » de l’offre (fourniture, installation, paramétrage, maintenance ?) | haute |
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

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| TEMO-01 | Accueil, /logiciel-ostreicole/, /clients/ | Témoignage d’un ostréiculteur client : citation de 20 à 40 mots, prénom et nom, entreprise, bassin, photo carrée (600 × 600 px minimum), accord écrit pour la publication | haute |
| TEMO-02 | Accueil, /logiciel-mytilicole/, /clients/ | Témoignage d’un mytiliculteur client, mêmes éléments | haute |
| TEMO-03 | Accueil, /logiciel-mareyage/, /clients/ | Témoignage d’un mareyeur client, mêmes éléments | haute |
| LOGOS-01 | Accueil, /clients/ | Logos de 6 à 8 clients qui ont donné leur accord, en SVG d’une seule couleur | moyenne |
| EQUIPE-01 | Accueil, /a-propos/ | Photo de l’équipe ACIGO à Saint-Lô (paysage 3:2, 1600 px de large au moins) et les prénoms pour la légende | moyenne |
| CAS-01 | /clients/ | Étude de cas chiffrée d’un client qui a donné son accord : entreprise, métier, bassin, situation de départ, mise en place, résultats mesurés et vérifiables, citation du dirigeant | moyenne |

## Juridique

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| CONFID-01 | /confidentialite/ | Faire valider par un juriste chaque point marqué [À VÉRIFIER] : base légale, transfert hors UE par Formspree, durée de conservation, liste des droits, mesure d’audience sans cookie | haute |
