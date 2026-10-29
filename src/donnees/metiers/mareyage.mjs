// Page « Logiciel de mareyage » (requête principale : logiciel mareyage). Règle 1 : seulement des
// fonctions livrées, au présent ; ni module de criée ni transformation (feuille de route).
// La question du métier ouvre la page, l’appel final la referme.
import poisson from '../parcours/poisson.mjs';

export default {
  url: '/logiciel-mareyage/',
  titre: 'Logiciel mareyage : achat, traçabilité, EDI | C’Claires',
  description: 'Logiciel de mareyage C’Claires : lots d’achat qui gardent leur origine, zone FAO et engin sur l’étiquette, poids variable, traçabilité, EDI et factures.',
  ogTitre: 'Il vient d’où, ce bar ? C’Claires.',
  audience: 'Mareyeurs',
  schema: 'Logiciel de gestion pour mareyeurs : achats et réceptions par lot, mentions de l’information du consommateur sur l’étiquette, poids variable, viviers, traçabilité, factures et ordres de transport en EDI.',
  couleur: 'noir',
  photos: ['port-en-bessin', 'criee-boulogne'],
  accroche: ['Il vient d’où,', 'ce bar ?'],
  h1: 'Le logiciel de mareyage, de la criée au client',
  sousTitre: 'C’Claires le sait, et votre client aussi : chaque lot acheté garde son origine, sa zone FAO et son engin jusqu’à l’étiquette. Achat, vente, étiquette et facture s’enchaînent sans ressaisie.',
  lienParcours: 'Faire avancer une commande de marée',

  douleurs: {
    titre: 'Entre la criée et le client, pas de temps pour la ressaisie',
    items: [
      'L’origine du lot, recopiée du bon d’achat sur chaque étiquette.',
      'Les poids pesés un à un, reportés à la main sur le BL et la facture.',
      'Les mentions d’espèce, de zone et d’engin vérifiées colis par colis.',
    ],
    conclusion: 'Avec C’Claires, le lot acheté porte son origine et ses mentions : elles passent seules sur l’étiquette, le BL et la facture.',
    photo: 'criee-boulogne',
  },

  benefices: {
    titre: 'Ce qui change à l’atelier de marée',
    items: [
      {
        titre: 'Chaque lot garde son origine',
        texte: 'Achats et réceptions créent des lots que C’Claires suit jusqu’à l’expédition. La traçabilité remonte au lot d’achat et descend jusqu’à chaque client livré, dans un sens comme dans l’autre.',
        lien: ['/fonctionnalites/tracabilite/', 'La traçabilité des lots'],
        capture: {
          ecran: 'reception', variante: 'poisson',
          legende: 'À la réception, chaque achat devient un lot qui garde son origine.',
        },
      },
      {
        titre: 'Les mentions du consommateur sur chaque étiquette',
        texte: 'Dénomination commerciale, nom scientifique, zone FAO et engin de pêche : portées par l’article, ces mentions du règlement UE 1379/2013 s’impriment sur l’étiquette en 3 clics depuis le BL, avec le modèle que vos règles ont choisi pour chaque client.',
        lien: ['/fonctionnalites/etiquette-sanitaire/', 'Les étiquettes en 3 clics'],
        capture: {
          ecran: 'editeur', variante: 'poisson',
          legende: 'L’éditeur de modèles : chaque mention est une variable de l’article ou du lot.',
        },
      },
      {
        titre: 'Le poids variable, colis par colis',
        texte: 'Chaque colis est pesé, son poids réel passe sur le bon de livraison et sur la facture. Viviers, vrac, poids fixe ou emballé : chaque stock garde son unité.',
        lien: ['/fonctionnalites/commandes-bons-de-livraison/', 'Les commandes et les bons de livraison'],
        capture: {
          ecran: 'poids-variable', variante: 'poisson',
          legende: 'Le poids réel de la pesée remplace l’estimation, colis par colis.',
        },
      },
      {
        titre: 'L’export et la grande distribution en EDI',
        texte: 'Les documents s’éditent dans la langue du client, les factures et les ordres de transport s’échangent en EDI : les gros clients reçoivent ce qu’ils attendent, sans ressaisie.',
        lien: ['/fonctionnalites/edi-grande-distribution/', 'L’EDI avec la grande distribution'],
      },
    ],
  },

  parcours: {
    donnees: poisson,
    titre: ['Une commande de marée,', 'de la criée à la facture'],
    intro: 'Faites avancer la commande d’exemple : du bar de ligne, du lieu jaune et de la sole achetés à la criée du matin pour la Poissonnerie du Port. Sept clics pour tout le parcours, dont trois pour les étiquettes, à l’étape 3.',
  },

  normes: {
    titre: 'Les documents et les normes de la marée',
    intro: 'De l’achat à l’expédition, C’Claires imprime et contrôle ce que la réglementation et vos clients demandent.',
    items: [
      { nom: 'Règlement UE 1379/2013', texte: 'Dénomination, nom scientifique, méthode de production, zone FAO et engin, portés par l’article.' },
      { nom: 'Codes-barres 1D et 2D', texte: 'EAN-13, GS1-128, Code 128, QR code, DataMatrix : tous dans l’éditeur.', lien: ['/fonctionnalites/etiquette-sanitaire/', 'Les étiquettes'] },
      { nom: 'Poids variable', texte: 'Le poids réel de chaque colis, du BL à la facture.' },
      { nom: 'SSCC et GS1-128', texte: 'Un numéro unique par palette, son étiquette GS1 imprimée au quai.', lien: ['/fonctionnalites/palettisation-sscc/', 'La palettisation'] },
      { nom: 'EDI', texte: 'Factures et ordres de transport au format des centrales.', lien: ['/fonctionnalites/edi-grande-distribution/', 'L’EDI'] },
      { nom: 'Traçabilité', texte: 'De l’achat à la vente, et de la vente à l’achat.', lien: ['/fonctionnalites/tracabilite/', 'La traçabilité'] },
    ],
  },

  temoignage: { cle: 'mareyage', metier: 'mareyeur' },

  faq: [
    { q: 'Gérez-vous les achats sous criée ?', r: '<p>Les achats et les réceptions se saisissent dans C’Claires : chaque lot acheté garde son origine, de la réception à l’expédition, et sa traçabilité remonte jusqu’à lui.</p>' },
    { q: 'Les étiquettes portent-elles la zone FAO et l’engin de pêche ?', r: '<p>Oui : ces mentions sont portées par l’article et s’impriment sur l’étiquette, avec la dénomination commerciale et le nom scientifique.</p>' },
    { q: 'Et les viviers ?', r: '<p>Le stock en vivier se gère en vrac, en poids fixe ou emballé, et en poids variable, comme le reste du stock.</p>' },
    { q: 'Travaillez-vous à l’export ?', r: '<p>Les documents s’éditent dans la langue du client, et les factures et les ordres de transport s’échangent en EDI.</p>' },
    { q: 'Êtes-vous prêts pour la facture électronique ?', r: '<p>Prêt pour la réforme : la connexion à une plateforme agréée est en cours, et elle sera livrée avant votre échéance. <a class="link" href="/fonctionnalites/facture-electronique/">Où en est la facture électronique</a></p>' },
  ],

  cta: {
    texte: 'Du bon d’achat à la facture : en 30 minutes, nous suivons devant vous un achat du matin jusqu’à l’étiquette et la facture, avec vos espèces et vos clients. Ensuite, une version de test si vous le souhaitez.',
  },
};
