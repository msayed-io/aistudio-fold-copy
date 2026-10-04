# Verification report — initial local pass

## Verified from supplied artifacts

- The route is Build-only and the DOM snapshots contain 51 `ms-console-turn` elements.
- User/model structural distinction and measurements are recorded in `dom-findings.md`.
- The reference image is an 833x685 dark card: large rounded corners, generous padding, roughly eight visible lines, soft bottom fade, and a small bottom-edge chevron.
- Manifest is MV3, matches only `https://aistudio.google.com/apps/*`, and declares only `storage`.
- Source contains no `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `eval`, `new Function`, fetch, analytics, or remote script URL.

## Not verified yet

- Live AI Studio behavior, Angular replacement, streaming completion, real clipboard policies, theme switching, RTL/LTR on a signed-in account, 200+ message performance, and three repeated Playwright E2E runs.
- GitHub repository/release publication and installation from a downloaded release zip.
- PNG exports and visual screenshot comparisons.

These are intentionally not claimed as successful. The local environment currently has Git but no `node`, `npm`, or `gh` executable, and no authenticated AI Studio session was used for this pass.
