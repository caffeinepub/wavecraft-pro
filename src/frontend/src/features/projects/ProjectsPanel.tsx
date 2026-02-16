import { useListProjects, useCreateProject } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus, Loader2 } from 'lucide-react';

export function ProjectsPanel() {
  const { data: projects, isLoading } = useListProjects();
  const createProject = useCreateProject();

  const handleCreateProject = async () => {
    try {
      await createProject.mutateAsync({
        name: `Project ${new Date().toLocaleString()}`,
        polarity: true,
        bpm: BigInt(120),
        musicalKey: 'C',
      });
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          Projects
        </CardTitle>
        <CardDescription>Manage your visualizer projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleCreateProject} disabled={createProject.isPending} className="w-full">
          {createProject.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </>
          )}
        </Button>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="space-y-2">
            {projects.map((projectId) => (
              <div key={projectId} className="p-3 bg-accent/20 rounded-lg">
                <p className="text-sm font-medium truncate">{projectId}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No projects yet</p>
        )}
      </CardContent>
    </Card>
  );
}
