export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  provider: string | null;
  raw_metadata: Record<string, unknown> | null;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  created_at: string;
  updated_at: string;
}

export type ProfileFormValues = Omit<Profile, "id" | "created_at" | "updated_at" | "provider" | "raw_metadata">;
