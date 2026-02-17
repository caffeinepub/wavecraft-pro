import { useListProjects, useCreateProject, usePublishProject, useUnpublishProject } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus, Loader2, Globe, GlobeLock } from 'lucide-react';
import { useCurrentProject } from './useCurrentProject';
import { toast } from 'sonner';

export function ProjectsPanel() {
  const { data: projectSummaries, isLoading } = useListProjects();
  const createProject = useCreateProject();
  const publishProject = usePublishProject();
  const unpublishProject = useUnpublishProject();
  const { currentProjectId, setCurrentProjectId } = useCurrentProject();

  const handleCreateProject = async () => {
    try {
      const projectId = await createProject.mutateAsync({
        name: `Project ${new Date().toLocaleString()}`,
        polarity: true,
        bpm: BigInt(120),
        musicalKey: 'C',
        backgroundSettings: {
          color: '#0a0a0f',
          style: 'solid',
          brightness: 1.0,
        },
        brandingSettings: {
          logoUrl: '',
          font: 'Inter',
          theme: 'dark',
        },
        tunnelSettings: {
          mode: 'circular-spectrum',
          speed: 1.0,
          complexity: BigInt(5),
          depth: 10.0,
          rotation: false,
        },
        image: null,
        published: false,
        isShared: false,
      });
      setCurrentProjectId(projectId);
      toast.success('Project created successfully');
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error('Failed to create project');
    }
  };

  const handleLoadProject = (projectId: string) => {
    setCurrentProjectId(projectId);
    toast.success('Project selected');
  };

  const handleTogglePublish = async (projectId: string, isPublished: boolean) => {
    try {
      if (isPublished) {
        await unpublishProject.mutateAsync(projectId);
        toast.success('Project unpublished');
      } else {
        await publishProject.mutateAsync(projectId);
        toast.success('Project published to gallery');
      }
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      toast.error('Failed to update publish status');
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
        ) : projectSummaries && projectSummaries.length > 0 ? (
          <div className="space-y-2">
            {projectSummaries.map((summary) => (
              <div
                key={summary.id}
                className={`p-3 rounded-lg transition-colors ${
                  currentProjectId === summary.id
                    ? 'bg-chart-1/20 border border-chart-1'
                    : 'bg-accent/20 hover:bg-accent/30'
                }`}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleLoadProject(summary.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{summary.name}</p>
                      <p className="text-xs text-muted-foreground">{summary.bpm.toString()} BPM</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-border/40">
                  <Button
                    size="sm"
                    variant={summary.published ? "outline" : "secondary"}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePublish(summary.id, summary.published);
                    }}
                    disabled={publishProject.isPending || unpublishProject.isPending}
                  >
                    {publishProject.isPending || unpublishProject.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : summary.published ? (
                      <>
                        <GlobeLock className="h-4 w-4 mr-2" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Globe className="h-4 w-4 mr-2" />
                        Publish
                      </>
                    )}
                  </Button>
                </div>
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
