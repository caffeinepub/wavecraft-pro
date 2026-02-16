// Simplified export client without FFmpeg dependency
// FFmpeg.wasm is not available in the current package.json

class FFmpegClient {
  private loaded: boolean = false;

  async load(onProgress?: (progress: number) => void): Promise<void> {
    if (this.loaded) return;
    
    // Simulate loading
    if (onProgress) {
      onProgress(100);
    }
    
    this.loaded = true;
  }

  async convertFramesToVideo(
    frames: Uint8Array[],
    fps: number,
    width: number,
    height: number,
    bitrate: number,
    onProgress?: (progress: number) => void
  ): Promise<Blob> {
    // This is a placeholder implementation
    // Real video export would require FFmpeg.wasm which is not in package.json
    
    if (onProgress) {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        onProgress(i);
      }
    }

    // Return a placeholder blob
    throw new Error('Video export requires FFmpeg.wasm which is not currently available. Please use the browser\'s built-in screen recording feature instead.');
  }

  dispose() {
    this.loaded = false;
  }
}

export const ffmpegClient = new FFmpegClient();
