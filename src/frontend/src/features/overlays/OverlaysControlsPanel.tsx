import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Type } from 'lucide-react';

export function OverlaysControlsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5" />
          Text & Branding
        </CardTitle>
        <CardDescription>Add titles, artist names, and logos</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Overlay controls coming soon</p>
      </CardContent>
    </Card>
  );
}
