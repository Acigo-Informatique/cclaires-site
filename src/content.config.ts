// Collections de contenus. Les guides s’écrivent en Markdown dans src/content/guides/ : un fichier par
// guide, son nom donne l’adresse (/guides/<nom>/). Une affirmation réglementaire non sourcée porte la
// marque <span class="a-verifier">[À VÉRIFIER]</span> jusqu’à sa vérification.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guides' }),
  schema: z.object({
    titre: z.string(),            // balise <title>
    description: z.string(),      // 150 à 160 caractères
    h1: z.string(),
    accroche: z.array(z.string()).optional(),   // la question en tête de page, une entrée par ligne
    sousTitre: z.string(),
    resume: z.string(),           // une ligne pour la page /guides/
    couleur: z.enum(['tilleul', 'ciel', 'noir', 'paon', 'eau']),
    photos: z.array(z.string()),
    exemple: z.enum(['etiquette', 'cerfa']).optional(),
    fonction: z.tuple([z.string(), z.string()]),   // [adresse, libellé] de la fonctionnalité liée
    ordre: z.number(),
  }),
});

export const collections = { guides };
