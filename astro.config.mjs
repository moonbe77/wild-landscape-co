// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// Update `site` to your production domain before deploying —
// it's required for the sitemap and for absolute SEO/OG URLs.
export default defineConfig({
  site: "https://www.wildlandscapeco.com.au",
  output: "server",
  adapter: vercel(),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
