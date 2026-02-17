import { useEffect, useState } from 'react';
import { useActor } from '../hooks/useActor';
import { applyLoadedProject } from '../features/persistence/applyLoadedProject';
import { PreviewCanvas } from '../features/preview/PreviewCanvas';
import { getUrlParameter } from '../utils/urlParams';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home } from 'lucide-react';
import type { Project } from '../backend';

export function SharedProjectView() {
  const { actor } = useActor();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSharedProject = async () => {
      const projectId = getUrlParameter('share');
      
      if (!projectId) {
        setError('No project ID provided');
        setLoading(false);
        return;
      }

      if (!actor) {
        return; // Wait for actor
      }

      try {
        const sharedProject = await actor.getSharedProjectIfPublished(projectId);
        setProject(sharedProject);
        applyLoadedProject(sharedProject);
        setError(null);
      } catch (err: any) {
        console.error('Failed to load shared project:', err);
        setError(err.message || 'Failed to load shared project. It may not be published or shared.');
      } finally {
        setLoading(false);
      }
    };

    loadSharedProject();
  }, [actor]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading shared project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full space-y-6 text-center">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Unable to Load Project</h1>
            <p className="text-muted-foreground">
              {error || 'This project is not available for sharing.'}
            </p>
          </div>
          <Button onClick={() => window.location.href = '/'}>
            <Home className="h-4 w-4 mr-2" />
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border/40 bg-card/30 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/wavecraft-pro-logo.dim_512x512.png" 
            alt="WaveCraft Pro" 
            className="h-8 w-auto"
          />
          <div>
            <h1 className="font-bold text-lg">{project.name}</h1>
            <p className="text-xs text-muted-foreground">Shared Project</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </header>

      {/* Preview */}
      <main className="flex-1 overflow-hidden">
        <PreviewCanvas />
      </main>
    </div>
  );
}
