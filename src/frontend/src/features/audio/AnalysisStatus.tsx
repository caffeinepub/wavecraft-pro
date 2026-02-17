import { useAudioEngine } from './useAudioEngine';
import { useVisualizerEngineStore } from '../visualizer/useVisualizerEngine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Activity } from 'lucide-react';

export function AnalysisStatus() {
  const { beatDetectionEnabled, setBeatDetectionEnabled, smoothing, setSmoothing } = useAudioEngine();
  const { 
    sensitivity, 
    bassMultiplier, 
    midMultiplier, 
    trebleMultiplier,
    setSensitivity,
    setBassMultiplier,
    setMidMultiplier,
    setTrebleMultiplier,
  } = useVisualizerEngineStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Audio Analysis
        </CardTitle>
        <CardDescription>Adjust audio reactivity and detection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Beat Detection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="beat-detection" className="text-sm font-medium">
              Beat Detection
            </Label>
            <Switch
              id="beat-detection"
              checked={beatDetectionEnabled}
              onCheckedChange={setBeatDetectionEnabled}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Enable automatic beat detection for timeline markers
          </p>
        </div>

        {/* Animation Smoothing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="smoothing" className="text-sm font-medium">
              Animation Smoothing
            </Label>
            <span className="text-xs text-muted-foreground">{Math.round(smoothing * 100)}%</span>
          </div>
          <Slider
            id="smoothing"
            min={0}
            max={1}
            step={0.05}
            value={[smoothing]}
            onValueChange={([value]) => setSmoothing(value)}
            className="touch-action-none"
          />
          <p className="text-xs text-muted-foreground">
            Higher values reduce jitter, lower values increase responsiveness
          </p>
        </div>

        {/* Sensitivity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="sensitivity" className="text-sm font-medium">
              Sensitivity
            </Label>
            <span className="text-xs text-muted-foreground">{sensitivity.toFixed(1)}x</span>
          </div>
          <Slider
            id="sensitivity"
            min={0.1}
            max={3}
            step={0.1}
            value={[sensitivity]}
            onValueChange={([value]) => setSensitivity(value)}
            className="touch-action-none"
          />
        </div>

        {/* Bass Multiplier */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bass" className="text-sm font-medium">
              Bass
            </Label>
            <span className="text-xs text-muted-foreground">{bassMultiplier.toFixed(1)}x</span>
          </div>
          <Slider
            id="bass"
            min={0}
            max={3}
            step={0.1}
            value={[bassMultiplier]}
            onValueChange={([value]) => setBassMultiplier(value)}
            className="touch-action-none"
          />
        </div>

        {/* Mid Multiplier */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="mid" className="text-sm font-medium">
              Mid
            </Label>
            <span className="text-xs text-muted-foreground">{midMultiplier.toFixed(1)}x</span>
          </div>
          <Slider
            id="mid"
            min={0}
            max={3}
            step={0.1}
            value={[midMultiplier]}
            onValueChange={([value]) => setMidMultiplier(value)}
            className="touch-action-none"
          />
        </div>

        {/* Treble Multiplier */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="treble" className="text-sm font-medium">
              Treble
            </Label>
            <span className="text-xs text-muted-foreground">{trebleMultiplier.toFixed(1)}x</span>
          </div>
          <Slider
            id="treble"
            min={0}
            max={3}
            step={0.1}
            value={[trebleMultiplier]}
            onValueChange={([value]) => setTrebleMultiplier(value)}
            className="touch-action-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
