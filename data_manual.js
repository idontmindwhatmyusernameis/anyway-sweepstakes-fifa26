// =============================================================================
// data_manual.js — YOUR file. Edit this. Never gets overwritten by update.py.
// =============================================================================
// Any value you set here wins over the API data.
// Leave a field as null or empty to let the API fill it in automatically.
// =============================================================================

const MANUAL_DATA = {

  // ---------------------------------------------------------------------------
  // SWEEPSTAKES CONFIG
  // Change teamsPerPerson before running the draw. Don't change after.
  // ---------------------------------------------------------------------------
  config: {
    sweepstakesName: "World Cup 2026 Sweepstakes",
    entryFee: 10,              // in dollars — change to your currency/amount
    teamsPerPerson: 2,         // 1, 2, or 3 — decide based on sign-up numbers
    currency: "$",
    timezone: "Australia/Sydney",  // for displaying match times
    drawDone: true,           // set to true after you run the draw
  },

  // ---------------------------------------------------------------------------
  // DRAWS
  // Add participants here before draw day.
  // entry: "paid" | "bragging" | "charity"
  // charity: name of charity (only used if entry is "charity")
  // teams: leave as [] before draw — filled in by the app when you run it
  // cpu: true means this is a placeholder slot (never wins prizes)
  // ---------------------------------------------------------------------------
  draws: [
    // Paste into data_manual.js → draws[0].participants, then set drawDone: true
  { id: 1, name: "Lochie", entry: "paid", charity: "", teams: ["Croatia","Qatar"] },
  { id: 2, name: "Kaye", entry: "paid", charity: "", teams: ["Switzerland","Algeria"] },
  { id: 3, name: "James", entry: "paid", charity: "", teams: ["Japan","Czechia"] },
  { id: 4, name: "Ham", entry: "paid", charity: "", teams: ["Senegal","New Zealand"] },
  { id: 5, name: "Tash", entry: "paid", charity: "", teams: ["France","Egypt"] },
  { id: 6, name: "Ari", entry: "paid", charity: "", teams: ["Brazil","Haiti"] },
  { id: 7, name: "Laura", entry: "paid", charity: "", teams: ["Netherlands","Curaçao"] },
  { id: 8, name: "Han C", entry: "paid", charity: "", teams: ["Mexico","Panama"] },
  { id: 9, name: "Joseph", entry: "paid", charity: "", teams: ["Germany","Ghana"] },
  { id: 10, name: "Brae", entry: "paid", charity: "", teams: ["Türkiye","Cabo Verde"] },
  { id: 11, name: "Mik", entry: "paid", charity: "", teams: ["Norway","Australia"] },
  { id: 12, name: "Emma C", entry: "paid", charity: "", teams: ["Uruguay","Iraq"] },
  { id: 13, name: "John", entry: "paid", charity: "", teams: ["United States","Paraguay"] },
  { id: 14, name: "Chai", entry: "paid", charity: "", teams: ["Ecuador","Jordan"] },
  { id: 15, name: "Mandy", entry: "paid", charity: "", teams: ["Austria","Scotland"] },
  { id: 16, name: "Nick C", entry: "paid", charity: "", teams: ["Sweden","Iran"] },
  { id: 17, name: "Sirish", entry: "paid", charity: "", teams: ["Portugal","Tunisia"] },
  { id: 18, name: "Kevin Mario", entry: "paid", charity: "", teams: ["Canada","Saudi Arabia"] },
  { id: 19, name: "Allana", entry: "paid", charity: "", teams: ["Morocco","Korea Republic"] },
  { id: 20, name: "Jordana", entry: "paid", charity: "", teams: ["Argentina","Ivory Coast"] },
  { id: 21, name: "Clauds", entry: "paid", charity: "", teams: ["Belgium","Uzbekistan"] },
  { id: 22, name: "Pirow", entry: "paid", charity: "", teams: ["England","Bosnia-Herzegovina"] },
  { id: 23, name: "Phoebe", entry: "paid", charity: "", teams: ["Spain","DR Congo"] },
  { id: 24, name: "Praz", entry: "paid", charity: "", teams: ["Colombia","South Africa"] },
    // If you get more than 48 paid entries, uncomment and fill Draw 2:
    // {
    //   id: 2,
    //   name: "Draw 2",
    //   participants: [
    //     // Real participants go first, CPU slots fill the gaps automatically
    //   ]
    // },
  ],

  // ---------------------------------------------------------------------------
  // TEAM TIERS FOR DRAW
  // Teams split into two halves by odds. The draw assigns each person one team
  // from tier1 (favourites) and one from tier2 (underdogs).
  // Order within each tier doesn't matter — they get shuffled at draw time.
  // Names must match exactly as they appear in ALL_TEAMS in index.html.
  // ---------------------------------------------------------------------------
  teamTiers: {
    tier1: [
      // Pool A
      "Spain", "France", "England", "Portugal",
      "Argentina", "Brazil", "Germany", "Netherlands",
      "Belgium", "Colombia", "Japan", "Norway",
      "Morocco", "United States", "Mexico", "Uruguay",
      "Switzerland", "Croatia", "Ecuador", "Austria",
      "Türkiye", "Senegal", "Sweden", "Canada",
    ],
    tier2: [
      // Pool B
      "Paraguay", "Scotland", "Ivory Coast", "Algeria",
      "Bosnia-Herzegovina", "Egypt", "Iran", "Tunisia",
      "Australia", "Cabo Verde", "Curaçao", "Czechia",
      "DR Congo", "Ghana", "Haiti", "Iraq",
      "Jordan", "New Zealand", "Panama", "Qatar",
      "Saudi Arabia", "South Africa", "Korea Republic", "Uzbekistan",
    ],
  },

  // ---------------------------------------------------------------------------
  // WOODEN SPOON
  // Auto-calculated from group stage standings — no manual entry needed.
  // Goes to whoever drew the team with the lowest points (then worst GD).
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // MATCH OVERRIDES
  // If the API gets a score wrong, or is delayed, override it here.
  // Use the match ID from football-data.org (visible in data.js after update).
  // ---------------------------------------------------------------------------
  matchOverrides: {
    // "12345": { homeScore: 2, awayScore: 1, status: "FINISHED" },
  },

  // ---------------------------------------------------------------------------
  // STANDINGS OVERRIDES
  // Override a team's group stage record if the API data is wrong.
  // ---------------------------------------------------------------------------
  standingsOverrides: {
    // "Brazil": { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2 },
  },

};
