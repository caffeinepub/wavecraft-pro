import type { GradientStop } from './useBackgroundSettings';

export function renderSolidBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

export function renderGradientBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  stops: GradientStop[],
  angle: number
) {
  const angleRad = (angle * Math.PI) / 180;
  const x1 = width / 2 - (Math.cos(angleRad) * width) / 2;
  const y1 = height / 2 - (Math.sin(angleRad) * height) / 2;
  const x2 = width / 2 + (Math.cos(angleRad) * width) / 2;
  const y2 = height / 2 + (Math.sin(angleRad) * height) / 2;

  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  
  stops.forEach(stop => {
    gradient.addColorStop(stop.position / 100, stop.color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

export function renderImageBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  image: HTMLImageElement
) {
  const imgAspect = image.width / image.height;
  const canvasAspect = width / height;

  let drawWidth = width;
  let drawHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imgAspect > canvasAspect) {
    drawWidth = height * imgAspect;
    offsetX = (width - drawWidth) / 2;
  } else {
    drawHeight = width / imgAspect;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}
