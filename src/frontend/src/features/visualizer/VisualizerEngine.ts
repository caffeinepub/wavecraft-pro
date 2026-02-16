import { type VisualizerMode } from './useVisualizerEngine';
import { CircularSpectrum } from './modes/CircularSpectrum';
import { BarEqualizerHorizontal } from './modes/BarEqualizerHorizontal';
import { BarEqualizerVertical } from './modes/BarEqualizerVertical';
import { WaveformLine } from './modes/WaveformLine';
import { RadialNeonRing } from './modes/RadialNeonRing';
import { ParticleReactive } from './modes/ParticleReactive';
import { MinimalLofiGlow } from './modes/MinimalLofiGlow';
import { Tunnel3DWebGL } from './modes/Tunnel3DWebGL';
import { renderSolidBackground, renderGradientBackground, renderImageBackground } from '../background/backgroundRenderers';
import { renderTextOverlay, renderLogoOverlay, renderWatermark } from '../overlays/overlayRenderers';
import { ParticlesOverlay } from '../background/particlesOverlay';
import { useBackgroundSettings } from '../background/useBackgroundSettings';
import { useOverlaySettings } from '../overlays/useOverlaySettings';

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
  private tunnel3D: Tunnel3DWebGL | null = null;
  private particlesOverlay: ParticlesOverlay | null = null;
  private backgroundImage: HTMLImageElement | null = null;
  private logoImage: HTMLImageElement | null = null;
  private animationStartTime: number = 0;

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
    
    if (this.particlesOverlay) {
      const width = this.canvas.width / window.devicePixelRatio;
      const height = this.canvas.height / window.devicePixelRatio;
      this.particlesOverlay.resize(width, height);
    }
  }

  setAnalyser(analyser: AnalyserNode) {
    this.analyser = analyser;
    if (this.tunnel3D) {
      this.tunnel3D.setAnalyser(analyser);
    }
  }

  setMode(mode: VisualizerMode) {
    const previousMode = this.mode;
    this.mode = mode;

    if (previousMode === '3d-tunnel' && this.tunnel3D) {
      this.tunnel3D.dispose();
      this.tunnel3D = null;
    }

    if (mode === '3d-tunnel') {
      this.tunnel3D = new Tunnel3DWebGL(this.canvas);
      if (this.analyser) {
        this.tunnel3D.setAnalyser(this.analyser);
      }
    }
  }

  setSensitivity(value: number) {
    this.sensitivity = value;
  }

  setBandMultipliers(bass: number, mid: number, treble: number) {
    this.bassMultiplier = bass;
    this.midMultiplier = mid;
    this.trebleMultiplier = treble;
  }

  isWebGLSupported(): boolean {
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      return !!gl;
    } catch {
      return false;
    }
  }

  start() {
    if (this.animationId !== null) return;
    this.lastFrameTime = performance.now();
    this.animationStartTime = Date.now();
    
    if (this.mode === '3d-tunnel' && this.tunnel3D) {
      this.tunnel3D.start();
    } else {
      this.animate();
    }
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    if (this.tunnel3D) {
      this.tunnel3D.stop();
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

    const processedData = this.processAudioData(dataArray);

    this.renderFrame(processedData);
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

  private renderFrame(data: Uint8Array) {
    const width = this.canvas.width / window.devicePixelRatio;
    const height = this.canvas.height / window.devicePixelRatio;

    // Render background
    this.renderBackground(width, height);

    // Render visualizer
    this.renderMode(data, width, height);

    // Render particles overlay if enabled
    const bgSettings = useBackgroundSettings.getState();
    if (bgSettings.particlesEnabled) {
      if (!this.particlesOverlay) {
        this.particlesOverlay = new ParticlesOverlay(this.ctx, width, height);
      }
      this.particlesOverlay.setDensity(bgSettings.particlesDensity);
      this.particlesOverlay.setIntensity(bgSettings.particlesIntensity);
      this.particlesOverlay.render();
    } else if (this.particlesOverlay) {
      this.particlesOverlay.dispose();
      this.particlesOverlay = null;
    }

    // Render overlays
    this.renderOverlays(width, height);
  }

  private renderBackground(width: number, height: number) {
    const settings = useBackgroundSettings.getState();

    switch (settings.type) {
      case 'solid':
        renderSolidBackground(this.ctx, width, height, settings.solidColor);
        break;
      case 'gradient':
        renderGradientBackground(this.ctx, width, height, settings.gradientStops, settings.gradientAngle);
        break;
      case 'image':
        if (settings.imageUrl) {
          if (!this.backgroundImage || this.backgroundImage.src !== settings.imageUrl) {
            this.backgroundImage = new Image();
            this.backgroundImage.src = settings.imageUrl;
          }
          if (this.backgroundImage.complete) {
            renderImageBackground(this.ctx, width, height, this.backgroundImage);
          } else {
            renderSolidBackground(this.ctx, width, height, '#0a0a0f');
          }
        } else {
          renderSolidBackground(this.ctx, width, height, '#0a0a0f');
        }
        break;
      default:
        renderSolidBackground(this.ctx, width, height, '#0a0a0f');
    }
  }

  private renderOverlays(width: number, height: number) {
    const settings = useOverlaySettings.getState();
    const animationDuration = 1000; // 1 second
    const elapsed = Date.now() - this.animationStartTime;
    const animationProgress = Math.min(elapsed / animationDuration, 1);

    // Render text overlay
    if (settings.title || settings.artist) {
      renderTextOverlay(this.ctx, width, height, settings, animationProgress);
    }

    // Render logo
    if (settings.logoUrl) {
      if (!this.logoImage || this.logoImage.src !== settings.logoUrl) {
        this.logoImage = new Image();
        this.logoImage.src = settings.logoUrl;
      }
      if (this.logoImage.complete) {
        renderLogoOverlay(this.ctx, width, height, this.logoImage, settings.position);
      }
    }

    // Render watermark
    if (settings.watermarkEnabled) {
      renderWatermark(this.ctx, width, height);
    }
  }

  private clearCanvas() {
    const width = this.canvas.width / window.devicePixelRatio;
    const height = this.canvas.height / window.devicePixelRatio;
    this.ctx.fillStyle = 'oklch(0.145 0 0)';
    this.ctx.fillRect(0, 0, width, height);
  }

  private renderMode(data: Uint8Array, width: number, height: number) {
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
        // Handled separately
        break;
    }
  }
}
