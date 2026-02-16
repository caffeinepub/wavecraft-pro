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
  setMode: (mode: VisualizerMode) => void;
  setSensitivity: (value: number) => void;
  setBassMultiplier: (value: number) => void;
  setMidMultiplier: (value: number) => void;
  setTrebleMultiplier: (value: number) => void;
}

export const useVisualizerEngineStore = create<VisualizerEngineState>((set) => ({
  mode: 'circular-spectrum',
  sensitivity: 1,
  bassMultiplier: 1,
  midMultiplier: 1,
  trebleMultiplier: 1,
  setMode: (mode) => set({ mode }),
  setSensitivity: (value) => set({ sensitivity: value }),
  setBassMultiplier: (value) => set({ bassMultiplier: value }),
  setMidMultiplier: (value) => set({ midMultiplier: value }),
  setTrebleMultiplier: (value) => set({ trebleMultiplier: value }),
}));

export function useVisualizerEngine() {
  const engineRef = useRef<VisualizerEngine | null>(null);
  const { analyser, isPlaying } = useAudioEngine();
  const store = useVisualizerEngineStore();

  const initializeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    if (!engineRef.current) {
      engineRef.current = new VisualizerEngine(canvas);
    }
  }, []);

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
    }
  }, [store.sensitivity, store.bassMultiplier, store.midMultiplier, store.trebleMultiplier]);

  return {
    initializeCanvas,
    ...store,
  };
}
