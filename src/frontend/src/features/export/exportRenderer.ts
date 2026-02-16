import { useAudioEngine } from '../audio/useAudioEngine';
import { useVisualizerEngine } from '../visualizer/useVisualizerEngine';

export async function captureFrame(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to capture frame'));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        resolve(new Uint8Array(arrayBuffer));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    }, 'image/png');
  });
}

export async function renderFrames(
  canvas: HTMLCanvasElement,
  durationSeconds: number,
  fps: number,
  onProgress?: (progress: number) => void
): Promise<Uint8Array[]> {
  const frames: Uint8Array[] = [];
  const totalFrames = Math.ceil(durationSeconds * fps);
  const frameInterval = 1000 / fps;

  for (let i = 0; i < totalFrames; i++) {
    // Capture current frame
    const frameData = await captureFrame(canvas);
    frames.push(frameData);

    if (onProgress) {
      onProgress((i / totalFrames) * 100);
    }

    // Wait for next frame interval
    await new Promise(resolve => setTimeout(resolve, frameInterval));
  }

  return frames;
}
