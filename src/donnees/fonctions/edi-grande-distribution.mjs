// Page « EDI grande distribution » (requête : EDI grande distribution marée). Seuls échanges annoncés :
// factures et ordres de transport.
export default {
  url: '/fonctionnalites/edi-grande-distribution/',
  titre: 'EDI grande distribution pour la marée',
  description: 'EDI pour la marée et les coquillages avec C’Claires : factures et ordres de transport échangés avec la grande distribution, prix datés et promotions par client.',
  h1: 'Factures et ordres de transport en EDI',
  sousTitre: 'Pour la grande distribution et les gros clients, les factures et les ordres de transport partent en EDI depuis les bons de livraison, sans ressaisie dans un portail.',
  couleur: 'ciel',
  photos: ['port-en-bessin', 'bouchots-agon', 'criee-boulogne'],
  lienVitrine: 'Voir les messages EDI d’une journée',
  vitrine: {
    titre: 'Les messages EDI d’une journée',
    fragment: 'edi',
    points: [
      'Les factures, envoyées en EDI à la centrale du client.',
      'Les ordres de transport, envoyés au transporteur de la tournée.',
      'L’état de chaque message, transmis ou en attente.',
    ],
    note: 'Centrales, transporteurs et numéros fictifs.',
  },
  etapes: {
    titre: 'Des accords du client à la facture EDI',
    items: [
      'Les prix datés et les promotions de chaque client sont réglés une fois, avec leurs dates de validité.',
      'Les commandes deviennent des bons de livraison, puis des factures, sans ressaisie.',
      'Les factures partent en EDI vers la centrale, les ordres de transport vers le transporteur.',
    ],
  },
  metiers: ['/logiciel-mytilicole/', '/logiciel-mareyage/'],
  guide: null,
  faq: [
    { q: 'Quels documents sont échangés en EDI ?', r: '<p>Les factures et les ordres de transport.</p>' },
    { q: 'Les prix datés par client sont-ils gérés ?', r: '<p>Oui : chaque client a ses prix, avec leurs dates de validité, et les promotions du jour sont proposées dès la saisie de la commande.</p>' },
    { q: 'Et la facture électronique de la réforme ?', r: '<p>Prêt pour la réforme : la connexion à une plateforme agréée est en cours, et elle sera livrée avant votre échéance. <a class="link" href="/fonctionnalites/facture-electronique/">Où en est la facture électronique</a></p>' },
  ],
  cta: {
    titre: 'Montrez-nous vos clients de la grande distribution',
    texte: 'En 30 minutes, nous vous montrons le parcours d’une commande de centrale, jusqu’à la facture EDI.',
  },
};
