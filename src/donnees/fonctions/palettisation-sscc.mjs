// Page « Palettisation et SSCC » (requête : SSCC palette).
export default {
  url: '/fonctionnalites/palettisation-sscc/',
  titre: 'Étiquette palette GS1 et SSCC | C’Claires',
  description: 'Palettisation dans C’Claires : colis du BL répartis en palettes, SSCC attribué à l’enregistrement, étiquette palette GS1-128 et fiche palette imprimées au quai.',
  h1: 'Palettes composées, SSCC attribué, étiquette GS1 imprimée',
  sousTitre: 'Les colis du bon de livraison se répartissent en palettes, chaque palette reçoit son SSCC et son étiquette GS1 s’imprime au quai, sans tableur ni ressaisie.',
  couleur: 'ciel',
  photos: ['chaland-oleron', 'port-en-bessin', 'bouchots-agon'],
  lienVitrine: 'Voir une fiche palette',
  vitrine: {
    titre: 'Une fiche palette prête pour le quai',
    fragment: 'palette',
    points: [
      'Le SSCC de la palette en code-barres GS1-128, avec l’identifiant (00).',
      'Le client, le BL, le type de palette et le nombre de colis.',
      'Le poids net et le poids brut, la composition article par article.',
    ],
    note: 'La palette du BL-26-02217 de la commande d’exemple, au format 10 × 15.',
  },
  etapes: {
    titre: 'Du bon de livraison au camion',
    items: [
      'C’Claires propose la répartition des colis du BL en palettes, par dimensions ou par nombre de colis.',
      'À l’enregistrement, chaque palette reçoit son SSCC, un numéro unique de 18 chiffres.',
      'L’étiquette palette GS1 et la fiche palette s’impriment au quai, en A4, A5 ou 10 × 15.',
    ],
  },
  captures: [
    {
      ecran: 'palettisation', variante: 'huitres',
      legende: 'Les palettes proposées, puis le SSCC attribué à l’enregistrement.',
    },
  ],
  metiers: ['/logiciel-ostreicole/', '/logiciel-mytilicole/', '/logiciel-mareyage/'],
  faq: [
    { q: 'Qu’est-ce qu’un SSCC ?', r: '<p>Le Serial Shipping Container Code : un numéro de 18 chiffres qui identifie de façon unique une unité logistique, ici une palette. Il s’imprime en code-barres GS1-128, précédé de l’identifiant (00).</p>' },
    { q: 'Les palettes se composent-elles toutes seules ?', r: '<p>C’Claires propose la répartition des colis du BL, par dimensions ou par nombre de colis ; vous la validez ou la modifiez avant l’enregistrement.</p>' },
    { q: 'Sur quoi s’imprime l’étiquette palette ?', r: '<p>Sur l’étiqueteuse du quai au format 10 × 15, ou sur une imprimante de bureau en A4 ou A5.</p>' },
  ],
  cta: {
    titre: 'Montrez-nous comment partent vos palettes',
    texte: 'En 30 minutes, nous vous montrons la palettisation d’un de vos BL, du SSCC à l’étiquette GS1.',
  },
};
