import { defineConfig } from 'astro/config';
import markdoc from "@astrojs/markdoc";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://jackbailey.dev",
  markdown: {
    shikiConfig: {
      theme: "andromeeda"
    }
  },
  integrations: [markdoc(), sitemap()],
  output: "hybrid",
  adapter: vercel({
    edgeMiddleware: true
  })
});