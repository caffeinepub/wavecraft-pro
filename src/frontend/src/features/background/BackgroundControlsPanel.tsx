import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';

export function BackgroundControlsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Background
        </CardTitle>
        <CardDescription>Customize background appearance</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Background controls coming soon</p>
      </CardContent>
    </Card>
  );
}
