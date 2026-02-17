import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Sparkles, Check } from 'lucide-react';
import { 
  PRESETS_CATALOG, 
  PresetCategory, 
  PresetItem, 
  getAllCategories, 
  getCategoryLabel,
  getPresetsByCategory 
} from './presetsCatalog';
import { applyPreset } from './applyPreset';
import { toast } from 'sonner';

export function PresetsParticlesPanel() {
  const [selectedCategory, setSelectedCategory] = useState<PresetCategory>('visualizers');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedPresetId, setAppliedPresetId] = useState<string | null>(null);

  const categories = getAllCategories();

  const filteredPresets = useMemo(() => {
    const categoryPresets = getPresetsByCategory(selectedCategory);
    if (!searchQuery.trim()) {
      return categoryPresets;
    }
    const query = searchQuery.toLowerCase();
    return categoryPresets.filter(
      preset =>
        preset.name.toLowerCase().includes(query) ||
        preset.description.toLowerCase().includes(query)
    );
  }, [selectedCategory, searchQuery]);

  const handleApplyPreset = (preset: PresetItem) => {
    try {
      applyPreset(preset.settings);
      setAppliedPresetId(preset.id);
      toast.success(`Applied: ${preset.name}`, {
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to apply preset:', error);
      toast.error('Failed to apply preset');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Presets & Particles</h2>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search presets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category Chips */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap px-3 py-1.5 text-xs"
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryLabel(category)}
            </Badge>
          ))}
        </div>
      </ScrollArea>

      {/* Presets Grid */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="grid grid-cols-1 gap-3 pr-4">
          {filteredPresets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No presets found
            </div>
          ) : (
            filteredPresets.map((preset) => (
              <Button
                key={preset.id}
                variant={appliedPresetId === preset.id ? 'default' : 'outline'}
                className="h-auto flex-col items-start p-4 text-left relative"
                onClick={() => handleApplyPreset(preset)}
              >
                <div className="flex items-start justify-between w-full gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm mb-1 truncate">
                      {preset.name}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {preset.description}
                    </div>
                  </div>
                  {appliedPresetId === preset.id && (
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                  )}
                </div>
              </Button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
