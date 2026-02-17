import { VisualizerMode } from '../visualizer/useVisualizerEngine';
import { GradientStop } from '../background/useBackgroundSettings';

export interface PresetItem {
  id: string;
  name: string;
  description: string;
  category: PresetCategory;
  settings: PresetSettings;
}

export type PresetCategory = 'visualizers' | 'backgrounds' | 'text-fonts' | 'particles' | 'effects';

export interface PresetSettings {
  visualizer?: {
    mode: VisualizerMode;
    sensitivity?: number;
    bassMultiplier?: number;
    midMultiplier?: number;
    trebleMultiplier?: number;
  };
  background?: {
    type: 'solid' | 'gradient' | 'image' | 'particles';
    solidColor?: string;
    gradientStops?: GradientStop[];
    gradientAngle?: number;
    particlesEnabled?: boolean;
    particlesDensity?: number;
    particlesIntensity?: number;
  };
  overlay?: {
    font?: string;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    size?: number;
    animation?: 'none' | 'fade-in' | 'slide-in' | 'zoom-in';
  };
  particles?: {
    enabled: boolean;
    density: number;
    intensity: number;
  };
}

// ============ VISUALIZERS ============
const VISUALIZER_PRESETS: PresetItem[] = [
  {
    id: 'viz-neon-pulse',
    name: 'Neon Pulse',
    description: 'Radial neon rings with high bass response',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'radial-neon',
        sensitivity: 1.2,
        bassMultiplier: 1.5,
        midMultiplier: 1.0,
        trebleMultiplier: 0.8,
      },
    },
  },
  {
    id: 'viz-circular-spectrum',
    name: 'Circular Spectrum',
    description: 'Classic circular frequency analyzer',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'circular-spectrum',
        sensitivity: 1.0,
        bassMultiplier: 1.0,
        midMultiplier: 1.0,
        trebleMultiplier: 1.0,
      },
    },
  },
  {
    id: 'viz-lofi-glow',
    name: 'Lo-Fi Glow',
    description: 'Soft ambient glow with subtle waveform',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'lofi-glow',
        sensitivity: 0.8,
        bassMultiplier: 1.2,
        midMultiplier: 1.0,
        trebleMultiplier: 0.7,
      },
    },
  },
  {
    id: 'viz-bar-horizontal',
    name: 'Horizontal Bars',
    description: 'Classic horizontal equalizer bars',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'bar-horizontal',
        sensitivity: 1.0,
        bassMultiplier: 1.0,
        midMultiplier: 1.0,
        trebleMultiplier: 1.0,
      },
    },
  },
  {
    id: 'viz-waveform',
    name: 'Waveform Line',
    description: 'Smooth waveform line visualization',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'waveform',
        sensitivity: 1.0,
        bassMultiplier: 1.0,
        midMultiplier: 1.0,
        trebleMultiplier: 1.0,
      },
    },
  },
  {
    id: 'viz-3d-tunnel',
    name: '3D Tunnel',
    description: 'Immersive 3D tunnel effect (WebGL)',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: '3d-tunnel',
        sensitivity: 1.0,
        bassMultiplier: 1.3,
        midMultiplier: 1.0,
        trebleMultiplier: 0.9,
      },
    },
  },
  {
    id: 'viz-bass-heavy-neon',
    name: 'Bass Heavy Neon',
    description: 'Neon rings tuned for bass-heavy tracks',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'radial-neon',
        sensitivity: 1.4,
        bassMultiplier: 2.0,
        midMultiplier: 0.8,
        trebleMultiplier: 0.6,
      },
    },
  },
  {
    id: 'viz-treble-focus',
    name: 'Treble Focus',
    description: 'Circular spectrum emphasizing high frequencies',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'circular-spectrum',
        sensitivity: 1.3,
        bassMultiplier: 0.7,
        midMultiplier: 1.0,
        trebleMultiplier: 1.8,
      },
    },
  },
  {
    id: 'viz-balanced-bars',
    name: 'Balanced Bars',
    description: 'Vertical bars with balanced frequency response',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'bar-vertical',
        sensitivity: 1.1,
        bassMultiplier: 1.1,
        midMultiplier: 1.1,
        trebleMultiplier: 1.1,
      },
    },
  },
  {
    id: 'viz-smooth-wave',
    name: 'Smooth Wave',
    description: 'Gentle waveform with reduced sensitivity',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'waveform',
        sensitivity: 0.7,
        bassMultiplier: 1.0,
        midMultiplier: 1.0,
        trebleMultiplier: 1.0,
      },
    },
  },
  {
    id: 'viz-particle-burst',
    name: 'Particle Burst',
    description: 'Reactive particles with high sensitivity',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'particles',
        sensitivity: 1.5,
        bassMultiplier: 1.4,
        midMultiplier: 1.2,
        trebleMultiplier: 1.0,
      },
    },
  },
  {
    id: 'viz-tunnel-deep',
    name: 'Deep Tunnel',
    description: '3D tunnel with enhanced bass depth',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: '3d-tunnel',
        sensitivity: 1.2,
        bassMultiplier: 1.6,
        midMultiplier: 1.0,
        trebleMultiplier: 0.8,
      },
    },
  },
  {
    id: 'viz-minimal-bars',
    name: 'Minimal Bars',
    description: 'Subtle horizontal bars for clean look',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'bar-horizontal',
        sensitivity: 0.8,
        bassMultiplier: 0.9,
        midMultiplier: 0.9,
        trebleMultiplier: 0.9,
      },
    },
  },
  {
    id: 'viz-energetic-circle',
    name: 'Energetic Circle',
    description: 'High-energy circular spectrum',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'circular-spectrum',
        sensitivity: 1.5,
        bassMultiplier: 1.4,
        midMultiplier: 1.3,
        trebleMultiplier: 1.2,
      },
    },
  },
  {
    id: 'viz-chill-glow',
    name: 'Chill Glow',
    description: 'Ultra-soft lo-fi glow for relaxation',
    category: 'visualizers',
    settings: {
      visualizer: {
        mode: 'lofi-glow',
        sensitivity: 0.6,
        bassMultiplier: 1.0,
        midMultiplier: 0.9,
        trebleMultiplier: 0.6,
      },
    },
  },
];

