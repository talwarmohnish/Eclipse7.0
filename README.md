# ECLIPSE 7.0 — The Observatory

An original, responsive frontend for ACM Thapar’s flagship hackathon. React 19, Vite 7, TypeScript and CSS. No backend, authentication, database, analytics, or API keys.

## Local setup

Use Node.js 24 LTS and npm. From this project directory:

```sh
npm ci
npm run dev
```

Open the Local URL Vite prints (normally http://127.0.0.1:5173/).

## Production build and local preview

```sh
npm run build
npm run preview -- --port 4173
```

The build runs strict TypeScript checking and outputs the static site to `dist/`. Open http://127.0.0.1:4173/. `vite preview` is for local testing; deploy the `dist/` files to a static host.

```sh
npm run check:assets
```

This checks the actual production output and all local image/script/stylesheet/favicon references, then serves and requests those resources under both `/` and `/Eclipse7.0/` to catch deployment path problems.

## Standalone local preview

After building, run `npm run preview:standalone`. Open `outputs/ECLIPSE-preview.html` directly in your browser: CSS, JavaScript, images and favicon are embedded, so no web server or network connection is required. Event and contact links still open official external destinations. This is a generated preview; deploy `dist/` for production.

## Editing

- `src/content.ts`: event facts, dates, registration URLs, FAQs, contact links and the placeholder track list.
- `src/styles.css`: the `:root` block contains colours, fonts and page spacing; mobile rules follow desktop rules.
- `src/main.tsx`: section composition, navigation and page copy.
- `public/assets/`: bundled official ACM and Devfolio logos and the original procedural SVG moon.
- `index.html`: title, description and theme metadata; update metadata if event dates change.

The design uses system Arial/Helvetica and Courier New, with local fallbacks. No web font request or font service is needed. All images are bundled locally; the official ACM logo is used without filtering, recolouring or redrawing. The moon is an original SVG illustration, not a photograph or official asset.

## GitHub

Live website: https://talwarmohnish.github.io/Eclipse7.0/ . The source is published and the local folder is linked to origin/main. GitHub Actions passed dependency installation, production build, asset checks and Pages deployment. All published page, script, stylesheet, favicon and image resources returned HTTP 200.

Target repository: https://github.com/talwarmohnish/Eclipse7.0

Commit application source, the lockfile, public assets, scripts, README and workflow. `.gitignore` excludes dependencies, build output, scratch files, logs, local hosting metadata and credentials. The project needs no `.env` file or secrets.

If pushing manually to an empty repository:

```sh
git init -b main
git add .
git commit -m "Build ECLIPSE 7.0 observatory frontend"
git remote add origin https://github.com/talwarmohnish/Eclipse7.0.git
git push -u origin main
```

Authenticate using your normal GitHub tooling; never put access tokens into source files or remote URLs.

## Deploy with GitHub Pages

1. Open the repository’s **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main`, or open **Actions → Deploy ECLIPSE to GitHub Pages → Run workflow** after enabling Pages.
4. The included workflow installs locked dependencies, checks TypeScript, builds `dist/`, checks asset paths, and deploys it. Its deployment output supplies the verified live URL.

Verified live URL: https://talwarmohnish.github.io/Eclipse7.0/ . Successful workflow: https://github.com/talwarmohnish/Eclipse7.0/actions/runs/41171141282 . Subsequent pushes to main automatically rebuild and redeploy.

Relative Vite base and image/favicon paths support the repository subdirectory as well as domain-root deployment. Navigation uses native in-page anchors; no SPA rewrite rules are needed. The workflow uses GitHub’s automatic `GITHUB_TOKEN`, not a stored personal access token. Enabling Pages requires repository administration access and may need a manual settings change.

Reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Other static hosts

- **Vercel:** import the GitHub repository. Framework: Vite; build: `npm run build`; output: `dist`. `vercel.json` is included.
- **Netlify:** import the repository. `netlify.toml` declares `npm run build`, `dist`, and Node 24. You can also upload the built `dist/` folder through its deployment UI.
- **Other hosts:** publish the contents of `dist/` as static files, retaining the `assets/` directory.

No environment variables or backend services are required. Reference: https://vite.dev/guide/static-deploy.html

## Verified content and placeholders

The only source of event facts and official assets is https://eclipse.acmthapar.in/. Details are documented in `outputs/CONTENT-SOURCES.md`.

Verified: 3–4 April 2027, TIET Patiala, in-person 24-hour format, teams of 2–5, student eligibility, free participation for selected attendees, meals and resting areas, official contacts/social links, and Devfolio as platform partner.

The Pre-register links open the official interest form in a new tab. No registration form or personal-data collection is implemented locally. Full team registration remains unconfirmed because the official source references multiple platforms.

Editable placeholders remain for tracks/problem statements, a confirmed team application link, detailed schedule and submission milestones, additional current sponsors, and prizes. Historical sponsor logos and past track claims were intentionally excluded.

## Accessibility and interactions

- Mobile menu: native button, `aria-expanded`, hidden inactive links, Escape to close and return focus.
- Section navigation and back-to-top: native anchors with sticky-header scroll offset.
- FAQs: native `details` / `summary`, keyboard accessible and independently expandable.
- Skip link, visible keyboard focus, semantic section headings and image alternatives.
- Reduced-motion preferences disable smooth scrolling, transitions and the slow orbital animation.
- Email, social, partner and pre-registration actions point to verified official destinations.

Browser verification completed at 1440, 768, 390 and 320 pixel viewport widths. Mobile menu, Escape/focus handling, section navigation, keyboard FAQ toggles and the official pre-registration destination were tested. Two mobile readability/overflow issues were corrected and redeployed. Details and verification limits are recorded in `outputs/VERIFICATION.md`.



