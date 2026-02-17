import { PresetSettings } from './presetsCatalog';
import { useVisualizerEngineStore } from '../visualizer/useVisualizerEngine';
import { useBackgroundSettings } from '../background/useBackgroundSettings';
import { useOverlaySettings } from '../overlays/useOverlaySettings';

export function applyPreset(settings: PresetSettings): void {
  try {
    // Apply visualizer settings
    if (settings.visualizer) {
      const store = useVisualizerEngineStore.getState();
      
      // Check WebGL support before applying 3D tunnel mode
      if (settings.visualizer.mode === '3d-tunnel' && !store.webglSupported) {
        console.warn('[applyPreset] 3D tunnel mode not supported, falling back to circular-spectrum');
        store.setMode('circular-spectrum');
      } else {
        store.setMode(settings.visualizer.mode);
      }
      
      if (settings.visualizer.sensitivity !== undefined) {
        store.setSensitivity(settings.visualizer.sensitivity);
      }
      if (settings.visualizer.bassMultiplier !== undefined) {
        store.setBassMultiplier(settings.visualizer.bassMultiplier);
      }
      if (settings.visualizer.midMultiplier !== undefined) {
        store.setMidMultiplier(settings.visualizer.midMultiplier);
      }
      if (settings.visualizer.trebleMultiplier !== undefined) {
        store.setTrebleMultiplier(settings.visualizer.trebleMultiplier);
      }
    }

    // Apply background settings
    if (settings.background) {
      const bgStore = useBackgroundSettings.getState();
      
      if (settings.background.type) {
        // Filter out "particles" type since it's no longer valid
        const validType = settings.background.type === 'particles' ? 'solid' : settings.background.type;
        if (validType === 'solid' || validType === 'gradient' || validType === 'image') {
          bgStore.setType(validType);
        }
        // If the preset had particles type, enable particles overlay
        if (settings.background.type === 'particles') {
          bgStore.setParticlesEnabled(true);
        }
      }
      if (settings.background.solidColor) {
        bgStore.setSolidColor(settings.background.solidColor);
      }
      if (settings.background.gradientStops && Array.isArray(settings.background.gradientStops)) {
        bgStore.setGradientStops(settings.background.gradientStops);
      }
      if (settings.background.gradientAngle !== undefined) {
        bgStore.setGradientAngle(settings.background.gradientAngle);
      }
      if (settings.background.particlesEnabled !== undefined) {
        bgStore.setParticlesEnabled(settings.background.particlesEnabled);
      }
      if (settings.background.particlesDensity !== undefined) {
        bgStore.setParticlesDensity(settings.background.particlesDensity);
      }
      if (settings.background.particlesIntensity !== undefined) {
        bgStore.setParticlesIntensity(settings.background.particlesIntensity);
      }
    }

    // Apply overlay settings
    if (settings.overlay) {
      const overlayStore = useOverlaySettings.getState();
      
      if (settings.overlay.font) {
        overlayStore.setFont(settings.overlay.font);
      }
      if (settings.overlay.position) {
        overlayStore.setPosition(settings.overlay.position);
      }
      if (settings.overlay.size !== undefined) {
        overlayStore.setSize(settings.overlay.size);
      }
      if (settings.overlay.animation) {
        overlayStore.setAnimation(settings.overlay.animation);
      }
    }

    // Apply particle settings (shorthand)
    if (settings.particles) {
      const bgStore = useBackgroundSettings.getState();
      
      if (settings.particles.enabled !== undefined) {
        bgStore.setParticlesEnabled(settings.particles.enabled);
      }
      if (settings.particles.density !== undefined) {
        bgStore.setParticlesDensity(settings.particles.density);
      }
      if (settings.particles.intensity !== undefined) {
        bgStore.setParticlesIntensity(settings.particles.intensity);
      }
    }
  } catch (error) {
    console.error('[applyPreset] Error applying preset:', error);
    throw error;
  }
}
