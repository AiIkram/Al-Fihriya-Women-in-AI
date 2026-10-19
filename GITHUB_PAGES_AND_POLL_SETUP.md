# GitHub Pages deployment and community voting

## Portrait fix
The supplied portrait is imported from `src/assets/fatima-al-fihriya.png`. Vite will bundle it as an asset, so the image does not rely on a root-relative `/images/...` URL that can break on project GitHub Pages sites.

## Voting without a backend
The poll can save and increment counts in this browser using localStorage, so they persist across refreshes and later visits on the same browser. GitHub Pages is static hosting: without a shared backend or external service, it cannot combine votes from different visitors/devices. To collect community-wide votes, configure the optional Supabase database below. Without Supabase credentials, the poll is browser-local preview mode and visitors will not share totals.

1. Create a Supabase project at https://supabase.com/.
2. Open the Supabase SQL Editor and run `supabase/community_votes.sql`.
3. Set these variables **at build time** before running `npm run build`:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase publishable/anon key
4. Build and deploy the generated `dist/` folder to GitHub Pages. If using GitHub Actions, add the values as repository Actions variables/secrets and map them to environment variables in the build step. Vite embeds `VITE_` values in the public frontend, so only use the Supabase anon/publishable key, never a service-role key.
5. After deployment, cast a test vote from two separate browsers/devices. Both should see the same total; refresh later to verify votes persist.

The supplied SQL permits anonymous read/insert of role-only poll rows. It does not restrict repeat votes across different browsers/devices; browser local storage only prevents a second vote on the same browser. For a stronger one-vote-per-person policy, add authentication or a server-side rate-limiting/verification mechanism.
