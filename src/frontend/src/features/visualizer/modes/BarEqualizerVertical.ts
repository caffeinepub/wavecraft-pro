export class BarEqualizerVertical {
  static render(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number) {
    const barCount = 64;
    const barHeight = height / barCount;
    const maxBarWidth = width * 0.7;

    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor((i / barCount) * data.length);
      const value = data[dataIndex] / 255;
      const barWidth = value * maxBarWidth;

      const x = (width - barWidth) / 2;
      const y = i * barHeight;

      const hue = (i / barCount) * 360;
      ctx.fillStyle = `oklch(${0.5 + value * 0.4} 0.2 ${hue})`;
      ctx.fillRect(x, y, barWidth, barHeight - 2);
    }
  }
}
