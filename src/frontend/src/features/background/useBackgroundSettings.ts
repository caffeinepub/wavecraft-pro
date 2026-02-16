import { create } from 'zustand';

export interface GradientStop {
  id: string;
  position: number; // 0-100
  color: string;
}

export interface BackgroundSettings {
  type: 'solid' | 'gradient' | 'image' | 'particles';
  solidColor: string;
  gradientStops: GradientStop[];
  gradientAngle: number;
  imageUrl: string | null;
  imageFile: File | null;
  particlesEnabled: boolean;
  particlesDensity: number;
  particlesIntensity: number;
}

interface BackgroundSettingsState extends BackgroundSettings {
  setType: (type: BackgroundSettings['type']) => void;
  setSolidColor: (color: string) => void;
  setGradientStops: (stops: GradientStop[]) => void;
  setGradientAngle: (angle: number) => void;
  setImage: (file: File) => void;
  clearImage: () => void;
  setParticlesEnabled: (enabled: boolean) => void;
  setParticlesDensity: (density: number) => void;
  setParticlesIntensity: (intensity: number) => void;
  addGradientStop: () => void;
  removeGradientStop: (id: string) => void;
  updateGradientStop: (id: string, updates: Partial<GradientStop>) => void;
  serialize: () => string;
  deserialize: (data: string) => void;
}

const defaultGradientStops: GradientStop[] = [
  { id: 'stop-1', position: 0, color: '#1a1a2e' },
  { id: 'stop-2', position: 100, color: '#16213e' },
];

export const useBackgroundSettings = create<BackgroundSettingsState>((set, get) => ({
  type: 'solid',
  solidColor: '#0a0a0f',
  gradientStops: defaultGradientStops,
  gradientAngle: 135,
  imageUrl: null,
  imageFile: null,
  particlesEnabled: false,
  particlesDensity: 50,
  particlesIntensity: 50,

  setType: (type) => set({ type }),
  setSolidColor: (color) => set({ solidColor: color }),
  setGradientStops: (stops) => set({ gradientStops: stops }),
  setGradientAngle: (angle) => set({ gradientAngle: angle }),
  
  setImage: (file) => {
    const url = URL.createObjectURL(file);
    set({ imageFile: file, imageUrl: url });
  },
  
  clearImage: () => {
    const state = get();
    if (state.imageUrl) {
      URL.revokeObjectURL(state.imageUrl);
    }
    set({ imageFile: null, imageUrl: null });
  },
  
  setParticlesEnabled: (enabled) => set({ particlesEnabled: enabled }),
  setParticlesDensity: (density) => set({ particlesDensity: density }),
  setParticlesIntensity: (intensity) => set({ particlesIntensity: intensity }),

  addGradientStop: () => {
    const state = get();
    const newStop: GradientStop = {
      id: `stop-${Date.now()}`,
      position: 50,
      color: '#ffffff',
    };
    set({ gradientStops: [...state.gradientStops, newStop].sort((a, b) => a.position - b.position) });
  },

  removeGradientStop: (id) => {
    const state = get();
    if (state.gradientStops.length <= 2) return; // Keep at least 2 stops
    set({ gradientStops: state.gradientStops.filter(stop => stop.id !== id) });
  },

  updateGradientStop: (id, updates) => {
    const state = get();
    set({
      gradientStops: state.gradientStops.map(stop =>
        stop.id === id ? { ...stop, ...updates } : stop
      ).sort((a, b) => a.position - b.position),
    });
  },

  serialize: () => {
    const state = get();
    return JSON.stringify({
      type: state.type,
      solidColor: state.solidColor,
      gradientStops: state.gradientStops,
      gradientAngle: state.gradientAngle,
      particlesEnabled: state.particlesEnabled,
      particlesDensity: state.particlesDensity,
      particlesIntensity: state.particlesIntensity,
    });
  },

  deserialize: (data) => {
    try {
      const parsed = JSON.parse(data);
      set({
        type: parsed.type || 'solid',
        solidColor: parsed.solidColor || '#0a0a0f',
        gradientStops: parsed.gradientStops || defaultGradientStops,
        gradientAngle: parsed.gradientAngle || 135,
        particlesEnabled: parsed.particlesEnabled || false,
        particlesDensity: parsed.particlesDensity || 50,
        particlesIntensity: parsed.particlesIntensity || 50,
      });
    } catch (error) {
      console.error('Failed to deserialize background settings:', error);
    }
  },
}));
