import type { OverlaySettings } from './useOverlaySettings';

export function renderTextOverlay(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  settings: OverlaySettings,
  animationProgress: number
) {
  if (!settings.title && !settings.artist) return;

  ctx.save();

  // Apply animation
  let opacity = 1;
  let offsetX = 0;
  let offsetY = 0;
  let scale = 1;

  if (animationProgress < 1) {
    switch (settings.animation) {
      case 'fade-in':
        opacity = animationProgress;
        break;
      case 'slide-in':
        offsetY = (1 - animationProgress) * 50;
        opacity = animationProgress;
        break;
      case 'zoom-in':
        scale = 0.5 + (animationProgress * 0.5);
        opacity = animationProgress;
        break;
    }
  }

  ctx.globalAlpha = opacity;

  // Set font
  ctx.font = `bold ${settings.size}px ${settings.font}, sans-serif`;
  ctx.textBaseline = 'top';

  // Calculate position
  const padding = 20;
  let x = padding;
  let y = padding;
  let align: CanvasTextAlign = 'left';

  switch (settings.position) {
    case 'top-left':
      x = padding;
      y = padding;
      align = 'left';
      break;
    case 'top-center':
      x = width / 2;
      y = padding;
      align = 'center';
      break;
    case 'top-right':
      x = width - padding;
      y = padding;
      align = 'right';
      break;
    case 'bottom-left':
      x = padding;
      y = height - padding - (settings.size * 2.5);
      align = 'left';
      break;
    case 'bottom-center':
      x = width / 2;
      y = height - padding - (settings.size * 2.5);
      align = 'center';
      break;
    case 'bottom-right':
      x = width - padding;
      y = height - padding - (settings.size * 2.5);
      align = 'right';
      break;
  }

  x += offsetX;
  y += offsetY;

  ctx.textAlign = align;

  // Apply scale
  if (scale !== 1) {
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.translate(-x, -y);
  }

  // Draw text with shadow for readability
  if (settings.title) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(settings.title, x, y);
  }

  if (settings.artist) {
    ctx.font = `${settings.size * 0.7}px ${settings.font}, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(settings.artist, x, y + settings.size * 1.3);
  }

  ctx.restore();
}

export function renderLogoOverlay(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  logo: HTMLImageElement,
  position: OverlaySettings['position']
) {
  const maxLogoWidth = width * 0.15;
  const maxLogoHeight = height * 0.15;
  
  const logoAspect = logo.width / logo.height;
  let logoWidth = maxLogoWidth;
  let logoHeight = logoWidth / logoAspect;

  if (logoHeight > maxLogoHeight) {
    logoHeight = maxLogoHeight;
    logoWidth = logoHeight * logoAspect;
  }

  const padding = 20;
  let x = padding;
  let y = padding;

  switch (position) {
    case 'top-left':
      x = padding;
      y = padding;
      break;
    case 'top-center':
      x = (width - logoWidth) / 2;
      y = padding;
      break;
    case 'top-right':
      x = width - logoWidth - padding;
      y = padding;
      break;
    case 'bottom-left':
      x = padding;
      y = height - logoHeight - padding;
      break;
    case 'bottom-center':
      x = (width - logoWidth) / 2;
      y = height - logoHeight - padding;
      break;
    case 'bottom-right':
      x = width - logoWidth - padding;
      y = height - logoHeight - padding;
      break;
  }

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 8;
  ctx.drawImage(logo, x, y, logoWidth, logoHeight);
  ctx.restore();
}

export function renderWatermark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.save();
  ctx.font = '12px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('WaveCraft Pro', width - 10, height - 10);
  ctx.restore();
}
