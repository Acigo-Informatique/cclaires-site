// La preuve sociale du site : témoignages, logos de clients, étude de cas, photo de l’équipe.
// Rien n’y est inventé : chaque entrée vient d’un client (ou de l’équipe) qui a donné son accord écrit.
// Tant qu’une rubrique est vide, les blocs qui la montrent ne s’affichent pas ; la page /clients/
// reste hors du site tant qu’il n’y a ni témoignage, ni logo, ni étude de cas (TODO-MANUEL.md).

// Un témoignage par métier, affiché sur l’accueil, sur la page métier et sur /clients/ :
// { citation: '20 à 40 mots', prenom, nom, entreprise, bassin, photo }
// photo : nom du fichier carré déposé dans src/assets/photos/ (sans .jpg), servi par Photo.astro.
export const temoignages = {
  ostreiculture: null, // TODO-MANUEL TEMO-01
  mytiliculture: null, // TODO-MANUEL TEMO-02
  mareyage: null,      // TODO-MANUEL TEMO-03
};

// Logos de clients : { nom, fichier, largeur, hauteur } ; fichier : SVG d’une seule couleur déposé dans
// public/assets/img/clients/, largeur et hauteur : celles de son viewBox. TODO-MANUEL LOGOS-01.
export const logos = [];

// Photo de l’équipe ACIGO, accueil et /a-propos/ : { photo, legende } ; photo : nom du fichier paysage 3:2
// dans src/assets/photos/ (sans .jpg), legende : les prénoms et le rôle de chacun. TODO-MANUEL EQUIPE-01.
export const equipe = null;

// Étude de cas chiffrée, /clients/ : résultats mesurés et vérifiables seulement. TODO-MANUEL CAS-01.
// { entreprise, metier, bassin, avant: 'la situation de départ', miseEnPlace: 'comment C’Claires a été installé',
//   resultats: [['valeur mesurée', 'ce qu’elle mesure'], …], temoignage: { citation, prenom, nom, entreprise, bassin, photo } }
export const etudeDeCas = null;

export const temoignagesFournis = Object.values(temoignages).filter(Boolean);
export const pageClients = temoignagesFournis.length > 0 || logos.length > 0 || etudeDeCas !== null;
