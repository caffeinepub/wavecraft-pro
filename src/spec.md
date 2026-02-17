# Specification

## Summary
**Goal:** Enhance the WaveCraft Pro creator with aspect-ratio presets, smoothing and beat-aware timeline visuals, improved audio upload UX, autosave, sharing, export preset, and mobile-friendly collapsible controls.

**Planned changes:**
- Add selectable canvas aspect-ratio presets (16:9 1280x720, 9:16 1080x1920, 1:1 1080x1080) that resize the live preview responsively without stretching, and persist with projects.
- Add an “Animation Smoothing” slider that smooths audio-reactive amplitude signals, updates the preview live, and persists with projects.
- Implement best-effort beat detection in the audio engine with an enable/disable or lightweight mode, exposing beat events for UI/visualizer usage.
- Add a bottom timeline strip that visualizes audio duration and current trim range and can display beat markers; ensure it doesn’t overlap controls on small screens.
- Upgrade Audio Upload with drag-and-drop support, a 50MB max file size validation error, and a lightweight waveform/amplitude preview after upload.
- Implement autosave (every ~30s) for authenticated users when a project is active and has unsaved changes, with clear “Saving…” / “Saved” UI feedback and network-efficient behavior.
- Add project share links: generate a copyable URL and a read-only viewing route that loads shared/published projects and fails gracefully for non-shared/non-published projects.
- Add a one-click “YouTube-ready” export preset that sets 1280x720 (16:9) with sensible default FPS/bitrate while keeping other export settings available.
- Update mobile UI with a collapsible settings/controls area, touch-friendly controls, and no overlap between preview and controls in any state.

**User-visible outcome:** Users can choose preview/export aspect ratios, reduce jitter with smoothing, see beat markers on a bottom timeline, upload audio via drag-and-drop with size checks and waveform preview, rely on autosave with status feedback, share projects via copyable links, quickly export with a YouTube-ready preset, and use a mobile UI where controls can collapse to keep the preview visible.
