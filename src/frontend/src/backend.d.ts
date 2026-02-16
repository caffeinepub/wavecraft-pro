import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface Project {
    id: string;
    bpm: bigint;
    owner: Principal;
    refPoints: Array<RefPoint>;
    name: string;
    polarity: boolean;
    musicalKey: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createProject(name: string, polarity: boolean, bpm: bigint, musicalKey: string): Promise<string>;
    deleteProject(id: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProject(id: string): Promise<Project>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listProjects(): Promise<Array<string>>;
    renameProject(id: string, newName: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProject(id: string, name: string, polarity: boolean, bpm: bigint, musicalKey: string, refPoints: Array<RefPoint>): Promise<void>;
}
