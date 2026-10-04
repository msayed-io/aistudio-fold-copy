# Changelog

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
