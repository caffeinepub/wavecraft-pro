import { useEffect, useRef } from 'react';

interface WaveformPreviewProps {
  peaks: number[];
  className?: string;
}

export function WaveformPreview({ peaks, className = '' }: WaveformPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || peaks.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw waveform
    const barWidth = rect.width / peaks.length;
    const centerY = rect.height / 2;

    ctx.fillStyle = 'hsl(var(--chart-1))';

    peaks.forEach((peak, i) => {
      const barHeight = peak * centerY;
      const x = i * barWidth;
      ctx.fillRect(x, centerY - barHeight / 2, Math.max(1, barWidth - 1), barHeight);
    });
  }, [peaks]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-16 ${className}`}
      style={{ display: 'block' }}
    />
  );
}
