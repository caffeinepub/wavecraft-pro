# Specification

## Summary
**Goal:** Build “WaveCraft Pro,” a mobile-first, Android Chrome–optimized music visualizer video maker with an all-features-unlocked creator dashboard, real-time preview, project saving, and fully in-browser MP4 export.

**Planned changes:**
- Create a responsive creator-dashboard UI shell (top bar with Save/Export, left sidebar navigation, center live preview canvas, right-side controls) with touch-friendly interactions and no hover-only dependencies.
- Remove/omit all monetization and plan-gating (no subscriptions, Stripe, paid plans, pro checks, or forced watermark); keep watermark as an optional toggle (default off).
- Implement MP3/WAV upload + playback using a single reusable Web Audio API `AudioContext`, with efficient decoding and real-time analysis suitable for mid-range Android devices.
- Build a lightweight visualizer engine using `requestAnimationFrame`, capped at 30fps by default, avoiding React re-renders during animation (use refs); stop/cleanup on pause/stop.
- Add modular visualizer modes: circular spectrum, horizontal bar equalizer, vertical bar equalizer, waveform line, radial neon ring, particle-reactive, minimal lo‑fi soft glow, and optional heavier WebGL 3D tunnel mode that can be avoided on mobile.
- Add audio analysis controls: FFT spectrum, bass/mid/treble separation, sensitivity slider, and best-effort BPM detection with safe fallback display.
- Add audio timing edits: trim start/end and fade-in/fade-out with responsive preview updates.
- Add background customization: solid color, multi-stop gradient builder, uploaded image backgrounds, and subtle animated particle overlay.
- Add text/branding overlays: title and artist fields, bundled font selection, position/size controls, entrance animation presets, and logo upload overlay.
- Implement in-browser MP4 export via `ffmpeg.wasm` (no server rendering) with resolution (720p/1080p/4K), fps (30/60), bitrate, estimated file size/render-time estimate, and export progress UI.
- Add a client-side render queue to enqueue multiple export jobs, show status, cancel jobs, and run sequentially.
- Add project persistence using a single Motoko backend actor: create/list/load/rename/delete projects that store audio reference metadata + visual settings.
- Build a responsive landing/marketing page (hero, demo preview section, feature highlights, visualizer showcase, pricing section without payments, FAQ, CTA) including the Facebook link: https://www.facebook.com/share/14SsrwttdEB/
- Apply a consistent premium dark theme across landing + app (dark charcoal base; avoid blue/purple as primary), with clear hierarchy and accessible interactive states.
- Add reliability/performance safeguards: error boundaries, graceful export failure handling with retry, resource cleanup (audio nodes/object URLs/animation loops), and lazy-load heavy modules (ffmpeg.wasm and optional 3D) only when needed.

**User-visible outcome:** Users can create and preview audio-reactive visualizer videos on mobile, customize visuals/backgrounds/text/logo, edit audio timing, save/load projects, and export MP4s (including 4K) fully in-browser with progress and a client-side render queue—without any payment or feature restrictions.
