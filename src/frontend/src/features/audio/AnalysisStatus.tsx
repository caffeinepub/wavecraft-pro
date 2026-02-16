import { useVisualizerEngine } from '../visualizer/useVisualizerEngine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Activity } from 'lucide-react';

export function AnalysisStatus() {
  const { sensitivity, bassMultiplier, midMultiplier, trebleMultiplier, setSensitivity, setBassMultiplier, setMidMultiplier, setTrebleMultiplier } = useVisualizerEngine();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Audio Analysis
        </CardTitle>
        <CardDescription>Sensitivity and frequency controls</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Sensitivity: {sensitivity.toFixed(2)}</Label>
          <Slider
            value={[sensitivity]}
            onValueChange={([v]) => setSensitivity(v)}
            min={0.1}
            max={3}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <Label>Bass Multiplier: {bassMultiplier.toFixed(2)}</Label>
          <Slider
            value={[bassMultiplier]}
            onValueChange={([v]) => setBassMultiplier(v)}
            min={0.5}
            max={2}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <Label>Mid Multiplier: {midMultiplier.toFixed(2)}</Label>
          <Slider
            value={[midMultiplier]}
            onValueChange={([v]) => setMidMultiplier(v)}
            min={0.5}
            max={2}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <Label>Treble Multiplier: {trebleMultiplier.toFixed(2)}</Label>
          <Slider
            value={[trebleMultiplier]}
            onValueChange={([v]) => setTrebleMultiplier(v)}
            min={0.5}
            max={2}
            step={0.1}
          />
        </div>
      </CardContent>
    </Card>
  );
}
