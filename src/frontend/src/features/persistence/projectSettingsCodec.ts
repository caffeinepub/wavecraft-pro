import type { BackgroundSettings as BackendBackgroundSettings, BrandingSettings, TunnelSettings } from '../../backend';

export function encodeBackgroundSettings(settings: string): BackendBackgroundSettings {
  try {
    const parsed = JSON.parse(settings);
    
    // Ensure we never send "particles" as a type to backend
    let type = parsed.type || 'solid';
    if (type === 'particles') {
      type = 'solid';
    }
    
    return {
      color: parsed.solidColor || '#0a0a0f',
      style: settings, // Store full serialized settings in style field
      brightness: 1.0,
    };
  } catch {
    return {
      color: '#0a0a0f',
      style: JSON.stringify({ type: 'solid', solidColor: '#0a0a0f' }),
      brightness: 1.0,
    };
  }
}

export function encodeBrandingSettings(settings: string): BrandingSettings {
  try {
    return {
      logoUrl: '',
      font: settings, // Store full serialized settings in font field
      theme: 'dark',
    };
  } catch {
    return {
      logoUrl: '',
      font: JSON.stringify({ font: 'Inter' }),
      theme: 'dark',
    };
  }
}

export function encodeTunnelSettings(settings: string): TunnelSettings {
  try {
    return {
      mode: settings, // Store full serialized settings in mode field
      speed: 1.0,
      complexity: BigInt(5),
      depth: 10.0,
      rotation: false,
    };
  } catch {
    return {
      mode: JSON.stringify({ mode: 'circular-spectrum' }),
      speed: 1.0,
      complexity: BigInt(5),
      depth: 10.0,
      rotation: false,
    };
  }
}
