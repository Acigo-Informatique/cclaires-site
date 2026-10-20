// Démonstration « de la commande à la facture » : la commande d’exemple d’un ostréiculteur
// (exploitation fictive des Trois Claires), telle que le visiteur la fait avancer en sept clics.
// Les numéros, lots, GTIN et SSCC sont fictifs (préfixes de circulation restreinte).
const n = ' '; // espace insécable

export default {
  commande: {
    numero: 'C-26-01482',
    client: 'Poissonnerie de la Halle',
    note: 'Caen, livraison vendredi 18 décembre. Lignes reprises des habitudes du client.',
    total: `98${n}kg, 479,60${n}€ HT`,
  },
  lignes: [
    {
      article: `Fines de claire n°${n}3, bourriche 5${n}kg`, court: `Fines de claire n°${n}3`, bl: `Fines de claire n°${n}3, 5${n}kg`,
      colis: 12, poids: `60,0${n}kg`, montant: `312,00${n}€`, lot: '2026-351-3-014',
      modele: `Sanitaire 100${n}×${n}150`, etiqueteuse: 'Quai 2',
      etiquette: { espece: 'Huîtres creuses', detail: `Fines de claire n°${n}3`, code: 'gs1-etiquette.svg' },
    },
    {
      article: `Spéciales de claire n°${n}2, bourriche 3${n}kg`, court: `Spéciales de claire n°${n}2`, bl: `Spéciales de claire n°${n}2, 3${n}kg`,
      colis: 6, poids: `18,0${n}kg`, montant: `120,60${n}€`, lot: '2026-349-2-006',
      modele: `Sanitaire 100${n}×${n}150`, etiqueteuse: 'Quai 2',
      etiquette: { espece: 'Huîtres creuses', detail: `Spéciales de claire n°${n}2`, code: 'gs1-etiquette-speciales.svg' },
    },
    {
      article: `Moules de bouchot, sac 10${n}kg`, court: 'Moules de bouchot', bl: `Moules de bouchot, 10${n}kg`,
      colis: 2, poids: `20,0${n}kg`, montant: `47,00${n}€`, lot: '2026-350-M-002',
      modele: `Moules 100${n}×${n}100`, etiqueteuse: 'Quai 3',
      etiquette: { espece: 'Moules de bouchot', detail: `Sac 10${n}kg`, code: 'gs1-etiquette-moules.svg' },
    },
  ],
  livraisons: {
    date: 'vendredi 18 décembre',
    liste: [
      { numero: 'BL-26-02216', client: 'Restaurant Le Bouchot', tournee: 'Nord', colis: 7 },
      { numero: 'BL-26-02217', client: 'Poissonnerie de la Halle', tournee: 'Nord', colis: 20, cible: true },
      { numero: 'BL-26-02218', client: 'Marée d’Auge', tournee: 'Calvados', colis: 12 },
      { numero: 'BL-26-02219', client: 'Halle aux poissons', tournee: 'Calvados', colis: 16 },
    ],
  },
  bl: 'BL-26-02217',
  etiquettes: 20,
  palette: {
    etat: `20${n}/${n}20 étiquetés`,
    lignes: [
      [`Palette 80${n}×${n}120, 20 colis`, `129,4${n}kg brut`],
      ['SSCC 320000120000014827', 'attribué'],
      ['Étiquette palette GS1, quai 2', 'à imprimer', 'attente'],
    ],
    etiquette: { titre: 'Palette 1/1', lignes: ['Poissonnerie de la Halle, Caen', `20 colis, 129,4${n}kg`], code: 'gs1-palette.svg' },
  },
  totaux: [
    ['Total HT', `479,60${n}€`],
    [`Port, franco à 400${n}€ HT`, 'offert'],
    [`TVA 5,5${n}%`, `26,38${n}€`],
    ['Total TTC', `505,98${n}€`],
  ],
  // règle 1 : la facture est émise, ses écritures attendent l’export comptable ; rien n’est « envoyé en électronique »
  facture: {
    numero: 'F-26-01990',
    etat: 'Émise',
    lignes: [
      ['Facture', 'émise'],
      ['Écritures', 'prêtes pour l’export comptable'],
      ['Ordre de transport, Tournée Nord', 'EDI transmis'],
    ],
    total: `505,98${n}€ TTC`,
  },
  // un message par état (0 à 7), lu par le lecteur d’écran à chaque clic
  messages: [
    'Essayez sur l’exemple : la commande de la Poissonnerie de la Halle est saisie. Validez-la.',
    'Un clic : la commande est validée. Allotissez-la, chaque ligne reçoit son lot.',
    'Deux clics : chaque ligne a son lot. Ouvrez le BL-26-02217 pour en imprimer les étiquettes.',
    'Trois clics : le bon de livraison est ouvert. Imprimez ses étiquettes.',
    'Quatre clics : modèle et étiqueteuse sont déjà choisis par vos règles. Lancez l’impression.',
    'Cinq clics, dont trois pour les étiquettes : 20 sont parties en même temps vers les étiqueteuses des quais 2 et 3. Reste l’étiquette de la palette.',
    'Six clics : la palette a son étiquette GS1 et son SSCC, le camion charge. Facturez le BL.',
    'Sept clics : la facture est émise et ses écritures sont prêtes pour l’export comptable. Rien n’a été ressaisi.',
  ],
};
