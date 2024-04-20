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
  integrations: [
    markdoc(),
    sitemap({
      filter: (page) => 
        ![
          "https://jackbailey.dev/contact/error/",
          "https://jackbailey.dev/contact/success/",
        ].includes(page)
    })
  ],
  output: "hybrid",
  adapter: vercel({
    edgeMiddleware: true
  })
});