// Page « Logiciel mytilicole » (requête principale : logiciel mytiliculture). Règle 1 : seulement des
// fonctions livrées, au présent. La question du métier ouvre la page, l’appel final la referme.
import moules from '../parcours/moules.mjs';

export default {
  url: '/logiciel-mytilicole/',
  titre: 'Logiciel mytiliculture : moules au poids réel | C’Claires',
  description: 'Logiciel de mytiliculture C’Claires : un lot par pêche, poids estimé puis réel, étiquettes sanitaires en 3 clics, palettes SSCC et factures au juste poids.',
  ogTitre: 'Elle pèse combien, cette pêche ? C’Claires.',
  audience: 'Mytiliculteurs',
  schema: 'Logiciel de gestion pour mytiliculteurs : un lot par pêche, poids estimé à la commande et poids réel à la pesée, étiquettes sanitaires en 3 clics, palettes et SSCC, factures et ordres de transport en EDI.',
  couleur: 'ciel',
  photos: ['parcs-moules-saint-jacut', 'bouchots-agon'],
  accroche: ['Elle pèse combien,', 'cette pêche ?'],
  h1: 'Le logiciel mytilicole : pêché le matin, livré le soir, facturé au juste poids',
  sousTitre: 'Son poids réel, celui de la pesée, et c’est lui qui passe sur la facture. Chaque pêche devient un lot avec sa zone de production, l’étiquette de chaque sac sort en 3 clics, et tout reste tracé jusqu’au client.',
  lienParcours: 'Faire avancer une commande de moules',

  douleurs: {
    titre: 'La moule n’attend pas, la facture non plus',
    items: [
      'Le poids estimé à la commande, corrigé à la main après la pesée.',
      'Les sacs et les caisses étiquetés un par un, à la dernière minute.',
      'Les commandes de la grande distribution recopiées, leurs factures envoyées à part.',
    ],
    conclusion: 'Avec C’Claires, la pêche du jour devient un lot, le lot reçoit son poids réel et la facture est émise au juste poids.',
    photo: 'moules-saint-jacut',
  },

  benefices: {
    titre: 'Ce qui change, de la pêche à la facture',
    items: [
      {
        titre: 'Un lot par pêche, numéroté seul',
        texte: 'Chaque pêche reçoit son lot, numéroté par votre masque, avec sa zone de production. Le lot suit les sacs et les caisses jusqu’à la livraison, et le classement de la zone le suit jusqu’au document de transfert.',
        lien: ['/fonctionnalites/tracabilite/', 'La traçabilité des lots'],
        capture: {
          ecran: 'tracabilite', variante: 'moules',
          legende: 'Un lot par pêche, suivi jusqu’à chaque client livré.',
        },
      },
      {
        titre: 'Le poids réel, du BL à la facture',
        texte: 'Le poids est estimé à la commande, relevé à la pesée, et c’est le poids réel qui passe sur le bon de livraison puis sur la facture. Vrac au kilo, sacs ou caisses : chaque article garde son unité, et chaque client ses prix datés.',
        lien: ['/fonctionnalites/commandes-bons-de-livraison/', 'Les commandes et les bons de livraison'],
        capture: {
          ecran: 'poids-variable', variante: 'moules',
          legende: 'Le poids réel de la pesée remplace l’estimation, ligne par ligne.',
        },
      },
      {
        titre: 'Une étiquette par colis, en 3 clics',
        texte: 'Les étiquettes sanitaires des sacs et des colis s’impriment depuis le bon de livraison, avec le modèle de chaque client, sur une ou plusieurs étiqueteuses. Les palettes se composent ensuite et reçoivent leur SSCC.',
        lien: ['/fonctionnalites/etiquette-sanitaire/', 'L’étiquette sanitaire en 3 clics'],
        capture: {
          ecran: 'impression', variante: 'moules',
          legende: 'Depuis le BL, les modèles et les étiqueteuses sont déjà choisis.',
        },
      },
      {
        titre: 'La grande distribution en EDI',
        texte: 'Prix datés par client, promotions, factures et ordres de transport échangés en EDI : la centrale reçoit ses documents dans le format qu’elle attend, sans ressaisie de votre côté.',
        lien: ['/fonctionnalites/edi-grande-distribution/', 'L’EDI avec la grande distribution'],
      },
    ],
  },

  parcours: {
    donnees: moules,
    titre: ['Une commande de moules,', 'pesée puis facturée'],
    intro: 'Faites avancer la commande d’exemple : des moules de bouchot et de corde pour Marée d’Auge, commandées aux poids estimés. Sept clics pour tout le parcours, dont trois pour les étiquettes, à l’étape 3.',
  },

  normes: {
    titre: 'Les documents et les normes de la mytiliculture',
    intro: 'Du sac à l’expédition, C’Claires imprime ce que la réglementation et vos clients demandent.',
    items: [
      { nom: 'Étiquette sanitaire', texte: 'Une étiquette par sac ou par colis, avec ses mentions, en 3 clics.', lien: ['/guides/mentions-obligatoires-etiquette-sanitaire/', 'Les mentions obligatoires'] },
      { nom: 'CERFA 15063*04', texte: 'Le document d’enregistrement des coquillages vivants, prérempli depuis le BL.', lien: ['/guides/cerfa-15063/', 'Remplir le CERFA 15063'] },
      { nom: 'Zones de production', texte: 'Le classement A, B ou C suit le lot jusqu’au document de transfert.' },
      { nom: 'Poids variable', texte: 'Le poids réel de chaque colis, sur le BL et sur la facture.' },
      { nom: 'SSCC et GS1-128', texte: 'Un numéro unique par palette, son étiquette GS1 imprimée au quai.', lien: ['/fonctionnalites/palettisation-sscc/', 'La palettisation'] },
      { nom: 'EDI', texte: 'Factures et ordres de transport au format des centrales.', lien: ['/fonctionnalites/edi-grande-distribution/', 'L’EDI'] },
    ],
  },

  temoignage: { cle: 'mytiliculture', metier: 'mytiliculteur' },

  faq: [
    { q: 'Comment gérez-vous le poids variable ?', r: '<p>Le poids est estimé à la commande, puis remplacé par le poids réel relevé à la pesée. C’est lui qui figure sur le bon de livraison et sur la facture, colis par colis.</p>' },
    { q: 'Peut-on vendre au kilo, en sac et en caisse ?', r: '<p>Oui. Chaque article porte son unité : vrac au kilo, sac, caisse ou colis. Les prix se fixent par client, avec leurs dates, et les promotions du jour sont proposées dès la saisie de la commande.</p>' },
    { q: 'Travaillez-vous avec la grande distribution ?', r: '<p>Oui : les factures et les ordres de transport s’échangent en EDI, et les prix datés par client suivent les accords de chaque centrale. Précisez vos enseignes dans la <a class="link" href="/demo/">demande de devis</a>.</p>' },
    { q: 'Un lot par pêche, même pour une petite pêche ?', r: '<p>Oui. Le masque de numérotation crée le lot de chaque pêche, quelle que soit sa taille, et le classement de la zone de production le suit jusqu’au client.</p>' },
    { q: 'Les étiquettes des sacs portent-elles les mentions obligatoires ?', r: '<p>Oui : marque d’identification, espèce, zone de production, date de conditionnement et lot sont des variables du modèle. Notre guide détaille les <a class="link" href="/guides/mentions-obligatoires-etiquette-sanitaire/">mentions obligatoires de l’étiquette sanitaire</a>.</p>' },
  ],

  cta: {
    texte: 'Apportez le poids d’une pêche : en 30 minutes, nous suivons une commande de moules comme les vôtres, de la pesée à la facture, avec vos articles et vos clients. Ensuite, une version de test si vous le souhaitez.',
  },
};
