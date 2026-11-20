# Telkom Digital — Logo Voting

Responsive voting website, based on the 6 original logo images and all 6 motion videos in the supplied presentation ZIP.

## Upload to GitHub Pages
1. Upload **the contents** of this ZIP (not the ZIP itself) into the root of a GitHub repository: `index.html`, `video/`, and optional `README.md`.
2. In repository **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)` and save.
3. Open the GitHub Pages URL. The website works as a preview without any account. **Votes in preview are local to each visitor's browser and NOT combined.**

## Activate shared/public voting (Supabase)
1. Create a new Supabase project. Open SQL Editor and run `supabase-setup.sql`.
2. Go to **Project Settings → API** (or API Keys) to obtain the Project URL and public/publishable (anon) key. Never use `service_role` or a secret key in frontend HTML.
3. Edit the top of the `index.html` script:

   `const CONFIG={supabaseUrl:'https://YOUR-PROJECT.supabase.co',supabaseAnonKey:'YOUR_PUBLIC_ANON_KEY'};`

4. Commit and push the update to GitHub Pages.
5. Votes save to `public.logo_votes` in Supabase. Run `SELECT option_id, COUNT(*) FROM public.logo_votes GROUP BY option_id ORDER BY option_id;` to see totals.

**Limit:** Votes are limited to one per browser-token, **not one per person**. A visitor can reset storage/change browser, so do not use this for high-assurance voting. For one verified vote per employee, add organizational SSO + a backend verified identity and database uniqueness based on that identity. Do not put any privileged key into GitHub Pages.

## Video semiotic dan single-file
- Each candidate has a **Watch concept film** button, linking the original MP4 animation to visual form, brand meaning and motion story.
- The regular `index.html` loads the six MP4 files from `video/`; keep that folder when deploying.
- **One-file alternative:** `Telkom-Digital-Voting-Dengan-Video.html` embeds all six MP4 files as data and can be renamed `index.html` for GitHub Pages. It is larger and slower to load than the ZIP website version.
- Voting is still browser-only until Supabase is configured; motion is not evidence that any workflow stage is completed.


## Homepage mascot background video
The landing-page hero includes `video/telkom-digital-mascot.mp4` (the supplied ~10-second video) and a still poster image. It automatically plays muted, loops, and works inline on phones. Browsers may limit autoplay, in which case the poster serves as a fallback. For visitors who enable reduced motion, the poster is shown instead of autoplay. Upload the entire folder, not `index.html` alone.
