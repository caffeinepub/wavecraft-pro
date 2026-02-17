import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, ProjectSummary, Project, ProjectFilters, BackgroundSettings, BrandingSettings, TunnelSettings, Template } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { name: string; avatar: any }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(params.name, params.avatar);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Project Queries
export function useListProjects() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ProjectSummary[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const filters: ProjectFilters = {};
      return actor.listProjects(filters, BigInt(100), BigInt(0));
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetProject(id: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Project>({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getProject(id);
    },
    enabled: !!actor && !actorFetching && !!id,
  });
}

export function useCreateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      polarity: boolean;
      bpm: bigint;
      musicalKey: string;
      backgroundSettings: BackgroundSettings;
      brandingSettings: BrandingSettings;
      tunnelSettings: TunnelSettings;
      image: any;
      published?: boolean;
      isShared?: boolean;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProject(
        params.name,
        params.polarity,
        params.bpm,
        params.musicalKey,
        params.backgroundSettings,
        params.brandingSettings,
        params.tunnelSettings,
        params.image,
        params.published ?? false,
        params.isShared ?? false
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      name: string;
      polarity: boolean;
      bpm: bigint;
      musicalKey: string;
      refPoints: any[];
      backgroundSettings: BackgroundSettings;
      brandingSettings: BrandingSettings;
      tunnelSettings: TunnelSettings;
      image: any;
      published: boolean;
      isShared: boolean;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProject(
        params.id,
        params.name,
        params.polarity,
        params.bpm,
        params.musicalKey,
        params.refPoints,
        params.backgroundSettings,
        params.brandingSettings,
        params.tunnelSettings,
        params.image,
        params.published,
        params.isShared
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['publishedProjects'] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['publishedProjects'] });
    },
  });
}

export function useRenameProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; newName: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.renameProject(params.id, params.newName);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
    },
  });
}

export function useUpdateBackgroundSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { projectId: string; settings: BackgroundSettings }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBackgroundSettings(params.projectId, params.settings);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
    },
  });
}

export function useUpdateBrandingSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { projectId: string; settings: BrandingSettings }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBrandingSettings(params.projectId, params.settings);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
    },
  });
}

export function useUpdateTunnelSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { projectId: string; settings: TunnelSettings }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateTunnelSettings(params.projectId, params.settings);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
    },
  });
}

// Template Queries
export function useGetTemplates() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Template[]>({
    queryKey: ['templates'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTemplates(BigInt(100), BigInt(0));
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateProjectFromTemplate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (templateId: string) => {
      if (!actor) throw new Error('Actor not available');
      
      // Fetch the template
      const templates = await actor.getTemplates(BigInt(100), BigInt(0));
      const template = templates.find((t) => t.id === templateId);
      
      if (!template) {
        throw new Error('Template not found');
      }

      // Create a new project from the template
      return actor.createProject(
        `${template.name} - Copy`,
        template.polarity,
        template.bpm,
        template.musicalKey,
        template.backgroundSettings,
        template.brandingSettings,
        template.tunnelSettings,
        template.image ?? null,
        false,
        false
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Published Projects Queries
export function useGetPublishedProjects() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ProjectSummary[]>({
    queryKey: ['publishedProjects'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPublishedProjects(BigInt(100), BigInt(0));
    },
    enabled: !!actor && !actorFetching,
  });
}

export function usePublishProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      if (!actor) throw new Error('Actor not available');
      
      // Fetch the project
      const project = await actor.getProject(projectId);
      
      // Update with published flag set to true
      return actor.updateProject(
        project.id,
        project.name,
        project.polarity,
        project.bpm,
        project.musicalKey,
        project.refPoints,
        project.backgroundSettings,
        project.brandingSettings,
        project.tunnelSettings,
        project.image ?? null,
        true, // published
        project.isShared
      );
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['publishedProjects'] });
    },
  });
}

export function useUnpublishProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      if (!actor) throw new Error('Actor not available');
      
      // Fetch the project
      const project = await actor.getProject(projectId);
      
      // Update with published flag set to false
      return actor.updateProject(
        project.id,
        project.name,
        project.polarity,
        project.bpm,
        project.musicalKey,
        project.refPoints,
        project.backgroundSettings,
        project.brandingSettings,
        project.tunnelSettings,
        project.image ?? null,
        false, // published
        project.isShared
      );
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['publishedProjects'] });
    },
  });
}
