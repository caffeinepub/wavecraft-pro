import { create } from 'zustand';

export interface ExportJob {
  id: string;
  resolution: '720p' | '1080p' | '4K';
  fps: 30 | 60;
  bitrate: number;
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  error?: string;
  outputBlob?: Blob;
}

interface ExportQueueState {
  jobs: ExportJob[];
  currentJobId: string | null;
  enqueue: (job: Omit<ExportJob, 'id' | 'status' | 'progress'>) => string;
  updateJob: (id: string, updates: Partial<ExportJob>) => void;
  cancelJob: (id: string) => void;
  removeJob: (id: string) => void;
  setCurrentJob: (id: string | null) => void;
}

export const useExportQueue = create<ExportQueueState>((set, get) => ({
  jobs: [],
  currentJobId: null,

  enqueue: (jobData) => {
    const id = `export-${Date.now()}`;
    const job: ExportJob = {
      ...jobData,
      id,
      status: 'queued',
      progress: 0,
    };
    set((state) => ({ jobs: [...state.jobs, job] }));
    return id;
  },

  updateJob: (id, updates) => {
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === id ? { ...job, ...updates } : job
      ),
    }));
  },

  cancelJob: (id) => {
    get().updateJob(id, { status: 'cancelled' });
  },

  removeJob: (id) => {
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    }));
  },

  setCurrentJob: (id) => {
    set({ currentJobId: id });
  },
}));
