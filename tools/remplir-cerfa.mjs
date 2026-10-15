// Remplit le CERFA 15063*04 officiel avec la commande d'exemple du site, avec les champs que
// l'API utilise (ChampsCerfa15063.cs), puis aplatit le formulaire pour l'afficher en image.
// Usage : npm i --no-save pdf-lib@1.17.1, puis
//   node tools/remplir-cerfa.mjs <cerfa_15063-04.pdf de l'API> <sortie.pdf> [--lister]
// Le PDF obtenu se rend en image (page 1) et se recadre avec tools/recadrer.ps1.
import { readFileSync, writeFileSync } from 'node:fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const [source, sortie, option] = process.argv.slice(2);
const doc = await PDFDocument.load(readFileSync(source));
const form = doc.getForm();
const noms = form.getFields().map((f) => f.getName());
if (option === '--lister') { console.log(noms.join('\n')); process.exit(0); }

const Case = noms.find((n) => /cocher 2$/.test(n)).replace(/2$/, '');
const texte = (nom, valeur) => {
  const champ = form.getTextField(nom);
  const max = champ.getMaxLength();
  if (max !== undefined && valeur.length > max) throw new Error(`« ${valeur} » dépasse ${max} caractères (${nom})`);
  champ.setText(valeur);
};
const cocher = (nom) => form.getCheckBox(nom).check();

texte('Numero DE', '2026-1482');
cocher('A'); // fournisseur : éleveur
texte('Nom', 'Exploitation des Trois Claires\n12 chemin des Claires\n17320 Marennes-Hiers-Brouage');
cocher(Case + '2'); // n° d'agrément

texte('Zone de texte 22', 'Huître creuse (Magallana gigas)');
texte('Zone de texte 23', '12 bourriches');
texte('Zone de texte 24', '60');
texte('Zone de texte 25', '14/11/2026');
cocher(Case + '12'); // coquillages d'élevage
texte('Zone de texte 26', 'Marennes-Oléron, Seudre');
cocher(Case + '14'); // classement A
cocher(Case + '19'); // alerte : non

cocher(Case + '21'); // finition
texte('Zone de texte 27', 'Claire C12');
texte('Zone de texte 28', 'A');
texte('Zone de texte 30', '18/11/2026');
texte('Zone de texte 31', '16/12/2026');

cocher(Case + '1'); // acheteur : SIRET
texte('Zone de texte 6', '987 654 321 00012');
texte('Zone de texte 7', 'Poissonnerie de la Halle\n14000 Caen');
cocher(Case + '9'); // autre entreprise

form.flatten();
const page = doc.getPage(0);
const police = await doc.embedFont(StandardFonts.Helvetica);
page.drawText('FR 17.999.001 CE', { x: 332, y: 651, size: 7, font: police, color: rgb(0, 0, 0) });
page.drawText('18/12/2026', { x: 120, y: 96, size: 10, font: police, color: rgb(0, 0, 0) });
writeFileSync(sortie, await doc.save());
console.log('CERFA rempli :', sortie);
