import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';

export function ExportPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Video
        </CardTitle>
        <CardDescription>Export your visualizer as MP4</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Export controls coming soon</p>
      </CardContent>
    </Card>
  );
}
