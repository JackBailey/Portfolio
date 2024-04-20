import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
const site = "https://v9.jackbailey.dev";


// https://astro.build/config
export default defineConfig({
  site,
  integrations: [sitemap({
    filter: page => ![site + "/contact/error/", site + "/contact/success/"].includes(page)
  }), expressiveCode(), mdx()],
  output: "hybrid",
  adapter: vercel({
    edgeMiddleware: true
  })
});