// ============ BACKGROUNDS ============
const BACKGROUND_PRESETS: PresetItem[] = [
  {
    id: 'bg-midnight-blue',
    name: 'Midnight Blue',
    description: 'Deep blue solid background',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'solid',
        solidColor: '#0a0e27',
      },
    },
  },
  {
    id: 'bg-sunset-gradient',
    name: 'Sunset Gradient',
    description: 'Warm orange to purple gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#ff6b35' },
          { id: 'stop-2', position: 50, color: '#f7931e' },
          { id: 'stop-3', position: 100, color: '#c44569' },
        ],
        gradientAngle: 135,
      },
    },
  },
  {
    id: 'bg-ocean-gradient',
    name: 'Ocean Gradient',
    description: 'Deep blue to cyan gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#0a192f' },
          { id: 'stop-2', position: 100, color: '#1e3a5f' },
        ],
        gradientAngle: 180,
      },
    },
  },
  {
    id: 'bg-neon-gradient',
    name: 'Neon Gradient',
    description: 'Vibrant neon pink to cyan',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#ff006e' },
          { id: 'stop-2', position: 50, color: '#8338ec' },
          { id: 'stop-3', position: 100, color: '#3a86ff' },
        ],
        gradientAngle: 45,
      },
    },
  },
  {
    id: 'bg-dark-purple',
    name: 'Dark Purple',
    description: 'Rich dark purple solid',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'solid',
        solidColor: '#1a0b2e',
      },
    },
  },
  {
    id: 'bg-forest-gradient',
    name: 'Forest Gradient',
    description: 'Deep green to teal gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#0f2027' },
          { id: 'stop-2', position: 50, color: '#203a43' },
          { id: 'stop-3', position: 100, color: '#2c5364' },
        ],
        gradientAngle: 90,
      },
    },
  },
  {
    id: 'bg-pure-black',
    name: 'Pure Black',
    description: 'Absolute black for maximum contrast',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'solid',
        solidColor: '#000000',
      },
    },
  },
  {
    id: 'bg-deep-space',
    name: 'Deep Space',
    description: 'Dark navy solid for cosmic feel',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'solid',
        solidColor: '#0b0c1a',
      },
    },
  },
  {
    id: 'bg-crimson-night',
    name: 'Crimson Night',
    description: 'Dark red to black gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#1a0000' },
          { id: 'stop-2', position: 100, color: '#4a0000' },
        ],
        gradientAngle: 180,
      },
    },
  },
  {
    id: 'bg-aurora-borealis',
    name: 'Aurora Borealis',
    description: 'Green to purple northern lights',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#00ff87' },
          { id: 'stop-2', position: 50, color: '#60efff' },
          { id: 'stop-3', position: 100, color: '#a855f7' },
        ],
        gradientAngle: 45,
      },
    },
  },
  {
    id: 'bg-cyberpunk-city',
    name: 'Cyberpunk City',
    description: 'Neon pink and blue gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#ff0080' },
          { id: 'stop-2', position: 50, color: '#7928ca' },
          { id: 'stop-3', position: 100, color: '#0070f3' },
        ],
        gradientAngle: 135,
      },
    },
  },
  {
    id: 'bg-golden-hour',
    name: 'Golden Hour',
    description: 'Warm golden to orange gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#ffd700' },
          { id: 'stop-2', position: 50, color: '#ff8c00' },
          { id: 'stop-3', position: 100, color: '#ff4500' },
        ],
        gradientAngle: 90,
      },
    },
  },
  {
    id: 'bg-mint-fresh',
    name: 'Mint Fresh',
    description: 'Cool mint to teal gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#00d4aa' },
          { id: 'stop-2', position: 100, color: '#00695c' },
        ],
        gradientAngle: 180,
      },
    },
  },
  {
    id: 'bg-lavender-dream',
    name: 'Lavender Dream',
    description: 'Soft lavender to purple gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#e0c3fc' },
          { id: 'stop-2', position: 100, color: '#8ec5fc' },
        ],
        gradientAngle: 45,
      },
    },
  },
  {
    id: 'bg-volcanic-ash',
    name: 'Volcanic Ash',
    description: 'Dark gray to charcoal gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#2c2c2c' },
          { id: 'stop-2', position: 100, color: '#1a1a1a' },
        ],
        gradientAngle: 135,
      },
    },
  },
  {
    id: 'bg-electric-blue',
    name: 'Electric Blue',
    description: 'Bright electric blue solid',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'solid',
        solidColor: '#0066ff',
      },
    },
  },
  {
    id: 'bg-deep-purple',
    name: 'Deep Purple',
    description: 'Rich purple solid',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'solid',
        solidColor: '#4a148c',
      },
    },
  },
  {
    id: 'bg-emerald-forest',
    name: 'Emerald Forest',
    description: 'Deep emerald green solid',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'solid',
        solidColor: '#004d40',
      },
    },
  },
  {
    id: 'bg-ruby-red',
    name: 'Ruby Red',
    description: 'Deep ruby red solid',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'solid',
        solidColor: '#b71c1c',
      },
    },
  },
  {
    id: 'bg-cosmic-purple',
    name: 'Cosmic Purple',
    description: 'Purple to pink cosmic gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#4a00e0' },
          { id: 'stop-2', position: 100, color: '#8e2de2' },
        ],
        gradientAngle: 90,
      },
    },
  },
  {
    id: 'bg-tropical-sunset',
    name: 'Tropical Sunset',
    description: 'Vibrant tropical sunset colors',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#fa709a' },
          { id: 'stop-2', position: 50, color: '#fee140' },
          { id: 'stop-3', position: 100, color: '#30cfd0' },
        ],
        gradientAngle: 135,
      },
    },
  },
  {
    id: 'bg-ice-blue',
    name: 'Ice Blue',
    description: 'Cool ice blue gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#a8edea' },
          { id: 'stop-2', position: 100, color: '#fed6e3' },
        ],
        gradientAngle: 180,
      },
    },
  },
  {
    id: 'bg-fire-ember',
    name: 'Fire Ember',
    description: 'Hot fire ember gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#ff0000' },
          { id: 'stop-2', position: 50, color: '#ff7f00' },
          { id: 'stop-3', position: 100, color: '#ffff00' },
        ],
        gradientAngle: 45,
      },
    },
  },
  {
    id: 'bg-midnight-teal',
    name: 'Midnight Teal',
    description: 'Dark teal to black gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#004d4d' },
          { id: 'stop-2', position: 100, color: '#001a1a' },
        ],
        gradientAngle: 90,
      },
    },
  },
  {
    id: 'bg-rose-gold',
    name: 'Rose Gold',
    description: 'Elegant rose gold gradient',
    category: 'backgrounds',
    settings: {
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#f4c4f3' },
          { id: 'stop-2', position: 100, color: '#fc67fa' },
        ],
        gradientAngle: 135,
      },
    },
  },
];

