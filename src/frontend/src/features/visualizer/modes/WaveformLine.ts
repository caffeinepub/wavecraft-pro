export class WaveformLine {
  static render(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number) {
    const sliceWidth = width / data.length;
    const centerY = height / 2;

    ctx.strokeStyle = 'oklch(0.7 0.25 200)';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < data.length; i++) {
      const value = (data[i] / 255) * 2 - 1;
      const y = centerY + value * (height * 0.4);
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
