import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Info } from 'lucide-react';
import { estimateExport, formatFileSize, formatDuration } from './exportEstimator';
import { useAudioEngine } from '../audio/useAudioEngine';
import { toast } from 'sonner';

const resolutions = [
  { value: '720p', label: '720p (1280x720)' },
  { value: '1080p', label: '1080p (1920x1080)' },
  { value: '4K', label: '4K (3840x2160)' },
];

const fpsOptions = [
  { value: 30, label: '30 FPS' },
  { value: 60, label: '60 FPS' },
];

const bitrateOptions = [
  { value: 2000, label: 'Low (2 Mbps)' },
  { value: 5000, label: 'Medium (5 Mbps)' },
  { value: 10000, label: 'High (10 Mbps)' },
  { value: 20000, label: 'Ultra (20 Mbps)' },
];

export function ExportPanel() {
  const [resolution, setResolution] = useState<'720p' | '1080p' | '4K'>('1080p');
  const [fps, setFps] = useState<30 | 60>(30);
  const [bitrate, setBitrate] = useState(5000);
  
  const { duration } = useAudioEngine();

  const estimate = estimateExport(duration, resolution, fps, bitrate);

  const handleExport = () => {
    toast.info('Export feature coming soon! For now, please use your browser\'s built-in screen recording feature to capture your visualizer.');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Video
        </CardTitle>
        <CardDescription>Export your visualizer as MP4</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Video export is currently in development. Use your browser's screen recording feature to capture your visualizer for now.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label>Resolution</Label>
          <Select value={resolution} onValueChange={(v) => setResolution(v as typeof resolution)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {resolutions.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Frame Rate</Label>
          <Select value={fps.toString()} onValueChange={(v) => setFps(Number(v) as typeof fps)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fpsOptions.map((f) => (
                <SelectItem key={f.value} value={f.value.toString()}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Bitrate</Label>
          <Select value={bitrate.toString()} onValueChange={(v) => setBitrate(Number(v))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bitrateOptions.map((b) => (
                <SelectItem key={b.value} value={b.value.toString()}>
                  {b.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {duration > 0 && (
          <Alert>
            <AlertDescription>
              <div className="space-y-1 text-sm">
                <div>Estimated file size: <strong>{formatFileSize(estimate.fileSizeMB)}</strong></div>
                <div>Estimated render time: <strong>{formatDuration(estimate.renderTimeSeconds)}</strong></div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Button onClick={handleExport} disabled={duration === 0} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Export Settings (Coming Soon)
        </Button>
      </CardContent>
    </Card>
  );
}
