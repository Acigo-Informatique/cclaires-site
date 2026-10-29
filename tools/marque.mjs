// Dérive les variantes du logo utilisées par le site à partir des SVG de la charte.
// Usage : node tools/marque.mjs <dossier des logos de la charte>
// Les tracés ne sont jamais redessinés : on les recopie, on retire la baseline (permis par la
// charte, p. 3) et on recolore en blanc pour le « logo avec fond de couleur » (p. 4).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const source = process.argv[2];
if (!source) { console.error('Usage : node tools/marque.mjs <dossier des logos>'); process.exit(1); }
const sortie = new URL('../public/assets/img/', import.meta.url);
mkdirSync(sortie, { recursive: true });

const PAON = '#007B8E';
const TILLEUL = '#B6CB6B';

function traces(fichier) {
  const svg = readFileSync(join(source, fichier), 'utf8');
  return [...svg.matchAll(/<path\b[^>]*?\sd="([^"]+)"/g)].map((m) => ({ d: m[1].replace(/\s+/g, ' ').trim() }));
}

// Boîte englobante approchée d'un tracé : points d'ancrage et points de contrôle.
function boite(d) {
  const jetons = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g);
  let x = 0, y = 0, sx = 0, sy = 0, i = 0, cmd = '';
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const note = (px, py) => { minX = Math.min(minX, px); maxX = Math.max(maxX, px); minY = Math.min(minY, py); maxY = Math.max(maxY, py); };
  const n = () => parseFloat(jetons[i++]);
  while (i < jetons.length) {
    if (/[a-zA-Z]/.test(jetons[i])) cmd = jetons[i++];
    const rel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();
    if (C === 'Z') { x = sx; y = sy; continue; }
    const ox = rel ? x : 0, oy = rel ? y : 0;
    if (C === 'M' || C === 'L' || C === 'T') { x = ox + n(); y = oy + n(); note(x, y); if (C === 'M') { sx = x; sy = y; cmd = rel ? 'l' : 'L'; } }
    else if (C === 'H') { x = ox + n(); note(x, y); }
    else if (C === 'V') { y = oy + n(); note(x, y); }
    else if (C === 'C') { note(ox + n(), oy + n()); note(ox + n(), oy + n()); x = ox + n(); y = oy + n(); note(x, y); }
    else if (C === 'S' || C === 'Q') { note(ox + n(), oy + n()); x = ox + n(); y = oy + n(); note(x, y); }
    else if (C === 'A') { n(); n(); n(); n(); n(); x = ox + n(); y = oy + n(); note(x, y); }
    else i++;
  }
  return { minX, minY, maxX, maxY };
}

function union(boites, marge = 0) {
  const b = boites.reduce((a, c) => ({ minX: Math.min(a.minX, c.minX), minY: Math.min(a.minY, c.minY), maxX: Math.max(a.maxX, c.maxX), maxY: Math.max(a.maxY, c.maxY) }));
  return [b.minX - marge, b.minY - marge, b.maxX - b.minX + 2 * marge, b.maxY - b.minY + 2 * marge].map((v) => +v.toFixed(1));
}

function svg(vb, corps, titre) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" role="img" aria-label="${titre}"><title>${titre}</title>${corps}</svg>\n`;
}

// Logo bis (horizontal) : symbole, goutte, lettrage « CLAIRES », baseline.
const bis = traces('logo_bis_cclaires.svg');
const [lettrage, symbole, goutte] = [bis[0], bis[1], bis[2]];
const vbBis = union([boite(lettrage.d), boite(symbole.d), boite(goutte.d)], 4);
const corpsBis = (encre) => `<path fill="${encre}" d="${symbole.d}"/><path fill="${TILLEUL}" d="${goutte.d}"/><path fill="${encre}" d="${lettrage.d}"/>`;
writeFileSync(new URL('logo-blanc.svg', sortie), svg(vbBis, corpsBis('#FFFFFF'), "C'Claires"));
writeFileSync(new URL('logo-paon.svg', sortie), svg(vbBis, corpsBis(PAON), "C'Claires"));

// Symbole seul (le C, ses vagues et la goutte).
const vbSym = union([boite(symbole.d), boite(goutte.d)], 6);
writeFileSync(new URL('symbole.svg', sortie), svg(vbSym, `<path fill="${PAON}" d="${symbole.d}"/><path fill="${TILLEUL}" d="${goutte.d}"/>`, "C'Claires"));

// Icône (charte p. 14) : disque bleu paon, C blanc, goutte tilleul.
const [x, y, w, h] = vbSym;
const cote = Math.max(w, h) * 1.42;
const cx = x + w / 2, cy = y + h / 2;
const vbIcone = [cx - cote / 2, cy - cote / 2, cote, cote].map((v) => +v.toFixed(1));
const icone = `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(cote / 2).toFixed(1)}" fill="${PAON}"/><path fill="#FFFFFF" d="${symbole.d}"/><path fill="${TILLEUL}" d="${goutte.d}"/>`;
writeFileSync(new URL('../../favicon.svg', sortie), svg(vbIcone, icone, "C'Claires"));
writeFileSync(new URL('icone.svg', sortie), svg(vbIcone, icone, "C'Claires"));

console.log('bis', vbBis.join(' '), '· symbole', vbSym.join(' '), '· icône', vbIcone.join(' '));
