import type { Project } from '../../backend';
import { useBackgroundSettings } from '../background/useBackgroundSettings';
import { useOverlaySettings } from '../overlays/useOverlaySettings';
import { useVisualizerEngineStore } from '../visualizer/useVisualizerEngine';
import { useCanvasSettings } from '../canvas/useCanvasSettings';

export function applyLoadedProject(project: Project) {
  // Apply background settings - use the full serialized data from style field
  const bgSettings = useBackgroundSettings.getState();
  try {
    // The style field contains the full serialized background settings
    bgSettings.deserialize(project.backgroundSettings.style);
  } catch (error) {
    console.error('Failed to apply background settings:', error);
    // Fallback: try to use just the color if full deserialization fails
    bgSettings.setSolidColor(project.backgroundSettings.color);
    bgSettings.setType('solid');
  }

  // Apply overlay settings - use the full serialized data from font field
  const overlaySettings = useOverlaySettings.getState();
  try {
    overlaySettings.deserialize(project.brandingSettings.font);
  } catch (error) {
    console.error('Failed to apply overlay settings:', error);
  }

  // Apply visualizer settings - use the full serialized data from mode field
  const vizSettings = useVisualizerEngineStore.getState();
  try {
    const parsed = JSON.parse(project.tunnelSettings.mode);
    
    // Check if canvas settings are included
    if (parsed.canvas) {
      const canvasSettings = useCanvasSettings.getState();
      canvasSettings.deserialize(parsed.canvas);
      delete parsed.canvas;
    }
    
    vizSettings.deserialize(JSON.stringify(parsed));
  } catch (error) {
    console.error('Failed to apply visualizer settings:', error);
  }
}
