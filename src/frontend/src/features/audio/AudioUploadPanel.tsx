import { useRef } from 'react';
import { useAudioEngine } from './useAudioEngine';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Play, Pause, Music } from 'lucide-react';

export function AudioUploadPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { audioFile, isPlaying, loadAudio, play, pause } = useAudioEngine();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await loadAudio(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Audio Upload
        </CardTitle>
        <CardDescription>Upload MP3 or WAV file</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/mp3,audio/wav,audio/mpeg"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {!audioFile ? (
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            size="lg"
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose Audio File
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-accent/20 rounded-lg">
              <p className="text-sm font-medium truncate">{audioFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(audioFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={isPlaying ? pause : play}
                className="flex-1"
                variant={isPlaying ? 'outline' : 'default'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
