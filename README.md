# Zonic

Free online browser games, playable instantly on desktop and mobile. Zonic is a bright, modern games portal built as a single static page (`index.html`) and hosted on GitHub Pages.

**Live site:** https://realbahubali007.github.io/Zonic/

---

## Features

- **Game portal home:** hero, category chips, search and a grid of games with cover images.
- **A page for every game:** each game opens in the Zonic player at its own link, for example `https://realbahubali007.github.io/Zonic/#/play/bus-driver-simulator-3d`.
- **Smart player:** widescreen games get a wide player, portrait games get a tall one. Fullscreen button included.
- **Categories and search:** categories are built from the games loaded, and search filters by title.
- **Load more:** pulls the next 24 games from the live GamePix feed.
- **Built-in fallback:** if the live feed can't be reached, 13 built-in games still show, so the site is never empty.
- **Smooth design:** page-load animation, hover effects and page transitions, with reduced-motion settings respected.
- **Fast:** one small file, no libraries, lazy-loaded covers.

## How it works

`index.html` is the whole website. It contains the design (CSS), the page layout (HTML) and the logic (JavaScript).

| Part | How it works |
| --- | --- |
| Game list | Fetched from the GamePix JSON feed: `https://feeds.gamepix.com/v2/json?sid=YOUR_SID&order=quality&page=1&pagination=24` |
| Playing a game | Opens `https://play.gamepix.com/GAME-NAME/embed?sid=YOUR_SID` in an iframe on the Zonic page |
| Game pages | Hash links like `#/play/GAME-NAME`, so the browser back button and sharing work |
| Fallback | A built-in list of 13 games is used when the feed isn't reachable |

## Project files

```
Zonic/
├── index.html   The complete website (must keep this exact name)
└── README.md    This file
```

> **Important:** `index.html` must be in the top level of the repository, spelled in lowercase. GitHub Pages shows `README.md` instead of the site if it can't find it.

## Deploy on GitHub Pages

1. Create a public repository named `Zonic`.
2. Upload `index.html` and `README.md` to the top level (**Add file → Upload files → Commit changes**).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Choose the **main** branch and the **/ (root)** folder, then click **Save**.
6. Wait one to two minutes. The site goes live at https://realbahubali007.github.io/Zonic/

To update the site, upload the new `index.html` with the same name and commit. Pages redeploys automatically (watch progress under the **Actions** tab).

## Settings you can change

Open `index.html` and look near the top of the script.

**Partner ID:**

```js
var SID='Z1887';
```

Replace the value with your own GamePix `sid`.

**Games per load:**

```js
var PER=24;
```

**Built-in fallback games:** edit the `SNAP` list. Each entry is `[title, game-name, category, orientation]`:

```js
['Bus Driver Simulator 3D','bus-driver-simulator-3d','simulation','all']
```

The `game-name` is the `namespace` value from the feed. Orientation is `all` or `portrait`.

## Troubleshooting

| Problem | What to do |
| --- | --- |
| The site shows this README instead of the games | `index.html` is missing, misnamed (for example `index (1).html`) or inside a subfolder. Rename it to exactly `index.html` and keep it in the top level. |
| Settings → Pages shows the wrong folder | Set the branch to `main` and the folder to `/ (root)`. |
| 404 page | Wait a few minutes, then confirm Pages is turned on in Settings. |
| Changes don't appear | Hard refresh with Ctrl+Shift+R (Cmd+Shift+R on Mac), or open the site in a private window. |
| A game area is blank | Open that game's embed link in a new tab. If it also fails, check your GamePix property settings for allowed site addresses. |
| Only 13 games and no "Load more" | The live feed couldn't be read by the browser, so the built-in games are shown. Games still play. A backend (see roadmap) fixes this. |
| Cover image missing | The card shows a colour gradient instead. The game still works. |

## Roadmap

- [ ] Backend that pulls the full game feed automatically (Cloudflare)
- [ ] Live features such as players-online counts and leaderboards
- [ ] Separate pages and sitemap for better search engine results
- [ ] Fluid scrolling
- [ ] Privacy policy and cookie notice

## Notes

- The `sid` is a public partner ID, not a password. Never commit passwords, API secrets or private keys to this repository.
- Games, names and artwork belong to their developers and GamePix. Zonic embeds them through the official embed links, so ads and revenue tracking stay intact.
- Check the GamePix publisher terms for rules on branding and allowed use of the feed.
- If your site shows ads or tracks visitors, add a privacy policy and cookie notice as required where your visitors live.
- https://realbahubali007.github.io/Zonic/ads.txt page dedicated to the file ads.txt for verifying ads.txt values from https://my.gamepix.com/properties

## Credits

Games provided by [GamePix](https://www.gamepix.com/).
