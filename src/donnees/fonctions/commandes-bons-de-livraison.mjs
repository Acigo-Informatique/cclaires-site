// Page « Commandes et bons de livraison » (requête : gestion commandes mareyeur).
export default {
  url: '/fonctionnalites/commandes-bons-de-livraison/',
  titre: 'Commandes et bons de livraison | C’Claires',
  description: 'Commandes pré-remplies d’après les habitudes de chaque client, bons de livraison en masse, poids réel et port calculé : la gestion commerciale de C’Claires.',
  h1: 'Des commandes qui se pré-remplissent, des BL en masse',
  sousTitre: 'Chaque lieu de livraison a ses habitudes : la commande se pré-remplit, les commandes du jour passent en BL d’un coup, et la facture suit le rythme du client.',
  couleur: 'eau',
  photos: ['chaland-oleron', 'criee-boulogne', 'tables-tremblade'],
  lienVitrine: 'Voir un bon de livraison',
  vitrine: {
    titre: 'Un bon de livraison qui ne se ressaisit pas',
    fragment: 'bl',
    points: [
      'Les lignes reprises de la commande, chacune avec son lot.',
      'Espèce, origine et méthode de production portées par chaque article.',
      'Le poids réel de la pesée et le port calculés à chaque BL.',
    ],
    note: 'Le BL-26-02217 de la commande d’exemple, tel que C’Claires l’imprime.',
  },
  etapes: {
    titre: 'De la commande à la facture, sans ressaisie',
    items: [
      'La commande se pré-remplit d’après les habitudes du lieu de livraison, et les promotions du jour sont proposées dès la saisie.',
      'L’allotissement attribue un lot à chaque ligne, pris dans le stock conditionné.',
      'Les commandes du jour passent en BL en masse, depuis la liste filtrée, avec les cumuls de poids et de colis.',
      'Le port se calcule : franco, forfait ou montant saisi, par client et par lieu de livraison.',
      'Les BL deviennent des factures, au jour, au BL ou à la fréquence convenue avec le client.',
    ],
  },
  captures: [
    {
      id: 'CAPT-01', ratio: '16 / 10',
      sujet: 'saisie d’une commande pré-remplie d’après les habitudes du client',
      alt: 'Saisie d’une commande dans C’Claires : les lignes habituelles du client déjà remplies, les promotions du jour proposées',
      legende: 'La commande s’ouvre avec les lignes habituelles du client.',
    },
  ],
  metiers: ['/logiciel-ostreicole/', '/logiciel-mytilicole/', '/logiciel-mareyage/'],
  guide: ['/guides/cerfa-15063/', 'Remplir le CERFA 15063 sans erreur, depuis le bon de livraison'],
  faq: [
    { q: 'Le poids variable est-il géré ?', r: '<p>Oui. Le poids est estimé à la commande, puis remplacé par le poids réel relevé à la pesée : c’est lui qui passe sur le bon de livraison et sur la facture.</p>' },
    { q: 'Comment le port est-il calculé ?', r: '<p>Par client et par lieu de livraison : franco à partir d’un montant, forfait ou montant saisi. Le calcul se refait à chaque BL.</p>' },
    { q: 'Peut-on regrouper plusieurs BL sur une facture ?', r: '<p>Oui : chaque client est facturé à son rythme, au jour, au BL ou à la fréquence convenue avec lui.</p>' },
  ],
  cta: {
    titre: 'Montrez-nous vos commandes du jour',
    texte: 'En 30 minutes, nous vous montrons vos commandes devenir des BL, puis des factures, avec vos articles et vos clients.',
  },
};