// ============ TEXT & FONTS ============
const TEXT_FONT_PRESETS: PresetItem[] = [
  {
    id: 'text-modern-bold',
    name: 'Modern Bold',
    description: 'Large bold text, top center',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Bebas Neue',
        position: 'top-center',
        size: 48,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'text-minimal-bottom',
    name: 'Minimal Bottom',
    description: 'Small clean text, bottom left',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Inter',
        position: 'bottom-left',
        size: 20,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'text-elegant-serif',
    name: 'Elegant Serif',
    description: 'Refined serif font, bottom center',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Poppins',
        position: 'bottom-center',
        size: 28,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'text-bold-top',
    name: 'Bold Top',
    description: 'Strong impact, top left',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Oswald',
        position: 'top-left',
        size: 36,
        animation: 'zoom-in',
      },
    },
  },
  {
    id: 'text-clean-right',
    name: 'Clean Right',
    description: 'Modern sans-serif, bottom right',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Roboto',
        position: 'bottom-right',
        size: 24,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'text-huge-impact',
    name: 'Huge Impact',
    description: 'Extra large bold text for maximum impact',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Bebas Neue',
        position: 'top-center',
        size: 64,
        animation: 'zoom-in',
      },
    },
  },
  {
    id: 'text-subtle-corner',
    name: 'Subtle Corner',
    description: 'Tiny text in top right corner',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Inter',
        position: 'top-right',
        size: 16,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'text-centered-medium',
    name: 'Centered Medium',
    description: 'Medium text centered at bottom',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Poppins',
        position: 'bottom-center',
        size: 32,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'text-bold-left',
    name: 'Bold Left',
    description: 'Bold text aligned left at top',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Oswald',
        position: 'top-left',
        size: 40,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'text-elegant-top',
    name: 'Elegant Top',
    description: 'Elegant font at top center',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Poppins',
        position: 'top-center',
        size: 36,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'text-compact-bottom',
    name: 'Compact Bottom',
    description: 'Compact text at bottom left',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Roboto',
        position: 'bottom-left',
        size: 18,
        animation: 'none',
      },
    },
  },
  {
    id: 'text-display-right',
    name: 'Display Right',
    description: 'Display font at top right',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Bebas Neue',
        position: 'top-right',
        size: 42,
        animation: 'zoom-in',
      },
    },
  },
  {
    id: 'text-modern-center',
    name: 'Modern Center',
    description: 'Modern font centered at top',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Montserrat',
        position: 'top-center',
        size: 38,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'text-minimal-right',
    name: 'Minimal Right',
    description: 'Minimal text at bottom right',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Inter',
        position: 'bottom-right',
        size: 22,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'text-bold-center',
    name: 'Bold Center',
    description: 'Bold centered text at bottom',
    category: 'text-fonts',
    settings: {
      overlay: {
        font: 'Oswald',
        position: 'bottom-center',
        size: 44,
        animation: 'zoom-in',
      },
    },
  },
];

