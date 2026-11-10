# Zonic

Free online browser games, playable instantly on desktop and mobile. Zonic is a static website (no build step) that mixes games from **GamePix** and **Playgama** into one portal.

**Live site:** https://realbahubali007.github.io/Zonic/

---

## Folder structure

```
Zonic/
├── index.html                      Home page (hero, featured, library, footer)
├── about.html  contact.html        Info pages
├── privacy.html  terms.html        Legal pages
├── cookies.html  dmca.html
├── ads.txt                         Ad partner lines (must stay at the top level)
├── README.md                       This guide
├── .nojekyll                       Tells GitHub Pages to publish files as they are
└── assets/
    ├── css/
    │   ├── style.css               Layout, colours, fonts
    │   └── animations.css          All motion and hover effects
    ├── js/
    │   ├── site.js                 Owner name, contact email, site address
    │   ├── config.js               Game IDs, on/off switches, page size
    │   ├── sources.js              Converts each network's data into one game format
    │   ├── app.js                  Page logic: search, filters, player, loading
    │   └── ui.js                   Scroll effects, cookie notice, copyright year
    └── data/
        ├── gamepix-fallback.json   Built-in GamePix games
        └── playgama.json           Playgama game library (2,836 games)
```

## What to edit for each job

| I want to... | Edit this file |
| --- | --- |
| Change home page text, sections or footer links | `index.html` |
| Change colours, spacing, fonts, layout | `assets/css/style.css` |
| Change animations or hover effects | `assets/css/animations.css` |
| Change my name, contact email or site address | `assets/js/site.js` |
| Change the GamePix or Playgama ID, or turn a source on or off | `assets/js/config.js` |
| Add games by hand | `assets/data/gamepix-fallback.json` |
| Update the Playgama library | `assets/data/playgama.json` |
| Edit privacy, terms, cookies, DMCA, about or contact text | the matching `.html` page |
| Add ad partner lines | `ads.txt` |

**Before launch:** open `assets/js/site.js` and replace `your-email@example.com` with your real contact email. The legal pages and the contact page read it from there.

## Deploy on GitHub Pages (free)

1. Unzip the project. Open the `Zonic` folder so you can see `index.html` inside it.
2. In your GitHub repository, choose **Add file → Upload files**.
3. Drag in **everything inside the folder** (all `.html` pages, `ads.txt`, `README.md`, `.nojekyll` and the whole `assets` folder). Do not upload the outer `Zonic` folder itself.
4. Click **Commit changes**.
5. Open **Settings → Pages**. Set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.
6. Wait one to two minutes, then open your site. Hard refresh with Ctrl+Shift+R if you see an old version.

`index.html` must be at the top level of the repository, spelled in lowercase, or GitHub shows this README instead of the site.

> **Hidden file:** `.nojekyll` starts with a dot, so your computer may hide it. The site works without it, but include it if you can see it.

## Run on your own computer

Opening `index.html` by double-click will not load the game lists, because browsers block local file requests. Use a small local server instead:

```
cd Zonic
python3 -m http.server 8000
```

Then open http://localhost:8000

## ads.txt

- `ads.txt` must be at the **root** of your website address, for example `https://yourdomain/ads.txt`. That is why it sits at the top level and not inside `assets`.
- On a GitHub project address like `realbahubali007.github.io/Zonic/`, the file ends up at `.../Zonic/ads.txt`, which ad systems usually don't check. For it to count, the site needs its own domain, or a repository named `YOURUSERNAME.github.io`.
- Paste the exact lines from your GamePix and Playgama dashboards under the comments. Do not invent lines. Lines starting with `#` are ignored.

## How games load

- **GamePix:** the built-in list shows first, then the live feed adds more. Each game opens with `https://play.gamepix.com/GAME-NAME/embed?sid=YOUR_SID`.
- **Playgama:** games come from `assets/data/playgama.json` and open with `https://playgama.com/export/game/GAME-NAME?clid=YOUR_ID`.
- Both are mixed in one grid. Every game has its own link, for example `#/play/bus-driver-simulator-3d` or `#/play/pg-game-name`.
- To refresh Playgama games, download a new export from your Playgama Partners dashboard and convert it into `playgama.json`.

## Troubleshooting

| Problem | What to do |
| --- | --- |
| Site shows this README | `index.html` is missing, misnamed or in a subfolder. Keep it at the top level. |
| Page loads but no games and no styles | The `assets` folder was not uploaded. Upload the whole folder with its subfolders. |
| Only 13 GamePix games, no Playgama | Check that `assets/data/playgama.json` exists with that exact lowercase name. |
| A game area is blank | Open the game's embed link in a new tab. If it also fails, check the allowed site address in that network's dashboard. |
| Changes not showing | Wait a minute, then hard refresh (Ctrl+Shift+R or Cmd+Shift+R). |
| Everything is empty | Check the browser console (F12). A wrong path or an edit mistake in `config.js` is the usual cause. |

## Notes

- `sid` and `clid` are public partner IDs, not passwords. Never put passwords, API secrets or private keys in this repository.
- Games, names and artwork belong to their developers and the networks. Zonic embeds them through official embed links, so ads and revenue tracking stay intact.
- Read each network's publisher terms about branding, allowed site addresses and combining networks.
- The legal pages are general templates, not legal advice. Have them reviewed for the places where your visitors live.
- The cookie notice only records that a visitor has seen it. Consent choices for ads are handled by the game and ad partners.

## Roadmap

- [ ] Cloudflare backend that pulls full game feeds automatically
- [ ] Live features such as players-online counts and leaderboards
- [ ] GameDistribution or other networks as extra sources
- [ ] Sitemap and search engine tags
