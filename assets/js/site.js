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
  const mesurer = () => {
    section.classList.add('is-empile');
    const tient = assezLarge.matches && feuilles.slice(0, -1).every((f) =>
      parseFloat(getComputedStyle(f).top) + f.offsetHeight <= innerHeight);
    section.classList.toggle('is-empile', tient);
  };
  let attente = 0;
  const planifier = () => { cancelAnimationFrame(attente); attente = requestAnimationFrame(mesurer); };
  mesurer();
  addEventListener('resize', planifier);
  document.fonts?.ready.then(planifier);
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

// De la commande à la facture : le visiteur fait avancer la commande d’exemple en sept clics,
// dont les trois de l’étiquetage. Le fond de la section prend la couleur de l’étape.
// Sans script, la scène montre la commande et la liste des cinq étapes.
(() => {
  const section = document.querySelector('.cycle');
  const scene = section && section.querySelector('.cycle__stage');
  if (!scene) return;
  const etapes = [...section.querySelectorAll('.cycle__steps li')];
  const statut = section.querySelector('.cycle__status');
  const recommencer = section.querySelector('.cycle__reset');
  // pour chaque état (0 à 7) : l’étape de la liste, le fond, le message
  const etats = [
    [0, 'eau', 'Essayez sur l’exemple : la commande de la Poissonnerie de la Halle est saisie. Validez-la.'],
    [1, 'paon', 'Un clic : la commande est validée. Allotissez-la, chaque ligne reçoit son lot.'],
    [2, 'tilleul', 'Deux clics : chaque ligne a son lot. Ouvrez le BL-26-02217 pour en imprimer les étiquettes.'],
    [2, 'tilleul', 'Trois clics : le bon de livraison est ouvert. Imprimez ses étiquettes.'],
    [2, 'tilleul', 'Quatre clics : modèle et étiqueteuse sont déjà choisis par vos règles. Lancez l’impression.'],
    [3, 'ciel', 'Cinq clics, dont trois pour les étiquettes : 20 sont parties en même temps vers les étiqueteuses des quais 2 et 3. Reste l’étiquette de la palette.'],
    [4, 'noir', 'Six clics : la palette a son étiquette GS1 et son SSCC, le camion charge. Facturez le BL.'],
    [5, 'noir', 'Sept clics : la facture électronique est partie et l’écriture attend dans votre comptabilité. Rien n’a été ressaisi.'],
  ];
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
