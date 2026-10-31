# Verification report

31 October 2026

## Passed

- `npm run build`: strict TypeScript checks and optimized Vite production build passed.
- `npm run check:assets`: production HTML and all six local resources returned HTTP 200 under `/` and `/Eclipse7.0/`; expected MIME types matched.
- Official logo, original moon, partner logo, favicon, generated CSS and generated JavaScript exist in `dist/`.
- System font stacks have no external font dependency.
- Official pre-registration URL returned HTTP 200. The form was not submitted.
- npm dependency audit reported zero known vulnerabilities at install time.
- Static review: mobile menu with expanded state and Escape handler; native FAQ disclosures; native anchors and matching section IDs; reduced-motion CSS; external link `noopener noreferrer`; no API keys, backend, analytics or local personal-data collection.

## Browser limitations

Attempts to open the local Vite and static production servers in the embedded browser timed out, although an in-process HTTP check returned 200. The Windows browser fallback then stopped because the browser tool could not confidently determine the current browser URL for its safety policy. No security settings were changed.

Desktop/mobile screenshots, real browser interaction tests, measured layout/overflow checks and runtime console inspection could not be completed. These remain unverified. Source review and production asset checks are not substitutes for those visual tests.

## Local preview

- Standard repeatable command: `npm run preview -- --port 4173` after `npm run build`.
- Local preview servers were started, but could not be reached across tool calls; no persistent server is claimed as available.
- `npm run preview:standalone` generated `outputs/ECLIPSE-preview.html` with all assets embedded. Its embedded production JavaScript passed a syntax check and has no dynamic imports or import-meta dependency. Open this file directly, or run the standard Vite preview command in a local terminal.

## Remaining content

Tracks/problem statements, final team registration platform/link, detailed schedule and submission milestones, additional current sponsors and prizes need organizer confirmation. Sources and editable fields are listed in `CONTENT-SOURCES.md`.

## GitHub and CI

- Source published to https://github.com/talwarmohnish/Eclipse7.0 on `main`.
- Initial workflow run https://github.com/talwarmohnish/Eclipse7.0/actions/runs/41170076199 passed npm ci, the production build and asset checks on GitHub’s Ubuntu runner.
- Initial deployment stopped because GitHub Pages was not enabled for the repository. The action reported “Get Pages site failed” / “Not Found.”
- The workflow now separates successful build/upload from Pages configuration and deployment. Enable Settings → Pages → Source: GitHub Actions, then rerun the workflow.
- Publication to GitHub does not imply a live Pages deployment has completed.
