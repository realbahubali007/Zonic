/* ==========================================================
   ZONIC CONFIG: all connection settings live here.
   Change IDs, turn sources on/off, or change page size
   without touching index.html or app.js.
   ========================================================== */
window.ZONIC_CONFIG = {
  siteName: 'Zonic',
  perPage: 24,                       // games shown per "Load more" click

  gamepix: {
    enabled: true,                   // set false to hide GamePix games
    sid: 'Z1887',                    // your GamePix site ID
    feedUrl: 'https://feeds.gamepix.com/v2/json',
    embedBase: 'https://play.gamepix.com/',
    fallbackFile: 'assets/data/gamepix-fallback.json'
  },

  playgama: {
    enabled: true,                   // set false to hide Playgama games
    clid: 'p_f82be468-dd56-4e09-b7f2-0f702cc6c950', // your Playgama partner ID
    embedBase: 'https://playgama.com/export/game/',
    dataFile: 'assets/data/playgama.json'
  }
};
