// Page « Étiquette sanitaire » (requête : logiciel étiquette sanitaire).
export default {
  url: '/fonctionnalites/etiquette-sanitaire/',
  titre: 'Logiciel d’étiquette sanitaire coquillages | C’Claires',
  description: 'Étiquettes sanitaires de coquillages en 3 clics depuis le BL : mentions reprises de la commande, bon modèle pour chaque client, codes GS1-128 et 2D compris.',
  accroche: ['Une étiquette,', 'combien de clics ?'],
  h1: 'Vos étiquettes sanitaires en 3 clics, justes du premier coup',
  sousTitre: 'Trois. Lot, zone, date de conditionnement, marque d’identification : tout vient de la commande, et vos règles choisissent le modèle et l’étiqueteuse de chaque client.',
  couleur: 'tilleul',
  photos: ['huitres-rocher', 'sillons-vasiere', 'huitre-creuse'],
  lienVitrine: 'Voir l’étiquette qui sort',
  vitrine: {
    titre: 'Ce qui sort de l’étiqueteuse, sans rien retaper',
    fragment: 'etiquette',
    points: [
      'La marque d’identification de l’établissement, dans son ovale.',
      'L’espèce et son nom scientifique, la date de conditionnement, le lot et la zone, repris de la commande.',
      'Un code GS1-128 qui porte le GTIN, la date et le lot, lisible par le scanner de votre client.',
    ],
    note: 'L’étiquette du lot 2026-351-3-014 de la commande d’exemple, à l’italienne, en impression thermique.',
  },
  etapes: {
    titre: 'Trois clics. Comptez avec nous.',
    items: [
      'Ouvrez le bon de livraison du client.',
      'Cliquez sur « Imprimer les étiquettes » : vos règles ont déjà choisi le modèle de chaque ligne et son étiqueteuse.',
      'Lancez l’impression : toutes les étiquettes partent ensemble, sur une ou plusieurs étiqueteuses, en numérotation continue.',
    ],
    note: 'Une réimpression ? Elle demande un motif, qui reste au journal des impressions. De quoi répondre le jour d’un contrôle.',
  },
  capturesTitre: 'L’éditeur d’étiquettes est dans le logiciel, pas à côté',
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
    { q: 'Faut-il un logiciel d’étiquetage à part ?', r: '<p>Non. L’éditeur de modèles est intégré à C’Claires : vous dessinez vos étiquettes une fois, puis elles s’impriment depuis la commande ou le bon de livraison. Un logiciel de moins à payer et à mettre à jour.</p>' },
    { q: 'Quelles étiqueteuses sont prises en charge ?', r: '<p>Zebra, Toshiba et les autres marques. Chaque poste d’atelier connaît ses imprimantes, et une même impression peut partir sur plusieurs étiqueteuses à la fois.</p>' },
    { q: 'Les étiquettes portent-elles les mentions obligatoires ?', r: '<p>Les modèles disposent des variables de la réglementation : marque d’identification, espèce, zone de production, méthode de production, date de conditionnement, numéro de lot. Le détail est dans notre guide des <a class="link" href="/guides/mentions-obligatoires-etiquette-sanitaire/">mentions obligatoires</a>.</p>' },
  ],
  cta: {
    texte: 'Apportez une étiquette d’aujourd’hui : en 30 minutes, nous tirons devant vous celles d’une de vos commandes, avec vos modèles et vos articles. Vous comptez les clics.',
  },
};
