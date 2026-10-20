// Page « Logiciel ostréicole » (requête principale : logiciel ostréicole). Règle 1 : seulement des
// fonctions livrées, au présent. Les captures sont des emplacements à compléter (TODO-MANUEL.md).
import huitres from '../parcours/huitres.mjs';

export default {
  url: '/logiciel-ostreicole/',
  titre: 'Logiciel ostréicole : gestion et étiquettes | C’Claires',
  description: 'Logiciel ostréicole C’Claires : parcs et claires, lots suivis de la claire à la bourriche, étiquettes sanitaires en 3 clics, palettes SSCC et factures.',
  ogTitre: 'Le logiciel ostréicole, de la claire à la facture',
  audience: 'Ostréiculteurs',
  schema: 'Logiciel de gestion pour ostréiculteurs : parcs et claires, lots suivis de la mise à l’eau à la bourriche, étiquettes sanitaires imprimées en 3 clics depuis la commande, palettes et SSCC, traçabilité, bons de livraison et factures.',
  couleur: 'tilleul',
  photos: ['parcs-tremblade', 'claires-seudre'],
  h1: 'Le logiciel ostréicole, de la claire à la facture',
  sousTitre: 'Parcs, claires, lots, étiquettes sanitaires et factures dans un seul logiciel : vous saisissez la commande, C’Claires suit le lot jusqu’au client.',
  lienParcours: 'Voir une commande d’huîtres traverser le logiciel',

  douleurs: {
    titre: 'En pleine saison, le lot se perd entre la claire et le camion',
    items: [
      'Le stock des claires tenu au carnet, recompté à chaque marée.',
      'Les étiquettes sanitaires refaites quand un client change de calibre.',
      'Le numéro de lot recopié du parc au BL, puis du BL à la facture.',
    ],
    conclusion: 'C’Claires tient le lot depuis la mise à l’eau : vous le retrouvez sur l’étiquette, le BL et la facture sans que personne ne le retape.',
    photo: 'huitres-rocher',
  },

  benefices: {
    titre: 'Ce que C’Claires change dans l’exploitation',
    items: [
      {
        titre: 'Vos parcs et vos claires, à jour sans carnet',
        texte: 'L’éditeur de parcs dessine vos concessions, vos claires et vos tables. Chaque mouvement de lot y est noté, de la mise à l’eau au tri, et la vue graphique montre ce que contient chaque claire à la date que vous choisissez.',
        lien: ['/fonctionnalites/parcs-claires/', 'La gestion des parcs et des claires'],
        capture: {
          ecran: 'parcs',
          legende: 'La vue des parcs : chaque claire, son lot, son stock à la date voulue.',
        },
      },
      {
        titre: 'Un affinage compté, des cahiers des charges tenus',
        texte: 'Le séjour en claire se compte jour par jour. Les cahiers des charges IGP et Label Rouge sont contrôlés lot par lot, et le calibre, la qualité et le format suivent chaque article, du n° 0 au n° 5. La fiche du lot remonte jusqu’à sa réception et descend jusqu’à chaque client.',
        lien: ['/fonctionnalites/tracabilite/', 'La traçabilité des lots'],
        capture: {
          ecran: 'tracabilite', variante: 'huitres',
          legende: 'Un lot, de sa réception à chaque client livré, en un écran.',
        },
      },
      {
        titre: 'Les étiquettes sanitaires en 3 clics',
        texte: 'Vos règles choisissent le modèle de chaque client et de chaque article : marque d’identification, espèce, date de conditionnement, lot et zone y sont repris de la commande. Une même impression part sur plusieurs étiqueteuses à la fois.',
        lien: ['/fonctionnalites/etiquette-sanitaire/', 'L’étiquette sanitaire en 3 clics'],
        capture: {
          ecran: 'impression', variante: 'huitres',
          legende: 'Depuis le BL, les modèles et les étiqueteuses sont déjà choisis.',
        },
      },
      {
        titre: 'Des palettes composées, le SSCC attribué',
        texte: 'Pour la grande distribution ou le transporteur, les colis du BL se répartissent en palettes. Chaque palette reçoit son SSCC à l’enregistrement et son étiquette GS1 s’imprime au quai.',
        lien: ['/fonctionnalites/palettisation-sscc/', 'La palettisation et le SSCC'],
      },
    ],
  },

  parcours: {
    donnees: huitres,
    titre: ['Une commande d’huîtres,', 'de la claire à la facture'],
    intro: 'Faites avancer la commande d’exemple : des fines de claire n° 3 du lot 2026-351-3-014, qui partent vendredi pour Caen. Sept clics pour tout le parcours, dont trois pour les étiquettes, à l’étape 3.',
  },

  normes: {
    titre: 'Les documents et les normes de l’ostréiculture',
    intro: 'C’Claires imprime et contrôle ce que la réglementation et vos clients demandent, sans tableur à côté.',
    items: [
      { nom: 'Étiquette sanitaire', texte: 'Marque d’identification, espèce, date de conditionnement et lot, imprimés en 3 clics.', lien: ['/guides/mentions-obligatoires-etiquette-sanitaire/', 'Les mentions obligatoires'] },
      { nom: 'CERFA 15063*04', texte: 'Le document d’enregistrement des coquillages vivants, prérempli depuis le BL.', lien: ['/guides/cerfa-15063/', 'Remplir le CERFA 15063'] },
      { nom: 'Zones A, B, C', texte: 'Le classement de la zone suit le lot, la purification est vérifiée avant le départ.' },
      { nom: 'IGP et Label Rouge', texte: 'Les cahiers des charges contrôlés lot par lot, durée d’affinage comprise.' },
      { nom: 'SSCC et GS1-128', texte: 'Un numéro unique par palette, son étiquette GS1 imprimée au quai.', lien: ['/fonctionnalites/palettisation-sscc/', 'La palettisation'] },
      { nom: 'Information du consommateur', texte: 'Dénomination, nom scientifique, méthode de production et zone, du BL à l’étiquette.' },
    ],
  },

  temoignage: { cle: 'ostreiculture', metier: 'ostréiculteur' },

  faq: [
    { q: 'C’Claires gère-t-il plusieurs parcs et plusieurs claires ?', r: '<p>Oui. L’éditeur de parcs dessine toutes vos concessions, vos claires et vos tables, et chaque lot garde la trace de ses emplacements successifs, de la mise à l’eau au conditionnement.</p>' },
    { q: 'Comment les lots sont-ils numérotés ?', r: '<p>Par un masque que vous définissez, par exemple l’année, le jour, le calibre et une séquence : le lot 2026-351-3-014 s’est numéroté seul. Le numéro suit ensuite le lot sur l’étiquette, le bon de livraison, la facture et la fiche de traçabilité.</p>' },
    { q: 'Quelles mentions portent les étiquettes sanitaires ?', r: '<p>Les modèles disposent des variables de la réglementation : marque d’identification, espèce, zone de production, méthode de production, date de conditionnement, numéro de lot. Le détail est dans notre guide des <a class="link" href="/guides/mentions-obligatoires-etiquette-sanitaire/">mentions obligatoires de l’étiquette sanitaire</a>.</p>' },
    { q: 'Le CERFA 15063 se remplit-il tout seul ?', r: '<p>Il se préremplit depuis le bon de livraison : espèce, quantité, poids, zone et lot. Notre guide explique comment <a class="link" href="/guides/cerfa-15063/">remplir le CERFA 15063 sans erreur</a>.</p>' },
    { q: 'Peut-on garder les étiqueteuses que nous avons déjà ?', r: '<p>Oui : Zebra, Toshiba et les autres marques sont prises en charge. Indiquez leur nombre et leur marque dans la <a class="link" href="/demo/">demande de devis</a>.</p>' },
  ],

  cta: {
    titre: 'Montrez-nous comment partent vos bourriches',
    texte: 'En 30 minutes, nous vous montrons le même parcours avec vos articles, vos claires et vos clients.',
  },
};
