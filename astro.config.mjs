import { defineConfig } from 'astro/config';
import deno from '@deno/astro-adapter';
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
const site = "https://jackbailey.dev";


// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      filter: page => ![site + "/contact/error/", site + "/contact/success/"].includes(page)
    }),
    expressiveCode({
      themes: ["github-dark-dimmed", "github-light"],
      themeCssSelector: theme => `[data-ec-theme='${theme.name}']`
    }),
    mdx(),
    vue()
  ],
  output: "hybrid",
  adapter: deno({
    edgeMiddleware: true
  })
});