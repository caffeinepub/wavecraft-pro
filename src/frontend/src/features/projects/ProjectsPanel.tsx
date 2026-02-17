import { useState } from 'react';
import { useListProjects, useCreateProject, useDeleteProject, useRenameProject } from '../../hooks/useQueries';
import { useCurrentProject } from './useCurrentProject';
import { useBackgroundSettings } from '../background/useBackgroundSettings';
import { useOverlaySettings } from '../overlays/useOverlaySettings';
import { useVisualizerEngineStore } from '../visualizer/useVisualizerEngine';
import { useCanvasSettings } from '../canvas/useCanvasSettings';
import { encodeBackgroundSettings, encodeBrandingSettings, encodeTunnelSettings } from '../persistence/projectSettingsCodec';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Folder, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export function ProjectsPanel() {
  const { data: projects, isLoading } = useListProjects();
  const createProjectMutation = useCreateProject();
  const deleteProjectMutation = useDeleteProject();
  const renameProjectMutation = useRenameProject();
  const { currentProjectId, setCurrentProjectId } = useCurrentProject();
  const [newProjectName, setNewProjectName] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }

    try {
      const bgSettings = useBackgroundSettings.getState();
      const overlaySettings = useOverlaySettings.getState();
      const vizSettings = useVisualizerEngineStore.getState();
      const canvasSettings = useCanvasSettings.getState();

      // Include canvas settings in the tunnel settings
      const vizWithCanvas = {
        ...JSON.parse(vizSettings.serialize()),
        canvas: JSON.parse(canvasSettings.serialize()),
      };

      const backgroundSettingsEncoded = encodeBackgroundSettings(bgSettings.serialize());
      const brandingSettingsEncoded = encodeBrandingSettings(overlaySettings.serialize());
      const tunnelSettingsEncoded = encodeTunnelSettings(JSON.stringify(vizWithCanvas));

      const projectId = await createProjectMutation.mutateAsync({
        name: newProjectName,
        polarity: false,
        bpm: BigInt(120),
        musicalKey: 'C',
        backgroundSettings: backgroundSettingsEncoded,
        brandingSettings: brandingSettingsEncoded,
        tunnelSettings: tunnelSettingsEncoded,
        image: null,
        published: false,
        isShared: false,
      });

      setCurrentProjectId(projectId);
      setNewProjectName('');
      setCreateDialogOpen(false);
      toast.success('Project created successfully');
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error('Failed to create project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProjectMutation.mutateAsync(id);
      if (currentProjectId === id) {
        setCurrentProjectId(null);
      }
      toast.success('Project deleted');
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleTogglePublished = async (project: any) => {
    try {
      await renameProjectMutation.mutateAsync({
        id: project.id,
        newName: project.name,
      });
      toast.success(project.published ? 'Project unpublished' : 'Project published');
    } catch (error) {
      console.error('Failed to toggle published status:', error);
      toast.error('Failed to update project');
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading projects...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Folder className="h-5 w-5" />
          Projects
        </CardTitle>
        <CardDescription>Manage your visualizer projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Enter a name for your new visualizer project
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="My Awesome Visualizer"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateProject();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject} disabled={createProjectMutation.isPending}>
                {createProjectMutation.isPending ? 'Creating...' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="space-y-2">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  currentProjectId === project.id
                    ? 'bg-primary/10 border-primary'
                    : 'bg-muted/30 border-border hover:bg-muted/50'
                }`}
                onClick={() => setCurrentProjectId(project.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{project.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {project.published ? (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            Published
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <EyeOff className="h-3 w-3" />
                            Private
                          </span>
                        )}
                      </span>
                      {project.isShared && (
                        <span className="text-xs text-chart-1">• Shared</span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No projects yet. Create your first project to get started!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
