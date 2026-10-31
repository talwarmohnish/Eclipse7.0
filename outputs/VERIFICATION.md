# Layered observatory refinement — verification

31 October 2026

## Completed design

- Preserved readable Manrope body/FAQ text and existing verified event content, logos, dates and interactions.
- Restored the original layered moon composition using history comparison (`3bdf772` versus `e68a72e`). Intermediate surface brightness, deep shadow, copper rim and a softer radial edge integrate it behind original ECLIPSE lettering. Mobile has deliberate overlap.
- Added original SVG lettering with coherent extended forms, curved cuts, eclipse arcs and integrated 7.0. The semantic h1 remains ECLIPSE 7.0.
- Added 168 static irregular stars across the full document, with dark/light colours and pointer-events disabled. Every main section contains stars; no repeating tile or particle animation is used.
- Replaced the orbital roadmap with a wireframe pyramid: pre-registration lower left, hackathon apex, results/closing lower right. HTML number badges and readable copy attach to the actual vertices. Mobile uses compact geometry and a normal ordered list, with a prominent official Pre-register action.
- Removed the internal journey caption. Fixed a missing space in the FAQ heading when its line break is hidden on tablet.
- Preserved both themes, first-visit dark default, local choice persistence and pre-paint theme bootstrap.

## Production checks

- Strict TypeScript and Vite production build passed.
- Page and all seven production resources passed HTTP/MIME checks under both `/` and `/Eclipse7.0/`.
- Exactly one locally bundled font is included: Manrope. Official logo images, original moon SVG and favicon are local.
- Standalone preview generation passed: 363,076 bytes, embedded assets and syntactically valid production JavaScript.
- GitHub Pages deployment of the identity/pyramid design passed: https://github.com/talwarmohnish/Eclipse7.0/actions/runs/41187297949 . The final heading-space/documentation patch uses the same automatic workflow.

## Browser checks

Browser testing used the deployed HTTPS production site. Dark and light were inspected at 360, 390, 768 and 1440px; screenshots are saved locally in outputs.

| Check | Result |
| --- | --- |
| Horizontal overflow, all eight theme/width combinations | No document overflow; no heading, paragraph, link or FAQ question outside the content viewport |
| Text sizing | Body 16px on mobile/tablet, 17px desktop; FAQ questions 18px mobile/tablet, 19px desktop |
| Desktop pyramid vertices | All three badge centres match SVG vertices within 0.01px |
| Mobile roadmap | Compact triangle plus readable full milestone list; all descriptions and action available without hover |
| Star distribution | Every main section contains points; static, theme appropriate and noninteractive |
| Mobile navigation | Opens/closes; Escape restores focus; Roadmap link closes menu and aligns the section |
| FAQ | Pointer opening and keyboard Enter collapse passed |
| Theme | Pointer and keyboard switching, and reload persistence passed |
| Pre-registration | Pyramid action opens the verified official interest form; no form submitted |
| Console | No warnings or errors recorded |

32 fragment tests passed: `#about`, `#tracks`, `#timeline`, `#faqs` × direct navigation and reload × both themes × desktop 1440px and mobile 390px. Section starts clear the sticky header by approximately 20px after React rendering and local-font loading. Header height is measured at runtime. Navigation uses ordinary anchors without scroll hijacking.

The large date separator has independent sizing/spacing. Original ACM/Devfolio assets remain unchanged and legible in both themes. Visitors see announcement notices instead of internal editing instructions.

## Verification limits and pending content

The browser tool cannot open the standalone local file or reach the sandboxed local server. Its generated HTML/assets/JavaScript were checked by the build scripts; the matching production bundle was visually tested on HTTPS. Operating-system reduced-motion emulation was unavailable; the CSS rules were inspected and disable all motion while retaining essential content.

Tracks/problem statements, full schedule, final team registration, additional sponsors and prizes remain unconfirmed. They remain documented in the content file and README; no details were invented.
