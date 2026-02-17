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
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type NavSection = 'audio' | 'visualizer' | 'background' | 'overlays' | 'export' | 'projects' | 'creations';

export function CreatorDashboardLayout() {
  const [activeSection, setActiveSection] = useState<NavSection>('audio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border/40 bg-card/30 overflow-y-auto">
          <SidebarNav activeSection={activeSection} onSectionChange={setActiveSection} />
        </aside>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed bottom-4 left-4 z-40 h-12 w-12 rounded-full bg-card border border-border shadow-lg"
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

        {/* Center Preview Area */}
        <main className="flex-1 overflow-hidden bg-background">
          <PreviewCanvas />
        </main>

        {/* Right Controls Panel - Desktop */}
        <aside className="hidden xl:block w-96 border-l border-border/40 bg-card/30 overflow-y-auto">
          <div className="p-6">
            {renderControlsPanel()}
          </div>
        </aside>

        {/* Right Controls Panel - Mobile/Tablet (Bottom Sheet) */}
        <div className="xl:hidden fixed bottom-20 left-0 right-0 z-30 max-h-[60vh] overflow-y-auto bg-card border-t border-border/40 shadow-lg">
          <div className="p-4">
            {renderControlsPanel()}
          </div>
        </div>
      </div>
    </div>
  );
}
