#!/usr/bin/env python3
"""
update.py — Fetch World Cup data from football-data.org and write to data.js

Usage:
    python update.py

Requirements:
    pip install requests

Get a free API key at: https://www.football-data.org/client/register
Then paste it below where it says YOUR_API_KEY_HERE
"""

import requests
import json
import os
import sys
from datetime import datetime, timezone

# =============================================================================
# CONFIGURATION — edit this section
# =============================================================================

API_KEY = "2e8ba5435dcf412e8610c6e6a7ab7084"   # paste your football-data.org key here
COMPETITION_CODE = "WC"         # World Cup code — don't change this
OUTPUT_FILE = "data.js"         # where to write the data — don't change this

# =============================================================================
# DO NOT EDIT BELOW THIS LINE
# =============================================================================

BASE_URL = "https://api.football-data.org/v4"
HEADERS = {
    "X-Auth-Token": API_KEY,
    "Accept": "application/json",
}


def fetch(endpoint, params=None):
    """Fetch data from the API with helpful error messages."""
    url = f"{BASE_URL}{endpoint}"
    try:
        response = requests.get(url, headers=HEADERS, params=params, timeout=15)
    except requests.exceptions.ConnectionError:
        print(f"  ✗ Could not connect to {url}")
        print("    Check your internet connection and try again.")
        sys.exit(1)
    except requests.exceptions.Timeout:
        print(f"  ✗ Request timed out for {url}")
        print("    The API may be slow — try again in a moment.")
        sys.exit(1)

    if response.status_code == 200:
        return response.json()
    elif response.status_code == 400:
        print(f"  ✗ Bad request ({response.status_code}): {response.text}")
        sys.exit(1)
    elif response.status_code == 401:
        print("  ✗ Invalid API key (401 Unauthorized)")
        print("    Double-check your API_KEY in update.py")
        print("    Get a free key at: https://www.football-data.org/client/register")
        sys.exit(1)
    elif response.status_code == 403:
        print("  ✗ Access forbidden (403)")
        print("    Your free tier may not cover this endpoint.")
        print("    The World Cup (WC) should be available on the free tier.")
        sys.exit(1)
    elif response.status_code == 429:
        print("  ✗ Rate limited (429) — too many requests")
        print("    Wait a minute and try again.")
        sys.exit(1)
    else:
        print(f"  ✗ Unexpected error ({response.status_code}): {response.text}")
        sys.exit(1)


def main():
    if API_KEY == "YOUR_API_KEY_HERE":
        print("=" * 60)
        print("  No API key set!")
        print("  1. Go to https://www.football-data.org/client/register")
        print("  2. Register for a free account")
        print("  3. Copy your API key")
        print("  4. Open update.py and paste it where it says YOUR_API_KEY_HERE")
        print("=" * 60)
        sys.exit(1)

    print("=" * 60)
    print("  World Cup Sweepstakes — Data Updater")
    print("=" * 60)

    # Fetch competition info
    print("\n  Fetching competition info...")
    competition = fetch(f"/competitions/{COMPETITION_CODE}")
    print(f"  ✓ Competition: {competition.get('name', 'Unknown')}")

    # Fetch all matches
    print("\n  Fetching all matches...")
    matches_data = fetch(f"/competitions/{COMPETITION_CODE}/matches")
    matches = matches_data.get("matches", [])
    print(f"  ✓ Matches: {len(matches)} found")

    # Summarise match statuses
    statuses = {}
    for m in matches:
        s = m.get("status", "UNKNOWN")
        statuses[s] = statuses.get(s, 0) + 1
    for status, count in sorted(statuses.items()):
        print(f"    — {status}: {count}")

    # Fetch standings
    print("\n  Fetching standings...")
    standings_data = fetch(f"/competitions/{COMPETITION_CODE}/standings")
    standings = standings_data.get("standings", [])
    print(f"  ✓ Standings: {len(standings)} groups found")

    # Fetch top scorers
    print("\n  Fetching top scorers...")
    scorers_data = fetch(f"/competitions/{COMPETITION_CODE}/scorers", params={"limit": 20})
    scorers = scorers_data.get("scorers", [])
    print(f"  ✓ Scorers: {len(scorers)} found")

    # Build output
    now = datetime.now(timezone.utc).isoformat()
    output = {
        "lastUpdated": now,
        "competition": {
            "id": competition.get("id"),
            "name": competition.get("name"),
            "season": competition.get("currentSeason", {}),
        },
        "matches": matches,
        "standings": standings,
        "scorers": scorers,
        "drawResults": None,  # populated by the app when draw is run
    }

    # Write to data.js
    print(f"\n  Writing to {OUTPUT_FILE}...")
    js_content = f"""// =============================================================================
// data.js — AUTO-GENERATED by update.py. Do not hand-edit this file.
// Run: python update.py
// Last updated: {now}
// =============================================================================

const API_DATA = {json.dumps(output, indent=2, ensure_ascii=False)};
"""

    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, OUTPUT_FILE)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"  ✓ Written to {output_path}")
    print(f"\n  Done! Last updated: {now}")
    print("\n  Next steps:")
    print("  1. Run: python -m http.server 8000")
    print("  2. Open: http://localhost:8000")
    print("  3. Check everything looks right")
    print("  4. Run: git add data.js && git commit -m 'update results' && git push")
    print("=" * 60)


if __name__ == "__main__":
    main()
