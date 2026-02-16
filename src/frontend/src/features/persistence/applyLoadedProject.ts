import type { Project } from '../../backend';
import { useBackgroundSettings } from '../background/useBackgroundSettings';
import { useOverlaySettings } from '../overlays/useOverlaySettings';
import { useVisualizerEngineStore } from '../visualizer/useVisualizerEngine';

export function applyLoadedProject(project: Project) {
  // Apply background settings
  const bgSettings = useBackgroundSettings.getState();
  bgSettings.deserialize(project.backgroundSettings.style);

  // Apply overlay settings
  const overlaySettings = useOverlaySettings.getState();
  overlaySettings.deserialize(project.brandingSettings.font);

  // Apply visualizer settings
  const vizSettings = useVisualizerEngineStore.getState();
  vizSettings.deserialize(project.tunnelSettings.mode);
}
