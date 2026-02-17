import { create } from 'zustand';
import { useRef, useCallback, useEffect } from 'react';
import { useAudioEngine } from '../audio/useAudioEngine';
import { VisualizerEngine } from './VisualizerEngine';

export type VisualizerMode = 
  | 'circular-spectrum'
  | 'bar-horizontal'
  | 'bar-vertical'
  | 'waveform'
  | 'radial-neon'
  | 'particles'
  | 'lofi-glow'
  | '3d-tunnel';

interface VisualizerEngineState {
  mode: VisualizerMode;
  sensitivity: number;
  bassMultiplier: number;
  midMultiplier: number;
  trebleMultiplier: number;
  webglSupported: boolean;
  setMode: (mode: VisualizerMode) => void;
  setSensitivity: (value: number) => void;
  setBassMultiplier: (value: number) => void;
  setMidMultiplier: (value: number) => void;
  setTrebleMultiplier: (value: number) => void;
  setWebglSupported: (supported: boolean) => void;
  serialize: () => string;
  deserialize: (data: string) => void;
}

export const useVisualizerEngineStore = create<VisualizerEngineState>((set, get) => ({
  mode: 'circular-spectrum',
  sensitivity: 1,
  bassMultiplier: 1,
  midMultiplier: 1,
  trebleMultiplier: 1,
  webglSupported: true,
  setMode: (mode) => set({ mode }),
  setSensitivity: (value) => set({ sensitivity: value }),
  setBassMultiplier: (value) => set({ bassMultiplier: value }),
  setMidMultiplier: (value) => set({ midMultiplier: value }),
  setTrebleMultiplier: (value) => set({ trebleMultiplier: value }),
  setWebglSupported: (supported) => set({ webglSupported: supported }),
  
  serialize: () => {
    const state = get();
    return JSON.stringify({
      mode: state.mode,
      sensitivity: state.sensitivity,
      bassMultiplier: state.bassMultiplier,
      midMultiplier: state.midMultiplier,
      trebleMultiplier: state.trebleMultiplier,
    });
  },

  deserialize: (data) => {
    try {
      const parsed = JSON.parse(data);
      set({
        mode: parsed.mode || 'circular-spectrum',
        sensitivity: parsed.sensitivity || 1,
        bassMultiplier: parsed.bassMultiplier || 1,
        midMultiplier: parsed.midMultiplier || 1,
        trebleMultiplier: parsed.trebleMultiplier || 1,
      });
    } catch (error) {
      console.error('Failed to deserialize visualizer settings:', error);
    }
  },
}));

export function useVisualizerEngine() {
  const engineRef = useRef<VisualizerEngine | null>(null);
  const { analyser, isPlaying, smoothing } = useAudioEngine();
  const store = useVisualizerEngineStore();

  const initializeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    if (!engineRef.current) {
      engineRef.current = new VisualizerEngine(canvas);
      
      // Check WebGL support
      const supported = engineRef.current.isWebGLSupported();
      store.setWebglSupported(supported);
      
      if (!supported && store.mode === '3d-tunnel') {
        store.setMode('circular-spectrum');
      }
    }
  }, [store]);

  useEffect(() => {
    if (engineRef.current && analyser) {
      engineRef.current.setAnalyser(analyser);
    }
  }, [analyser]);

  useEffect(() => {
    if (engineRef.current) {
      if (isPlaying) {
        engineRef.current.start();
      } else {
        engineRef.current.stop();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setMode(store.mode);
    }
  }, [store.mode]);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setSensitivity(store.sensitivity);
      engineRef.current.setBandMultipliers(store.bassMultiplier, store.midMultiplier, store.trebleMultiplier);
      engineRef.current.setSmoothing(smoothing);
    }
  }, [store.sensitivity, store.bassMultiplier, store.midMultiplier, store.trebleMultiplier, smoothing]);

  return {
    initializeCanvas,
    ...store,
  };
}
