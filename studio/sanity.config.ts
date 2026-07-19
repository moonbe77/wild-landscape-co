import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

// Run `pnpm studio:dev` at the project root to launch this locally,
// or `pnpm studio:deploy` to host it at <project>.sanity.studio.
export default defineConfig({
  name: "wild-landscape-co",
  title: "Wild Landscape Co.",

  // Reads the same env vars as the Astro site (see .env.example).
  projectId: process.env.SANITY_PROJECT_ID || "",
  dataset: process.env.SANITY_DATASET || "production",

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
