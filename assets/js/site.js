// C’Claires — le peu de script dont la page a besoin. Sans lui, tout reste lisible :
// les documents s’affichent les uns sous les autres, les détails des automatismes sont ouverts.

// Apparition des sections, une seule fois, quand elles entrent dans l’écran.
(() => {
  const cibles = document.querySelectorAll('[data-reveal]');
  if (!cibles.length) return;
  if (!('IntersectionObserver' in window)) { cibles.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entrees) => {
    for (const e of entrees) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  cibles.forEach((el) => io.observe(el));
  // Filet de sécurité : rien ne reste caché si l’observateur ne s’est pas déclenché.
  window.addEventListener('load', () => setTimeout(() => {
    cibles.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
  }, 2500));
})();

// Documents : un onglet par document produit depuis la même commande.
(() => {
  const liste = document.querySelector('.docs__index[role="tablist"]');
  if (!liste) return;
  const onglets = [...liste.querySelectorAll('[role="tab"]')];
  const choisir = (onglet, focus) => {
    for (const o of onglets) {
      const actif = o === onglet;
      o.setAttribute('aria-selected', String(actif));
      o.tabIndex = actif ? 0 : -1;
      const feuille = document.getElementById(o.getAttribute('aria-controls'));
      feuille.hidden = !actif;
      if (actif) { feuille.classList.remove('is-entering'); void feuille.offsetWidth; feuille.classList.add('is-entering'); }
    }
    if (focus) onglet.focus();
    onglet.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };
  onglets.forEach((o, i) => {
    o.addEventListener('click', () => choisir(o, false));
    o.addEventListener('keydown', (e) => {
      const pas = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (pas) { e.preventDefault(); choisir(onglets[(i + pas + onglets.length) % onglets.length], true); }
      if (e.key === 'Home') { e.preventDefault(); choisir(onglets[0], true); }
      if (e.key === 'End') { e.preventDefault(); choisir(onglets[onglets.length - 1], true); }
    });
  });
})();

// Étiquettes en 3 clics : le visiteur ouvre le BL, demande les étiquettes, lance l’impression.
// Sans script, la scène montre le dialogue d’impression et la liste des trois clics.
(() => {
  const scene = document.querySelector('.clics__stage');
  if (!scene) return;
  const etapes = [...document.querySelectorAll('.clics__steps li')];
  const statut = document.querySelector('.clics__status');
  const recommencer = document.querySelector('.clics__reset');
  const messages = [
    'Essayez sur l’exemple : ouvrez le BL-26-02217.',
    'Un clic : le bon de livraison est ouvert. Imprimez ses étiquettes.',
    'Deux clics : le plan d’impression est prêt, modèle et étiqueteuse déjà choisis par vos règles.',
    'Trois clics : 20 étiquettes sont parties vers l’étiqueteuse du quai 2.',
  ];
  const montrer = (etat, focus) => {
    scene.dataset.etat = String(etat);
    const panneau = scene.querySelector(`[data-panneau="${etat}"]`);
    panneau.classList.remove('is-entering'); void panneau.offsetWidth; panneau.classList.add('is-entering');
    etapes.forEach((li, i) => {
      li.classList.toggle('is-done', i < etat);
      li.classList.toggle('is-current', i === etat);
    });
    statut.textContent = messages[etat];
    recommencer.hidden = etat !== 3;
    if (focus) (panneau.querySelector('[data-clic]') || recommencer).focus({ preventScroll: true });
  };
  scene.addEventListener('click', (e) => {
    const cible = e.target.closest('[data-clic]');
    if (cible) montrer(Number(cible.dataset.clic), true);
  });
  recommencer.addEventListener('click', () => montrer(0, true));
  montrer(0, false);
})();

// Automatismes : chaque interrupteur ouvre la conséquence chiffrée de sa phrase.
(() => {
  document.querySelectorAll('.auto__band').forEach((bande) => {
    const inter = bande.querySelector('[role="switch"]');
    if (!inter) return;
    inter.addEventListener('click', () => {
      const actif = inter.getAttribute('aria-checked') !== 'true';
      inter.setAttribute('aria-checked', String(actif));
      bande.classList.toggle('is-on', actif);
    });
  });
})();

// Téléphone : les trois liens de navigation dans une feuille plein écran.
(() => {
  const bouton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  if (!bouton || !menu) return;
  const fermer = () => { bouton.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); bouton.textContent = 'Menu'; };
  bouton.addEventListener('click', () => {
    const ouvert = bouton.getAttribute('aria-expanded') !== 'true';
    bouton.setAttribute('aria-expanded', String(ouvert));
    menu.classList.toggle('is-open', ouvert);
    bouton.textContent = ouvert ? 'Fermer' : 'Menu';
  });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) fermer(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fermer(); });
})();
