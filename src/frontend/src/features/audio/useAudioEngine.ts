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
  waveformPeaks: number[];
  beatDetectionEnabled: boolean;
  beatTimestamps: number[];
  smoothing: number;
  loadAudio: (file: File) => Promise<void>;
  play: () => void;
  pause: () => void;
  setTrimStart: (value: number) => void;
  setTrimEnd: (value: number) => void;
  setFadeIn: (value: number) => void;
  setFadeOut: (value: number) => void;
  setBeatDetectionEnabled: (enabled: boolean) => void;
  setSmoothing: (value: number) => void;
}

// Generate waveform peaks from audio buffer
function generateWaveformPeaks(audioBuffer: AudioBuffer, numPeaks: number = 100): number[] {
  const channelData = audioBuffer.getChannelData(0);
  const blockSize = Math.floor(channelData.length / numPeaks);
  const peaks: number[] = [];

  for (let i = 0; i < numPeaks; i++) {
    const start = i * blockSize;
    const end = start + blockSize;
    let max = 0;

    for (let j = start; j < end && j < channelData.length; j++) {
      const abs = Math.abs(channelData[j]);
      if (abs > max) {
        max = abs;
      }
    }

    peaks.push(max);
  }

  return peaks;
}

// Simple beat detection (energy-based)
function detectBeats(audioBuffer: AudioBuffer): number[] {
  const channelData = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;
  const windowSize = Math.floor(sampleRate * 0.05); // 50ms windows
  const beats: number[] = [];
  
  // Calculate energy for each window
  const energies: number[] = [];
  for (let i = 0; i < channelData.length; i += windowSize) {
    let energy = 0;
    for (let j = i; j < i + windowSize && j < channelData.length; j++) {
      energy += channelData[j] * channelData[j];
    }
    energies.push(energy / windowSize);
  }

  // Find average energy
  const avgEnergy = energies.reduce((a, b) => a + b, 0) / energies.length;
  const threshold = avgEnergy * 1.5;

  // Detect beats where energy exceeds threshold
  for (let i = 1; i < energies.length; i++) {
    if (energies[i] > threshold && energies[i] > energies[i - 1]) {
      const timeInSeconds = (i * windowSize) / sampleRate;
      beats.push(timeInSeconds);
    }
  }

  return beats;
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
  waveformPeaks: [],
  beatDetectionEnabled: true,
  beatTimestamps: [],
  smoothing: 0.5,

  loadAudio: async (file: File) => {
    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size exceeds 50MB limit. Please choose a smaller file.');
    }

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

    // Generate waveform peaks
    const peaks = generateWaveformPeaks(audioBuffer, 150);

    // Detect beats if enabled
    let beats: number[] = [];
    if (state.beatDetectionEnabled) {
      try {
        beats = detectBeats(audioBuffer);
      } catch (error) {
        console.error('Beat detection failed:', error);
      }
    }

    set({
      audioFile: file,
      audioContext,
      audioBuffer,
      analyser,
      duration: audioBuffer.duration,
      trimEnd: audioBuffer.duration,
      isPlaying: false,
      currentTime: 0,
      waveformPeaks: peaks,
      beatTimestamps: beats,
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
  setBeatDetectionEnabled: (enabled: boolean) => set({ beatDetectionEnabled: enabled }),
  setSmoothing: (value: number) => set({ smoothing: value }),
}));
