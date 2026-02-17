import { VisualizerMode } from './useVisualizerEngine';
import { useBackgroundSettings } from '../background/useBackgroundSettings';
import { useOverlaySettings } from '../overlays/useOverlaySettings';
import { renderSolidBackground, renderGradientBackground, renderImageBackground } from '../background/backgroundRenderers';
import { ParticlesOverlay } from '../background/particlesOverlay';
import { renderTextOverlay, renderLogoOverlay, renderWatermark } from '../overlays/overlayRenderers';
import { CircularSpectrum } from './modes/CircularSpectrum';
import { BarEqualizerHorizontal } from './modes/BarEqualizerHorizontal';
import { BarEqualizerVertical } from './modes/BarEqualizerVertical';
import { WaveformLine } from './modes/WaveformLine';
import { RadialNeonRing } from './modes/RadialNeonRing';
import { ParticleReactive } from './modes/ParticleReactive';
import { MinimalLofiGlow } from './modes/MinimalLofiGlow';
import { Tunnel3DWebGL } from './modes/Tunnel3DWebGL';

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
  private smoothing: number = 0.5;
  private smoothedData: Uint8Array | null = null;
  private tunnel3D: Tunnel3DWebGL | null = null;
  private particlesOverlay: ParticlesOverlay | null = null;
  private backgroundImage: HTMLImageElement | null = null;
  private logoImage: HTMLImageElement | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');
    this.ctx = ctx;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    
    // Reinitialize particles overlay with new dimensions
    if (this.particlesOverlay) {
      this.particlesOverlay.resize(rect.width, rect.height);
    }
  }

  setAnalyser(analyser: AnalyserNode) {
    this.analyser = analyser;
    this.smoothedData = new Uint8Array(analyser.frequencyBinCount);
    
    if (this.tunnel3D) {
      this.tunnel3D.setAnalyser(analyser);
    }
  }

  setMode(mode: VisualizerMode) {
    this.mode = mode;
    
    // Clean up 3D tunnel if switching away
    if (mode !== '3d-tunnel' && this.tunnel3D) {
      this.tunnel3D.dispose();
      this.tunnel3D = null;
    }
    
    // Initialize 3D tunnel if switching to it
    if (mode === '3d-tunnel' && !this.tunnel3D && this.isWebGLSupported()) {
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

  setSmoothing(value: number) {
    this.smoothing = value;
  }

  isWebGLSupported(): boolean {
    try {
      const testCanvas = document.createElement('canvas');
      return !!(testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  }

  start() {
    if (this.animationId !== null) return;
    
    if (this.mode === '3d-tunnel' && this.tunnel3D) {
      this.tunnel3D.start();
    }
    
    this.render();
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    if (this.tunnel3D) {
      this.tunnel3D.stop();
    }
  }

  private applySmoothing(currentData: Uint8Array): Uint8Array {
    if (!this.smoothedData || this.smoothedData.length !== currentData.length) {
      this.smoothedData = new Uint8Array(currentData);
      return currentData;
    }

    const alpha = 1 - this.smoothing;
    for (let i = 0; i < currentData.length; i++) {
      this.smoothedData[i] = alpha * currentData[i] + (1 - alpha) * this.smoothedData[i];
    }

    return this.smoothedData;
  }

  private loadBackgroundImage(url: string) {
    if (this.backgroundImage && this.backgroundImage.src === url) {
      return; // Already loaded
    }
    
    const img = new Image();
    img.onload = () => {
      this.backgroundImage = img;
    };
    img.onerror = () => {
      console.error('Failed to load background image');
      this.backgroundImage = null;
    };
    img.src = url;
  }

  private loadLogoImage(url: string) {
    if (this.logoImage && this.logoImage.src === url) {
      return; // Already loaded
    }
    
    const img = new Image();
    img.onload = () => {
      this.logoImage = img;
    };
    img.onerror = () => {
      console.error('Failed to load logo image');
      this.logoImage = null;
    };
    img.src = url;
  }

  private render = () => {
    this.animationId = requestAnimationFrame(this.render);

    if (!this.analyser) return;

    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Get frequency data
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    // Apply smoothing
    const smoothedData = this.applySmoothing(dataArray);

    // Apply band multipliers
    const bassEnd = Math.floor(smoothedData.length * 0.1);
    const midEnd = Math.floor(smoothedData.length * 0.5);

    for (let i = 0; i < bassEnd; i++) {
      smoothedData[i] = Math.min(255, smoothedData[i] * this.bassMultiplier);
    }
    for (let i = bassEnd; i < midEnd; i++) {
      smoothedData[i] = Math.min(255, smoothedData[i] * this.midMultiplier);
    }
    for (let i = midEnd; i < smoothedData.length; i++) {
      smoothedData[i] = Math.min(255, smoothedData[i] * this.trebleMultiplier);
    }

    // Apply sensitivity
    for (let i = 0; i < smoothedData.length; i++) {
      smoothedData[i] = Math.min(255, smoothedData[i] * this.sensitivity);
    }

    // For 3D tunnel mode, use WebGL rendering
    if (this.mode === '3d-tunnel' && this.tunnel3D) {
      // Tunnel renders itself via its own animation loop
      // Just render overlays on top using 2D context
      const overlaySettings = useOverlaySettings.getState();
      
      if (overlaySettings.title || overlaySettings.artist) {
        renderTextOverlay(this.ctx, width, height, overlaySettings, Date.now() / 1000);
      }
      
      if (overlaySettings.logoUrl) {
        this.loadLogoImage(overlaySettings.logoUrl);
        if (this.logoImage && this.logoImage.complete) {
          renderLogoOverlay(this.ctx, width, height, this.logoImage, overlaySettings.position);
        }
      }
      
      if (overlaySettings.watermarkEnabled) {
        renderWatermark(this.ctx, width, height);
      }
      
      return;
    }

    // Clear canvas for 2D modes
    this.ctx.clearRect(0, 0, width, height);

    // 1. Render background first
    const bgSettings = useBackgroundSettings.getState();
    switch (bgSettings.type) {
      case 'solid':
        renderSolidBackground(this.ctx, width, height, bgSettings.solidColor);
        break;
      case 'gradient':
        renderGradientBackground(this.ctx, width, height, bgSettings.gradientStops, bgSettings.gradientAngle);
        break;
      case 'image':
        if (bgSettings.imageUrl) {
          this.loadBackgroundImage(bgSettings.imageUrl);
          if (this.backgroundImage && this.backgroundImage.complete) {
            renderImageBackground(this.ctx, width, height, this.backgroundImage);
          } else {
            // Fallback to solid color while image loads
            renderSolidBackground(this.ctx, width, height, bgSettings.solidColor);
          }
        } else {
          renderSolidBackground(this.ctx, width, height, bgSettings.solidColor);
        }
        break;
    }

    // 2. Render visualizer mode
    switch (this.mode) {
      case 'circular-spectrum':
        CircularSpectrum.render(this.ctx, smoothedData, width, height);
        break;
      case 'bar-horizontal':
        BarEqualizerHorizontal.render(this.ctx, smoothedData, width, height);
        break;
      case 'bar-vertical':
        BarEqualizerVertical.render(this.ctx, smoothedData, width, height);
        break;
      case 'waveform':
        WaveformLine.render(this.ctx, smoothedData, width, height);
        break;
      case 'radial-neon':
        RadialNeonRing.render(this.ctx, smoothedData, width, height);
        break;
      case 'particles':
        ParticleReactive.render(this.ctx, smoothedData, width, height);
        break;
      case 'lofi-glow':
        MinimalLofiGlow.render(this.ctx, smoothedData, width, height);
        break;
    }

    // 3. Render particles overlay if enabled
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

    // 4. Render text and branding overlays
    const overlaySettings = useOverlaySettings.getState();
    
    if (overlaySettings.title || overlaySettings.artist) {
      renderTextOverlay(this.ctx, width, height, overlaySettings, Date.now() / 1000);
    }
    
    if (overlaySettings.logoUrl) {
      this.loadLogoImage(overlaySettings.logoUrl);
      if (this.logoImage && this.logoImage.complete) {
        renderLogoOverlay(this.ctx, width, height, this.logoImage, overlaySettings.position);
      }
    }
    
    if (overlaySettings.watermarkEnabled) {
      renderWatermark(this.ctx, width, height);
    }
  };
}
