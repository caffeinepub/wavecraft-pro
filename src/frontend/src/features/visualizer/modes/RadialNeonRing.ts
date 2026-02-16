export class RadialNeonRing {
  static render(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number) {
    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = Math.min(width, height) * 0.2;
    const ringCount = 5;

    for (let ring = 0; ring < ringCount; ring++) {
      const ringRadius = baseRadius + ring * 30;
      const barCount = 64;
      const angleStep = (Math.PI * 2) / barCount;

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * data.length);
        const value = data[dataIndex] / 255;

        const angle = i * angleStep;
        const radius = ringRadius + value * 20;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const hue = (ring * 72 + i) % 360;
        ctx.fillStyle = `oklch(${0.6 + value * 0.3} 0.25 ${hue})`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
