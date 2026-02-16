import { useRef, useEffect } from 'react';
import { useVisualizerEngine } from '../visualizer/useVisualizerEngine';

export function PreviewCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { initializeCanvas } = useVisualizerEngine();

  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas(canvasRef.current);
    }
  }, [initializeCanvas]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-background p-4">
      <div className="relative w-full h-full max-w-7xl max-h-[80vh] bg-black/20 rounded-lg overflow-hidden border border-border/40">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
        <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-black/50 px-2 py-1 rounded">
          Preview
        </div>
      </div>
    </div>
  );
}
