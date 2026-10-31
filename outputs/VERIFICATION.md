# Reload-to-hero verification

31 October 2026

## Current behaviour

Every full browser reload opens at the ECLIPSE hero, including reloads from section fragments. The document-head bootstrap removes the hash with history.replaceState, retaining the pathname, query string and existing history state without adding an entry. It switches restoration to manual before body markup can render.

React skips initial and font-ready hash alignment for that reload. The root stays hidden until page loading and fonts settle, then two animation frames reset scroll to zero before revealing it. Restoration remains manual until the next pointer, keyboard, touch, wheel or click interaction, or page exit. No recurring scroll loop or section-link interception is used.

Fresh deep-link visits still honour their fragment. About, Tracks, Roadmap, Partners and FAQs continue using native anchors during the visit. Existing design, event content, theme choices and effects were not changed.

This policy supersedes the earlier verification record in which full reloads retained their fragment or scroll position.

## Passed checks

- Strict TypeScript / Vite production build.
- Page and seven production resources served correctly under both / and /Eclipse7.0/.
- Standalone preview regenerated with embedded assets; the application script and both startup scripts passed syntax checks (371,452 bytes).
- Pre-render bootstrap contract tested for reload, fresh navigation and Back/Forward navigation. Reload uses replaceState before scrolling; other navigation types leave history and scrolling untouched. No pushState call is introduced.
- Deployed race fix: https://github.com/talwarmohnish/Eclipse7.0/actions/runs/41210688151 .

| Refresh source | Desktop 1440px, dark | Mobile 390px, light |
| --- | --- | --- |
| About | Hero visible, hash empty, scrollY 0 | Hero visible, hash empty, scrollY 0 |
| Roadmap | Hero visible, hash empty, scrollY 0 | Hero visible, hash empty, scrollY 0 |
| FAQs | Hero visible, hash empty, scrollY 0 | Hero visible, hash empty, scrollY 0 |

Each test first navigated to the section and confirmed a nonzero scroll position, then fully reloaded. The earliest post-reload observations and subsequent visible-hero observations were at scrollY 0. Later FAQ checks remained at zero, with no return to the old section. Reload screenshots show the hero; no section-to-hero jump was observed in browser checks.

A late-restoration race found during the initial FAQ test was corrected before the successful repeat tests above. The final implementation keeps restoration blocked beyond page loading rather than restoring auto mode immediately.

All five section destinations were exercised after reload. Mobile menu links closed the menu and left the selected section clear of the sticky header. Back and Forward did not expose an extra pre-replacement section entry. Theme choice persisted across reloads. No browser warnings or errors were recorded.

## Scope and limits

Browser verification used the deployed HTTPS production build. The sandboxed local server and standalone file cannot be opened by this browser tool; their production assets and embedded scripts were validated programmatically. Broader responsive layout, radar, pyramid, FAQ and accessibility checks are recorded in the preceding interaction-pass commit; this focused pass did not change those designs.
