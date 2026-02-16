import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Type, Upload, X } from 'lucide-react';
import { useOverlaySettings } from './useOverlaySettings';

const fonts = ['Inter', 'Roboto', 'Montserrat', 'Poppins', 'Oswald', 'Bebas Neue'];
const positions = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-center', label: 'Top Center' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right', label: 'Bottom Right' },
];
const animations = [
  { value: 'none', label: 'None' },
  { value: 'fade-in', label: 'Fade In' },
  { value: 'slide-in', label: 'Slide In' },
  { value: 'zoom-in', label: 'Zoom In' },
];

export function OverlaysControlsPanel() {
  const {
    title,
    artist,
    font,
    position,
    size,
    animation,
    logoUrl,
    watermarkEnabled,
    setTitle,
    setArtist,
    setFont,
    setPosition,
    setSize,
    setAnimation,
    setLogo,
    clearLogo,
    setWatermarkEnabled,
  } = useOverlaySettings();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLogo(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5" />
          Text & Branding
        </CardTitle>
        <CardDescription>Add titles, artist names, and logos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Song Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter song title"
          />
        </div>

        <div className="space-y-2">
          <Label>Artist Name</Label>
          <Input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Enter artist name"
          />
        </div>

        <div className="space-y-2">
          <Label>Font</Label>
          <Select value={font} onValueChange={setFont}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Position</Label>
          <Select value={position} onValueChange={(v) => setPosition(v as typeof position)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {positions.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Text Size: {size}px</Label>
          <Slider
            value={[size]}
            onValueChange={([v]) => setSize(v)}
            min={16}
            max={72}
            step={2}
          />
        </div>

        <div className="space-y-2">
          <Label>Entrance Animation</Label>
          <Select value={animation} onValueChange={(v) => setAnimation(v as typeof animation)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {animations.map((a) => (
                <SelectItem key={a.value} value={a.value}>
                  {a.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Logo</Label>
          {logoUrl ? (
            <div className="space-y-2">
              <div className="relative w-24 h-24 bg-accent/20 rounded overflow-hidden">
                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={clearLogo}
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => document.getElementById('logo-upload')?.click()}>
                <Upload className="h-3 w-3 mr-2" />
                Replace Logo
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => document.getElementById('logo-upload')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Logo
            </Button>
          )}
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <Label>Watermark</Label>
          <Switch checked={watermarkEnabled} onCheckedChange={setWatermarkEnabled} />
        </div>
      </CardContent>
    </Card>
  );
}
