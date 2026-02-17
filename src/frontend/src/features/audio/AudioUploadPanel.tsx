import { useRef, useState } from 'react';
import { useAudioEngine } from './useAudioEngine';
import { WaveformPreview } from './WaveformPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Play, Pause, Music } from 'lucide-react';
import { toast } from 'sonner';

export function AudioUploadPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { audioFile, isPlaying, waveformPeaks, loadAudio, play, pause } = useAudioEngine();

  const handleFileSelect = async (file: File) => {
    try {
      await loadAudio(file);
      toast.success('Audio loaded successfully');
    } catch (error: any) {
      console.error('Failed to load audio:', error);
      toast.error(error.message || 'Failed to load audio file');
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('audio/') || file.name.endsWith('.mp3') || file.name.endsWith('.wav'))) {
      await handleFileSelect(file);
    } else {
      toast.error('Please drop a valid audio file (MP3 or WAV)');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Audio Upload
        </CardTitle>
        <CardDescription>Upload MP3 or WAV file (max 50MB)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/mp3,audio/wav,audio/mpeg"
          onChange={handleFileInput}
          className="hidden"
        />
        
        {!audioFile ? (
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">
              {isDragging ? 'Drop your audio file here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-muted-foreground">MP3 or WAV, max 50MB</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Music className="h-5 w-5 text-chart-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{audioFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant={isPlaying ? 'secondary' : 'default'}
                onClick={isPlaying ? pause : play}
                className="ml-2 flex-shrink-0"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>

            {/* Waveform Preview */}
            {waveformPeaks.length > 0 && (
              <div className="bg-muted/30 rounded-lg p-2">
                <WaveformPreview peaks={waveformPeaks} />
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Different File
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
