# Specification

## Summary
**Goal:** Enable and fully implement all previously “Coming Soon” options (Background, Text & Branding overlays, 3D Tunnel mode, and Export), and persist these settings in Projects.

**Planned changes:**
- Replace the “Background controls coming soon” placeholder with functional background controls: solid color, multi-stop gradient builder, background image upload (replace/clear), and an optional subtle animated particles overlay with density/intensity control; update the live preview immediately and remain usable on mobile.
- Replace the “Overlay controls coming soon” placeholder with Text & Branding (Overlays) controls: song title, artist name, bundled font selection, position and size controls, entrance animation presets, logo upload overlay (correct aspect ratio), and a watermark toggle (default off); render overlays in the live preview with readable styling across backgrounds.
- Implement “3D Tunnel (Heavy)” as a real WebGL-based 3D tunnel visualizer mode with safe switching (no leaks) and a clear fallback behavior/message for unsupported devices.
- Replace “Export controls coming soon” with a functional in-browser MP4 export panel using ffmpeg.wasm: resolution (720p/1080p/4K), FPS (30/60), bitrate, best-effort time/size estimates, progress UI, and a client-side sequential render queue with cancel and graceful error handling.
- Persist all new Background, Text & Branding, and 3D Tunnel selection/settings in Projects: extend the backend Project model (and add a migration only if needed), and ensure Save/Load restores the same preview configuration.

**User-visible outcome:** Users can customize backgrounds and overlays, switch to a working 3D Tunnel mode, export MP4 videos in-browser with queue/progress, and save/load projects with all these settings restored.
