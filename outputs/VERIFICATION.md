# Interaction polish — verification

31 October 2026

## Changes

- Duration statistic is visually `24 hr`, with baseline-aligned units and a screen-reader-only `24 hours` label. Prose still says `24-hour hackathon`.
- Fresh plain URLs start at the hero. Initial explicit fragments align after React commits and local fonts settle. Measured CSS scroll-padding handles subsequent native anchors; hash changes no longer force scrolling. Browser history and scrollRestoration remain untouched.
- Radar uses a single infinite 14-second CSS animation. IntersectionObserver and document visibility only change its play-state, retaining rotation phase. Reduced-motion shows a static sweep.
- Pyramid illustration responds to fine mouse pointers within its open illustration area, with a maximum 4-degree tilt. Pointer work is coalesced into one animation frame. Pointer exit, scrolling or media-preference changes reset tilt. Text, numbered controls and registration button remain stationary.
- Milestone proximity highlights the node, corresponding route and description. Numbered buttons and the registration link provide keyboard focus highlighting. Mobile retains its static geometry and readable ordered list.
- About nodes and labels highlight only their existing connection, node and label. No controls, movement or new geometry were added. Shape/text attributes were compared with the previous source and matched exactly.
- Desktop pyramid height reduced from 740px to 620px (660px at 901–1150px), with tighter section spacing. Mobile spacing remains readable.
- Existing moon asset, wordmark paths, seeded stars, palettes, official logos, theme bootstrap and event information are preserved. Source checks confirmed event content, moon and index metadata unchanged.

## Production

- Strict TypeScript / Vite production build passed.
- Seven local production resources passed HTTP/MIME checks under both `/` and `/Eclipse7.0/`.
- Live HTML, JavaScript, CSS, favicon, logos, moon and Manrope font returned HTTP 200.
- Standalone preview passed embedded-asset and JavaScript syntax checks: 369,831 bytes. Production ZIP refreshed.
- Interaction deployment passed: https://github.com/talwarmohnish/Eclipse7.0/actions/runs/41191067874 . Documentation is published through the same existing workflow.

## Browser checks

Dark and light themes were inspected at 360, 390, 768 and 1440px widths. Screenshots are saved locally in outputs.

| Check | Result |
| --- | --- |
| Horizontal overflow | All eight theme/width combinations passed; document width equals content viewport; no text, link or FAQ question overflows |
| Typography | Body 16px mobile/tablet, 17px desktop; FAQ questions 18px mobile/tablet, 19px desktop |
| Duration accessibility | Accessibility tree exposes `24 hours`; visible numeral/unit use baseline alignment |
| Fresh homepage | New plain-URL tab opened at scrollY 0 with the hero below the header |
| Direct fragments and reload | 32 checks passed: four sections × four widths × both themes; all requested sections clear the header |
| Native Back | Arbitrary `#about` scroll position restored exactly: 1765.5999755859375px |
| Native Forward | Prior `#faqs` position restored exactly: 4056.800048828125px |
| Plain-URL reload | A scrolled plain URL retained 4214.39990234375px rather than being forced to the hero |
| Radar beyond 30 seconds | Still running and changing rotation after 45.3 seconds continuously visible |
| Radar offscreen/resume | Paused offscreen; identical transform in separated samples; resumed rotation on return |
| Pointer tilt | Measured approximately -0.78deg X / 3.57deg Y; route/node/description highlight active near milestone 3 |
| Text/click stability | All description and registration-button rectangles, plus scrollY, identical before/after native pointer input |
| Reset | Pointer exit restored both tilt variables to 0deg and cleared pointer highlight |
| Keyboard | Milestone 1 → registration link → milestone 2 focus updates highlighting; mobile milestone activation also highlights its route |
| About | Each node/label activates only its corresponding connection; diagram transform remains none |
| Mobile menu | Opens/closes, Escape returns focus, section link closes menu and clears the sticky header |
| FAQs | Pointer and Enter open/close passed in both themes |
| Theme | Pointer/Enter toggling and persistence across repeated reloads passed |
| Registration | Roadmap action opens the official pre-registration form in a new tab |
| Console | No warnings or errors recorded |

Native accessibility actions were used to verify history restoration because the locator-click automation scrolls elements into view before activating them; that test-tool behaviour changes the position stored in history.

## Verification limits

The browser environment kept documents visible even when another tab was opened, so an actual hidden-tab transition could not be induced reliably. The document.visibilitychange listener and pause/resume CSS were inspected; hidden-tab behaviour is implemented but not claimed as behaviourally verified. OS reduced-motion emulation was unavailable; its explicit static-radar/no-tilt rules and global animation overrides were inspected.

The browser cannot reach the sandboxed local server or open the standalone file. Local production HTTP/asset tests and standalone validation passed; visual and interaction testing used the matching deployed HTTPS bundle. No registration form was submitted.

Unconfirmed tracks, detailed schedule, final team registration link, additional sponsors and prizes remain concise announcement notices. No event facts or links were invented.
