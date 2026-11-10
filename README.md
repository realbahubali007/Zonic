# Zonic

A bright, modern browser games portal. Zonic shows free HTML5 games from the GamePix partner network on its own pages, with a clean player, fullscreen mode, and a "More to play" list.

**Live site:** `https://YOUR-USERNAME.github.io/zonic/`
(Replace `YOUR-USERNAME` with your GitHub username.)

---

## What it does

- Loads real partner games straight into the Zonic player.
- Shows the game title, tags, and a list of other games to play.
- Fullscreen button and a "Change game" box that accepts any GamePix embed link.
- Responsive layout for desktop and mobile.
- Smooth page-load animation, with reduced motion respected for people who turn it off.

## Project files

```
zonic/
├── index.html   The whole site: design, player and game list
└── README.md    This file
```

Zonic is a single static page, so there is nothing to install or build.

## Deploy on GitHub Pages (free)

1. Create a **public** repository named `zonic` on GitHub.
2. Upload `index.html` and `README.md` (**Add file → Upload files → Commit changes**).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Choose the **main** branch and the **/ (root)** folder, then click **Save**.
6. After a minute or two, your site is live at `https://YOUR-USERNAME.github.io/zonic/`.

To update the site later, upload the new `index.html` to the repository and commit. Pages redeploys automatically.

## How the games load

Each game opens in an iframe using the GamePix embed format:

```
https://play.gamepix.com/GAME-NAME/embed?sid=YOUR_SID
```

The game list on the page comes from the GamePix JSON feed:

```
https://feeds.gamepix.com/v2/json?sid=YOUR_SID&pagination=12&page=1
```

### Change your partner ID

Open `index.html`, find this line, and replace the value with your own `sid` from the GamePix dashboard:

```js
var SID='Z1887';
```

### Add or change games

In `index.html`, find the `GAMES` list. Each entry is `[title, game-name, category]`:

```js
['Bus Driver Simulator 3D','bus-driver-simulator-3d','Simulation']
```

The `game-name` part comes from the feed's `namespace` field.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Game area is blank | Confirm the embed link opens by itself in a new tab. Then check your GamePix property settings, in case your site address needs to be allowed. |
| Page shows a 404 | Pages can take a few minutes to publish. Confirm `index.html` is in the root of the `main` branch and Pages is enabled in Settings. |
| Changes don't appear | Wait a minute, then hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R). |
| Game list is out of date | The list in `index.html` is a snapshot. Update the `GAMES` list or wait for the live backend (see the roadmap). |

## Roadmap

- [ ] Home page with real cover images and categories
- [ ] Search
- [ ] A separate page for every game
- [ ] Backend that pulls the full game feed automatically (Cloudflare)
- [ ] Live features such as players-online counts and leaderboards
- [ ] Fluid scrolling and page transitions
- [ ] Privacy policy and cookie notice

## Notes

- The `sid` in the embed links is a public partner ID, not a password. Never commit passwords, API secrets, or private keys to this repository.
- Games, names, and artwork belong to their developers and GamePix. Zonic embeds them through the official embed links, so ads and revenue tracking stay intact.
- Check the GamePix publisher terms for rules on branding and allowed use of the feed.
- If your site shows ads or tracks visitors, add a privacy policy and cookie notice as required where your visitors live.

## Credits

Games provided by [GamePix](https://www.gamepix.com/).