// ============ PARTICLE PACKS ============
const PARTICLE_PRESETS: PresetItem[] = [
  {
    id: 'particles-subtle',
    name: 'Subtle Sparkle',
    description: 'Light particle overlay',
    category: 'particles',
    settings: {
      particles: {
        enabled: true,
        density: 30,
        intensity: 40,
      },
    },
  },
  {
    id: 'particles-intense',
    name: 'Intense Storm',
    description: 'Heavy particle density',
    category: 'particles',
    settings: {
      particles: {
        enabled: true,
        density: 80,
        intensity: 90,
      },
    },
  },
  {
    id: 'particles-medium',
    name: 'Medium Flow',
    description: 'Balanced particle effect',
    category: 'particles',
    settings: {
      particles: {
        enabled: true,
        density: 50,
        intensity: 60,
      },
    },
  },
  {
    id: 'particles-off',
    name: 'No Particles',
    description: 'Disable all particles',
    category: 'particles',
    settings: {
      particles: {
        enabled: false,
        density: 0,
        intensity: 0,
      },
    },
  },
  {
    id: 'particles-gentle',
    name: 'Gentle Drift',
    description: 'Very light particle drift',
    category: 'particles',
    settings: {
      particles: {
        enabled: true,
        density: 20,
        intensity: 30,
      },
    },
  },
  {
    id: 'particles-heavy',
    name: 'Heavy Blizzard',
    description: 'Maximum particle density',
    category: 'particles',
    settings: {
      particles: {
        enabled: true,
        density: 100,
        intensity: 100,
      },
    },
  },
  {
    id: 'particles-moderate',
    name: 'Moderate Rain',
    description: 'Moderate particle flow',
    category: 'particles',
    settings: {
      particles: {
        enabled: true,
        density: 60,
        intensity: 70,
      },
    },
  },
  {
    id: 'particles-light',
    name: 'Light Dust',
    description: 'Light dust particles',
    category: 'particles',
    settings: {
      particles: {
        enabled: true,
        density: 25,
        intensity: 35,
      },
    },
  },
  {
    id: 'particles-energetic',
    name: 'Energetic Burst',
    description: 'High-energy particle burst',
    category: 'particles',
    settings: {
      particles: {
        enabled: true,
        density: 70,
        intensity: 85,
      },
    },
  },
  {
    id: 'particles-calm',
    name: 'Calm Atmosphere',
    description: 'Calm, slow-moving particles',
    category: 'particles',
    settings: {
      particles: {
        enabled: true,
        density: 35,
        intensity: 45,
      },
    },
  },
];

