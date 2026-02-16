export interface ExportEstimate {
  fileSizeMB: number;
  renderTimeSeconds: number;
}

export function estimateExport(
  durationSeconds: number,
  resolution: '720p' | '1080p' | '4K',
  fps: 30 | 60,
  bitrate: number
): ExportEstimate {
  // File size estimation (bitrate * duration)
  const fileSizeMB = (bitrate * durationSeconds) / 8 / 1024;

  // Render time estimation (very rough, depends on device)
  const resolutionMultiplier = {
    '720p': 1,
    '1080p': 2,
    '4K': 4,
  }[resolution];

  const fpsMultiplier = fps === 60 ? 1.5 : 1;
  
  // Base render time: assume 1x realtime for 720p@30fps
  const baseRenderTime = durationSeconds;
  const renderTimeSeconds = baseRenderTime * resolutionMultiplier * fpsMultiplier;

  return {
    fileSizeMB: Math.round(fileSizeMB * 10) / 10,
    renderTimeSeconds: Math.round(renderTimeSeconds),
  };
}

export function formatFileSize(mb: number): string {
  if (mb < 1) {
    return `${Math.round(mb * 1024)} KB`;
  }
  return `${mb.toFixed(1)} MB`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}
