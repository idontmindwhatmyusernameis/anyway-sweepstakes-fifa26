# World Cup Sweepstakes 2026 🏆

Your office World Cup sweepstakes dashboard. Live leaderboard, scratch card draw,
group standings, knockout bracket — all from a single folder of files.

---

## How it works (the short version)

- `data_manual.js` — **your file**. Add participants, set the entry fee, record special award winners. You edit this.
- `data.js` — **auto-generated**. The script fetches live match data and writes it here. Don't hand-edit it.
- `index.html` — the app. Everyone visits this. Nobody can edit anything through it.
- `update.py` — run this on your computer whenever you want to sync the latest results.

---

## One-time setup (do this once before draw day)

### Step 1 — Install Python
- **Mac**: Python is probably already installed. Open Terminal and type `python3 --version`. If you see a version number, you're good.
- **Windows**: Download from https://www.python.org/downloads/ — tick "Add Python to PATH" during install.

### Step 2 — Install the requests library
Open Terminal (Mac) or Command Prompt (Windows) and run:
```
pip install requests
```
(On Mac you may need `pip3 install requests`)

### Step 3 — Get a free API key
1. Go to https://www.football-data.org/client/register
2. Fill in your name and email — it's free, no credit card
3. Check your email for your API key (looks like: `abc123def456...`)
4. Open `update.py` in any text editor (TextEdit on Mac, Notepad on Windows)
5. Find the line that says `API_KEY = "YOUR_API_KEY_HERE"`
6. Replace `YOUR_API_KEY_HERE` with your key (keep the quote marks)
7. Save the file

### Step 4 — Set up Git and GitHub Pages (free hosting)
This is the bit that puts your site online. If you'd prefer Netlify, the process is similar.

1. Create a free account at https://github.com
2. Create a new repository — name it `world-cup-sweepstakes`, tick "Public"
3. Download and install Git from https://git-scm.com
4. Open Terminal/Command Prompt, navigate to your sweepstakes folder:
   ```
   cd path/to/sweepstakes
   ```
5. Run these commands once:
   ```
   git init
   git add .
   git commit -m "initial setup"
   git remote add origin https://github.com/YOUR-USERNAME/world-cup-sweepstakes.git
   git push -u origin main
   ```
6. On GitHub, go to your repository → Settings → Pages → Source: "Deploy from a branch" → Branch: main → Save
7. Your site will be live at `https://YOUR-USERNAME.github.io/world-cup-sweepstakes/` within a minute

---

## Before the draw — adding participants

Open `data_manual.js` in a text editor. Find the `participants` section and add everyone:

```js
participants: [
  { id: 1,  name: "Sarah Chen",    entry: "paid",     charity: "",          teams: [] },
  { id: 2,  name: "Tom Richards",  entry: "bragging", charity: "",          teams: [] },
  { id: 3,  name: "Priya Sharma",  entry: "charity",  charity: "Red Cross", teams: [] },
  { id: 4,  name: "James O'Brien", entry: "paid",     charity: "",          teams: [] },
]
```

Rules:
- `entry` must be exactly `"paid"`, `"bragging"`, or `"charity"`
- `charity` is optional — only fill it in if entry is `"charity"`
- `teams` stays as `[]` until you run the draw
- Each `id` must be a unique number

Also set:
- `entryFee` — how much each paid entry costs
- `teamsPerPerson` — 1, 2, or 3 (decide based on how many people sign up; 48 ÷ teams per person = max participants)

---

## Running the draw

The draw is randomised and happens in-app — go to the Draw tab on your live site.

But before you do:
1. Make sure all participants are in `data_manual.js`
2. Set `teamsPerPerson` to the right number
3. Run `update.py` so the app has fresh data

When you're ready:
1. Share your site link with all participants
2. At your agreed draw moment, tell everyone to open the site and go to the Draw tab
3. Each person clicks their card to reveal their team(s)

After the draw:
1. Take screenshots of the results — this is your tamper-proof record
2. Copy the team assignments into `data_manual.js` (fill in the `teams` arrays)
3. Set `drawDone: true` in the config
4. Push to GitHub: `git add . && git commit -m "draw results" && git push`

---

## On matchday — updating results

```
python update.py
```

That's it. The script fetches all results and writes `data.js`. Then:

```
python -m http.server 8000
```

Open http://localhost:8000 in your browser to preview. Happy? Push:

```
git add data.js
git commit -m "update results"
git push
```

The live site updates within about 30 seconds.

---

## Entering the knockout stage

Once the group stage ends and knockout matches begin, the app handles the transition automatically — no config changes needed.

**What changes on the site:**
- The header pill switches from **Group stage** to **Knockouts**
- The leaderboard switches from group points to knockout scoring (4 / 8 / 16 / 32 pts per round reached)
- Prize projections on the leaderboard only appear once knockouts start
- The Bracket tab fills in from API data as results come in

**What you need to do:**
1. Keep running `python update.py` after each round of matches (same as during the group stage)
2. Preview locally if you want: `python -m http.server 8000`
3. Push to GitHub: `git add data.js && git commit -m "update results" && git push`

The live site updates within about 30 seconds. Share `#bracket` links (e.g. `yoursite.com/#bracket`) so people can jump straight to the knockout view.

---

## If the API data is wrong

Use the override fields in `data_manual.js`:

```js
matchOverrides: {
  "12345": { homeScore: 2, awayScore: 1, status: "FINISHED" },
},
standingsOverrides: {
  "Brazil": { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2 },
},
```

The match ID appears in `data.js` after you run `update.py` — search for the match and look for the `"id"` field.

---

## If you get more than 48 participants

Uncomment the Draw 2 section in `data_manual.js` and add overflow participants there.
CPU placeholder slots fill any gaps — they appear on the bracket but never win prizes.

---

## Customising the look (for your designer)

Everything visual is in the `:root` block at the top of `index.html`:

```css
:root {
  --c-bg:           #f8f7f4;   /* page background */
  --c-surface:      #ffffff;   /* card background */
  --c-border:       #e8e5df;   /* card borders */
  --c-text:         #1a1917;   /* main text */
  --c-text-2:       #6b6760;   /* secondary text */
  --c-accent:       #1a6b47;   /* main green — used for buttons, highlights */
  --c-gold:         #b8860b;   /* 1st place gold */
  --font-body:      'DM Sans'; /* body font — swap to any Google Font */
}
```

Custom avatars: add a photo path to a participant in `data_manual.js`:
```js
{ id: 1, name: "Sarah Chen", entry: "paid", teams: [], avatar: "assets/avatars/sarah.jpg" }
```

---

## Cheat sheet — commands you'll use regularly

| What you want to do | Command |
|---|---|
| Fetch latest results | `python update.py` |
| Preview locally | `python -m http.server 8000` then open http://localhost:8000 |
| Push to live site | `git add data.js && git commit -m "update" && git push` |
| Push all changes | `git add . && git commit -m "update" && git push` |

---

## Folder structure

```
sweepstakes/
├── index.html          ← the app (don't edit unless changing the design)
├── data.js             ← auto-generated by update.py (don't hand-edit)
├── data_manual.js      ← YOUR file — participants, prizes, overrides
├── update.py           ← run this to sync results
├── README.md           ← this file
└── assets/
    ├── avatars/        ← put participant headshots here (optional)
    └── flags/          ← custom flag images (optional, app uses emoji by default)
```
