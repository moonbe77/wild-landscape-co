import type { Project } from "../lib/types";

/**
 * Shown when no Sanity project is configured yet (SANITY_PROJECT_ID unset)
 * or the dataset has no projects, so the site never looks broken/empty
 * during development. Once real content exists in Sanity, these are
 * ignored automatically — see src/pages/projects/index.astro.
 */
export const placeholderProjects: (Omit<
  Project,
  "coverImage" | "beforeImage" | "afterImage" | "gallery"
> & { coverImageUrl: string })[] = [
  {
    _id: "placeholder-1",
    title: "Buderim Courtyard Refresh",
    slug: "buderim-courtyard-refresh",
    category: "garden-design",
    location: "Buderim, QLD",
    summary:
      "A tired courtyard reimagined with native planting, a new timber deck, and low-maintenance garden beds.",
    completedAt: "2026-04-01",
    featured: true,
    coverImageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "placeholder-2",
    title: "Noosa Poolside Landscaping",
    slug: "noosa-poolside-landscaping",
    category: "landscaping",
    location: "Noosa, QLD",
    summary:
      "Full poolside transformation featuring tropical planting, stone paving, and integrated lighting.",
    completedAt: "2026-02-15",
    featured: true,
    coverImageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "placeholder-3",
    title: "Maroochydore Retaining Wall & Garden",
    slug: "maroochydore-retaining-wall-garden",
    category: "hardscaping",
    location: "Maroochydore, QLD",
    summary:
      "Engineered retaining wall paired with terraced planting to reclaim a steep, unused backyard slope.",
    completedAt: "2025-11-20",
    featured: true,
    coverImageUrl:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80",
  },
];
