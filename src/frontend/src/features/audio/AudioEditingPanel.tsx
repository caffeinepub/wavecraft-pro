import { useAudioEngine } from './useAudioEngine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Scissors } from 'lucide-react';

export function AudioEditingPanel() {
  const { duration, trimStart, trimEnd, fadeIn, fadeOut, setTrimStart, setTrimEnd, setFadeIn, setFadeOut } = useAudioEngine();

  if (duration === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="h-5 w-5" />
          Audio Editing
        </CardTitle>
        <CardDescription>Trim and fade controls</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Trim Start: {trimStart.toFixed(2)}s</Label>
          <Slider
            value={[trimStart]}
            onValueChange={([v]) => setTrimStart(v)}
            min={0}
            max={duration}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <Label>Trim End: {trimEnd.toFixed(2)}s</Label>
          <Slider
            value={[trimEnd]}
            onValueChange={([v]) => setTrimEnd(v)}
            min={trimStart}
            max={duration}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <Label>Fade In: {fadeIn.toFixed(1)}s</Label>
          <Slider
            value={[fadeIn]}
            onValueChange={([v]) => setFadeIn(v)}
            min={0}
            max={5}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <Label>Fade Out: {fadeOut.toFixed(1)}s</Label>
          <Slider
            value={[fadeOut]}
            onValueChange={([v]) => setFadeOut(v)}
            min={0}
            max={5}
            step={0.1}
          />
        </div>
      </CardContent>
    </Card>
  );
}
