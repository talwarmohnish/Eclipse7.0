# Observatory refinement — verification

31 October 2026

## Implemented

- Brighter, textured moon with deep shadows and a copper rim. Desktop exposes most of the disc; mobile places the title below it so light-theme text never disappears into the shadow.
- Locally bundled Barlow Condensed 600 and Manrope variable 400–700, with font licenses and fallbacks. Body/FAQ answers are 16–17px; questions 18–19px; milestone dates and section numbers 12px or larger.
- People / Ideas / Code alignment SVG with ordinary explanatory copy and a brief entrance animation.
- Orbital roadmap using only pre-registration, the 3 April hackathon, and 4 April results/closing. The mobile roadmap is a vertical list. Path drawing is illustrative, never an event-completion indicator.
- Tracks radar with two restrained sweeps; no invented track names.
- Independently sized, spaced date separators; the full accessible date remains 3–4 April 2027.
- No visitor-visible internal editing notes.
- Accessible dark/light theme toggle in desktop and mobile headers. Dark is the first-visit default. Explicit choice is saved locally, with a synchronous head bootstrap before CSS to prevent the wrong theme appearing on reload.
- Official logos unchanged, on navy plaques where required by the light palette.

## Passed production checks

- Strict TypeScript checking and Vite production build.
- Production HTML and eight local resources (including both WOFF2 fonts) served with HTTP 200 and correct MIME types under `/` and `/Eclipse7.0/`.
- Standalone local preview embeds JavaScript, CSS, fonts, images, favicon and theme bootstrap. Embedded production JavaScript passed a syntax check.
- GitHub Actions build and Pages deployment passed for the observatory implementation and the mobile title/contrast correction.

## Browser checks

Both themes were visually inspected at 360, 390, 768 and 1440 pixel viewport widths. Full desktop layouts and mobile hero/roadmap/FAQ layouts were reviewed.

- No horizontal document overflow or overflowing meaningful text at the tested widths.
- The initial mobile light-theme title/moon overlap was found, corrected and rechecked in both themes.
- Body copy is 16px on mobile/tablet and 17px on desktop. FAQ questions are 18px on mobile/tablet and 19px on desktop; answers are 16–17px.
- Date separator gaps measured 7–12px in the hero and 15–20px in the large date display. Numerals do not touch the separator.
- All images loaded, both font faces loaded, and no EDITABLE PLACEHOLDER text appears in rendered content.
- Mobile menu opens, closes with Escape and returns focus to its toggle. Choosing Roadmap closes the menu and navigates to `#timeline`.
- All local section links have valid targets. Back-to-top and native navigation work.
- FAQs open by click and collapse with Space; light-theme answers retain readable text contrast.
- Theme toggle works with pointer and Enter. Light and dark choices survive reload. The page starts dark before any choice is made.
- The mobile journey displays all three milestones and their 16px descriptions without hover interaction.
- Key contrast ratios: light body 6.23:1, light secondary text on surface 4.58:1, light copper milestone text 5.01:1; dark body 10.58:1.

## Motion and verification limits

The loaded stylesheet was inspected for its reduced-motion media rule: animation and transition are disabled, smooth scrolling becomes natural scrolling, reveal content stays opaque and in place, and routes remain drawn. The browser tooling did not expose OS reduced-motion emulation, so that preference was verified in source/loaded CSS rather than by changing the operating system setting.

The browser tool blocks file URLs; the standalone local HTML was generated and syntax/asset-checked, while visual testing used the HTTPS GitHub Pages version. No forms were filled or submitted; email/social actions were not used to send messages.

## Deliverables

- Live site: https://talwarmohnish.github.io/Eclipse7.0/
- Source: https://github.com/talwarmohnish/Eclipse7.0
- Local preview: `outputs/ECLIPSE-preview.html` (open directly in a browser)
- Static deployment archive: `outputs/ECLIPSE-production.zip`
- Theme/viewport review images: `outputs/refine-*-review.png`

Remaining organizer confirmations: tracks and problem statements, detailed schedule/submission milestones, final team application link, additional current sponsors and prizes. See `CONTENT-SOURCES.md`.
