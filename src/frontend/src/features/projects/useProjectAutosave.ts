import { useEffect, useRef, useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useActor } from '../../hooks/useActor';
import { useCurrentProject } from './useCurrentProject';
import { useBackgroundSettings } from '../background/useBackgroundSettings';
import { useOverlaySettings } from '../overlays/useOverlaySettings';
import { useVisualizerEngineStore } from '../visualizer/useVisualizerEngine';
import { useCanvasSettings } from '../canvas/useCanvasSettings';
import { encodeBackgroundSettings, encodeBrandingSettings, encodeTunnelSettings } from '../persistence/projectSettingsCodec';

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useProjectAutosave() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const { currentProjectId } = useCurrentProject();
  const [status, setStatus] = useState<AutosaveStatus>('idle');
  const lastSavedSnapshotRef = useRef<string>('');
  const autosaveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getCurrentSnapshot = () => {
    const bgSettings = useBackgroundSettings.getState().serialize();
    const overlaySettings = useOverlaySettings.getState().serialize();
    const vizSettings = useVisualizerEngineStore.getState().serialize();
    const canvasSettings = useCanvasSettings.getState().serialize();
    
    return JSON.stringify({
      bg: bgSettings,
      overlay: overlaySettings,
      viz: vizSettings,
      canvas: canvasSettings,
    });
  };

  const performAutosave = async () => {
    if (!identity || !actor || !currentProjectId) {
      return;
    }

    const currentSnapshot = getCurrentSnapshot();
    
    // Check if settings have changed
    if (currentSnapshot === lastSavedSnapshotRef.current) {
      return; // No changes, skip autosave
    }

    try {
      setStatus('saving');

      // Fetch current project to get all fields
      const project = await actor.getProject(currentProjectId);

      const bgSettings = useBackgroundSettings.getState();
      const overlaySettings = useOverlaySettings.getState();
      const vizSettings = useVisualizerEngineStore.getState();

      const backgroundSettingsEncoded = encodeBackgroundSettings(bgSettings.serialize());
      const brandingSettingsEncoded = encodeBrandingSettings(overlaySettings.serialize());
      const tunnelSettingsEncoded = encodeTunnelSettings(vizSettings.serialize());

      await actor.updateProject(
        currentProjectId,
        project.name,
        project.polarity,
        project.bpm,
        project.musicalKey,
        project.refPoints,
        backgroundSettingsEncoded,
        brandingSettingsEncoded,
        tunnelSettingsEncoded,
        project.image || null,
        project.published,
        project.isShared
      );

      lastSavedSnapshotRef.current = currentSnapshot;
      setStatus('saved');
      
      // Reset to idle after 2 seconds
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      console.error('Autosave failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Update last saved snapshot when manual save occurs or project changes
  useEffect(() => {
    if (currentProjectId) {
      lastSavedSnapshotRef.current = getCurrentSnapshot();
    }
  }, [currentProjectId]);

  // Setup autosave interval
  useEffect(() => {
    if (identity && currentProjectId) {
      // Clear existing interval
      if (autosaveIntervalRef.current) {
        clearInterval(autosaveIntervalRef.current);
      }

      // Start new autosave interval (30 seconds)
      autosaveIntervalRef.current = setInterval(() => {
        performAutosave();
      }, 30000);

      return () => {
        if (autosaveIntervalRef.current) {
          clearInterval(autosaveIntervalRef.current);
        }
      };
    }
  }, [identity, currentProjectId, actor]);

  const markAsSaved = () => {
    lastSavedSnapshotRef.current = getCurrentSnapshot();
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return {
    status,
    markAsSaved,
  };
}
