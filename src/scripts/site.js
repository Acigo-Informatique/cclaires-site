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

// Métiers : les trois feuilles s’empilent au défilement, à condition que chacune tienne entière
// dans l’écran sous les bandes de titre des précédentes ; sinon le bas d’une feuille serait recouvert
// avant d’avoir été lu. Recalculé quand la fenêtre change de taille.
(() => {
  const section = document.querySelector('.metiers');
  const feuilles = section ? [...section.querySelectorAll('.sheet')] : [];
  if (feuilles.length < 2) return;
  const assezLarge = matchMedia('(min-width: 721px)');
  // toutes les lectures d’abord (la hauteur de chaque feuille, sa position d’arrêt --top), puis une seule écriture
  const enPixels = (valeur) => (valeur.endsWith('rem')
    ? parseFloat(valeur) * parseFloat(getComputedStyle(document.documentElement).fontSize)
    : parseFloat(valeur) || 0);
  const mesurer = () => {
    const tient = assezLarge.matches && feuilles.slice(0, -1).every((f) =>
      enPixels(getComputedStyle(f).getPropertyValue('--top').trim()) + f.offsetHeight <= innerHeight);
    section.classList.toggle('is-empile', tient);
  };
  let attente = 0;
  const planifier = () => { cancelAnimationFrame(attente); attente = requestAnimationFrame(mesurer); };
  mesurer();
  addEventListener('resize', planifier);
  document.fonts?.ready.then(planifier);
})();

// Documents : un onglet par document produit depuis la même commande. Le document choisi est inscrit
// dans l’adresse (#doc-cerfa…) : un lien peut ouvrir directement l’un d’eux.
(() => {
  const liste = document.querySelector('.docs__index[role="tablist"]');
  if (!liste) return;
  const onglets = [...liste.querySelectorAll('[role="tab"]')];
  const choisir = (onglet, focus, adresse = true) => {
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
    if (adresse) history.replaceState(null, '', '#' + onglet.getAttribute('aria-controls'));
  };
  // arrivée par un lien direct vers un document
  const depuisAdresse = () => {
    const o = onglets.find((x) => '#' + x.getAttribute('aria-controls') === location.hash);
    if (!o) return;
    choisir(o, false, false);
    liste.closest('section').scrollIntoView({ block: 'start' });
  };
  depuisAdresse();
  addEventListener('hashchange', depuisAdresse);
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

// De la commande à la facture : le visiteur fait avancer la commande d’exemple en sept clics,
// dont les trois de l’étiquetage. Le fond de la section prend la couleur de l’étape.
// Chaque panneau porte son étape, son fond et son message (data-etape, data-fond, data-message).
// Sans script, la scène montre la commande et la liste des cinq étapes.
(() => {
  const section = document.querySelector('.cycle');
  const scene = section && section.querySelector('.cycle__stage');
  if (!scene) return;
  const etapes = [...section.querySelectorAll('.cycle__steps li')];
  const statut = section.querySelector('.cycle__status');
  const recommencer = section.querySelector('.cycle__reset');
  const insecables = (t) => t.replace(/ ([:;?!])/g, ' $1');
  const etats = [...scene.querySelectorAll('[data-panneau]')]
    .sort((a, b) => a.dataset.panneau - b.dataset.panneau)
    .map((p) => [Number(p.dataset.etape), p.dataset.fond, insecables(p.dataset.message || '')]);
  const montrer = (etat, focus) => {
    const [etape, fond, message] = etats[etat];
    scene.dataset.etat = String(etat);
    section.dataset.fond = fond;
    const panneau = scene.querySelector(`[data-panneau="${etat}"]`);
    panneau.classList.remove('is-entering'); void panneau.offsetWidth; panneau.classList.add('is-entering');
    etapes.forEach((li, i) => {
      li.classList.toggle('is-done', i < etape);
      li.classList.toggle('is-current', i === etape);
    });
    statut.textContent = message;
    recommencer.hidden = etat !== etats.length - 1;
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

// Menus déroulants (Métiers, Fonctionnalités) : des <details>, qui s’ouvrent aussi sans script.
// Le script n’en laisse qu’un ouvert, les referme à Échap (le focus revient à leur titre) et au clic ailleurs.
(() => {
  const menus = [...document.querySelectorAll('.deroulant details')];
  if (!menus.length) return;
  const fermer = (sauf) => menus.forEach((d) => { if (d !== sauf) d.open = false; });
  menus.forEach((d) => d.addEventListener('toggle', () => { if (d.open) fermer(d); }));
  document.addEventListener('click', (e) => { if (!e.target.closest('.deroulant')) fermer(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const ouvert = menus.find((d) => d.open);
    if (ouvert) { e.preventDefault(); ouvert.open = false; ouvert.querySelector('summary').focus(); }
  });
})();

// Tablette et téléphone : les liens dans une feuille plein écran, ouverte par « Menu ».
(() => {
  const bouton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  if (!bouton || !menu) return;
  const basculer = (ouvert, rendreFocus) => {
    bouton.setAttribute('aria-expanded', String(ouvert));
    menu.classList.toggle('is-open', ouvert);
    document.documentElement.classList.toggle('menu-ouvert', ouvert);
    bouton.textContent = ouvert ? 'Fermer' : 'Menu';
    if (!ouvert && rendreFocus) bouton.focus();
  };
  bouton.addEventListener('click', () => basculer(bouton.getAttribute('aria-expanded') !== 'true', false));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) basculer(false, false); });
  document.addEventListener('keydown', (e) => {
    // Échap ferme d’abord un menu déroulant ouvert (défaut empêché ci-dessus), puis la feuille
    if (e.key === 'Escape' && !e.defaultPrevented && menu.classList.contains('is-open')) basculer(false, true);
  });
  // revenu à la largeur d’un bureau, la feuille n’a plus lieu d’être
  matchMedia('(min-width: 1181px)').addEventListener('change', (m) => { if (m.matches) basculer(false, false); });
})();
