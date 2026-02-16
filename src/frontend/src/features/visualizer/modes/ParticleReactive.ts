export class ParticleReactive {
  static render(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number) {
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const dataIndex = Math.floor((i / particleCount) * data.length);
      const value = data[dataIndex] / 255;

      const x = (i / particleCount) * width;
      const y = height / 2 + (Math.random() - 0.5) * value * height * 0.6;
      const size = 2 + value * 8;

      const hue = (i / particleCount) * 360;
      ctx.fillStyle = `oklch(${0.6 + value * 0.3} 0.2 ${hue} / ${0.5 + value * 0.5})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
