import { useState } from 'react';
import { useGetTemplates, useGetPublishedProjects, useCreateProjectFromTemplate } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCurrentProject } from '../projects/useCurrentProject';
import { truncatePrincipal } from './formatters';

export function CreationsTemplatesPanel() {
  const [activeTab, setActiveTab] = useState<'templates' | 'creations'>('templates');
  const { data: templates, isLoading: templatesLoading, error: templatesError } = useGetTemplates();
  const { data: creations, isLoading: creationsLoading, error: creationsError } = useGetPublishedProjects();
  const createFromTemplate = useCreateProjectFromTemplate();
  const { setCurrentProjectId } = useCurrentProject();

  const handleUseTemplate = async (templateId: string) => {
    try {
      const projectId = await createFromTemplate.mutateAsync(templateId);
      setCurrentProjectId(projectId);
      toast.success('Project created from template');
    } catch (error) {
      console.error('Failed to create project from template:', error);
      toast.error('Failed to create project from template');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Creations/Templates
        </CardTitle>
        <CardDescription>Explore templates and published creations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'templates' | 'creations')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="creations">Creations</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4 mt-4">
            {templatesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : templatesError ? (
              <div className="text-center py-8">
                <p className="text-sm text-destructive">Failed to load templates</p>
              </div>
            ) : templates && templates.length > 0 ? (
              <div className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 rounded-lg bg-accent/20 border border-border/40 hover:bg-accent/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium mb-1">{template.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {template.description}
                        </p>
                        <p className="text-xs text-muted-foreground">{template.bpm.toString()} BPM</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleUseTemplate(template.id)}
                        disabled={createFromTemplate.isPending}
                      >
                        {createFromTemplate.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-1" />
                            Use
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No templates available</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="creations" className="space-y-4 mt-4">
            {creationsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : creationsError ? (
              <div className="text-center py-8">
                <p className="text-sm text-destructive">Failed to load creations</p>
              </div>
            ) : creations && creations.length > 0 ? (
              <div className="space-y-3">
                {creations.map((creation) => (
                  <div
                    key={creation.id}
                    className="p-4 rounded-lg bg-accent/20 border border-border/40 hover:bg-accent/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium mb-1">{creation.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>By {truncatePrincipal(creation.owner.toString())}</span>
                        <span>•</span>
                        <span>{creation.bpm.toString()} BPM</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No published creations yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
