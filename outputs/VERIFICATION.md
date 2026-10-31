# Verification report

31 October 2026

## Production and deployment

- `npm run build`: strict TypeScript checking and optimized Vite production build passed.
- `npm run check:assets`: production HTML and six local assets returned HTTP 200 with expected MIME types under both `/` and `/Eclipse7.0/`.
- `npm run preview:standalone`: generated `outputs/ECLIPSE-preview.html` with embedded CSS, JavaScript, images and favicon. Embedded production JavaScript passed a syntax check and has no external module imports.
- GitHub Actions https://github.com/talwarmohnish/Eclipse7.0/actions/runs/41171141282 passed build, asset checks and Pages deployment for the mobile fixes (`a03cad8389d124ffd166e50476a5db423d5efacb`).
- Live website: https://talwarmohnish.github.io/Eclipse7.0/ . Page, JavaScript, CSS, favicon and all image files returned HTTP 200.
- All page images loaded successfully in the browser. Font stacks use local system fonts; no web-font request is required.
- Dependency audit reported zero known vulnerabilities at installation.

## Browser verification completed

The live site was inspected at 1440×900 desktop, 768×1024 tablet, 390×844 mobile, and 320×800 narrow mobile sizes. Full desktop and mobile page layouts were reviewed visually.

- Hero typography, moon, date, actions and major section layouts inspected.
- No horizontal overflow at 1440, 768 and 390 pixels. A 320-pixel overflow was found, corrected and rechecked: document width and client width are both 305 pixels with a 15-pixel browser scrollbar.
- Mobile venue/attendance labels originally ran together. They now have separate elements, a clear two-line layout, and larger venue type.
- Main hero actions remain visible around 550 pixels down the 390×844 viewport.
- Mobile menu opens and closes, reflects `aria-expanded`, closes with Escape and returns focus to the toggle.
- Mobile Timeline navigation closes the menu and changes the URL to `#timeline`.
- Desktop FAQ navigation and back-to-top links work. Every local anchor has a matching element ID.
- FAQ answers open by click and close with Enter on desktop and Space on mobile.
- Pre-register opens the official form at https://eclipse.acmthapar.in/pre-register in a new tab. The official heading, 3–4 April 2027 date and interest form were visible. No fields were filled and nothing was submitted.
- No console warnings or errors were captured during these checks.
- Browser viewport overrides were reset after testing.

Reduced-motion handling, skip link, focus styling, email destinations and external-link attributes were checked in source. Reduced-motion preferences were not emulated, and email/social links were not used to send messages.

## Local preview and source

The local folder is linked to https://github.com/talwarmohnish/Eclipse7.0 and tracks origin/main. Generated HTML, ZIPs and review screenshots are ignored by Git.

Open `outputs/ECLIPSE-preview.html` directly for a standalone local preview. Alternatively run `npm run preview -- --port 4173` after building. Earlier local-server browser connections were blocked by the environment; live-site browser QA subsequently completed as described above.

`outputs/mobile-review.png` shows the final mobile hero. `outputs/website-review.png` shows the final desktop hero. The production ZIP contains the latest `dist/` output.

## Remaining event details

Tracks/problem statements, final team registration URL/platform, detailed schedule and submission milestones, additional current sponsors, and prizes await organizer confirmation. See `CONTENT-SOURCES.md`. No unsupported prize, sponsor or registration promise was added.
