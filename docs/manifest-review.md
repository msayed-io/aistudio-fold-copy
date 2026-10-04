# Manifest V3 compatibility review — 2026-10-04

## Result

The extension uses Manifest V3 and passed Chrome's local `--pack-extension` validation on Chromium in the Sandbox. The unpacked load check produced no manifest or extension errors.

| Area | Result | Notes |
|---|---|---|
| `manifest_version` | Pass | Value is `3`. |
| Scope | Pass | Static content scripts match only `https://aistudio.google.com/apps/*`. |
| Timing/frames | Pass | `document_idle`, `all_frames: false`; both are appropriate for the supplied Build DOM. |
| Permissions | Pass | Only `storage`; no `activeTab`, `scripting`, `tabs`, broad host permissions, or clipboard permission. |
| Localization | Pass | `default_locale: en`, `_locales/en`, `_locales/ar`, and localized manifest name/description. |
| Options | Pass | `options_page` points to an extension-local HTML file. |
| Icons | Pass | 16, 32, 48, and 128 PNG files exist and are referenced. |
| Extension CSP | Pass | Explicit `script-src 'self'; object-src 'self'`; no remote code. |
| Remote-code/security scan | Pass | No `eval`, `new Function`, `innerHTML`, `outerHTML`, `fetch`, XHR, WebSocket, or remote script source in extension code. |
| Chrome packaging | Pass | Chromium generated a CRX from the unpacked directory without errors. |

## Runtime fixes made in 1.0.1

The MutationObserver now ignores mutations whose target or nodes belong to the extension UI, including attribute changes, reducing the risk of self-triggered processing loops. Copy controls are hidden and disabled when a model bubble exposes common streaming markers (`aria-busy`, `data-streaming`, or streaming classes); the exact live marker still needs confirmation on an authenticated AI Studio session.

## What this review cannot prove

A static or local packaging review cannot prove current AI Studio behavior after a server-side DOM change. Live verification is still required for streaming markers, Angular replacement, clipboard policy, RTL/LTR placement, theme changes, 200+ message performance, and three consecutive Playwright runs against a captured fixture and then the real site.
