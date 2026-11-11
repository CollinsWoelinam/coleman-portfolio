export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  count?: number;
  created_at?: string;
}

export interface Photograph {
  id: string;
  title: string;
  slug: string;
  common_name: string;
  scientific_name: string;
  description: string;
  interesting_facts?: string | null;
  image_url: string;
  cloudinary_public_id: string;
  width?: number | null;
  height?: number | null;
  format?: string | null;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  capture_date?: string | null;
  camera_equipment?: string | null;
  photography_technique?: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  cover_image_url: string;
  cover_image_public_id?: string | null;
  excerpt: string;
  content: string;
  category?: string | null;
  is_published: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  read_time?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role?: string;
}

