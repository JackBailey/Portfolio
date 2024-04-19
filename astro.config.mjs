import { defineConfig } from 'astro/config';
import markdoc from "@astrojs/markdoc";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "andromeeda"
    }
  },
  integrations: [markdoc()],
  output: "hybrid",
  adapter: vercel({
    edgeMiddleware: true,
  })
});