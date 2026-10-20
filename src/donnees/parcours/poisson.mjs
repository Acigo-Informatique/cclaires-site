// Démonstration de la page mareyage : une commande de marée achetée à la criée du matin, passée aux
// poids estimés et facturée au poids réel, colis par colis. Client, numéros, lots, GTIN et SSCC fictifs.
// Montants : bar 24,50 €/kg, lieu jaune 22,00 €/kg, sole 31,00 €/kg ; TVA 5,5 %.
const n = ' ';

export default {
  poidsVariable: true,
  commande: {
    numero: 'C-26-01533',
    client: 'Poissonnerie du Port',
    note: 'Granville, livraison mercredi 16 décembre à 7 h. Lots achetés à la criée du matin.',
    total: `36,0${n}kg estimés, 909,00${n}€ HT`,
  },
  lignes: [
    {
      article: 'Bar de ligne, entier', court: 'Bar de ligne', bl: 'Bar de ligne, entier',
      colis: 3, poids: `18,0${n}kg`, poidsReel: `18,6${n}kg`, montant: `441,00${n}€`, lot: '2026-350-011',
      modele: `Marée 100${n}×${n}100`, etiqueteuse: 'Quai A',
      etiquette: { espece: 'Bar de ligne', detail: 'FAO 27.7.e, lignes et hameçons', code: 'gs1-bar.svg' },
    },
    {
      article: 'Lieu jaune, filet', court: 'Lieu jaune, filet', bl: 'Lieu jaune, filet',
      colis: 2, poids: `10,0${n}kg`, poidsReel: `10,4${n}kg`, montant: `220,00${n}€`, lot: '2026-350-004',
      modele: `Marée 100${n}×${n}100`, etiqueteuse: 'Quai A',
      etiquette: { espece: 'Lieu jaune, filet', detail: 'FAO 27.7.e, filets maillants', code: 'gs1-lieu.svg' },
    },
    {
      article: `Sole, portion 300 à 400${n}g`, court: 'Sole, portion', bl: 'Sole, portion',
      colis: 2, poids: `8,0${n}kg`, poidsReel: `7,8${n}kg`, montant: `248,00${n}€`, lot: '2026-350-007',
      modele: `Marée 100${n}×${n}100`, etiqueteuse: 'Quai A',
      etiquette: { espece: 'Sole', detail: 'FAO 27.7.d, chalut de fond', code: 'gs1-sole.svg' },
    },
  ],
  noteBl: `Colis pesés un à un : 36,8${n}kg réels pour 36,0${n}kg estimés.`,
  livraisons: {
    date: 'mercredi 16 décembre',
    liste: [
      { numero: 'BL-26-02150', client: 'Poissonnerie de la Halle', tournee: 'Caen', colis: 5 },
      { numero: 'BL-26-02151', client: 'Poissonnerie du Port', tournee: 'Granville', colis: 7, cible: true },
      { numero: 'BL-26-02152', client: 'Marée d’Auge', tournee: 'Calvados', colis: 11 },
      { numero: 'BL-26-02153', client: 'Halle aux poissons', tournee: 'Calvados', colis: 7 },
    ],
  },
  bl: 'BL-26-02151',
  etiquettes: 7,
  palette: {
    etat: `7${n}/${n}7 étiquetés`,
    lignes: [
      [`Palette 80${n}×${n}120, 7 colis`, `58,4${n}kg brut`],
      ['SSCC 320000120000015336', 'attribué'],
      ['Étiquette palette GS1, quai A', 'à imprimer', 'attente'],
    ],
    etiquette: { titre: 'Palette 1/1', lignes: ['Poissonnerie du Port, Granville', `7 colis, 58,4${n}kg`], code: 'gs1-palette-maree.svg' },
  },
  // facturé au poids réel : 18,6 × 24,50 + 10,4 × 22,00 + 7,8 × 31,00 = 926,30 € HT
  totaux: [
    ['Total HT, au poids réel', `926,30${n}€`],
    [`Port, franco à 400${n}€ HT`, 'offert'],
    [`TVA 5,5${n}%`, `50,95${n}€`],
    ['Total TTC', `977,25${n}€`],
  ],
  facture: {
    numero: 'F-26-01954',
    etat: 'Émise',
    lignes: [
      ['Facture, au poids réel', 'émise'],
      ['Écritures', 'prêtes pour l’export comptable'],
      ['Ordre de transport, tournée Granville', 'EDI transmis'],
    ],
    total: `977,25${n}€ TTC`,
  },
  messages: [
    'Essayez sur l’exemple : la commande de la Poissonnerie du Port est saisie, aux poids estimés. Validez-la.',
    'Un clic : la commande est validée. Allotissez-la : chaque ligne reçoit un lot acheté ce matin, avec son origine.',
    'Deux clics : chaque ligne a son lot, sa zone de capture et son engin. Ouvrez le BL-26-02151.',
    'Trois clics : le bon de livraison porte les poids réels, colis par colis. Imprimez ses étiquettes.',
    'Quatre clics : le modèle porte l’espèce, la zone FAO et l’engin de chaque lot. Lancez l’impression.',
    'Cinq clics, dont trois pour les étiquettes : 7 sont parties vers l’étiqueteuse du quai A. Reste l’étiquette de la palette.',
    'Six clics : la palette a son étiquette GS1 et son SSCC, le camion charge. Facturez le BL.',
    'Sept clics : la facture est émise au poids réel, ses écritures sont prêtes pour l’export comptable. Rien n’a été ressaisi.',
  ],
};
