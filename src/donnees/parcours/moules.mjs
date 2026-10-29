// Démonstration de la page mytiliculture : une commande de moules, passée aux poids estimés et
// facturée au poids réel de la pesée. Client, numéros, lots, GTIN et SSCC fictifs.
// Montants : sac 4,20 €/kg, vrac 3,80 €/kg, corde 3,90 €/kg ; TVA 5,5 %.
const n = ' ';

export default {
  poidsVariable: true,
  commande: {
    numero: 'C-26-01507',
    client: 'Marée d’Auge',
    note: 'Lisieux, livraison jeudi 17 décembre avant 6 h. Poids estimés à la commande, ajustés à la pesée.',
    total: `210,0${n}kg estimés, 833,00${n}€ HT`,
  },
  lignes: [
    {
      article: `Moules de bouchot, sac 10${n}kg`, court: 'Moules de bouchot, sac', bl: `Moules de bouchot, 10${n}kg`,
      colis: 8, poids: `80,0${n}kg`, poidsReel: `81,6${n}kg`, montant: `336,00${n}€`, lot: '2026-351-M-004',
      modele: `Moules 100${n}×${n}100`, etiqueteuse: 'Quai 1',
      etiquette: { espece: 'Moules de bouchot', detail: `Sac 10${n}kg`, code: 'gs1-moules-sac.svg' },
    },
    {
      article: 'Moules de bouchot, vrac au kilo', court: 'Moules de bouchot, vrac', bl: 'Moules de bouchot, vrac',
      colis: 4, poids: `100,0${n}kg`, poidsReel: `98,4${n}kg`, montant: `380,00${n}€`, lot: '2026-351-M-005',
      modele: `Moules 100${n}×${n}100`, etiqueteuse: 'Quai 1',
      etiquette: { espece: 'Moules de bouchot', detail: `Vrac, caisse de 24,6${n}kg`, code: 'gs1-moules-vrac.svg' },
    },
    {
      article: `Moules de corde, sac 5${n}kg`, court: 'Moules de corde', bl: `Moules de corde, 5${n}kg`,
      colis: 6, poids: `30,0${n}kg`, poidsReel: `31,8${n}kg`, montant: `117,00${n}€`, lot: '2026-350-C-002',
      modele: `Moules 100${n}×${n}100`, etiqueteuse: 'Quai 1',
      etiquette: { espece: 'Moules de corde', detail: `Sac 5${n}kg`, code: 'gs1-moules-corde.svg' },
    },
  ],
  noteBl: `Poids réels relevés à la pesée : 211,8${n}kg pour 210,0${n}kg estimés.`,
  livraisons: {
    date: 'jeudi 17 décembre',
    liste: [
      { numero: 'BL-26-02181', client: 'Poissonnerie de la Halle', tournee: 'Caen', colis: 6 },
      { numero: 'BL-26-02182', client: 'Marée d’Auge', tournee: 'Calvados', colis: 18, cible: true },
      { numero: 'BL-26-02183', client: 'Restaurant Le Bouchot', tournee: 'Nord', colis: 4 },
      { numero: 'BL-26-02184', client: 'Halle aux poissons', tournee: 'Calvados', colis: 9 },
    ],
  },
  bl: 'BL-26-02182',
  etiquettes: 18,
  palette: {
    etat: `18${n}/${n}18 étiquetés`,
    lignes: [
      [`Palette 80${n}×${n}120, 18 colis`, `236,2${n}kg brut`],
      ['SSCC 320000120000015077', 'attribué'],
      ['Étiquette palette GS1, quai 1', 'à imprimer', 'attente'],
    ],
    etiquette: { titre: 'Palette 1/1', lignes: ['Marée d’Auge, Lisieux', `18 colis, 236,2${n}kg`], code: 'gs1-palette-moules.svg' },
  },
  // facturé au poids réel : 81,6 × 4,20 + 98,4 × 3,80 + 31,8 × 3,90 = 840,66 € HT
  totaux: [
    ['Total HT, au poids réel', `840,66${n}€`],
    [`Port, franco à 400${n}€ HT`, 'offert'],
    [`TVA 5,5${n}%`, `46,24${n}€`],
    ['Total TTC', `886,90${n}€`],
  ],
  facture: {
    numero: 'F-26-01968',
    etat: 'Émise',
    lignes: [
      ['Facture, au poids réel', 'émise'],
      ['Écritures', 'prêtes pour l’export comptable'],
      ['Ordre de transport, tournée Calvados', 'EDI transmis'],
    ],
    total: `886,90${n}€ TTC`,
  },
  messages: [
    'Essayez sur l’exemple : la commande de Marée d’Auge est saisie, aux poids estimés. Validez-la.',
    'Un clic : la commande est validée. Allotissez-la : chaque ligne reçoit le lot de la pêche du jour.',
    'Deux clics : chaque ligne a son lot. Ouvrez le BL-26-02182, dont les colis ont été pesés.',
    'Trois clics : le bon de livraison porte les poids réels de la pesée. Imprimez ses étiquettes.',
    'Quatre clics : modèle et étiqueteuse sont déjà choisis par vos règles. Lancez l’impression.',
    'Cinq clics, dont trois pour les étiquettes : 18 sont parties vers l’étiqueteuse du quai 1. Reste l’étiquette de la palette.',
    'Six clics : la palette a son étiquette GS1 et son SSCC, elle est prête à partir. Facturez le BL.',
    'Sept clics : la facture est émise au poids réel, ses écritures sont prêtes pour l’export comptable. Rien n’a été ressaisi.',
  ],
};
