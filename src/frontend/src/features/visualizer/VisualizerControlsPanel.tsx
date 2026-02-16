import { useVisualizerEngine, type VisualizerMode } from './useVisualizerEngine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity } from 'lucide-react';

const visualizerModes: Array<{ value: VisualizerMode; label: string; description: string }> = [
  { value: 'circular-spectrum', label: 'Circular Spectrum', description: 'Radial frequency bars' },
  { value: 'bar-horizontal', label: 'Horizontal Bars', description: 'Classic equalizer' },
  { value: 'bar-vertical', label: 'Vertical Bars', description: 'Vertical equalizer' },
  { value: 'waveform', label: 'Waveform Line', description: 'Smooth waveform' },
  { value: 'radial-neon', label: 'Radial Neon Ring', description: 'Neon ring particles' },
  { value: 'particles', label: 'Particle Reactive', description: 'Reactive particles' },
  { value: 'lofi-glow', label: 'Minimal Lo-Fi Glow', description: 'Soft ambient glow' },
  { value: '3d-tunnel', label: '3D Tunnel (Heavy)', description: 'WebGL 3D tunnel' },
];

export function VisualizerControlsPanel() {
  const { mode, setMode } = useVisualizerEngine();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Visualizer Mode
        </CardTitle>
        <CardDescription>Choose your visualizer style</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Mode</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as VisualizerMode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visualizerModes.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  <div>
                    <div className="font-medium">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
