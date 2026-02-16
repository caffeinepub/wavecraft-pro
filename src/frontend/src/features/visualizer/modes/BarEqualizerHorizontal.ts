export class BarEqualizerHorizontal {
  static render(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number) {
    const barCount = 64;
    const barWidth = width / barCount;
    const maxBarHeight = height * 0.7;

    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor((i / barCount) * data.length);
      const value = data[dataIndex] / 255;
      const barHeight = value * maxBarHeight;

      const x = i * barWidth;
      const y = height - barHeight;

      const hue = (i / barCount) * 360;
      ctx.fillStyle = `oklch(${0.5 + value * 0.4} 0.2 ${hue})`;
      ctx.fillRect(x, y, barWidth - 2, barHeight);
    }
  }
}
