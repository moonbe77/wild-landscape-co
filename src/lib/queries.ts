import groq from "groq";

/** All projects, most recently completed first. */
export const allProjectsQuery = groq`
  *[_type == "project"] | order(completedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    location,
    summary,
    coverImage,
    beforeImage,
    afterImage,
    completedAt,
    featured
  }
`;

/** Featured projects only, for the home page teaser grid. */
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(completedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    category,
    location,
    summary,
    coverImage
  }
`;

/** Single project by slug, for the project detail page. */
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    location,
    summary,
    coverImage,
    beforeImage,
    afterImage,
    gallery,
    completedAt
  }
`;

/** All project slugs, for generating static params. */
export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

/** Singleton site settings document. */
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    phone,
    email,
    address,
    socialLinks
  }
`;
