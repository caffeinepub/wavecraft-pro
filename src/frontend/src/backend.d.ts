import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface BrandingSettings {
    theme: string;
    font: string;
    logoUrl: string;
}
export interface RefPoint {
    id: string;
    startTime: number;
    tenor: string;
    title: string;
    endTime: number;
    bass: string;
    description: string;
    chords: string;
    harmonicAnalysis: string;
    keySignature: string;
}
export interface ProjectStatistics {
    projectsPerUser: Array<[Principal, bigint]>;
    totalProjects: bigint;
    averageBpm: number;
    mostCommonKey: string;
    polarityCount: bigint;
}
export interface BackgroundSettings {
    color: string;
    brightness: number;
    style: string;
}
export interface TunnelSettings {
    complexity: bigint;
    rotation: boolean;
    mode: string;
    speed: number;
    depth: number;
}
export interface ProjectFilters {
    bpmRange?: [bigint, bigint];
    owner?: Principal;
    keyword?: string;
}
export interface Project {
    id: string;
    bpm: bigint;
    backgroundSettings: BackgroundSettings;
    owner: Principal;
    refPoints: Array<RefPoint>;
    name: string;
    polarity: boolean;
    image?: ExternalBlob;
    musicalKey: string;
    brandingSettings: BrandingSettings;
    tunnelSettings: TunnelSettings;
}
export interface UserProfile {
    name: string;
    avatar?: ExternalBlob;
}
export interface ProjectSummary {
    id: string;
    bpm: bigint;
    owner: Principal;
    name: string;
    image?: ExternalBlob;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createProject(name: string, polarity: boolean, bpm: bigint, musicalKey: string, backgroundSettings: BackgroundSettings, brandingSettings: BrandingSettings, tunnelSettings: TunnelSettings, image: ExternalBlob | null): Promise<string>;
    deleteProject(id: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProject(id: string): Promise<Project>;
    getProjectStatistics(): Promise<ProjectStatistics>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listProjects(filters: ProjectFilters, limit: bigint, offset: bigint): Promise<Array<ProjectSummary>>;
    renameProject(id: string, newName: string): Promise<void>;
    saveCallerUserProfile(name: string, avatar: ExternalBlob | null): Promise<void>;
    updateBackgroundSettings(projectId: string, newSettings: BackgroundSettings): Promise<void>;
    updateBrandingSettings(projectId: string, newSettings: BrandingSettings): Promise<void>;
    updateProject(id: string, name: string, polarity: boolean, bpm: bigint, musicalKey: string, refPoints: Array<RefPoint>, backgroundSettings: BackgroundSettings, brandingSettings: BrandingSettings, tunnelSettings: TunnelSettings, image: ExternalBlob | null): Promise<void>;
    updateTunnelSettings(projectId: string, newSettings: TunnelSettings): Promise<void>;
}
