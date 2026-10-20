// Page « Étiquette sanitaire » (requête : logiciel étiquette sanitaire).
export default {
  url: '/fonctionnalites/etiquette-sanitaire/',
  titre: 'Logiciel d’étiquette sanitaire coquillages | C’Claires',
  description: 'Étiquettes sanitaires de coquillages imprimées en 3 clics depuis la commande ou le BL : éditeur intégré, codes GS1-128 et 2D, plusieurs étiqueteuses à la fois.',
  h1: 'Vos étiquettes sanitaires en 3 clics, depuis la commande',
  sousTitre: 'Le modèle et l’étiqueteuse de chaque client sont choisis par vos règles : depuis le bon de livraison, trois clics suffisent pour imprimer toutes ses étiquettes.',
  couleur: 'tilleul',
  photos: ['huitres-rocher', 'sillons-vasiere', 'huitre-creuse'],
  lienVitrine: 'Voir une étiquette sanitaire',
  vitrine: {
    titre: 'L’étiquette telle qu’elle sort de l’étiqueteuse',
    fragment: 'etiquette',
    points: [
      'La marque d’identification de l’établissement, dans son ovale.',
      'L’espèce et son nom scientifique, la date de conditionnement, le lot et la zone.',
      'Un code GS1-128 qui porte le GTIN, la date et le lot.',
    ],
    note: 'L’étiquette du lot 2026-351-3-014 de la commande d’exemple, à l’italienne, en impression thermique.',
  },
  etapes: {
    titre: 'Trois clics, depuis le bon de livraison',
    items: [
      'Ouvrez le bon de livraison du client.',
      'Cliquez sur « Imprimer les étiquettes » : le modèle de chaque ligne et son étiqueteuse sont déjà choisis par vos règles.',
      'Lancez l’impression : toutes les étiquettes partent en même temps, sur une ou plusieurs étiqueteuses, avec une numérotation continue.',
    ],
    note: 'Toute réimpression demande un motif, consigné au journal des impressions.',
  },
  capturesTitre: 'L’éditeur de modèles, intégré au logiciel',
  captures: [
    {
      ecran: 'editeur', variante: 'huitres',
      legende: 'Textes, variables du lot et de l’article, codes-barres 1D et 2D : EAN-13, GS1-128, Code 128, QR code, DataMatrix.',
    },
    {
      ecran: 'impression', variante: 'huitres',
      legende: 'Des règles désignent le modèle de chaque client et de chaque article ; un simulateur montre lequel s’applique, et pourquoi.',
    },
  ],
  metiers: ['/logiciel-ostreicole/', '/logiciel-mytilicole/', '/logiciel-mareyage/'],
  guide: ['/guides/mentions-obligatoires-etiquette-sanitaire/', 'Les mentions obligatoires de l’étiquette sanitaire'],
  faq: [
    { q: 'Faut-il un logiciel d’étiquetage à part ?', r: '<p>Non. L’éditeur de modèles est intégré à C’Claires, et les étiquettes s’impriment depuis la commande ou le bon de livraison.</p>' },
    { q: 'Quelles étiqueteuses sont prises en charge ?', r: '<p>Zebra, Toshiba et les autres marques. Chaque poste d’atelier connaît ses imprimantes, et une même impression peut partir sur plusieurs étiqueteuses à la fois.</p>' },
    { q: 'Les étiquettes portent-elles les mentions obligatoires ?', r: '<p>Les modèles disposent des variables de la réglementation : marque d’identification, espèce, zone de production, méthode de production, date de conditionnement, numéro de lot. Le détail est dans notre guide des <a class="link" href="/guides/mentions-obligatoires-etiquette-sanitaire/">mentions obligatoires</a>.</p>' },
  ],
  cta: {
    titre: 'Montrez-nous vos étiquettes d’aujourd’hui',
    texte: 'En 30 minutes, nous vous montrons les étiquettes d’une de vos commandes, avec vos modèles et vos articles.',
  },
};
