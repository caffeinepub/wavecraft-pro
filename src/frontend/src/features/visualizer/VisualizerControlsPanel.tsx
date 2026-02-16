import { useVisualizerEngine, type VisualizerMode } from './useVisualizerEngine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Activity, AlertTriangle } from 'lucide-react';

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
  const { mode, setMode, webglSupported } = useVisualizerEngine();

  const handleModeChange = (newMode: string) => {
    const selectedMode = newMode as VisualizerMode;
    
    if (selectedMode === '3d-tunnel' && !webglSupported) {
      setMode('circular-spectrum');
      return;
    }
    
    setMode(selectedMode);
  };

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
        {!webglSupported && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              3D Tunnel mode requires WebGL support. Your browser or device does not support WebGL.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <Label>Mode</Label>
          <Select value={mode} onValueChange={handleModeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visualizerModes.map((m) => (
                <SelectItem 
                  key={m.value} 
                  value={m.value}
                  disabled={m.value === '3d-tunnel' && !webglSupported}
                >
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
