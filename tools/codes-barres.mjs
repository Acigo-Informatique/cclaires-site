// Génère les codes-barres GS1-128 des documents montrés sur le site (étiquette sanitaire, fiche
// palette). Ce sont de vrais codes, lisibles par une douchette : GTIN en circulation restreinte
// (préfixe 2), SSCC d'exemple. Usage : node tools/codes-barres.mjs
import { writeFileSync } from 'node:fs';

const MOTIFS = ('212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 221312 231212 112232 122132 '
  + '122231 113222 123122 123221 223211 221132 221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 '
  + '212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 231113 231311 112133 112331 132131 113123 '
  + '113321 133121 313121 211331 231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 314111 221411 '
  + '431111 111224 111422 121124 121421 141122 141221 112214 112412 122114 122411 142112 142211 241211 221114 413111 '
  + '241112 134111 111242 121142 121241 114212 124112 124211 411212 421112 421211 212141 214121 412121 111143 111341 '
  + '131141 114113 114311 411113 411311 113141 114131 311141 411131 211412 211214 211232').split(' ');
const STOP = '2331112';
const FNC1 = 102, CODE_B = 100, CODE_C = 99, START_C = 105;
if (MOTIFS.length !== 106 || MOTIFS.some((m) => [...m].reduce((s, c) => s + +c, 0) !== 11)) throw new Error('table Code 128 invalide');

// Clé de contrôle GS1 (modulo 10, poids 3 et 1 depuis la droite).
const cle = (chiffres) => {
  const s = [...chiffres].reverse().reduce((t, c, i) => t + +c * (i % 2 === 0 ? 3 : 1), 0);
  return String((10 - (s % 10)) % 10);
};

// Encode une suite d'éléments GS1 : [ai, valeur, longueurFixe?]. FNC1 après un champ variable non final.
function encoder(elements) {
  const valeurs = [START_C, FNC1];
  let jeu = 'C';
  elements.forEach(([ai, valeur, fixe], i) => {
    const texte = ai + valeur;
    let p = 0;
    while (p < texte.length) {
      const paire = texte.slice(p, p + 2);
      if (/^\d\d$/.test(paire)) {
        if (jeu !== 'C') { valeurs.push(CODE_C); jeu = 'C'; }
        valeurs.push(+paire); p += 2;
      } else {
        if (jeu !== 'B') { valeurs.push(CODE_B); jeu = 'B'; }
        valeurs.push(texte.charCodeAt(p) - 32); p += 1;
      }
    }
    if (!fixe && i < elements.length - 1) valeurs.push(FNC1);
  });
  const controle = valeurs.reduce((s, v, i) => s + v * (i === 0 ? 1 : i), 0) % 103;
  valeurs.push(controle);
  return valeurs.map((v) => MOTIFS[v]).join('') + STOP;
}

function svg(largeurs, hauteur, titre) {
  let x = 10, barres = '';
  [...largeurs].forEach((w, i) => { if (i % 2 === 0) barres += `M${x} 0h${w}v${hauteur}h-${w}z`; x += +w; });
  const total = x + 10;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${hauteur}" preserveAspectRatio="none" role="img" aria-label="${titre}"><title>${titre}</title><path fill="#000" d="${barres}"/></svg>\n`;
}

// GTIN-14 (indicateur 0) d'un article en circulation restreinte, à partir de ses 12 premiers chiffres.
const gtin = (douze) => { const base = '0' + douze; return base + cle(base); };
const ssccBase = '3' + '2000012' + '000001482';
const SSCC = ssccBase + cle(ssccBase);

// Une étiquette par lot de la commande d'exemple : article, date de conditionnement, lot.
const etiquettes = {
  'gs1-etiquette': [['01', gtin('200001234567'), true], ['13', '261217', true], ['10', '2026-351-3-014']],
  'gs1-etiquette-speciales': [['01', gtin('200001234568'), true], ['13', '261215', true], ['10', '2026-349-2-006']],
  'gs1-etiquette-moules': [['01', gtin('200001234569'), true], ['13', '261216', true], ['10', '2026-350-M-002']],
};
const palette = [['00', SSCC, true]];
const lisible = (els) => els.map(([ai, v]) => `(${ai})${v}`).join('');

for (const [nom, elements] of Object.entries(etiquettes)) {
  writeFileSync(new URL(`../public/assets/img/${nom}.svg`, import.meta.url), svg(encoder(elements), 60, lisible(elements)));
  console.log(nom, lisible(elements));
}
writeFileSync(new URL('../public/assets/img/gs1-palette.svg', import.meta.url), svg(encoder(palette), 60, lisible(palette)));
console.log('gs1-palette', lisible(palette));