// ============ EFFECTS (COMBINED) ============
const EFFECT_PRESETS: PresetItem[] = [
  {
    id: 'effect-neon-night',
    name: 'Neon Night',
    description: 'Neon visualizer + dark gradient + particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'radial-neon',
        sensitivity: 1.2,
        bassMultiplier: 1.5,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#0a0a0f' },
          { id: 'stop-2', position: 100, color: '#1a0b2e' },
        ],
        gradientAngle: 135,
      },
      particles: {
        enabled: true,
        density: 40,
        intensity: 50,
      },
    },
  },
  {
    id: 'effect-lofi-chill',
    name: 'Lo-Fi Chill',
    description: 'Soft glow + warm gradient + minimal text',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'lofi-glow',
        sensitivity: 0.8,
        bassMultiplier: 1.2,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#2c3e50' },
          { id: 'stop-2', position: 100, color: '#4a5568' },
        ],
        gradientAngle: 90,
      },
      overlay: {
        font: 'Inter',
        position: 'bottom-left',
        size: 20,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'effect-retro-wave',
    name: 'Retro Wave',
    description: 'Circular spectrum + sunset gradient + bold text',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'circular-spectrum',
        sensitivity: 1.1,
        bassMultiplier: 1.3,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#ff6b35' },
          { id: 'stop-2', position: 50, color: '#f7931e' },
          { id: 'stop-3', position: 100, color: '#c44569' },
        ],
        gradientAngle: 135,
      },
      overlay: {
        font: 'Bebas Neue',
        position: 'top-center',
        size: 48,
        animation: 'zoom-in',
      },
    },
  },
  {
    id: 'effect-minimal-clean',
    name: 'Minimal Clean',
    description: 'Waveform + solid dark + no particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'waveform',
        sensitivity: 1.0,
      },
      background: {
        type: 'solid',
        solidColor: '#0a0a0f',
      },
      particles: {
        enabled: false,
        density: 0,
        intensity: 0,
      },
      overlay: {
        font: 'Inter',
        position: 'bottom-center',
        size: 24,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'effect-ocean-depth',
    name: 'Ocean Depth',
    description: 'Bars + ocean gradient + medium particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'bar-vertical',
        sensitivity: 1.0,
        bassMultiplier: 1.2,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#0a192f' },
          { id: 'stop-2', position: 100, color: '#1e3a5f' },
        ],
        gradientAngle: 180,
      },
      particles: {
        enabled: true,
        density: 50,
        intensity: 60,
      },
    },
  },
  {
    id: 'effect-cyberpunk-pulse',
    name: 'Cyberpunk Pulse',
    description: 'Neon rings + cyberpunk gradient + intense particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'radial-neon',
        sensitivity: 1.4,
        bassMultiplier: 1.6,
        midMultiplier: 1.2,
        trebleMultiplier: 1.0,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#ff0080' },
          { id: 'stop-2', position: 50, color: '#7928ca' },
          { id: 'stop-3', position: 100, color: '#0070f3' },
        ],
        gradientAngle: 135,
      },
      particles: {
        enabled: true,
        density: 70,
        intensity: 80,
      },
      overlay: {
        font: 'Bebas Neue',
        position: 'top-center',
        size: 52,
        animation: 'zoom-in',
      },
    },
  },
  {
    id: 'effect-cosmic-journey',
    name: 'Cosmic Journey',
    description: '3D tunnel + cosmic gradient + subtle particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: '3d-tunnel',
        sensitivity: 1.2,
        bassMultiplier: 1.5,
        midMultiplier: 1.0,
        trebleMultiplier: 0.9,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#4a00e0' },
          { id: 'stop-2', position: 100, color: '#8e2de2' },
        ],
        gradientAngle: 90,
      },
      particles: {
        enabled: true,
        density: 35,
        intensity: 45,
      },
      overlay: {
        font: 'Poppins',
        position: 'bottom-center',
        size: 28,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'effect-tropical-vibes',
    name: 'Tropical Vibes',
    description: 'Circular spectrum + tropical gradient + medium particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'circular-spectrum',
        sensitivity: 1.1,
        bassMultiplier: 1.2,
        midMultiplier: 1.1,
        trebleMultiplier: 1.0,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#fa709a' },
          { id: 'stop-2', position: 50, color: '#fee140' },
          { id: 'stop-3', position: 100, color: '#30cfd0' },
        ],
        gradientAngle: 135,
      },
      particles: {
        enabled: true,
        density: 50,
        intensity: 55,
      },
      overlay: {
        font: 'Montserrat',
        position: 'top-center',
        size: 40,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'effect-midnight-bass',
    name: 'Midnight Bass',
    description: 'Bass-heavy bars + midnight gradient + heavy particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'bar-vertical',
        sensitivity: 1.3,
        bassMultiplier: 2.0,
        midMultiplier: 0.9,
        trebleMultiplier: 0.7,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#000000' },
          { id: 'stop-2', position: 100, color: '#0a0e27' },
        ],
        gradientAngle: 180,
      },
      particles: {
        enabled: true,
        density: 80,
        intensity: 85,
      },
      overlay: {
        font: 'Oswald',
        position: 'bottom-left',
        size: 32,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'effect-aurora-dream',
    name: 'Aurora Dream',
    description: 'Lo-fi glow + aurora gradient + gentle particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'lofi-glow',
        sensitivity: 0.9,
        bassMultiplier: 1.1,
        midMultiplier: 1.0,
        trebleMultiplier: 0.8,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#00ff87' },
          { id: 'stop-2', position: 50, color: '#60efff' },
          { id: 'stop-3', position: 100, color: '#a855f7' },
        ],
        gradientAngle: 45,
      },
      particles: {
        enabled: true,
        density: 30,
        intensity: 40,
      },
      overlay: {
        font: 'Poppins',
        position: 'top-right',
        size: 26,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'effect-fire-energy',
    name: 'Fire Energy',
    description: 'Energetic bars + fire gradient + intense particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'bar-horizontal',
        sensitivity: 1.5,
        bassMultiplier: 1.4,
        midMultiplier: 1.3,
        trebleMultiplier: 1.2,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#ff0000' },
          { id: 'stop-2', position: 50, color: '#ff7f00' },
          { id: 'stop-3', position: 100, color: '#ffff00' },
        ],
        gradientAngle: 45,
      },
      particles: {
        enabled: true,
        density: 75,
        intensity: 90,
      },
      overlay: {
        font: 'Bebas Neue',
        position: 'top-left',
        size: 46,
        animation: 'zoom-in',
      },
    },
  },
  {
    id: 'effect-ice-crystal',
    name: 'Ice Crystal',
    description: 'Waveform + ice gradient + light particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'waveform',
        sensitivity: 0.9,
        bassMultiplier: 0.9,
        midMultiplier: 1.0,
        trebleMultiplier: 1.2,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#a8edea' },
          { id: 'stop-2', position: 100, color: '#fed6e3' },
        ],
        gradientAngle: 180,
      },
      particles: {
        enabled: true,
        density: 25,
        intensity: 35,
      },
      overlay: {
        font: 'Inter',
        position: 'bottom-right',
        size: 22,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'effect-forest-calm',
    name: 'Forest Calm',
    description: 'Gentle glow + forest gradient + calm particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'lofi-glow',
        sensitivity: 0.7,
        bassMultiplier: 1.0,
        midMultiplier: 0.9,
        trebleMultiplier: 0.7,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#0f2027' },
          { id: 'stop-2', position: 50, color: '#203a43' },
          { id: 'stop-3', position: 100, color: '#2c5364' },
        ],
        gradientAngle: 90,
      },
      particles: {
        enabled: true,
        density: 35,
        intensity: 45,
      },
      overlay: {
        font: 'Roboto',
        position: 'bottom-left',
        size: 24,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'effect-golden-glow',
    name: 'Golden Glow',
    description: 'Circular spectrum + golden gradient + medium particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'circular-spectrum',
        sensitivity: 1.0,
        bassMultiplier: 1.1,
        midMultiplier: 1.1,
        trebleMultiplier: 1.0,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#ffd700' },
          { id: 'stop-2', position: 50, color: '#ff8c00' },
          { id: 'stop-3', position: 100, color: '#ff4500' },
        ],
        gradientAngle: 90,
      },
      particles: {
        enabled: true,
        density: 45,
        intensity: 55,
      },
      overlay: {
        font: 'Montserrat',
        position: 'top-center',
        size: 36,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'effect-rose-elegance',
    name: 'Rose Elegance',
    description: 'Smooth wave + rose gold gradient + subtle particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'waveform',
        sensitivity: 0.8,
        bassMultiplier: 1.0,
        midMultiplier: 1.0,
        trebleMultiplier: 1.0,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#f4c4f3' },
          { id: 'stop-2', position: 100, color: '#fc67fa' },
        ],
        gradientAngle: 135,
      },
      particles: {
        enabled: true,
        density: 30,
        intensity: 40,
      },
      overlay: {
        font: 'Poppins',
        position: 'bottom-center',
        size: 30,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'effect-deep-space',
    name: 'Deep Space',
    description: '3D tunnel + deep space + no particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: '3d-tunnel',
        sensitivity: 1.1,
        bassMultiplier: 1.4,
        midMultiplier: 1.0,
        trebleMultiplier: 0.9,
      },
      background: {
        type: 'solid',
        solidColor: '#0b0c1a',
      },
      particles: {
        enabled: false,
        density: 0,
        intensity: 0,
      },
      overlay: {
        font: 'Bebas Neue',
        position: 'top-center',
        size: 44,
        animation: 'zoom-in',
      },
    },
  },
  {
    id: 'effect-mint-refresh',
    name: 'Mint Refresh',
    description: 'Bars + mint gradient + light particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'bar-vertical',
        sensitivity: 1.0,
        bassMultiplier: 1.0,
        midMultiplier: 1.1,
        trebleMultiplier: 1.0,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#00d4aa' },
          { id: 'stop-2', position: 100, color: '#00695c' },
        ],
        gradientAngle: 180,
      },
      particles: {
        enabled: true,
        density: 40,
        intensity: 50,
      },
      overlay: {
        font: 'Inter',
        position: 'top-left',
        size: 28,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'effect-crimson-power',
    name: 'Crimson Power',
    description: 'Neon rings + crimson gradient + heavy particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'radial-neon',
        sensitivity: 1.3,
        bassMultiplier: 1.7,
        midMultiplier: 1.1,
        trebleMultiplier: 0.9,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#1a0000' },
          { id: 'stop-2', position: 100, color: '#4a0000' },
        ],
        gradientAngle: 180,
      },
      particles: {
        enabled: true,
        density: 85,
        intensity: 95,
      },
      overlay: {
        font: 'Oswald',
        position: 'bottom-center',
        size: 42,
        animation: 'zoom-in',
      },
    },
  },
  {
    id: 'effect-lavender-peace',
    name: 'Lavender Peace',
    description: 'Lo-fi glow + lavender gradient + gentle particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'lofi-glow',
        sensitivity: 0.6,
        bassMultiplier: 1.0,
        midMultiplier: 0.9,
        trebleMultiplier: 0.7,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#e0c3fc' },
          { id: 'stop-2', position: 100, color: '#8ec5fc' },
        ],
        gradientAngle: 45,
      },
      particles: {
        enabled: true,
        density: 25,
        intensity: 35,
      },
      overlay: {
        font: 'Poppins',
        position: 'bottom-right',
        size: 24,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'effect-volcanic-rage',
    name: 'Volcanic Rage',
    description: 'Intense bars + volcanic gradient + storm particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'bar-horizontal',
        sensitivity: 1.6,
        bassMultiplier: 1.8,
        midMultiplier: 1.4,
        trebleMultiplier: 1.2,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#2c2c2c' },
          { id: 'stop-2', position: 100, color: '#1a1a1a' },
        ],
        gradientAngle: 135,
      },
      particles: {
        enabled: true,
        density: 90,
        intensity: 100,
      },
      overlay: {
        font: 'Bebas Neue',
        position: 'top-right',
        size: 50,
        animation: 'zoom-in',
      },
    },
  },
  {
    id: 'effect-pure-minimal',
    name: 'Pure Minimal',
    description: 'Waveform + pure black + no particles + minimal text',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'waveform',
        sensitivity: 0.9,
        bassMultiplier: 1.0,
        midMultiplier: 1.0,
        trebleMultiplier: 1.0,
      },
      background: {
        type: 'solid',
        solidColor: '#000000',
      },
      particles: {
        enabled: false,
        density: 0,
        intensity: 0,
      },
      overlay: {
        font: 'Inter',
        position: 'bottom-left',
        size: 18,
        animation: 'none',
      },
    },
  },
  {
    id: 'effect-electric-storm',
    name: 'Electric Storm',
    description: 'Particle burst + electric blue + intense particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'particles',
        sensitivity: 1.5,
        bassMultiplier: 1.5,
        midMultiplier: 1.3,
        trebleMultiplier: 1.1,
      },
      background: {
        type: 'solid',
        solidColor: '#0066ff',
      },
      particles: {
        enabled: true,
        density: 80,
        intensity: 90,
      },
      overlay: {
        font: 'Oswald',
        position: 'top-center',
        size: 48,
        animation: 'zoom-in',
      },
    },
  },
  {
    id: 'effect-emerald-serenity',
    name: 'Emerald Serenity',
    description: 'Gentle glow + emerald + calm particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'lofi-glow',
        sensitivity: 0.8,
        bassMultiplier: 1.0,
        midMultiplier: 1.0,
        trebleMultiplier: 0.8,
      },
      background: {
        type: 'solid',
        solidColor: '#004d40',
      },
      particles: {
        enabled: true,
        density: 35,
        intensity: 45,
      },
      overlay: {
        font: 'Poppins',
        position: 'bottom-center',
        size: 26,
        animation: 'fade-in',
      },
    },
  },
  {
    id: 'effect-ruby-passion',
    name: 'Ruby Passion',
    description: 'Circular spectrum + ruby red + medium particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'circular-spectrum',
        sensitivity: 1.2,
        bassMultiplier: 1.3,
        midMultiplier: 1.1,
        trebleMultiplier: 1.0,
      },
      background: {
        type: 'solid',
        solidColor: '#b71c1c',
      },
      particles: {
        enabled: true,
        density: 50,
        intensity: 60,
      },
      overlay: {
        font: 'Bebas Neue',
        position: 'top-left',
        size: 40,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'effect-midnight-teal',
    name: 'Midnight Teal',
    description: 'Bars + midnight teal gradient + moderate particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: 'bar-vertical',
        sensitivity: 1.0,
        bassMultiplier: 1.2,
        midMultiplier: 1.0,
        trebleMultiplier: 0.9,
      },
      background: {
        type: 'gradient',
        gradientStops: [
          { id: 'stop-1', position: 0, color: '#004d4d' },
          { id: 'stop-2', position: 100, color: '#001a1a' },
        ],
        gradientAngle: 90,
      },
      particles: {
        enabled: true,
        density: 55,
        intensity: 65,
      },
      overlay: {
        font: 'Roboto',
        position: 'bottom-right',
        size: 28,
        animation: 'slide-in',
      },
    },
  },
  {
    id: 'effect-deep-purple-dream',
    name: 'Deep Purple Dream',
    description: '3D tunnel + deep purple + subtle particles',
    category: 'effects',
    settings: {
      visualizer: {
        mode: '3d-tunnel',
        sensitivity: 1.0,
        bassMultiplier: 1.3,
        midMultiplier: 1.0,
        trebleMultiplier: 0.9,
      },
      background: {
        type: 'solid',
        solidColor: '#4a148c',
      },
      particles: {
        enabled: true,
        density: 30,
        intensity: 40,
      },
      overlay: {
        font: 'Montserrat',
        position: 'top-center',
        size: 38,
        animation: 'fade-in',
      },
    },
  },
];

