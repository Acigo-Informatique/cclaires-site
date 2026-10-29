// Carte de la section « éditeur » : le contour de la France (domaine public, Wikimedia Commons,
// « Blank France map, no Departments.svg » par Lokal_Profil) et un point sur Saint-Lô.
// Usage : node tools/carte.mjs <france.svg>
import { readFileSync, writeFileSync } from 'node:fs';

const source = readFileSync(process.argv[2], 'utf8');
const d = source.match(/id="France-outline"[\s\S]*?\sd="([^"]+)"/)[1].replace(/\s+/g, ' ').trim();
// Saint-Lô (49,12° N ; 1,09° O), placé par interpolation entre Dunkerque et Brest sur ce fond.
const saintLo = { x: 147, y: 120 };
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 507 520" role="img" aria-label="Carte de France, Saint-Lô marqué dans la Manche"><title>Saint-Lô, Manche</title><path fill="#007B8E" d="${d}"/><circle cx="${saintLo.x}" cy="${saintLo.y}" r="11" fill="#0A0A0A"/><circle cx="${saintLo.x}" cy="${saintLo.y}" r="4" fill="#B6CB6B"/></svg>\n`;
writeFileSync(new URL('../public/assets/img/carte-saint-lo.svg', import.meta.url), svg);
console.log('carte écrite,', Math.round(svg.length / 1024), 'Ko');
