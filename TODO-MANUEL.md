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
| FORM-03 | /demo/, accueil, /confidentialite/ | Remplacer Formspree, qui n’est plus certifié au Data Privacy Framework UE–États-Unis (« Inactive - Withdrawal » depuis le 26/04/2022) et ne publie pas de contrat de sous-traitance. Choix du 20/10/2026 : un script PHP chez OVH, qui héberge déjà la messagerie (`serveur/formulaire/`, écrit mais pas encore exécuté, faute de PHP sur le poste). Suivre `serveur/formulaire/LISEZMOI.md` : hébergement web OVH en PHP 8.1 ou plus, sous-domaine formulaire.cclaires.fr avec SSL, dépôt, essais par `curl.exe`, puis bascule du site en un commit (adresse, CSP portée dans une balise meta, commentaires). Texte de /confidentialite/ à mettre alors, après avoir vérifié le lieu d’hébergement : « ACIGO Informatique seulement. La demande est reçue par un programme hébergé chez OVH, qui nous la transmet par e-mail sans la conserver ; notre messagerie est aussi hébergée par OVH, société française. Aucune donnée ne quitte l’Union européenne. » Enfin, purger les demandes gardées sur le compte Formspree et le fermer | haute |
| AUDIENCE-01 | Toutes | Mesure d’audience sans cookie (`audience`) : Plausible ou Matomo, puis ajouter son domaine à la CSP de `vercel.json` si le site part sur Vercel, et réécrire le paragraphe « Cookies et mesure d’audience » de /confidentialite/ (l’outil traite l’adresse IP des visiteurs). En attente : aucune mesure pour l’instant (décision du 20/10/2026) | moyenne |

## Domaine et indexation

En attente (décision du 20/10/2026) : le domaine reste sur l’ancien site jusqu’à nouvel ordre. Au
20/10/2026, cclaires.fr pointe sur 213.186.33.5, le service de redirection d’OVH, qui renvoie vers
www.cclaires.fr et sa page OVH « Site en construction » : aucun ancien site n’est en ligne. Ordre à suivre : fusion de la PR dans `dev` et vérification du
site sous github.io, puis DNS-01, CNAME-01, INDEX-01, et seulement ensuite GSC-01, BING-01 et GBP-01.

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
| PHOTOS-01 | Toutes | Remplacer, si possible, les photos libres (Ifremer, Wikimedia Commons) par les vôtres ; retirer alors leur crédit du pied de page et des mentions légales. En attente (décision du 20/10/2026) | basse |

## Écrans du logiciel

Fait (décision du 20/10/2026) : pas de captures réelles, pour ne pas montrer l’interface aux concurrents.
Les dix emplacements CAPT-01 à CAPT-10 sont remplacés par des écrans simplifiés, redessinés en HTML dans
le style des fragments du site, avec les données fictives des commandes d’exemple
(`src/components/Ecran.astro`, `src/components/ecrans/`). Sur /fonctionnalites/parcs-claires/,
/fonctionnalites/tracabilite/ et /fonctionnalites/edi-grande-distribution/, la vitrine de la page montrait
déjà le même écran : l’emplacement y est retiré sans doublon.

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| ECRANS-01 | Pages métier et fonctionnalité | Relire les écrans simplifiés : vocabulaire, boutons et champs doivent rester fidèles au logiciel, sans rien montrer de confidentiel | moyenne |

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

GUIDE-01 à GUIDE-05 : en attente (décision du 20/10/2026).

| ID | Page | Ce qu’il faut fournir | Priorité |
|---|---|---|---|
| GUIDE-IMG-01 | /guides/cerfa-15063/ | Les deux guides sont vérifiés (20/10/2026, textes de référence en fin de page) et l’étiquette d’exemple porte désormais l’abréviation UE. Reste l’image du CERFA d’exemple, qui écrit encore « FR 17.999.001 CE » dans le champ agrément (admis jusqu’au 31/12/2028) : la régénérer avec `tools/remplir-cerfa.mjs` (déjà corrigé) et le PDF officiel | basse |
| GUIDE-NORME | /guides/mentions-obligatoires-etiquette-sanitaire/, étiquette d’exemple | Non vérifiable sur un texte en accès libre : la plage de calibres n° 0 à n° 5 et le « nombre minimum » de pièces de l’étiquette d’exemple, qui relèvent d’usages et d’une norme AFNOR non consultée. Le guide ne cite plus de plage ; à confirmer par la profession | basse |
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
| CONFID-02 | /confidentialite/ | Textes vérifiés le 20/10/2026 sur le RGPD, le référentiel CNIL de gestion commerciale et la liste du Data Privacy Framework (base légale 6.1.b puis intérêt légitime pour les relances, durée, droits, audience, champs obligatoires) ; ce n’est pas un avis juridique, une relecture par un juriste reste conseillée. Engagements à tenir : chaque message de relance rappelle qu’on peut s’y opposer ; la page annonce une suppression trois ans après le dernier contact venant du prospect. Reste marqué : le transfert par Formspree (FORM-03) | moyenne |
