/* ==========================================================
   ZONIC UI EFFECTS: scroll progress, sticky header, reveal on
   scroll, cookie notice, copyright year. Front-end only.
   ========================================================== */
(function () {
  'use strict';
  var S = window.ZONIC_SITE || {};
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  /* owner, year, email */
  all('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
  all('[data-owner]').forEach(function (n) { n.textContent = S.owner || ''; });
  all('[data-email]').forEach(function (n) { n.textContent = S.email || ''; });
  all('[data-mailto]').forEach(function (n) { n.href = 'mailto:' + (S.email || ''); });
  all('[data-updated]').forEach(function (n) { n.textContent = S.updated || ''; });
  all('[data-siteurl]').forEach(function (n) { n.textContent = S.url || ''; });

  /* scroll progress bar and sticky header shadow */
  var bar = document.getElementById('progress'), head = document.getElementById('siteHeader'), ticking = false;
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, h.scrollTop / max) : 0) + ')';
    if (head) head.classList.toggle('stuck', h.scrollTop > 8);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* reveal sections as they scroll into view */
  var items = all('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (n) { io.observe(n); });
  } else {
    items.forEach(function (n) { n.classList.add('in'); });
  }

  /* cookie notice (remembers the choice on this device) */
  var KEY = 'zonic-cookie-notice', seen = false;
  try { seen = localStorage.getItem(KEY) === '1'; } catch (e) {}
  if (!seen) {
    var box = document.createElement('div');
    box.className = 'cookie'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Cookie notice');
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('Games and ads from our partners may use cookies. Read our '));
    var a = document.createElement('a'); a.href = 'cookies.html'; a.textContent = 'Cookie Policy';
    p.appendChild(a); p.appendChild(document.createTextNode(' and '));
    var b2 = document.createElement('a'); b2.href = 'privacy.html'; b2.textContent = 'Privacy Policy'; p.appendChild(b2);
    p.appendChild(document.createTextNode('.'));
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn'; btn.textContent = 'Got it';
    btn.onclick = function () { try { localStorage.setItem(KEY, '1'); } catch (e) {} box.remove(); };
    box.appendChild(p); box.appendChild(btn); document.body.appendChild(box);
  }
})();
