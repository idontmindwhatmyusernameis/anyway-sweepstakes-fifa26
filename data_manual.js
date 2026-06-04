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
    entryFee: 20,              // in dollars — change to your currency/amount
    teamsPerPerson: 2,         // 1, 2, or 3 — decide based on sign-up numbers
    currency: "$",
    timezone: "Australia/Sydney",  // for displaying match times
    drawDone: false,           // set to true after you run the draw
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
    {
      id: 1,
      name: "Draw 1",
      participants: [
        // { id: 1, name: "Sarah Chen",    entry: "paid",     charity: "",             teams: [] },
        // { id: 2, name: "Tom Richards",  entry: "bragging", charity: "",             teams: [] },
        // { id: 3, name: "Priya Sharma",  entry: "charity",  charity: "Red Cross",    teams: [] },
        // { id: 4, name: "James O'Brien", entry: "paid",     charity: "",             teams: [] },
        // Add more participants here, one line each
      ]
    },
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
  // SPECIAL AWARDS
  // Set these once a winner becomes clear during the tournament.
  // Use the exact team name as it appears in the standings.
  // ---------------------------------------------------------------------------
  goldenBoot: {
    team: null,           // e.g. "Brazil" — whose squad's player is top scorer
    playerName: null,     // e.g. "Vinícius Jr." — for display only
  },
  goldenGlove: {
    team: null,           // e.g. "France" — whose squad's GK won it
    playerName: null,     // e.g. "Mike Maignan" — for display only
  },

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
