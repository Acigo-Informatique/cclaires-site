// Page « Facture électronique » (requête : facture électronique conchyliculture). Règle 1 : la connexion à
// une plateforme agréée est EN COURS ; aucune facture « envoyée en électronique » ; les écritures sont
// EXPORTÉES au format du logiciel comptable, jamais transmises en direct.
export default {
  url: '/fonctionnalites/facture-electronique/',
  titre: 'Facture électronique ostréiculteurs et mareyeurs',
  description: 'Facture électronique et C’Claires : connexion à une plateforme agréée en cours, livrée avant votre échéance ; factures émises depuis le BL, écritures exportées.',
  h1: 'Prêt pour la facture électronique',
  sousTitre: 'Prêt pour la réforme : connexion à une plateforme agréée en cours, livrée avant votre échéance. D’ici là, vos factures se font déjà depuis les bons de livraison.',
  couleur: 'noir',
  photos: ['tables-seudre', 'criee-boulogne', 'chaland-oleron'],
  lienVitrine: 'Voir une facture émise depuis un BL',
  vitrine: {
    titre: 'Une facture émise depuis le bon de livraison',
    fragment: 'facture',
    points: [
      'Émise depuis le BL, sans ressaisie, au rythme convenu avec chaque client.',
      'Ses écritures exportées au format de votre logiciel comptable (Pennylane et autres).',
      'Avec les centrales de la grande distribution, échangée en EDI.',
    ],
    note: 'La facture F-26-01990 de la commande d’exemple.',
  },
  etapes: {
    titre: 'Où en est C’Claires',
    items: [
      'Aujourd’hui, les factures sont émises depuis les bons de livraison, au jour, au BL ou à la fréquence du client.',
      'Aujourd’hui, les écritures sont exportées au format de votre logiciel comptable, Pennylane et les autres.',
      'En cours : la connexion à une plateforme agréée, livrée avant votre échéance.',
    ],
  },
  capturesTitre: 'L’export comptable',
  captures: [
    {
      id: 'CAPT-09', ratio: '16 / 10',
      sujet: 'export des écritures comptables d’une période',
      alt: 'Export des écritures comptables dans C’Claires : choix de la période et du format du logiciel comptable',
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
    titre: 'Parlons de votre échéance',
    texte: 'En 30 minutes, nous vous montrons vos factures tirées des BL et l’export de vos écritures, et nous faisons le point sur la réforme avec vous.',
  },
};
