import { useRef, useEffect } from 'react';
import { useVisualizerEngine } from '../visualizer/useVisualizerEngine';
import { useCanvasSettings } from '../canvas/useCanvasSettings';

export function PreviewCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { initializeCanvas } = useVisualizerEngine();
  const { aspectRatio } = useCanvasSettings();

  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas(canvasRef.current);
    }
  }, [initializeCanvas]);

  const getAspectRatioPadding = () => {
    switch (aspectRatio) {
      case '16:9':
        return '56.25%'; // 9/16 * 100
      case '9:16':
        return '177.78%'; // 16/9 * 100
      case '1:1':
        return '100%';
      default:
        return '56.25%';
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background p-2 sm:p-4">
      <div 
        ref={containerRef}
        className="relative w-full h-full max-w-7xl flex items-center justify-center"
      >
        {/* Aspect ratio container */}
        <div 
          className="relative w-full bg-black/20 rounded-lg overflow-hidden border border-border/40"
          style={{ 
            paddingBottom: getAspectRatioPadding(),
            maxHeight: '100%',
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
          />
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-xs text-muted-foreground bg-black/50 px-2 py-1 rounded">
            Preview ({aspectRatio})
          </div>
        </div>
      </div>
    </div>
  );
}
