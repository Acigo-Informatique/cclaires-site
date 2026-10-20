// Mesure d’audience Matomo sans cookie. Chargée par Base.astro seulement si site.config.mjs déclare
// audience: { fournisseur: 'matomo', url, site } ; l’adresse et le numéro de site arrivent par data-*.
// Penser à ajouter l’adresse Matomo à la CSP de vercel.json (script-src et connect-src).
(function () {
  var moi = document.currentScript;
  if (!moi) return;
  var url = moi.dataset.url.replace(/\/?$/, '/');
  var _paq = (window._paq = window._paq || []);
  _paq.push(['disableCookies']);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', url + 'matomo.php']);
  _paq.push(['setSiteId', moi.dataset.site]);
  var s = document.createElement('script');
  s.async = true;
  s.src = url + 'matomo.js';
  document.head.appendChild(s);
})();
