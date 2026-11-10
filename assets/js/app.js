/* ==========================================================
   ZONIC APP: page logic (loading, search, categories, player).
   Settings are in config.js, converters are in sources.js.
   ========================================================== */
(function () {
  'use strict';
  var C = window.ZONIC_CONFIG, S = window.ZonicSources;
  var GP = C.gamepix, PG = C.playgama, PER = C.perPage;

  var $ = function (id) { return document.getElementById(id); };
  var games = [], gp = [], pg = [], byNs = {};
  var nextUrl = null, cat = 'all', query = '', shown = PER;
  var pgDone = !PG.enabled, current = null;

  function hashIdx(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h % 5; }

  function add(g, list) {
    if (!g.ns || byNs[g.ns]) return;
    byNs[g.ns] = g; list.push(g);
  }
  /* Mix the two networks so the home page shows both */
  function rebuild() {
    games = [];
    var n = Math.max(gp.length, pg.length);
    for (var i = 0; i < n; i++) { if (gp[i]) games.push(gp[i]); if (pg[i]) games.push(pg[i]); }
  }

  function transition(fn) {
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion:reduce)').matches) document.startViewTransition(fn);
    else fn();
  }

  function card(g) {
    var a = document.createElement('a'); a.className = 'card'; a.href = '#/play/' + g.ns;
    var c = document.createElement('div'); c.className = 'cover g' + hashIdx(g.ns);
    var im = document.createElement('img'); im.loading = 'lazy'; im.decoding = 'async'; im.alt = g.title; im.src = g.img;
    im.onerror = function () { im.remove(); };
    c.appendChild(im);
    var h = document.createElement('h3'); h.textContent = g.title;
    var s = document.createElement('small'); s.textContent = S.pretty(g.cat);
    a.appendChild(c); a.appendChild(h); a.appendChild(s);
    return a;
  }

  function filtered() {
    var q = query.trim().toLowerCase();
    return games.filter(function (g) {
      return (cat === 'all' || g.cat === cat) && (!q || g.title.toLowerCase().indexOf(q) > -1);
    });
  }

  function renderChips() {
    var counts = {}; games.forEach(function (g) { counts[g.cat] = (counts[g.cat] || 0) + 1; });
    var list = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).slice(0, 14);
    var box = $('chips'); box.innerHTML = '';
    ['all'].concat(list).forEach(function (k) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip';
      b.textContent = k === 'all' ? 'All games' : S.pretty(k);
      b.setAttribute('aria-pressed', String(k === cat));
      b.onclick = function () { cat = k; shown = PER; renderChips(); renderGrid(); };
      box.appendChild(b);
    });
  }

  function renderGrid() {
    var grid = $('grid'), list = filtered();
    grid.innerHTML = '';
    var frag = document.createDocumentFragment();
    list.slice(0, shown).forEach(function (g) { frag.appendChild(card(g)); });
    grid.appendChild(frag);
    $('status').textContent = list.length ? '' : (games.length ? 'No games found. Try another search or category.' : 'Loading games…');
    $('more').hidden = !(list.length > shown || (nextUrl && cat === 'all' && !query.trim()));
  }

  function refresh() { rebuild(); renderChips(); renderGrid(); }

  function getJson(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error(url + ' ' + r.status); return r.json(); });
  }

  /* ---- GamePix: built-in list first, then the live feed ---- */
  function loadGamepixFeed(url) {
    var btn = $('more'); btn.disabled = true;
    return getJson(url).then(function (j) {
      (j.items || []).forEach(function (it) { add(S.fromGpFeed(it), gp); });
      nextUrl = j.next_url || null;
    }).catch(function () { /* feed blocked or offline: built-in list stays */ })
      .then(function () { btn.disabled = false; refresh(); route(); });
  }
  function loadGamepix() {
    return getJson(GP.fallbackFile).then(function (rows) {
      rows.forEach(function (r) { add(S.fromGpRow(r), gp); });
    }).catch(function () {}).then(function () { refresh(); return loadGamepixFeed(S.gpFeedStart()); });
  }

  /* ---- Playgama: local data file ---- */
  function loadPlaygama() {
    return getJson(PG.dataFile).then(function (rows) {
      rows.forEach(function (r) { add(S.fromPgRow(r), pg); });
    }).catch(function () {}).then(function () { pgDone = true; refresh(); route(); });
  }

  /* ---- Pages ---- */
  function showPlay(ns) {
    var g = byNs[ns];
    var embed = g ? g.embed : (/^pg-/.test(ns) ? '' : (GP.enabled ? S.gpEmbed(ns) : ''));
    g = g || { title: S.pretty(ns.replace(/^pg-/, '')), ns: ns, cat: 'games', orient: 'all', desc: '' };
    $('homeView').hidden = true; $('playView').hidden = false;
    current = ns;
    document.title = g.title + ' | ' + C.siteName;
    $('pTitle').textContent = g.title;
    $('pCat').textContent = S.pretty(g.cat);
    $('pDesc').textContent = g.desc || '';
    var st = $('stage'); st.innerHTML = '';
    st.className = 'stage' + (g.orient === 'portrait' ? ' portrait' : '');
    if (S.allowedEmbed(embed)) {
      var f = document.createElement('iframe');
      f.title = g.title;
      f.allow = 'fullscreen; autoplay; gamepad; accelerometer; gyroscope';
      f.setAttribute('allowfullscreen', '');
      f.src = embed;
      st.appendChild(f);
    } else {
      var p = document.createElement('p'); p.className = 'status'; p.textContent = 'This game is not available.'; st.appendChild(p);
    }
    var rel = games.filter(function (x) { return x.ns !== ns && x.cat === g.cat; });
    if (rel.length < 8) rel = rel.concat(games.filter(function (x) { return x.ns !== ns && x.cat !== g.cat; }));
    var box = $('related'); box.innerHTML = '';
    rel.slice(0, 8).forEach(function (x) { box.appendChild(card(x)); });
    window.scrollTo(0, 0);
  }

  function showHome() {
    $('playView').hidden = true; $('homeView').hidden = false;
    $('stage').innerHTML = ''; current = null;
    document.title = C.siteName + ': Free Online Games';
  }

  function route() {
    var m = /^#\/play\/([a-z0-9._-]+)$/i.exec(location.hash);
    if (m && /^pg-/.test(m[1]) && !pgDone) return;              /* wait for Playgama data */
    if (m && current === m[1] && !$('playView').hidden) return; /* already playing: don't restart */
    transition(function () { m ? showPlay(m[1]) : showHome(); });
  }

  function goHome() {
    query = ''; $('q').value = ''; cat = 'all'; shown = PER;
    history.pushState(null, '', location.pathname + location.search);
    route(); renderChips(); renderGrid();
  }

  $('home').addEventListener('click', function (e) { e.preventDefault(); goHome(); });
  $('back').addEventListener('click', function (e) {
    e.preventDefault(); history.pushState(null, '', location.pathname + location.search); route();
  });
  $('q').addEventListener('input', function () {
    query = this.value; shown = PER;
    if (!$('playView').hidden) { history.pushState(null, '', location.pathname + location.search); route(); }
    renderGrid();
  });
  $('more').addEventListener('click', function () {
    shown += PER;
    if (nextUrl && cat === 'all' && !query.trim()) loadGamepixFeed(nextUrl); else renderGrid();
  });
  $('fs').addEventListener('click', function () {
    var s = $('stage');
    try { (s.requestFullscreen || s.webkitRequestFullscreen).call(s); } catch (e) {}
  });
  window.addEventListener('hashchange', route);

  route();
  if (GP.enabled) loadGamepix();
  if (PG.enabled) loadPlaygama();
  if (!GP.enabled && !PG.enabled) $('status').textContent = 'No game sources are turned on. Open assets/js/config.js.';
})();
