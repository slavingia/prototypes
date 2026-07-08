/* Shared feature flags for all prototypes.
   Include from <head>: <script src="../assets/flags.js"></script>
   Override per-visit via URL, e.g. ?govBanner=1 to show the banner. */
window.FLAGS = window.FLAGS || {};
if (!('showGovBanner' in window.FLAGS)) window.FLAGS.showGovBanner = false;

(function () {
  var qs = new URLSearchParams(location.search);
  if (qs.has('govBanner')) window.FLAGS.showGovBanner = qs.get('govBanner') !== '0';

  if (!window.FLAGS.showGovBanner) {
    var style = document.createElement('style');
    style.textContent = '.gov{display:none !important}';
    document.head.appendChild(style);
  }
})();
