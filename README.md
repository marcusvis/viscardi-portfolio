# Marcus Viscardi — portfolio site

A personal portfolio built with Vite + React, hosted on Firebase. The reaction
counters ("interesting" buttons) are stored in Firebase Firestore so the tally
is shared across everyone who visits.

- **Live site:** https://marcus-viscardi-profile.web.app
- **Firebase console:** https://console.firebase.google.com/project/marcus-viscardi-profile
- **Project folder:** the `viscardi-portfolio` folder on your computer

---

## The one thing to remember: the publish loop

Every time you change something and want it live, it's two commands. Open
PowerShell, go to the project folder, and run:

```
cd "path\to\viscardi-portfolio"   # wherever you keep the project folder
npm run build
firebase deploy --only hosting
```

`build` packages the site into the `dist` folder. `deploy` uploads it. When
it finishes it prints the live URL. Refresh the page and your change is there.

That's the whole thing. You do NOT need to keep any window open afterward — the
site stays online on its own.

---

## Previewing changes before you publish

To see edits instantly without publishing, run:

```
npm run dev
```

It prints a `http://localhost:5173` link. Open it; it auto-refreshes as you
save files. This preview only exists while that PowerShell window is open —
closing the window stops the preview but does NOT affect the live site. Press
`Ctrl + C` in the window to stop it.

---

## Where to edit things

Almost all text and content lives in one file, on purpose:

- **`src/data.js`** — projects, publications, talks, skills. Edit titles,
  descriptions, add a new publication, fix a talk topic, etc. This is where
  you'll spend 90% of your time.
- **`src/App.jsx`** — the page structure and the headline. Edit here to change
  the big hero headline, the "how I work" paragraphs, the footer, or to add a
  whole new section.
- **`src/index.css`** — all the styling (colors, spacing, fonts). The color
  theme is the `:root` block at the top.
- **`src/firebase.js`** — the Firebase connection and the reaction-counter
  logic. You shouldn't need to touch this.

After any edit, run the publish loop above to make it live.

### Example: adding a publication

Open `src/data.js`, find the `publications` list, copy an existing block,
paste it, and change the fields (`venue`, `title`, `authors`, `found`, `mine`,
`link`). In `authors`, mark your own name with `true` so it shows highlighted:
`['Marcus J. Viscardi', true]`. Save, then run the publish loop.

---

## The reaction counters

The "interesting" buttons read and write to Firestore (a small cloud database).

- Counts start at zero and go up as real visitors click. No fake numbers.
- The data lives in the `reactions` collection in the Firebase console, one row
  per project, each with a `count`.
- Security rules (in `firestore.rules`) allow the public to read the tallies
  and add a click, and block everything else. If you ever change that file,
  publish it with: `firebase deploy --only firestore:rules`
- If Firestore is ever unreachable, the site automatically falls back to
  storing counts in the visitor's browser, so it never breaks.

---

## One-time setup (already done — for reference)

You won't need these again on this computer, but if you ever set up on a new
machine:

1. Install **Node.js** (LTS) from nodejs.org. Check with `node --version`
   (needs v20 or higher).
2. Install the Firebase tool: `npm install -g firebase-tools`
3. Sign in: `firebase login`
4. Install the project's libraries (run once inside the project folder):
   `npm install`

---

## Troubleshooting

**"running scripts is disabled on this system"** — Windows blocks script
commands by default. Fix it once with:

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Type `Y` and Enter. After that, `npm` and `firebase` work normally. (Quick
alternative without changing settings: add `.cmd`, e.g. `npm.cmd run build`,
`firebase.cmd deploy --only hosting`.)

**"Directory 'dist' for Hosting does not exist"** — you ran `deploy` before
`build`. Run `npm run build` first, then deploy.

**Firebase CLI says it's incompatible with your Node version** — your Node is
too old. Install the current LTS from nodejs.org, then close and reopen
PowerShell.

**Changes aren't showing on the live site** — make sure you ran BOTH `npm run
build` and `firebase deploy --only hosting`, then hard-refresh the page
(`Ctrl + Shift + R`).
