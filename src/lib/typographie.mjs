// Dernière main sur le HTML rendu d’une page, appliquée au texte seulement (jamais aux balises, aux
// attributs, aux scripts ni aux styles) :
//   - typographie française : espace fine insécable avant « ; ? ! », insécable avant « : » et à
//     l’intérieur des guillemets, nombre et unité insécables (« 3 clics », « 60 kg », « n° 3 ») ;
//   - le nom C’Claires ne se traduit pas : un traducteur automatique en ferait « C’Clear ». Chaque
//     occurrence est enveloppée d’un <span translate="no">.
const BLOCS = /(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/;
const DEJA = /translate="no"/;
const NBSP = ' ', FINE = ' ';
const UNITES = 'clics?|kg|g|t|h|heures?|minutes?|min|jours?|ans|mois|semaines?|utilisateurs?|étiqueteuses?|étiquettes?|colis|palettes?|lots?|postes?|questions?|%|€|×|m|mm|cm';

export function typographier(texte) {
  return texte
    .replace(/&nbsp;/g, NBSP).replace(/&#8239;|&#x202f;/gi, FINE)
    .replace(/[  ]+([;?!])/g, `${FINE}$1`)
    .replace(/(\S)[  ]*:(?=\s|$)/g, (m, avant) => (/[\d/]/.test(avant) && !/[  ]/.test(m) ? m : `${avant}${NBSP}:`))
    .replace(/^[  ]+:(?=\s|$)/, `${NBSP}:`) // « … devis</a> : nous » : le deux-points juste après une balise
    .replace(/«[   ]*/g, `«${NBSP}`)
    .replace(/[   ]*»/g, `${NBSP}»`)
    .replace(new RegExp(`(\\d) (?=(?:${UNITES})(?![\\p{L}]))`, 'gu'), `$1${NBSP}`)
    .replace(/(n°|N°|p\.) (?=\d)/g, `$1${NBSP}`);
}

export function finir(html) {
  const parts = html.split(BLOCS);
  return parts
    .map((part, i) => {
      if (i % 2) return part;
      const t = typographier(part);
      return DEJA.test(parts[i - 1] || '') ? t : t.replace(/C’Claires/g, '<span translate="no">C’Claires</span>');
    })
    .join('');
}
