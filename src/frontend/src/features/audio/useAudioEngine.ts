import { create } from 'zustand';

interface AudioEngineState {
  audioFile: File | null;
  audioContext: AudioContext | null;
  audioBuffer: AudioBuffer | null;
  analyser: AnalyserNode | null;
  source: AudioBufferSourceNode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  trimStart: number;
  trimEnd: number;
  fadeIn: number;
  fadeOut: number;
  loadAudio: (file: File) => Promise<void>;
  play: () => void;
  pause: () => void;
  setTrimStart: (value: number) => void;
  setTrimEnd: (value: number) => void;
  setFadeIn: (value: number) => void;
  setFadeOut: (value: number) => void;
}

export const useAudioEngine = create<AudioEngineState>((set, get) => ({
  audioFile: null,
  audioContext: null,
  audioBuffer: null,
  analyser: null,
  source: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  trimStart: 0,
  trimEnd: 0,
  fadeIn: 0,
  fadeOut: 0,

  loadAudio: async (file: File) => {
    const state = get();
    
    // Stop current playback
    if (state.source) {
      state.source.stop();
    }

    // Create or reuse AudioContext
    let audioContext = state.audioContext;
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    // Resume context if suspended
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Decode audio
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Create analyser
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.connect(audioContext.destination);

    set({
      audioFile: file,
      audioContext,
      audioBuffer,
      analyser,
      duration: audioBuffer.duration,
      trimEnd: audioBuffer.duration,
      isPlaying: false,
      currentTime: 0,
    });
  },

  play: () => {
    const state = get();
    if (!state.audioContext || !state.audioBuffer || !state.analyser) return;

    // Stop existing source
    if (state.source) {
      state.source.stop();
    }

    // Create new source
    const source = state.audioContext.createBufferSource();
    source.buffer = state.audioBuffer;
    source.connect(state.analyser);

    // Start playback
    const startTime = state.trimStart;
    const duration = state.trimEnd - state.trimStart;
    source.start(0, startTime, duration);

    set({ source, isPlaying: true });

    // Auto-stop at end
    source.onended = () => {
      set({ isPlaying: false });
    };
  },

  pause: () => {
    const state = get();
    if (state.source) {
      state.source.stop();
    }
    set({ isPlaying: false });
  },

  setTrimStart: (value: number) => set({ trimStart: value }),
  setTrimEnd: (value: number) => set({ trimEnd: value }),
  setFadeIn: (value: number) => set({ fadeIn: value }),
  setFadeOut: (value: number) => set({ fadeOut: value }),
}));
