// Page « Parcs et claires » (requête : gestion parcs ostréicoles).
export default {
  url: '/fonctionnalites/parcs-claires/',
  titre: 'Gestion des parcs et claires ostréicoles',
  description: 'Gestion des parcs et des claires ostréicoles : concessions dessinées, actions au parc sur tablette même sans réseau, stock de chaque claire à la date voulue.',
  accroche: ['Dans la C12,', 'il reste quoi ?'],
  h1: 'Vos parcs et vos claires, à jour sans carnet',
  sousTitre: 'Un coup d’œil suffit, au bureau comme au parc. Dessinez vos concessions, vos claires et vos tables une fois ; ensuite, chaque mise à l’eau, transfert ou tri s’y inscrit depuis la tablette, même sans réseau.',
  couleur: 'tilleul',
  photos: ['parcs-tremblade', 'arcachon-1920', 'claires-seudre'],
  lienVitrine: 'Voir la vue des parcs',
  vitrine: {
    titre: 'Toutes vos claires, d’un coup d’œil',
    fragment: 'parcs',
    points: [
      'Vos concessions, vos claires et vos tables, dessinées dans l’éditeur de parcs.',
      'Le lot et le stock de chaque claire, à la date que vous choisissez.',
      'La fiche de la claire : article, date d’entrée, jours d’affinage.',
    ],
    note: 'La claire C12, où le lot 2026-351-3-014 de la commande d’exemple s’affine depuis le 18 novembre.',
  },
  etapes: {
    titre: 'Du parc à la bourriche, le lot garde sa mémoire',
    items: [
      'Dessinez vos parcs, vos claires et vos tables dans l’éditeur de parcs.',
      'Au parc, sur la tablette Android, notez les actions planifiées : mise à l’eau, transfert, tri, et celles que vous définissez, par lot et même par poche. Sans réseau, tout se synchronise au retour.',
      'Consultez le contenu de chaque claire, à la date que vous choisissez.',
      'Le lot sort de la claire avec son historique, jusqu’à l’étiquette et au bon de livraison.',
    ],
  },
  metiers: ['/logiciel-ostreicole/'],
  guide: null,
  faq: [
    { q: 'Peut-on voir le stock d’une claire à une date passée ?', r: '<p>Oui : la vue des parcs montre le contenu de chaque claire à la date que vous choisissez, passée ou présente.</p>' },
    { q: 'L’application tablette fonctionne-t-elle sans réseau ?', r: '<p>Oui. Elle tourne sur Android, hors ligne, et se synchronise toute seule dès que le réseau revient. Elle est comprise dans l’abonnement.</p>' },
    { q: 'L’affinage est-il compté ?', r: '<p>Oui : le séjour en claire se compte jour par jour, depuis la date d’entrée du lot.</p>' },
    { q: 'Les cahiers des charges IGP et Label Rouge sont-ils contrôlés ?', r: '<p>Oui, lot par lot, durée d’affinage comprise.</p>' },
  ],
  cta: {
    texte: 'Dessinons vos parcs ensemble : en 30 minutes, nous vous montrons la vue des parcs, la tablette et le suivi d’un lot, de la claire à la bourriche.',
  },
};
