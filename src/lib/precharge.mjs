// Préchargement de la photo du premier écran : le même jeu de largeurs que <Photo>, en AVIF,
// pour que le navigateur réutilise l’image préchargée.
import { getImage } from 'astro:assets';

export const LARGEURS = [320, 480, 640, 960, 1280, 1600];

export async function prechargePhoto(nom, sizes, widths = LARGEURS) {
  const toutes = import.meta.glob('../assets/photos/*.jpg', { eager: true });
  const fichier = toutes[`../assets/photos/${nom}.jpg`];
  const image = await getImage({ src: fichier.default, widths, format: 'avif' });
  return { imagesrcset: image.srcSet.attribute, imagesizes: sizes, type: 'image/avif' };
}
