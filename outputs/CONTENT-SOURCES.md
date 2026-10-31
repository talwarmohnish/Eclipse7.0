# Content and asset provenance

Checked 31 October 2026 against https://eclipse.acmthapar.in/ and its publicly served application bundle at https://eclipse.acmthapar.in/assets/index-CQZ8UfzF.js.

The official site is JavaScript-rendered; its public bundle was retrieved to verify text and asset URLs. The original visual layout and source application were not copied.

## Verified event information

- Official pre-registration page and event panel: **3–4 April 2027**. The homepage states 03 April – 04 April; the pre-registration page provides the year.
- Official FAQs: ACM Thapar Student Chapter organizes a **24-hour hackathon** at **Thapar Institute of Engineering and Technology (TIET), Patiala**, **in person**; remote participation is not supported.
- FAQs: college/university students may participate, including beginners; teams of **2–5**; free for selected attendees.
- FAQs: meals, midnight snacks, beverages and designated resting areas. No hotel or other accommodation guarantee was added.
- Homepage sponsor section: **Devfolio is the platform partner**. The separate sponsor page labels other displayed organizations as **past sponsors**; none was presented as a current 7.0 sponsor.
- Official timeline: hackathon on 03 April, results and closing on 04 April. Earlier milestones use incomplete dates; times and submission details were not carried over as reliable final scheduling.
- Footer and partnership page: `contact@acmthapar.in`, `partner@acmthapar.in`, Instagram `acmthapar`, LinkedIn `thapar-acm-student-chapter`.

## Registration

https://eclipse.acmthapar.in/pre-register returned HTTP 200 and is an explicit official route for an interest form, headed “ECLIPSE 7.0 — Pre-Registration.” Buttons are labelled **Pre-register**.

The official homepage links Devfolio via an `eclipse` slug, while FAQs mention Unstop and no event-specific Unstop URL is provided. The final team registration platform could not be verified consistently. The new site states **Registration details coming soon** and distinguishes interest registration from final team applications. No third-party application URL was invented. No interest form was submitted during verification.

## Official assets (unchanged local copies)

- `public/assets/acm-logo.png`: https://eclipse.acmthapar.in/assets/acm-logo-DoiHZZFX.png
- `public/assets/devfolio.svg`: https://eclipse.acmthapar.in/assets/Devfolio_Logo-White--HrXyj5i.svg

`public/assets/moon.svg` and `public/favicon.svg` are original code-native illustrations. The official ECLIPSE wordmark asset was inspected as a reference asset but is not used; the hero is original live text.

## Editable placeholders

- Tracks and problem statements: official homepage says “COMING SOON.”
- Full schedule, earlier milestones, submission date/time and detailed venue/room: awaiting confirmation.
- Final team registration URL/platform: unresolved, as described above.
- Additional current sponsors: awaiting confirmation; historic sponsors excluded.
- Prizes: not verified and no prize amount or promise appears on the site.

All event content is configurable in `src/content.ts`; layout copy lives in `src/main.tsx`. Update `index.html` metadata when changing event dates. No sponsor, prize or participation count was invented.
