import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Plus, Trash2, Upload, X, Sparkles } from 'lucide-react';
import { useBackgroundSettings } from './useBackgroundSettings';

export function BackgroundControlsPanel() {
  const {
    type,
    solidColor,
    gradientStops,
    gradientAngle,
    imageUrl,
    particlesEnabled,
    particlesDensity,
    particlesIntensity,
    setType,
    setSolidColor,
    setGradientAngle,
    setImage,
    clearImage,
    setParticlesEnabled,
    setParticlesDensity,
    setParticlesIntensity,
    addGradientStop,
    removeGradientStop,
    updateGradientStop,
  } = useBackgroundSettings();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setType('image');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Background
        </CardTitle>
        <CardDescription>Customize background appearance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={type} onValueChange={(v) => setType(v as typeof type)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="solid">Solid</TabsTrigger>
            <TabsTrigger value="gradient">Gradient</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={solidColor}
                  onChange={(e) => setSolidColor(e.target.value)}
                  className="w-20 h-10 cursor-pointer"
                />
                <Input
                  type="text"
                  value={solidColor}
                  onChange={(e) => setSolidColor(e.target.value)}
                  className="flex-1"
                  placeholder="#000000"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gradient" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Gradient Stops</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addGradientStop}
                  disabled={gradientStops.length >= 5}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Stop
                </Button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {gradientStops.map((stop) => (
                  <div key={stop.id} className="flex items-center gap-2 p-2 bg-accent/20 rounded">
                    <Input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateGradientStop(stop.id, { color: e.target.value })}
                      className="w-12 h-8 cursor-pointer"
                    />
                    <Input
                      type="number"
                      value={stop.position}
                      onChange={(e) => updateGradientStop(stop.id, { position: Number(e.target.value) })}
                      min={0}
                      max={100}
                      className="w-20"
                    />
                    <span className="text-xs text-muted-foreground">%</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeGradientStop(stop.id)}
                      disabled={gradientStops.length <= 2}
                      className="ml-auto"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Angle: {gradientAngle}°</Label>
              <Slider
                value={[gradientAngle]}
                onValueChange={([v]) => setGradientAngle(v)}
                min={0}
                max={360}
                step={1}
              />
            </div>
          </TabsContent>

          <TabsContent value="image" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Background Image</Label>
              {imageUrl ? (
                <div className="space-y-2">
                  <div className="relative aspect-video bg-accent/20 rounded overflow-hidden">
                    <img src={imageUrl} alt="Background" className="w-full h-full object-cover" />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={clearImage}
                      className="absolute top-2 right-2"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => document.getElementById('bg-image-upload')?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Replace Image
                  </Button>
                </div>
              ) : (
                <Button variant="outline" className="w-full" onClick={() => document.getElementById('bg-image-upload')?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              )}
              <input
                id="bg-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Particles Overlay - Independent from background type */}
        <div className="border-t pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <Label className="text-base font-semibold">Particles Overlay</Label>
            </div>
            <Switch checked={particlesEnabled} onCheckedChange={setParticlesEnabled} />
          </div>
          {particlesEnabled && (
            <>
              <div className="space-y-2">
                <Label>Density: {particlesDensity}%</Label>
                <Slider
                  value={[particlesDensity]}
                  onValueChange={([v]) => setParticlesDensity(v)}
                  min={10}
                  max={100}
                  step={5}
                />
              </div>
              <div className="space-y-2">
                <Label>Intensity: {particlesIntensity}%</Label>
                <Slider
                  value={[particlesIntensity]}
                  onValueChange={([v]) => setParticlesIntensity(v)}
                  min={10}
                  max={100}
                  step={5}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
