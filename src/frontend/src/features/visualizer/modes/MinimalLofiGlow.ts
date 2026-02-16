export class MinimalLofiGlow {
  static render(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number) {
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate average amplitude
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    const avg = sum / data.length / 255;

    // Draw soft glow circle
    const radius = 50 + avg * 150;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, `oklch(0.7 0.15 280 / ${0.8 * avg})`);
    gradient.addColorStop(0.5, `oklch(0.6 0.12 280 / ${0.4 * avg})`);
    gradient.addColorStop(1, 'oklch(0.5 0.1 280 / 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw minimal waveform
    const sliceWidth = width / 64;
    ctx.strokeStyle = `oklch(0.8 0.1 280 / ${0.6 + avg * 0.4})`;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < 64; i++) {
      const dataIndex = Math.floor((i / 64) * data.length);
      const value = (data[dataIndex] / 255) * 2 - 1;
      const y = centerY + value * 40;
      const x = i * sliceWidth;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
  }
}
