# Changelog

## [1.1.2] - 2026-10-04

- Retry Minimap initialization until the dynamically rendered AI Studio chat panel exists.
- Preserve the rail after route and panel hydration instead of silently stopping at startup.


## [1.1.1] - 2026-10-04

- Corrected the minimap anchor from the full viewport to the actual AI Studio chat panel.
- Replaced floating point-like markers with short horizontal message bars.
- Kept hover previews inside the chat panel boundary instead of the preview pane.


## [1.1.0] - 2026-10-04

- Added a right-side conversation minimap with one marker per user message.
- Added hover previews and smooth click-to-jump navigation to user messages.
- Added a new transparent premium application logo and Chrome icon set.


## [1.0.4] - 2026-10-04

- Place user copy below the user bubble in a dedicated action row.
- Join model copy with AI Studio native response controls when available.
- Replace the text arrow with a precise CSS chevron matching the reference.
- Keep copy controls plain and borderless while retaining the fold control affordance.


## [1.0.3] - 2026-10-04

- Restore visible folding using robust natural-height measurement and important clipping rules.
- Preserve the original AI Studio text host without moving its children.
- Render copy controls as plain glyphs without circular borders or backgrounds.
- Keep the expand/collapse control as the intentional visual affordance.


## [1.0.2] - 2026-10-04

- Prevent scroll jitter by preserving AI Studio message DOM structure.
- Process only affected turns instead of reprocessing the entire chat on every mutation.
- Stop watching scroll-sensitive class and expansion mutations.
- Remove max-height animation from folded message text.


## [1.0.0] - 2026-10-04

- Initial Build-only MV3 implementation.
- Structural user/model classifier based on supplied DOM snapshots.
- Measured-height folding for user messages.
- Accessible copy buttons and local DOM-to-Markdown conversion.
- Sync options, privacy documentation, and fail-safe observer.
