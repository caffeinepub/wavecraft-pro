import type { BackgroundSettings as BackendBackgroundSettings, BrandingSettings, TunnelSettings } from '../../backend';

export function encodeBackgroundSettings(settings: string): BackendBackgroundSettings {
  try {
    const parsed = JSON.parse(settings);
    return {
      color: parsed.solidColor || '#0a0a0f',
      style: parsed.type || 'solid',
      brightness: 1.0,
    };
  } catch {
    return {
      color: '#0a0a0f',
      style: 'solid',
      brightness: 1.0,
    };
  }
}

export function encodeBrandingSettings(settings: string): BrandingSettings {
  try {
    const parsed = JSON.parse(settings);
    return {
      logoUrl: '',
      font: parsed.font || 'Inter',
      theme: 'dark',
    };
  } catch {
    return {
      logoUrl: '',
      font: 'Inter',
      theme: 'dark',
    };
  }
}

export function encodeTunnelSettings(settings: string): TunnelSettings {
  try {
    const parsed = JSON.parse(settings);
    return {
      mode: parsed.mode || 'circular-spectrum',
      speed: 1.0,
      complexity: BigInt(5),
      depth: 10.0,
      rotation: false,
    };
  } catch {
    return {
      mode: 'circular-spectrum',
      speed: 1.0,
      complexity: BigInt(5),
      depth: 10.0,
      rotation: false,
    };
  }
}
