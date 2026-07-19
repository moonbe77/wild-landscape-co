import { createClient, type ClientConfig } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "./types";

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || "production";
const apiVersion = import.meta.env.SANITY_API_VERSION || "2024-01-01";

export const sanityConfigured = Boolean(projectId);

const config: ClientConfig = {
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  token: import.meta.env.SANITY_READ_TOKEN,
  useCdn: true,
  // Renders draft/placeholder content gracefully if no project is
  // configured yet instead of throwing at build time.
  perspective: "published",
};

export const sanityClient = createClient(config);

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
