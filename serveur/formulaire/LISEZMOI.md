# Formulaire de démo et de devis : réception chez OVH

`index.php` reçoit la demande envoyée par le formulaire du site (accueil et /demo/), vérifie les
champs et l’envoie par e-mail à `contact@cclaires.fr`. Il remplace Formspree (TODO-MANUEL FORM-03) :
la demande ne quitte pas OVH, qui héberge déjà la messagerie, et rien n’est conservé sur le serveur.
Ce dossier n’est pas publié avec le site : il se dépose à part, sur un hébergement web OVH.

Le script n’a pas pu être exécuté sur le poste où il a été écrit (pas de PHP) : le tester sur
l’hébergement avant de brancher le site (étape 4).

## 1. Hébergement

- Un hébergement web OVH, en PHP 8.1 ou plus récent (l’offre Starter suffit). La version de PHP se
  règle dans l’espace client OVH (Hébergements, Informations générales) ; OVH ne la change pas seul.
- Dans l’onglet Multisite, ajouter le sous-domaine `formulaire.cclaires.fr`, avec son propre dossier
  (par exemple `formulaire/`) et le certificat SSL. Si le domaine est dans le même compte OVH, l’entrée
  DNS est créée en même temps.

## 2. Réglages du script

En tête de `index.php` :

- `DESTINATAIRE` : l’adresse qui reçoit les demandes ;
- `EXPEDITEUR` : une adresse existante du domaine cclaires.fr (l’envoi par la fonction `mail()`
  d’OVH doit partir d’une adresse du domaine) ;
- `ORIGINES` : les adresses du site autorisées à envoyer la demande par script. Pendant que le site est
  servi sous github.io, y ajouter cette adresse (par exemple `https://acigo-informatique.github.io`),
  puis la retirer une fois le domaine branché.

## 3. Dépôt

Déposer `index.php` (et lui seul) par FTP dans le dossier du sous-domaine.

## 4. Essais, avant de brancher le site

Une demande valide doit répondre `200` avec `{"ok":true}` et arriver dans la boîte de réception :

```powershell
curl.exe -i https://formulaire.cclaires.fr/ -H "Accept: application/json" -H "Origin: https://cclaires.fr" -F "nom=Essai Formulaire" -F "entreprise=ACIGO" -F "metier=ostreiculture" -F "telephone=02 33 77 86 46" -F "email=contact@cclaires.fr" -F "message=Essai"
```

La réponse doit aussi porter `Access-Control-Allow-Origin: https://cclaires.fr`. Une demande
incomplète doit répondre `400` avec la liste des champs en erreur :

```powershell
curl.exe -i https://formulaire.cclaires.fr/ -H "Accept: application/json" -F "nom=Essai"
```

Sans l’en-tête `Accept`, le script répond par une courte page HTML (cas d’un navigateur sans script).

## 5. Brancher le site

Dans un même commit du dépôt du site :

- `site.config.mjs` : `formulaire.endpoint: 'https://formulaire.cclaires.fr/'` ;
- la politique de sécurité (CSP) : la porter dans une balise `<meta http-equiv="Content-Security-Policy">`
  du gabarit `src/layouts/Base.astro`, puisque GitHub Pages n’applique pas les en-têtes de `vercel.json`,
  avec `https://formulaire.cclaires.fr` dans `connect-src` et `form-action` (garder `'self'`) ; mettre
  `vercel.json` à jour de la même façon ;
- `/confidentialite/`, paragraphe « Qui les reçoit » : remplacer le texte sur Formspree et retirer la
  marque [À VÉRIFIER] (texte proposé dans TODO-MANUEL FORM-03) ;
- les commentaires qui nomment Formspree (`src/components/FormulaireDevis.astro`, `src/scripts/site.js`).

Puis envoyer une demande d’essai depuis le site en ligne, supprimer les demandes gardées sur le compte
Formspree et fermer ce compte.
