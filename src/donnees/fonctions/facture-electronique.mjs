// Page « Facture électronique » (requête : facture électronique conchyliculture). Règle 1 : la connexion à
// une plateforme agréée est EN COURS ; aucune facture « envoyée en électronique » ; les écritures sont
// EXPORTÉES au format du logiciel comptable, jamais transmises en direct.
export default {
  url: '/fonctionnalites/facture-electronique/',
  titre: 'Facture électronique ostréiculteurs et mareyeurs',
  description: 'Facture électronique : connexion à une plateforme agréée en cours, livrée avant votre échéance. Aujourd’hui, factures tirées des BL et écritures exportées.',
  accroche: ['Prêt pour', 'la réforme ?'],
  h1: 'Prêt pour la facture électronique',
  sousTitre: 'Prêt pour la réforme : connexion à une plateforme agréée en cours, livrée avant votre échéance. Et dès aujourd’hui, vos factures sortent des bons de livraison, sans une ligne retapée.',
  couleur: 'noir',
  photos: ['tables-seudre', 'criee-boulogne', 'chaland-oleron'],
  lienVitrine: 'Voir une facture émise depuis un BL',
  vitrine: {
    titre: 'Une facture tirée du bon de livraison',
    fragment: 'facture',
    points: [
      'Émise depuis le BL, sans ressaisie, au rythme convenu avec chaque client.',
      'Ses écritures exportées au format de votre logiciel comptable (Pennylane et autres).',
      'Avec les centrales de la grande distribution, échangée en EDI.',
    ],
    note: 'La facture F-26-01990 de la commande d’exemple.',
  },
  etapes: {
    titre: 'Ce qui marche déjà, ce qui arrive',
    items: [
      'Aujourd’hui, les factures sont émises depuis les bons de livraison, au jour, au BL ou à la fréquence du client.',
      'Aujourd’hui, les écritures sont exportées au format de votre logiciel comptable, Pennylane et les autres.',
      'En cours : la connexion à une plateforme agréée, livrée avant votre échéance.',
    ],
  },
  capturesTitre: 'L’export comptable',
  captures: [
    {
      ecran: 'export-comptable',
      legende: 'Les écritures d’une période, exportées au format de votre logiciel comptable.',
    },
  ],
  metiers: ['/logiciel-ostreicole/', '/logiciel-mytilicole/', '/logiciel-mareyage/'],
  guide: null,
  faq: [
    { q: 'Êtes-vous prêts pour la facture électronique ?', r: '<p>Prêt pour la réforme : la connexion à une plateforme agréée est en cours, et elle sera livrée avant votre échéance.</p>' },
    { q: 'Les écritures passent-elles dans Pennylane ?', r: '<p>Elles sont exportées au format de votre logiciel comptable, Pennylane et les autres : vous les importez ensuite dans votre comptabilité.</p>' },
    { q: 'Puis-je continuer à facturer au rythme de mes clients ?', r: '<p>Oui : au jour, au BL ou à la fréquence convenue avec chacun.</p>' },
  ],
  cta: {
    texte: 'Parlons de votre échéance : en 30 minutes, nous vous montrons vos factures tirées des BL et l’export de vos écritures, et nous faisons le point sur la réforme avec vous.',
  },
};
