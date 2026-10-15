// Prépare le site pour GitHub Pages : copie les fichiers publiés dans un dossier de sortie, sans les
// outils ni les notes (la liste de .vercelignore), puis, quand le site est servi sous un sous-dossier
// (https://<compte>.github.io/<dépôt>/), préfixe ses chemins absolus par ce sous-dossier.
// Sous un sous-dossier, le site n’est qu’un aperçu : il est exclu des moteurs de recherche, la page
// canonique restant https://cclaires.fr, et ses images de partage pointent vers l’aperçu.
//   node tools/pages.mjs <sortie> [chemin-de-base] [adresse-de-base]
//   ex. node tools/pages.mjs _site /cclaires-site https://acigo-informatique.github.io/cclaires-site
import { cpSync, readFileSync, writeFileSync, readdirSync, rmSync, mkdirSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const [sortie = '_site', base = '', adresse = ''] = process.argv.slice(2);
const prefixe = base.replace(/\/+$/, '');
const exclus = new Set([
  '.git', '.github', '.claude', '.taste-skill', 'tools', 'node_modules', sortie,
  'README.md', 'vercel.json', '.vercelignore', '.gitignore', 'package.json', 'package-lock.json',
  'assets/img/photos/credits.json',
]);
const garde = (chemin) => !exclus.has(relative('.', chemin).split('\\').join('/'));

rmSync(sortie, { recursive: true, force: true });
mkdirSync(sortie);
for (const nom of readdirSync('.')) {
  if (garde(nom)) cpSync(nom, join(sortie, nom), { recursive: true, filter: garde });
}

const fichiers = (dossier) => readdirSync(dossier, { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? fichiers(join(dossier, e.name)) : [join(dossier, e.name)]));

if (prefixe) {
  const absolu = /(^|,\s*)\/(?!\/)/g;
  for (const f of fichiers(sortie)) {
    const ext = extname(f);
    if (ext === '.html') {
      let t = readFileSync(f, 'utf8')
        .replace(/(\s(?:href|src|poster|action)=")\/(?!\/)/g, `$1${prefixe}/`)
        .replace(/(\ssrcset=")([^"]*)"/g, (_, debut, liste) => `${debut}${liste.replace(absolu, `$1${prefixe}/`)}"`)
        .replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex">');
      if (adresse) {
        t = t.replace(/(<meta (?:property|name)="(?:og|twitter):(?:image|url)" content=")https:\/\/cclaires\.fr\/?/g, `$1${adresse.replace(/\/+$/, '')}/`);
      }
      writeFileSync(f, t);
    } else if (ext === '.webmanifest') {
      writeFileSync(f, readFileSync(f, 'utf8').replace(/("(?:start_url|scope|src)":\s*")\/(?!\/)/g, `$1${prefixe}/`));
    }
  }
}
console.log(`${fichiers(sortie).length} fichiers dans ${sortie}${prefixe ? `, servis sous ${prefixe}/` : ''}`);