// ============ CATALOG ============
export const PRESETS_CATALOG: PresetItem[] = [
  ...VISUALIZER_PRESETS,
  ...BACKGROUND_PRESETS,
  ...TEXT_FONT_PRESETS,
  ...PARTICLE_PRESETS,
  ...EFFECT_PRESETS,
];

// Validate no duplicate IDs at module load
const idSet = new Set<string>();
for (const preset of PRESETS_CATALOG) {
  if (idSet.has(preset.id)) {
    console.error(`[presetsCatalog] Duplicate preset ID detected: ${preset.id}`);
  }
  idSet.add(preset.id);
  
  // Validate category
  const validCategories: PresetCategory[] = ['visualizers', 'backgrounds', 'text-fonts', 'particles', 'effects'];
  if (!validCategories.includes(preset.category)) {
    console.error(`[presetsCatalog] Invalid category for preset ${preset.id}: ${preset.category}`);
  }
}

export function getPresetsByCategory(category: PresetCategory): PresetItem[] {
  return PRESETS_CATALOG.filter(preset => preset.category === category);
}

export function getAllCategories(): PresetCategory[] {
  return ['visualizers', 'backgrounds', 'text-fonts', 'particles', 'effects'];
}

export function getCategoryLabel(category: PresetCategory): string {
  const labels: Record<PresetCategory, string> = {
    visualizers: 'Visualizers',
    backgrounds: 'Backgrounds',
    'text-fonts': 'Text & Fonts',
    particles: 'Particle Packs',
    effects: 'Effects',
  };
  return labels[category];
}
