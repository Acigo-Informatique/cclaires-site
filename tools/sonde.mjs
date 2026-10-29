// Sonde de l’inspecteur taste-skill, à lancer dans le navigateur sur une page servie par
// tools/serveur-local.mjs avec ?sonde=1 (Edge refuse le mode headless sur ce poste) :
//   const { mesurer } = await import('/tools/sonde.mjs'); await mesurer('accueil');
// Le volet du navigateur peut être masqué : les images différées sont alors forcées et le
// mouvement n’est pas mesuré (les animations ne tournent pas dans un onglet caché).
export async function mesurer(page = 'page', { mouvement = !document.hidden } = {}) {
  document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
  await Promise.all([...document.images].map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }))));
  const { probe, frame } = await import('/__probe.mjs');
  await document.fonts.ready;
  await new Promise((r) => setTimeout(r, 1400));
  const metrics = probe();
  const h = innerHeight;
  const frames = [frame()];
  const ecrans = Math.min(11, Math.max(0, Math.ceil(metrics.page.height / h) - 1));
  for (let i = 1; i <= ecrans; i++) {
    scrollTo({ top: i * h, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 650));
    frames.push(frame());
    window.__motionSample?.();
  }
  const motion = mouvement && window.__motion ? window.__motion() : null;
  scrollTo({ top: 0, behavior: 'instant' });
  await new Promise((r) => setTimeout(r, 350));
  const apres = probe();
  const m = apres.headings.length >= metrics.headings.length ? apres : metrics;
  const r = await fetch('/__mesures', { method: 'POST', body: JSON.stringify({ width: innerWidth, metrics: m, frames, motion, page }) });
  const res = await r.json();
  const titres = (m.headings || []).filter((t) => t.lines > 2).map((t) => `${t.tag} ${t.lines} lignes : ${t.text.slice(0, 50)}`);
  return { largeur: innerWidth, constats: res.findings, titresTropLongs: titres, defilementHorizontal: document.documentElement.scrollWidth > innerWidth };
}
