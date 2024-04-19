import { defineConfig } from 'astro/config';
import markdoc from "@astrojs/markdoc";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "andromeeda"
    }
  },
  integrations: [markdoc()],
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
  })
});