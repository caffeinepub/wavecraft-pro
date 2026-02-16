import { create } from 'zustand';

interface CurrentProjectState {
  currentProjectId: string | null;
  setCurrentProjectId: (id: string | null) => void;
}

export const useCurrentProject = create<CurrentProjectState>((set) => ({
  currentProjectId: null,
  setCurrentProjectId: (id) => set({ currentProjectId: id }),
}));
