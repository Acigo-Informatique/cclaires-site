// Page « Parcs et claires » (requête : gestion parcs ostréicoles).
export default {
  url: '/fonctionnalites/parcs-claires/',
  titre: 'Gestion des parcs et claires ostréicoles',
  description: 'Gestion des parcs et des claires ostréicoles avec C’Claires : éditeur de parcs, vue graphique, mouvements de lots et stock de chaque claire à la date voulue.',
  h1: 'Chaque claire, son lot, son stock à la date voulue',
  sousTitre: 'L’éditeur de parcs dessine vos concessions, vos claires et vos tables ; chaque mouvement de lot y est noté, et la vue graphique montre ce que contient chaque claire.',
  couleur: 'tilleul',
  photos: ['parcs-tremblade', 'arcachon-1920', 'claires-seudre'],
  lienVitrine: 'Voir la vue des parcs',
  vitrine: {
    titre: 'La vue graphique de vos parcs',
    fragment: 'parcs',
    points: [
      'Vos concessions, vos claires et vos tables, dessinées dans l’éditeur de parcs.',
      'Le lot et le stock de chaque claire, à la date que vous choisissez.',
      'La fiche de la claire : article, date d’entrée, jours d’affinage.',
    ],
    note: 'La claire C12, où le lot 2026-351-3-014 de la commande d’exemple s’affine depuis le 18 novembre.',
  },
  etapes: {
    titre: 'Du parc à la bourriche',
    items: [
      'Dessinez vos parcs, vos claires et vos tables dans l’éditeur de parcs.',
      'Notez chaque mouvement de lot : mise à l’eau, transfert, tri, affinage.',
      'Consultez le contenu de chaque claire, à la date que vous choisissez.',
      'Le lot sort de la claire avec son historique, jusqu’à l’étiquette et au bon de livraison.',
    ],
  },
  metiers: ['/logiciel-ostreicole/'],
  guide: null,
  faq: [
    { q: 'Peut-on voir le stock d’une claire à une date passée ?', r: '<p>Oui : la vue des parcs montre le contenu de chaque claire à la date que vous choisissez, passée ou présente.</p>' },
    { q: 'L’affinage est-il compté ?', r: '<p>Oui : le séjour en claire se compte jour par jour, depuis la date d’entrée du lot.</p>' },
    { q: 'Les cahiers des charges IGP et Label Rouge sont-ils contrôlés ?', r: '<p>Oui, lot par lot, durée d’affinage comprise.</p>' },
  ],
  cta: {
    titre: 'Montrez-nous vos parcs',
    texte: 'En 30 minutes, nous vous montrons la vue des parcs et le suivi d’un lot, de la claire à la bourriche.',
  },
};
