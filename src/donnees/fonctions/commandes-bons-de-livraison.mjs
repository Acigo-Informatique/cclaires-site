// Page « Commandes et bons de livraison » (requête : gestion commandes mareyeur).
export default {
  url: '/fonctionnalites/commandes-bons-de-livraison/',
  titre: 'Commandes et bons de livraison | C’Claires',
  description: 'Gestion des commandes et des bons de livraison : commandes pré-remplies d’après les habitudes du client, BL du jour en masse, poids réel et port calculés seuls.',
  h1: 'La commande se remplit seule, les BL partent d’un coup',
  sousTitre: 'Chaque client a ses habitudes, C’Claires les retient : la commande s’ouvre déjà remplie, les commandes du jour passent en bons de livraison en une fois, et chacun est facturé à son rythme.',
  couleur: 'eau',
  photos: ['chaland-oleron', 'criee-boulogne', 'tables-tremblade'],
  lienVitrine: 'Voir un bon de livraison',
  vitrine: {
    titre: 'Un bon de livraison que personne n’a retapé',
    fragment: 'bl',
    points: [
      'Les lignes reprises de la commande, chacune avec son lot.',
      'Espèce, origine et méthode de production portées par chaque article.',
      'Le poids réel de la pesée, et le port calculé tout seul.',
    ],
    note: 'Le BL-26-02217 de la commande d’exemple, tel que C’Claires l’imprime.',
  },
  etapes: {
    titre: 'De la commande à la facture, rien ne se retape',
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
      ecran: 'commande', variante: 'huitres',
      legende: 'La commande s’ouvre avec les lignes habituelles du client.',
    },
  ],
  metiers: ['/logiciel-ostreicole/', '/logiciel-mytilicole/', '/logiciel-mareyage/'],
  guide: ['/guides/cerfa-15063/', 'Remplir le CERFA 15063 sans erreur, depuis le bon de livraison'],
  faq: [
    { q: 'Le poids variable est-il géré ?', r: '<p>Oui. Le poids est estimé à la commande, puis remplacé par le poids réel relevé à la pesée : c’est lui qui passe sur le bon de livraison et sur la facture.</p>' },
    { q: 'Comment le port est-il calculé ?', r: '<p>Par client et par lieu de livraison : franco à partir d’un montant, forfait ou montant saisi. Le calcul se refait à chaque BL, sans calculette.</p>' },
    { q: 'Peut-on regrouper plusieurs BL sur une facture ?', r: '<p>Oui : chaque client est facturé à son rythme, au jour, au BL ou à la fréquence convenue avec lui.</p>' },
  ],
  cta: {
    titre: 'Combien de commandes retapez-vous chaque matin ?',
    texte: 'En 30 minutes, nous passons vos commandes du jour en BL, puis en factures, avec vos articles et vos clients. Sans en retaper une.',
  },
};
