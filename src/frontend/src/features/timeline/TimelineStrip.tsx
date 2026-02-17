import { useEffect, useState } from 'react';
import { useAudioEngine } from '../audio/useAudioEngine';

export function TimelineStrip() {
  const { duration, trimStart, trimEnd, currentTime, isPlaying } = useAudioEngine();
  const [beats, setBeats] = useState<number[]>([]);

  // Simple beat detection placeholder - will be enhanced when audio engine provides beat data
  useEffect(() => {
    if (duration > 0) {
      // Generate placeholder beat markers every 0.5 seconds for demo
      const beatMarkers: number[] = [];
      for (let t = 0; t < duration; t += 0.5) {
        beatMarkers.push(t);
      }
      setBeats(beatMarkers);
    }
  }, [duration]);

  if (duration === 0) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-16 bg-card/50 border-t border-border/40 flex flex-col">
      {/* Time labels */}
      <div className="flex items-center justify-between px-4 py-1 text-xs text-muted-foreground">
        <span>{formatTime(0)}</span>
        <span>Duration: {formatTime(duration)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Timeline visualization */}
      <div className="flex-1 relative mx-4 mb-2">
        {/* Background track */}
        <div className="absolute inset-0 bg-muted/20 rounded-sm overflow-hidden">
          {/* Trim range indicator */}
          <div
            className="absolute top-0 bottom-0 bg-primary/20 border-l-2 border-r-2 border-primary"
            style={{
              left: `${(trimStart / duration) * 100}%`,
              right: `${((duration - trimEnd) / duration) * 100}%`,
            }}
          />

          {/* Beat markers */}
          {beats.map((beat, idx) => {
            const position = (beat / duration) * 100;
            if (position < (trimStart / duration) * 100 || position > (trimEnd / duration) * 100) {
              return null;
            }
            return (
              <div
                key={idx}
                className="absolute top-0 bottom-0 w-px bg-chart-1/40"
                style={{ left: `${position}%` }}
              />
            );
          })}

          {/* Current time indicator */}
          {isPlaying && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-chart-1 shadow-lg shadow-chart-1/50 transition-all duration-100"
              style={{ left: `${(currentTime / duration) * 100}%` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
