import { create } from 'zustand';

export interface OverlaySettings {
  title: string;
  artist: string;
  font: string;
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  size: number;
  animation: 'none' | 'fade-in' | 'slide-in' | 'zoom-in';
  logoFile: File | null;
  logoUrl: string | null;
  watermarkEnabled: boolean;
}

interface OverlaySettingsState extends OverlaySettings {
  setTitle: (title: string) => void;
  setArtist: (artist: string) => void;
  setFont: (font: string) => void;
  setPosition: (position: OverlaySettings['position']) => void;
  setSize: (size: number) => void;
  setAnimation: (animation: OverlaySettings['animation']) => void;
  setLogo: (file: File) => void;
  clearLogo: () => void;
  setWatermarkEnabled: (enabled: boolean) => void;
  serialize: () => string;
  deserialize: (data: string) => void;
}

export const useOverlaySettings = create<OverlaySettingsState>((set, get) => ({
  title: '',
  artist: '',
  font: 'Inter',
  position: 'bottom-left',
  size: 24,
  animation: 'fade-in',
  logoFile: null,
  logoUrl: null,
  watermarkEnabled: false,

  setTitle: (title) => set({ title }),
  setArtist: (artist) => set({ artist }),
  setFont: (font) => set({ font }),
  setPosition: (position) => set({ position }),
  setSize: (size) => set({ size }),
  setAnimation: (animation) => set({ animation }),
  
  setLogo: (file) => {
    const url = URL.createObjectURL(file);
    set({ logoFile: file, logoUrl: url });
  },
  
  clearLogo: () => {
    const state = get();
    if (state.logoUrl) {
      URL.revokeObjectURL(state.logoUrl);
    }
    set({ logoFile: null, logoUrl: null });
  },
  
  setWatermarkEnabled: (enabled) => set({ watermarkEnabled: enabled }),

  serialize: () => {
    const state = get();
    return JSON.stringify({
      title: state.title,
      artist: state.artist,
      font: state.font,
      position: state.position,
      size: state.size,
      animation: state.animation,
      watermarkEnabled: state.watermarkEnabled,
    });
  },

  deserialize: (data) => {
    try {
      const parsed = JSON.parse(data);
      set({
        title: parsed.title || '',
        artist: parsed.artist || '',
        font: parsed.font || 'Inter',
        position: parsed.position || 'bottom-left',
        size: parsed.size || 24,
        animation: parsed.animation || 'fade-in',
        watermarkEnabled: parsed.watermarkEnabled || false,
      });
    } catch (error) {
      console.error('Failed to deserialize overlay settings:', error);
    }
  },
}));
