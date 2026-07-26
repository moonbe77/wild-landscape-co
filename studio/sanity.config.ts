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

  // The Studio's Vite bundle only exposes env vars prefixed SANITY_STUDIO_
  // (see .env.example) — unprefixed SANITY_* vars are for server-side use only.
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
