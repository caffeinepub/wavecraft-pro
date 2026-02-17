import { useState } from 'react';
import { SidebarNav } from './SidebarNav';
import { TopBar } from './TopBar';
import { PreviewCanvas } from '../preview/PreviewCanvas';
import { AudioUploadPanel } from '../audio/AudioUploadPanel';
import { AudioEditingPanel } from '../audio/AudioEditingPanel';
import { AnalysisStatus } from '../audio/AnalysisStatus';
import { VisualizerControlsPanel } from '../visualizer/VisualizerControlsPanel';
import { BackgroundControlsPanel } from '../background/BackgroundControlsPanel';
import { OverlaysControlsPanel } from '../overlays/OverlaysControlsPanel';
import { ExportPanel } from '../export/ExportPanel';
import { ProjectsPanel } from '../projects/ProjectsPanel';
import { CreationsTemplatesPanel } from '../gallery/CreationsTemplatesPanel';
import { PresetsParticlesPanel } from '../presets/PresetsParticlesPanel';
import { TimelineStrip } from '../timeline/TimelineStrip';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Menu, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export type NavSection = 'audio' | 'visualizer' | 'background' | 'overlays' | 'export' | 'projects' | 'creations';

export function CreatorDashboardLayout() {
  const [activeSection, setActiveSection] = useState<NavSection>('audio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightPanelView, setRightPanelView] = useState<'controls' | 'presets'>('controls');
  const [mobileControlsExpanded, setMobileControlsExpanded] = useState(true);

  const renderControlsPanel = () => {
    switch (activeSection) {
      case 'audio':
        return (
          <div className="space-y-6">
            <AudioUploadPanel />
            <AudioEditingPanel />
            <AnalysisStatus />
          </div>
        );
      case 'visualizer':
        return <VisualizerControlsPanel />;
      case 'background':
        return <BackgroundControlsPanel />;
      case 'overlays':
        return <OverlaysControlsPanel />;
      case 'export':
        return <ExportPanel />;
      case 'projects':
        return <ProjectsPanel />;
      case 'creations':
        return <CreationsTemplatesPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border/40 bg-card/30 overflow-y-auto">
          <SidebarNav activeSection={activeSection} onSectionChange={setActiveSection} />
        </aside>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed bottom-4 left-4 z-50 h-12 w-12 rounded-full bg-card border border-border shadow-lg"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Mobile Sidebar Sheet */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarNav 
              activeSection={activeSection} 
              onSectionChange={(section) => {
                setActiveSection(section);
                setMobileMenuOpen(false);
              }} 
            />
          </SheetContent>
        </Sheet>

        {/* Mobile/Tablet Layout: Stacked */}
        <div className="flex-1 flex flex-col xl:hidden overflow-hidden">
          {/* Preview Area - Mobile */}
          <div className="flex-shrink-0 flex flex-col" style={{ height: mobileControlsExpanded ? '40vh' : '70vh' }}>
            <div className="flex-1 bg-background">
              <PreviewCanvas />
            </div>
            <TimelineStrip />
          </div>

          {/* Collapsible Controls Toggle */}
          <div className="flex-shrink-0 bg-card/50 border-t border-border/40">
            <button
              onClick={() => setMobileControlsExpanded(!mobileControlsExpanded)}
              className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {mobileControlsExpanded ? (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Hide Controls
                </>
              ) : (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Controls
                </>
              )}
            </button>
          </div>

          {/* Controls Area - Mobile (collapsible and scrollable) */}
          {mobileControlsExpanded && (
            <div className="flex-1 overflow-y-auto bg-card/30">
              <Tabs value={rightPanelView} onValueChange={(v) => setRightPanelView(v as 'controls' | 'presets')} className="w-full">
                <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border/40">
                  <TabsList className="w-full h-12 rounded-none bg-transparent">
                    <TabsTrigger value="controls" className="flex-1 data-[state=active]:bg-primary/10">
                      Controls
                    </TabsTrigger>
                    <TabsTrigger value="presets" className="flex-1 data-[state=active]:bg-primary/10">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Presets
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="controls" className="p-4 mt-0">
                  {renderControlsPanel()}
                </TabsContent>
                <TabsContent value="presets" className="p-4 mt-0">
                  <PresetsParticlesPanel />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        {/* Desktop Layout: 3-column */}
        <div className="hidden xl:flex flex-1 overflow-hidden">
          {/* Center Preview Area - Desktop */}
          <main className="flex-1 overflow-hidden bg-background flex flex-col">
            <div className="flex-1">
              <PreviewCanvas />
            </div>
            <TimelineStrip />
          </main>

          {/* Right Controls Panel - Desktop */}
          <aside className="w-96 border-l border-border/40 bg-card/30 flex flex-col overflow-hidden">
            <Tabs value={rightPanelView} onValueChange={(v) => setRightPanelView(v as 'controls' | 'presets')} className="flex-1 flex flex-col">
              <div className="flex-shrink-0 border-b border-border/40 bg-card/50">
                <TabsList className="w-full h-12 rounded-none bg-transparent">
                  <TabsTrigger value="controls" className="flex-1 data-[state=active]:bg-primary/10">
                    Controls
                  </TabsTrigger>
                  <TabsTrigger value="presets" className="flex-1 data-[state=active]:bg-primary/10">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Presets
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="controls" className="flex-1 overflow-y-auto p-6 mt-0">
                {renderControlsPanel()}
              </TabsContent>
              <TabsContent value="presets" className="flex-1 overflow-y-auto p-6 mt-0">
                <PresetsParticlesPanel />
              </TabsContent>
            </Tabs>
          </aside>
        </div>
      </div>
    </div>
  );
}
