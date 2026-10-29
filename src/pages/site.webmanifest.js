// Manifeste de l’application web, avec les chemins du sous-dossier quand il y en a un.
import { lien } from '../lib/chemins.mjs';

export const GET = () => new Response(JSON.stringify({
  name: 'C’Claires',
  short_name: 'C’Claires',
  description: 'La gestion des métiers de la mer',
  lang: 'fr',
  start_url: lien('/'),
  display: 'browser',
  background_color: '#ffffff',
  theme_color: '#007b8e',
  icons: [
    { src: lien('/assets/img/icone-192.png'), sizes: '192x192', type: 'image/png' },
    { src: lien('/assets/img/icone-512.png'), sizes: '512x512', type: 'image/png' },
    { src: lien('/favicon.svg'), sizes: 'any', type: 'image/svg+xml' },
  ],
}, null, 2), { headers: { 'content-type': 'application/manifest+json' } });
