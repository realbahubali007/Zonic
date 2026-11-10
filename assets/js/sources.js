/* ==========================================================
   ZONIC SOURCES: turns each network's data into one common
   game shape: {title, ns, cat, orient, desc, img, embed, source}
   To add a new network, add a converter here and a block in
   config.js, then call it from app.js.
   ========================================================== */
(function () {
  'use strict';
  var C = window.ZONIC_CONFIG, GP = C.gamepix, PG = C.playgama;

  function pretty(s) {
    s = String(s || '').replace(/-/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function gpEmbed(ns) {
    return GP.embedBase + encodeURIComponent(ns) + '/embed?sid=' + encodeURIComponent(GP.sid);
  }
  function pgEmbed(slug) {
    return PG.embedBase + encodeURIComponent(slug) + '?clid=' + encodeURIComponent(PG.clid);
  }
  function gpCover(ns) {
    return 'https://img.gamepix.com/games/' + ns + '/cover/' + ns + '.png?w=320';
  }

  /* GamePix: row from assets/data/gamepix-fallback.json */
  function fromGpRow(r) {
    return { title: r[0], ns: r[1], cat: r[2], orient: r[3], desc: '',
             img: gpCover(r[1]), embed: gpEmbed(r[1]), source: 'gamepix' };
  }
  /* GamePix: item from the live feed */
  function fromGpFeed(it) {
    return { title: it.title || pretty(it.namespace), ns: it.namespace,
             cat: it.category || 'games', orient: it.orientation || 'all',
             desc: it.description || '', img: it.banner_image || gpCover(it.namespace),
             embed: gpEmbed(it.namespace), source: 'gamepix' };
  }
  /* Playgama: row from assets/data/playgama.json */
  function fromPgRow(r) {
    return { title: r.t, ns: 'pg-' + r.s, cat: r.c, orient: r.o, desc: r.d || '',
             img: r.i, embed: pgEmbed(r.s), source: 'playgama' };
  }

  /* Only these hosts may be placed inside the game player */
  function allowedEmbed(u) {
    return typeof u === 'string' &&
      ((GP.enabled && u.indexOf(GP.embedBase) === 0) || (PG.enabled && u.indexOf(PG.embedBase) === 0));
  }

  window.ZonicSources = {
    pretty: pretty, gpEmbed: gpEmbed, fromGpRow: fromGpRow, fromGpFeed: fromGpFeed,
    fromPgRow: fromPgRow, allowedEmbed: allowedEmbed,
    gpFeedStart: function () {
      return GP.feedUrl + '?sid=' + encodeURIComponent(GP.sid) + '&order=quality&page=1&pagination=' + C.perPage;
    }
  };
})();
