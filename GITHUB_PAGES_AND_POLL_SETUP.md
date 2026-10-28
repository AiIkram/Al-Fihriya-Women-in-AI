# GitHub Pages + shared community poll (no database)

## How the poll works
- Everyone who clicks an option increments a **shared counter** (free Abacus counting API, no account/key).
  Every visitor sees the same totals, refreshed every ~15 seconds.
- `public/votes.csv` holds **starting numbers** (role,count). Live votes are added on top of it.
  Edit it and push to seed or correct the baseline (e.g. add votes you collected elsewhere).
- Visitors can click **Download results (CSV)** to export the current totals.
- One vote per browser (localStorage). Not tamper-proof — fine for a community pulse, not for an official count.

## Why not write the CSV directly?
GitHub Pages is static hosting: visitors' browsers cannot modify files in your repo, so the CSV can only be *read*.
The counter service is what stores new votes.

## Setup
1. In `src/site/CommunityPoll.tsx`, change `NAMESPACE` to something unique (3–64 chars).
2. Push to `main`; the existing GitHub Action builds and deploys.
3. Test from two browsers/devices — both should show the same totals.
