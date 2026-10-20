// Données structurées (JSON-LD) communes. Base.astro pose l’éditeur sur toutes les pages, le site sur
// l’accueil et le fil d’Ariane ailleurs ; chaque page ajoute les siens (logiciel, questions).
import reglages from '../../site.config.mjs';
import { absolu } from '../lib/chemins.mjs';

export const idEditeur = absolu('/#editeur');
export const idSite = absolu('/#site');
export const idLogiciel = absolu('/#logiciel');

export const organisation = {
  '@type': 'Organization',
  '@id': idEditeur,
  name: 'ACIGO Informatique',
  legalName: 'ACIGO INFORMATIQUE',
  foundingDate: '1997-10-14',
  url: absolu('/'),
  email: reglages.email,
  ...(reglages.telephone ? { telephone: '+33 ' + reglages.telephone.replace(/^0/, '') } : {}),
  logo: absolu('/assets/img/icone-512.png'),
  address: {
    '@type': 'PostalAddress',
    streetAddress: '706 rue Dunant',
    postalCode: '50000',
    addressLocality: 'Saint-Lô',
    addressRegion: 'Manche',
    addressCountry: 'FR',
  },
};

export const siteWeb = {
  '@type': 'WebSite',
  '@id': idSite,
  url: absolu('/'),
  name: 'C’Claires',
  inLanguage: 'fr-FR',
  publisher: { '@id': idEditeur },
};

export const filAriane = (etapes) => ({
  '@type': 'BreadcrumbList',
  itemListElement: etapes.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.libelle, item: absolu(p.url) })),
});

// Questions et réponses : le même tableau sert à la FAQ visible et à son FAQPage.
// Les réponses s’écrivent en HTML simple ; le JSON-LD n’en garde que le texte.
export const questions = (liste, url) => ({
  '@type': 'FAQPage',
  '@id': absolu(url) + '#questions',
  mainEntity: liste.map(({ q, r }) => ({
    '@type': 'Question',
    name: texte(q),
    acceptedAnswer: { '@type': 'Answer', text: texte(r) },
  })),
});

export const texte = (html) => html.replace(/<[^>]+>/g, '').replace(/&nbsp;|&#8239;| | /g, ' ').replace(/\s+/g, ' ').trim();
