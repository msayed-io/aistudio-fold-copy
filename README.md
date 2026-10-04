# AI Studio Fold & Copy

A privacy-first Manifest V3 extension for **Google AI Studio Build chats only** (`aistudio.google.com/apps/*`). It folds long user messages and adds accessible copy buttons to user and AI messages.

> This is an independent community extension and is not affiliated with Google, Gemini, or Google AI Studio.

## Features

- Folds user messages only when measured `scrollHeight` exceeds approximately 8 lines plus tolerance.
- Smooth fade-out and real button with keyboard focus and ARIA state.
- Copies full user text and AI responses as Markdown, excluding UI controls and thoughts by default.
- Fail-safe classification: uncertain turns are left untouched.
- No network requests, analytics, remote code, or conversation storage.

## Install manually

1. Download or clone this folder.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project folder.
5. Open an AI Studio Build app under `https://aistudio.google.com/apps/`.

## Permissions

Only `storage` is declared to persist the small settings object in `chrome.storage.sync`. No `activeTab`, `scripting`, `tabs`, host permissions, or clipboard permission are used.

## Build and test

This repository uses vanilla JavaScript and has no runtime dependencies. Run `npm run lint`, `npm run validate`, and the browser-based tests when Node/Playwright are available.

## Privacy and reporting

See [PRIVACY.md](PRIVACY.md). AI Studio may change its private DOM. If the extension stops working after an update, open an issue with the affected route and a sanitized screenshot; selectors are centralized in `src/content/selectors.js`.

## License

MIT.
