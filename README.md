# ECLIPSE 7.0 — The Observatory

Original React 19 / Vite 7 / TypeScript frontend for ACM Thapar’s flagship hackathon. Frontend only; no database, authentication, analytics, API keys or environment variables.

- Live: https://talwarmohnish.github.io/Eclipse7.0/
- Repository: https://github.com/talwarmohnish/Eclipse7.0

## Local setup

Use Node.js 24 LTS and npm. From this directory:

```sh
npm ci
npm run dev
```

Open the Local URL Vite prints, normally http://127.0.0.1:5173/.

## Build and preview

```sh
npm run build
npm run check:assets
npm run preview -- --port 4173
```

The build checks TypeScript and writes static files to `dist/`. Open http://127.0.0.1:4173/ for the production preview. The asset check serves and requests the production page and seven local assets under both `/` and `/Eclipse7.0/`.

For a server-free local preview, run `npm run preview:standalone` after building and open `outputs/ECLIPSE-preview.html`. It embeds the production JavaScript, stylesheet, images, favicon and font. External event/contact links still require their destinations. Deploy `dist/`, rather than this generated preview.

## Editing

- `src/content.ts`: verified event facts, dates, links, FAQs and unresolved content. Internal editing notes stay here, never in visitor-facing copy.
- `src/main.tsx`: section layout, navigation, themes, hash alignment and interactions.
- `src/Observatory.tsx`: original SVG lettering, deterministic full-page star field and pyramid roadmap.
- `src/styles.css`: semantic colour tokens, typography, responsive rules and motion. Dark and light palettes are editable at the top and in theme overrides.
- `public/assets/`: unchanged official ACM/Devfolio logos and original procedural SVG moon.
- `index.html`: metadata and synchronous theme bootstrap.

Manrope variable 400–700 is bundled locally, with its SIL Open Font License in `src/assets/fonts/`. Original SVG paths form the ECLIPSE lettering; no official wordmark paths or font outlines were copied. The earlier Barlow font source is retained but is not bundled. Visitors make no third-party font requests.

The layered moon uses intermediate surface brightness, deep shadows and a restrained copper rim. Mobile has a separate overlapping composition. Static irregular stars span the entire document and cannot intercept clicks. Desktop roadmap badges coincide with SVG vertices; mobile uses compact pyramid geometry followed by a readable ordered list. Its once-only entrance animation does not represent event completion. Fine-pointer devices get up to 4 degrees of illustration-only tilt and proximity highlights. Number controls and the pre-registration link provide keyboard highlighting; text and buttons remain stationary. About nodes only highlight their existing connections without moving or adding controls.

## Interactions and accessibility

- Dark is the first-visit default. The desktop/mobile header toggle remembers explicit choice under `eclipse-theme`. A head script applies it before CSS; unavailable storage does not prevent switching.
- Native section anchors work on direct navigation and refresh. Initial explicit fragments align after rendering and font loading. A measured scroll-padding offset clears the sticky header. Fresh plain URLs start at the hero; Back/Forward and reload restoration remain browser-managed.
- Mobile navigation has `aria-expanded`, hidden inactive links and Escape-to-close with focus restoration.
- FAQs use native `details` / `summary` keyboard interactions. Semantic headings, skip link, image alternatives and visible focus styles are included.
- The radar loops while intersecting the viewport and the document is visible; CSS play-state pauses/resumes the same animation. Reduced-motion CSS disables reveals, diagram draws, radar sweeps, transitions, pyramid tilt and smooth scrolling. Essential text and the full roadmap remain visible when animations or IntersectionObserver are unavailable.
- All pre-registration buttons use the verified official interest form. Full team registration remains unconfirmed.

## GitHub Pages deployment

Pages is configured for GitHub Actions. Push source changes to `main`; `.github/workflows/deploy.yml` installs locked dependencies, builds, checks production asset paths and deploys `dist/` automatically. You can also run **Actions → Deploy ECLIPSE to GitHub Pages → Run workflow**.

For a new repository, enable **Settings → Pages → Build and deployment → Source → GitHub Actions**. The workflow uses GitHub’s automatic token; no personal token or repository secret is required. Use your ordinary authenticated Git tools to push changes. Never embed credentials in source or remote URLs.

Vite uses a relative base, so images, favicon, styles and fonts work under the repository path or at a domain root. Native fragment navigation needs no SPA rewrite rule. Keep the `assets/` directory beside production `index.html`.

`.gitignore` excludes `node_modules`, `dist`, scratch files, build caches, logs, credentials, `.env` files, local host metadata and generated preview archives/screenshots. Commit source, the lockfile, public assets, scripts, documentation and workflow.

For other hosts, Vercel and Netlify configuration files are included. Use `npm run build` and publish `dist/`; no backend services are needed.

## Content provenance and remaining updates

Event facts and official assets come only from https://eclipse.acmthapar.in/. See `outputs/CONTENT-SOURCES.md` for provenance.

Verified: 3–4 April 2027; TIET, Patiala; 24-hour in-person format; teams of 2–5; student eligibility; free participation for selected attendees; meals/resting areas; official contact/social links; Devfolio as platform partner; pre-registration, hackathon and results/closing milestones.

Awaiting confirmation: tracks/problem statements, final team registration link, detailed schedule/submission milestones, additional current sponsors and prizes. Visitor copy uses concise announcement notices. No unverified dates, sponsors, statistics, prizes or links were added.

## Verification

See `outputs/VERIFICATION.md` for the production and browser test record. Both themes were visually inspected at 360, 390, 768 and 1440px. Checks covered overflow, roadmap alignment, all requested direct/refreshed fragment URLs, menu/focus handling, keyboard FAQs, theme persistence, official pre-registration and local asset paths.
