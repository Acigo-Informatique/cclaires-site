// C’Claires — les réglages du site, au même endroit. Une valeur laissée à null affiche à sa place un
// emplacement « À COMPLÉTER » bien visible sur les pages (voir TODO-MANUEL.md).

export default {
  // Adresse du site : la balise canonique, og:url, og:image et le sitemap en dérivent.
  url: 'https://cclaires.fr',

  // Indexation par les moteurs de recherche. false : chaque page porte <meta name="robots" content="noindex">.
  // À passer à true seulement quand le domaine cclaires.fr répond (TODO-MANUEL INDEX-01).
  indexable: false,

  // Numéro affiché dans l’en-tête, le pied de page et la page de démo, au format affiché
  // (ex. '02 33 00 00 00'). TODO-MANUEL TEL-01.
  telephone: null,

  // Adresse e-mail de contact, affichée en repli du formulaire.
  email: 'contact@cclaires.fr',

  formulaire: {
    // Adresse d’envoi du formulaire de démo et de devis (Formspree : https://formspree.io/f/xxxxxxx).
    // TODO-MANUEL FORM-01.
    endpoint: null,
    // Délai de réponse annoncé sous le bouton (ex. 'Réponse sous 24 heures ouvrées'). TODO-MANUEL DELAI-01.
    delaiReponse: null,
  },

  // Mesure d’audience sans cookie, désactivée tant que null. TODO-MANUEL AUDIENCE-01.
  // Plausible : { fournisseur: 'plausible', domaine: 'cclaires.fr', script: 'https://plausible.io/js/script.js' }
  // Matomo   : { fournisseur: 'matomo', url: 'https://matomo.exemple.fr/', site: '1' }
  audience: null,

  // Directeur de la publication, pour les mentions légales. TODO-MANUEL DIRPUB-01.
  directeurPublication: null,
};
