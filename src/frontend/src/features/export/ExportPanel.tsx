import { useState } from 'react';
import { useCanvasSettings } from '../canvas/useCanvasSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Youtube } from 'lucide-react';
import { toast } from 'sonner';

export function ExportPanel() {
  const { aspectRatio, applyYouTubePreset } = useCanvasSettings();
  const [fps, setFps] = useState<'30' | '60'>('30');
  const [quality, setQuality] = useState<'720p' | '1080p' | '4k'>('720p');

  const handleYouTubePreset = () => {
    applyYouTubePreset();
    setQuality('720p');
    setFps('30');
    toast.success('YouTube preset applied (1280x720, 30fps)');
  };

  const getResolutionText = () => {
    switch (aspectRatio) {
      case '16:9':
        return quality === '720p' ? '1280x720' : quality === '1080p' ? '1920x1080' : '3840x2160';
      case '9:16':
        return quality === '720p' ? '720x1280' : quality === '1080p' ? '1080x1920' : '2160x3840';
      case '1:1':
        return quality === '720p' ? '720x720' : quality === '1080p' ? '1080x1080' : '2160x2160';
      default:
        return '1280x720';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export
        </CardTitle>
        <CardDescription>Export your visualizer as MP4 video</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* YouTube Preset */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Quick Presets</Label>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleYouTubePreset}
          >
            <Youtube className="h-4 w-4 mr-2 text-red-500" />
            YouTube Ready (720p, 16:9)
          </Button>
        </div>

        {/* Quality Selection */}
        <div className="space-y-2">
          <Label htmlFor="quality" className="text-sm font-medium">
            Resolution
          </Label>
          <Select value={quality} onValueChange={(v) => setQuality(v as any)}>
            <SelectTrigger id="quality">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="720p">720p ({getResolutionText()})</SelectItem>
              <SelectItem value="1080p">1080p ({getResolutionText()})</SelectItem>
              <SelectItem value="4k">4K ({getResolutionText()})</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Current aspect ratio: {aspectRatio}
          </p>
        </div>

        {/* FPS Selection */}
        <div className="space-y-2">
          <Label htmlFor="fps" className="text-sm font-medium">
            Frame Rate
          </Label>
          <Select value={fps} onValueChange={(v) => setFps(v as any)}>
            <SelectTrigger id="fps">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 FPS</SelectItem>
              <SelectItem value="60">60 FPS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Export Info */}
        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <p className="text-sm font-medium">Export Settings</p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Resolution: {getResolutionText()}</p>
            <p>• Frame Rate: {fps} FPS</p>
            <p>• Format: MP4 (H.264)</p>
          </div>
        </div>

        {/* Export Button */}
        <div className="pt-2">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-4">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Video export functionality is coming soon. FFmpeg.wasm integration is required.
            </p>
          </div>
          <Button className="w-full" disabled>
            <Download className="h-4 w-4 mr-2" />
            Export Video (Coming Soon)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
