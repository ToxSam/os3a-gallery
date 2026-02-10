// src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          passwordHash: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          passwordHash: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          passwordHash?: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          creator_id: string;
          description: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          creator_id: string;
          description?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          creator_id?: string;
          description?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      avatars: {
        Row: {
          id: string;
          name: string;
          project_id: string;
          description: string | null;
          thumbnail_url: string | null;
          model_file_url: string | null;
          polygon_count: number | null;
          format: string;
          material_count: number | null;
          is_public: boolean;
          is_draft: boolean;
          created_at: string;
          updated_at: string;
          metadata: Json;
        };
        Insert: {
          id?: string;
          name: string;
          project_id: string;
          description?: string | null;
          thumbnail_url?: string | null;
          model_file_url?: string | null;
          polygon_count?: number | null;
          format: string;
          material_count?: number | null;
          is_public?: boolean;
          is_draft?: boolean;
          created_at?: string;
          metadata?: Json;
        };
        Update: {
          id?: string;
          name?: string;
          project_id?: string;
          description?: string | null;
          thumbnail_url?: string | null;
          model_file_url?: string | null;
          polygon_count?: number | null;
          format?: string;
          material_count?: number | null;
          is_public?: boolean;
          is_draft?: boolean;
          metadata?: Json;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}