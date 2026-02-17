import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useGetProject } from '../../hooks/useQueries';
import { useActor } from '../../hooks/useActor';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Save, Download, User, LogOut, Share2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useCurrentProject } from '../projects/useCurrentProject';
import { useBackgroundSettings } from '../background/useBackgroundSettings';
import { useOverlaySettings } from '../overlays/useOverlaySettings';
import { useVisualizerEngineStore } from '../visualizer/useVisualizerEngine';
import { encodeBackgroundSettings, encodeBrandingSettings, encodeTunnelSettings } from '../persistence/projectSettingsCodec';
import { applyLoadedProject } from '../persistence/applyLoadedProject';
import { useProjectAutosave } from '../projects/useProjectAutosave';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function TopBar() {
  const { clear, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { currentProjectId } = useCurrentProject();
  const { status: autosaveStatus, markAsSaved } = useProjectAutosave();
  
  // Fetch current project data
  const { data: currentProject, refetch: refetchProject } = useGetProject(currentProjectId || '');

  // Load project settings when project changes
  useEffect(() => {
    if (currentProject) {
      applyLoadedProject(currentProject);
    }
  }, [currentProject]);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleSave = async () => {
    if (!currentProjectId || !currentProject) {
      toast.error('No project selected');
      return;
    }

    if (!actor) {
      toast.error('Backend not available');
      return;
    }

    try {
      const bgSettings = useBackgroundSettings.getState();
      const overlaySettings = useOverlaySettings.getState();
      const vizSettings = useVisualizerEngineStore.getState();

      const backgroundSettingsEncoded = encodeBackgroundSettings(bgSettings.serialize());
      const brandingSettingsEncoded = encodeBrandingSettings(overlaySettings.serialize());
      const tunnelSettingsEncoded = encodeTunnelSettings(vizSettings.serialize());

      await actor.updateProject(
        currentProjectId,
        currentProject.name,
        currentProject.polarity,
        currentProject.bpm,
        currentProject.musicalKey,
        currentProject.refPoints,
        backgroundSettingsEncoded,
        brandingSettingsEncoded,
        tunnelSettingsEncoded,
        currentProject.image || null,
        currentProject.published,
        currentProject.isShared
      );

      await refetchProject();
      markAsSaved();
      toast.success('Project saved successfully');
    } catch (error) {
      console.error('Failed to save project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleShare = async () => {
    if (!currentProjectId || !currentProject) {
      toast.error('No project selected');
      return;
    }

    if (!actor) {
      toast.error('Backend not available');
      return;
    }

    try {
      // Check if project is shared or published
      if (!currentProject.isShared && !currentProject.published) {
        toast.error('Project must be shared or published first. Use the Projects panel to enable sharing.');
        return;
      }

      const shareToken = await actor.getShareToken(currentProjectId);
      
      if (!shareToken) {
        toast.error('Failed to generate share link');
        return;
      }

      const shareUrl = `${window.location.origin}?share=${encodeURIComponent(shareToken)}`;
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!');
    } catch (error: any) {
      console.error('Failed to generate share link:', error);
      toast.error(error.message || 'Failed to generate share link');
    }
  };

  const userInitials = userProfile?.name
    ? userProfile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const getAutosaveText = () => {
    switch (autosaveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      case 'error':
        return 'Save failed';
      default:
        return '';
    }
  };

  return (
    <header className="h-16 border-b border-border/40 bg-card/30 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <img 
          src="/assets/generated/wavecraft-pro-logo.dim_512x512.png" 
          alt="WaveCraft Pro" 
          className="h-8 w-auto lg:hidden"
        />
        <span className="font-bold text-lg lg:hidden">WaveCraft Pro</span>
        {autosaveStatus !== 'idle' && (
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {getAutosaveText()}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="hidden sm:flex"
          onClick={handleShare}
          disabled={!currentProjectId || !actor}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden sm:flex"
          onClick={handleSave}
          disabled={!currentProjectId || !actor}
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button size="sm" className="bg-chart-1 hover:bg-chart-1/90">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-chart-1/20 text-chart-1 text-sm font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{userProfile?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">
                {identity?.getPrincipal().toString().slice(0, 20)}...
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
