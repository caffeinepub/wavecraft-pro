import { create } from 'zustand';

export type AspectRatioPreset = '16:9' | '9:16' | '1:1';

export interface CanvasResolution {
  width: number;
  height: number;
}

export interface CanvasSettings {
  aspectRatio: AspectRatioPreset;
  resolution: CanvasResolution;
}

interface CanvasSettingsState extends CanvasSettings {
  setAspectRatio: (preset: AspectRatioPreset) => void;
  applyYouTubePreset: () => void;
  serialize: () => string;
  deserialize: (data: string) => void;
}

const ASPECT_RATIO_PRESETS: Record<AspectRatioPreset, CanvasResolution> = {
  '16:9': { width: 1280, height: 720 },
  '9:16': { width: 1080, height: 1920 },
  '1:1': { width: 1080, height: 1080 },
};

export const useCanvasSettings = create<CanvasSettingsState>((set, get) => ({
  aspectRatio: '16:9',
  resolution: ASPECT_RATIO_PRESETS['16:9'],

  setAspectRatio: (preset) => {
    set({
      aspectRatio: preset,
      resolution: ASPECT_RATIO_PRESETS[preset],
    });
  },

  applyYouTubePreset: () => {
    set({
      aspectRatio: '16:9',
      resolution: ASPECT_RATIO_PRESETS['16:9'],
    });
  },

  serialize: () => {
    const state = get();
    return JSON.stringify({
      aspectRatio: state.aspectRatio,
      resolution: state.resolution,
    });
  },

  deserialize: (data) => {
    try {
      const parsed = JSON.parse(data);
      const aspectRatio = parsed.aspectRatio || '16:9';
      set({
        aspectRatio,
        resolution: parsed.resolution || ASPECT_RATIO_PRESETS[aspectRatio],
      });
    } catch (error) {
      console.error('Failed to deserialize canvas settings:', error);
      set({
        aspectRatio: '16:9',
        resolution: ASPECT_RATIO_PRESETS['16:9'],
      });
    }
  },
}));
