/** Minimal shape of a Sanity image field — enough for @sanity/image-url. */
export interface SanityImage {
  _type: "image";
  alt?: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  location?: string;
  summary?: string;
  coverImage?: SanityImage;
  beforeImage?: SanityImage;
  afterImage?: SanityImage;
  gallery?: SanityImage[];
  completedAt?: string;
  featured?: boolean;
}

export interface SiteSettings {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  socialLinks?: { platform: string; url: string }[];
}
