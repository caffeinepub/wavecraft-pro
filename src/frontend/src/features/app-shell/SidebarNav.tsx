import { type NavSection } from './CreatorDashboardLayout';
import { Music, Activity, Palette, Type, Download, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavProps {
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
}

const navItems: Array<{ id: NavSection; label: string; icon: typeof Music }> = [
  { id: 'audio', label: 'Audio', icon: Music },
  { id: 'visualizer', label: 'Visualizer', icon: Activity },
  { id: 'background', label: 'Background', icon: Palette },
  { id: 'overlays', label: 'Text & Branding', icon: Type },
  { id: 'export', label: 'Export', icon: Download },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
];

export function SidebarNav({ activeSection, onSectionChange }: SidebarNavProps) {
  return (
    <nav className="p-4 space-y-2">
      <div className="mb-6 px-3">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/wavecraft-pro-logo.dim_512x512.png" 
            alt="WaveCraft Pro" 
            className="h-8 w-auto"
          />
          <span className="font-bold text-lg">WaveCraft Pro</span>
        </div>
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left',
              isActive
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
