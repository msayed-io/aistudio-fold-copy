# DOM findings

Source snapshots: `aistudio-dom-snapshot.json` and `aistudio-dom-snapshot-v2.json`, captured on 2026-10-04 from `https://aistudio.google.com/apps/3cd2e2e4-888a-4018-8b42-1cf9aecc527b`.

- Scope: Build route only, `/apps/*`.
- Chat root: `ms-code-assistant-chat`; scroll host: `ms-autoscroll-container`.
- Turn container: `div.turn-container`; turn element: `ms-console-turn`.
- User: direct `div.bubble.user`; model: direct `div.bubble` without `user`.
- User text: `ms-cmark-node`; it is `display: contents` in the snapshot, so the extension injects a text wrapper and never constrains the whole bubble.
- Attachments: `div.preview-container` and `ms-file-preview`, siblings of the text node; they are not moved into the fold wrapper.
- Code: `ms-code-block`, language in `data-test-language`.
- Model UI: `ms-chat-step`, `ms-expandable-turn`, generation tables, native buttons; copy conversion excludes buttons and aria-hidden UI.
- Theme: `body.dark-theme`, background `rgb(31,31,31)`, Inter 14px/20px. User bubble `rgb(42,42,42)`, radius 12px, padding 16px 20px. Model bubble transparent.
- Measurements: user heights include 1421px and 12072px; scroll host is about 539x614px.
- Open shadow roots: 1 in snapshot; no evidence it encloses the target bubbles.
- Error turns: `ms-chat-turn-error` are classified `unknown`.
- Virtualization and exact Angular redraw behavior are **not verified on a live session**; observer is deliberately scoped and re-runs after mutations.

## Sources

- Chrome content scripts: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
- Chrome storage API: https://developer.chrome.com/docs/extensions/reference/api/storage
- Related MIT project inspected for privacy/permission patterns (not copied): https://github.com/Sukarth/AI-studio-exporter
