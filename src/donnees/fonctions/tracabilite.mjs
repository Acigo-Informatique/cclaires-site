// Page « Traçabilité » (requête : traçabilité produits de la mer).
export default {
  url: '/fonctionnalites/tracabilite/',
  titre: 'Traçabilité des huîtres et produits de la mer',
  description: 'Traçabilité des huîtres, moules et produits de la mer avec C’Claires : chaque lot suivi de la réception au client, et du client à la réception, en un écran.',
  h1: 'Retrouvez chaque lot, de l’achat au client',
  sousTitre: 'Chaque réception crée un lot, chaque mouvement est noté, chaque vente le porte : quand on vous demande d’où vient un lot et où il est parti, la réponse tient sur une fiche.',
  couleur: 'paon',
  photos: ['claires-seudre', 'tables-tremblade', 'parcs-tremblade'],
  lienVitrine: 'Voir la fiche d’un lot',
  vitrine: {
    titre: 'Un lot, de sa réception à chaque client',
    fragment: 'trace',
    points: [
      'En amont : la réception, son fournisseur ou son parc d’origine.',
      'Entre les deux : l’affinage, le conditionnement, le stock restant.',
      'En aval : chaque bon de livraison, avec ses colis et son poids.',
    ],
    note: 'La fiche du lot 2026-351-3-014 de la commande d’exemple.',
  },
  etapes: {
    titre: 'Une traçabilité qui se fait en travaillant',
    items: [
      'Chaque réception ou chaque pêche crée un lot, numéroté par votre masque, qui garde son origine.',
      'Chaque mouvement du lot est noté : mise à l’eau, transfert, tri, affinage, conditionnement.',
      'Chaque vente porte le lot sur l’étiquette, le bon de livraison et la facture.',
      'La fiche du lot remonte jusqu’à la réception ou descend jusqu’aux clients livrés, dans un sens comme dans l’autre.',
    ],
  },
  metiers: ['/logiciel-ostreicole/', '/logiciel-mytilicole/', '/logiciel-mareyage/'],
  guide: ['/guides/mentions-obligatoires-etiquette-sanitaire/', 'Les mentions obligatoires de l’étiquette sanitaire, numéro de lot compris'],
  faq: [
    { q: 'La traçabilité va-t-elle aussi de la vente à l’achat ?', r: '<p>Oui. Depuis un bon de livraison ou une facture, vous remontez au lot, puis à sa réception ; depuis une réception, vous descendez jusqu’à chaque client livré.</p>' },
    { q: 'Les mouvements en parc sont-ils tracés ?', r: '<p>Oui : mises à l’eau, transferts, tris et séjours en claire sont notés lot par lot, et la vue des parcs montre le contenu de chaque claire à la date voulue.</p>' },
    { q: 'Les lots achetés gardent-ils leur origine ?', r: '<p>Oui : chaque achat réceptionné devient un lot qui garde son origine jusqu’à l’expédition.</p>' },
  ],
  cta: {
    titre: 'Montrez-nous un de vos lots',
    texte: 'En 30 minutes, nous suivons avec vous un lot de vos articles, de la réception au client.',
  },
};
