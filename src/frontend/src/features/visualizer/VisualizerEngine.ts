import { type VisualizerMode } from './useVisualizerEngine';
import { CircularSpectrum } from './modes/CircularSpectrum';
import { BarEqualizerHorizontal } from './modes/BarEqualizerHorizontal';
import { BarEqualizerVertical } from './modes/BarEqualizerVertical';
import { WaveformLine } from './modes/WaveformLine';
import { RadialNeonRing } from './modes/RadialNeonRing';
import { ParticleReactive } from './modes/ParticleReactive';
import { MinimalLofiGlow } from './modes/MinimalLofiGlow';

export class VisualizerEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private analyser: AnalyserNode | null = null;
  private animationId: number | null = null;
  private mode: VisualizerMode = 'circular-spectrum';
  private sensitivity: number = 1;
  private bassMultiplier: number = 1;
  private midMultiplier: number = 1;
  private trebleMultiplier: number = 1;
  private lastFrameTime: number = 0;
  private fps: number = 30;
  private frameInterval: number = 1000 / this.fps;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  setAnalyser(analyser: AnalyserNode) {
    this.analyser = analyser;
  }

  setMode(mode: VisualizerMode) {
    this.mode = mode;
  }

  setSensitivity(value: number) {
    this.sensitivity = value;
  }

  setBandMultipliers(bass: number, mid: number, treble: number) {
    this.bassMultiplier = bass;
    this.midMultiplier = mid;
    this.trebleMultiplier = treble;
  }

  start() {
    if (this.animationId !== null) return;
    this.lastFrameTime = performance.now();
    this.animate();
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.clearCanvas();
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    const now = performance.now();
    const elapsed = now - this.lastFrameTime;

    if (elapsed < this.frameInterval) return;

    this.lastFrameTime = now - (elapsed % this.frameInterval);

    if (!this.analyser) {
      this.clearCanvas();
      return;
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    // Apply sensitivity and band multipliers
    const processedData = this.processAudioData(dataArray);

    this.clearCanvas();
    this.renderMode(processedData);
  };

  private processAudioData(data: Uint8Array): Uint8Array {
    const processed = new Uint8Array(data.length);
    const bassEnd = Math.floor(data.length * 0.1);
    const midEnd = Math.floor(data.length * 0.5);

    for (let i = 0; i < data.length; i++) {
      let multiplier = this.sensitivity;
      if (i < bassEnd) {
        multiplier *= this.bassMultiplier;
      } else if (i < midEnd) {
        multiplier *= this.midMultiplier;
      } else {
        multiplier *= this.trebleMultiplier;
      }
      processed[i] = Math.min(255, data[i] * multiplier);
    }

    return processed;
  }

  private clearCanvas() {
    const width = this.canvas.width / window.devicePixelRatio;
    const height = this.canvas.height / window.devicePixelRatio;
    this.ctx.fillStyle = 'oklch(0.145 0 0)';
    this.ctx.fillRect(0, 0, width, height);
  }

  private renderMode(data: Uint8Array) {
    const width = this.canvas.width / window.devicePixelRatio;
    const height = this.canvas.height / window.devicePixelRatio;

    switch (this.mode) {
      case 'circular-spectrum':
        CircularSpectrum.render(this.ctx, data, width, height);
        break;
      case 'bar-horizontal':
        BarEqualizerHorizontal.render(this.ctx, data, width, height);
        break;
      case 'bar-vertical':
        BarEqualizerVertical.render(this.ctx, data, width, height);
        break;
      case 'waveform':
        WaveformLine.render(this.ctx, data, width, height);
        break;
      case 'radial-neon':
        RadialNeonRing.render(this.ctx, data, width, height);
        break;
      case 'particles':
        ParticleReactive.render(this.ctx, data, width, height);
        break;
      case 'lofi-glow':
        MinimalLofiGlow.render(this.ctx, data, width, height);
        break;
      case '3d-tunnel':
        // 3D tunnel would be implemented separately with WebGL
        this.ctx.fillStyle = 'oklch(0.708 0 0)';
        this.ctx.font = '16px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('3D Tunnel mode (WebGL) - Coming soon', width / 2, height / 2);
        break;
    }
  }
}
