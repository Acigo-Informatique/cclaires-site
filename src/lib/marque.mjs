// Le nom C’Claires ne se traduit pas : un traducteur automatique en ferait « C’Clear ». Dans le HTML
// rendu d’une page, chaque occurrence du nom dans le texte (pas dans les balises ni les attributs, pas
// dans les scripts) est enveloppée d’un <span translate="no">.
const BLOCS = /(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/;
const DEJA = /translate="no"/;

export const proteger = (html) => {
  const parts = html.split(BLOCS);
  return parts
    .map((part, i) => (i % 2 || DEJA.test(parts[i - 1] || '') ? part : part.replace(/C’Claires/g, '<span translate="no">C’Claires</span>')))
    .join('');
};
