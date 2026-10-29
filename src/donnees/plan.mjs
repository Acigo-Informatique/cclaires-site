// Le plan du site : chaque page, son adresse, son libellé court et sa page parente.
// Une seule source pour le menu, le pied de page, les fils d’Ariane, le sitemap et le contrôle des liens
// (tools/verifier.mjs). Une page ajoutée au site s’ajoute d’abord ici.

import { pageClients } from './preuves.mjs';

export const pages = [
  { url: '/', libelle: 'Accueil' },

  { url: '/logiciel-ostreicole/', libelle: 'Ostréiculteurs', fil: 'Logiciel ostréicole', parent: '/', groupe: 'metiers', couleur: 'tilleul',
    resume: 'Chaque lot suivi de la claire à la bourriche' },
  { url: '/logiciel-mytilicole/', libelle: 'Mytiliculteurs', fil: 'Logiciel mytilicole', parent: '/', groupe: 'metiers', couleur: 'ciel',
    resume: 'Pêché le matin, livré le soir, facturé au poids réel' },
  { url: '/logiciel-mareyage/', libelle: 'Mareyeurs', fil: 'Logiciel de mareyage', parent: '/', groupe: 'metiers', couleur: 'noir',
    resume: 'De la criée au client, chaque lot garde son origine' },

  { url: '/fonctionnalites/', libelle: 'Fonctionnalités', parent: '/', groupe: 'fonctionnalites-index' },
  { url: '/fonctionnalites/parcs-claires/', libelle: 'Parcs et claires', parent: '/fonctionnalites/', groupe: 'fonctionnalites',
    resume: 'Chaque claire, son lot, son stock, et la tablette au parc' },
  { url: '/fonctionnalites/tracabilite/', libelle: 'Traçabilité', parent: '/fonctionnalites/', groupe: 'fonctionnalites',
    resume: 'Un lot, une fiche, dans les deux sens' },
  { url: '/fonctionnalites/etiquette-sanitaire/', libelle: 'Étiquette sanitaire', parent: '/fonctionnalites/', groupe: 'fonctionnalites',
    resume: 'Imprimée en 3 clics depuis la commande' },
  { url: '/fonctionnalites/commandes-bons-de-livraison/', libelle: 'Commandes et bons de livraison', parent: '/fonctionnalites/', groupe: 'fonctionnalites',
    resume: 'La commande se remplit seule, les BL partent d’un coup' },
  { url: '/fonctionnalites/facture-electronique/', libelle: 'Facture électronique', parent: '/fonctionnalites/', groupe: 'fonctionnalites',
    resume: 'Prêt pour la réforme' },
  { url: '/fonctionnalites/palettisation-sscc/', libelle: 'Palettisation et SSCC', parent: '/fonctionnalites/', groupe: 'fonctionnalites',
    resume: 'Palettes composées, étiquette GS1 imprimée' },
  { url: '/fonctionnalites/edi-grande-distribution/', libelle: 'EDI grande distribution', parent: '/fonctionnalites/', groupe: 'fonctionnalites',
    resume: 'Factures et ordres de transport en EDI' },

  { url: '/guides/', libelle: 'Guides', parent: '/', groupe: 'guides-index' },
  { url: '/guides/mentions-obligatoires-etiquette-sanitaire/', libelle: 'Mentions obligatoires de l’étiquette sanitaire', parent: '/guides/', groupe: 'guides' },
  { url: '/guides/cerfa-15063/', libelle: 'Remplir le CERFA 15063', parent: '/guides/', groupe: 'guides' },

  { url: '/tarifs/', libelle: 'Tarifs', parent: '/', groupe: 'entreprise' },
  { url: '/demo/', libelle: 'Démo et devis', parent: '/', groupe: 'entreprise' },
  // /clients/ n’existe qu’à partir de la première preuve fournie (src/donnees/preuves.mjs).
  ...(pageClients ? [{ url: '/clients/', libelle: 'Clients', parent: '/', groupe: 'entreprise' }] : []),
  { url: '/a-propos/', libelle: 'À propos', parent: '/', groupe: 'entreprise' },
  { url: '/feuille-de-route/', libelle: 'Feuille de route', parent: '/', groupe: 'entreprise' },
  { url: '/faq/', libelle: 'Questions fréquentes', parent: '/', groupe: 'entreprise' },

  { url: '/mentions-legales/', libelle: 'Mentions légales', parent: '/', groupe: 'legal' },
  { url: '/confidentialite/', libelle: 'Confidentialité', parent: '/', groupe: 'legal' },
];

export const page = (url) => pages.find((p) => p.url === url);
export const groupe = (nom) => pages.filter((p) => p.groupe === nom);

// Le fil d’Ariane d’une page : de l’accueil jusqu’à elle.
export function fil(url) {
  const chaine = [];
  for (let p = page(url); p; p = p.parent ? page(p.parent) : null) chaine.unshift({ ...p, libelle: p.fil ?? p.libelle });
  return chaine;
}
