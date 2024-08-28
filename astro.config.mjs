import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import db from "@astrojs/db";
import icon from "astro-icon";
const site = "https://jackbailey.dev";
const forbiddenPages = ["/contact/error", "/contact/success", "/contact/remove", "/contact/submission*", "/availability"].map(page => site + page);


// https://astro.build/config
export default defineConfig({
  site,
  integrations: [sitemap({
    filter: page => !forbiddenPages.includes(page.replace(site, ""))
  }), expressiveCode({
    themes: ["github-dark-dimmed", "github-light"],
    themeCssSelector: theme => `[data-ec-theme='${theme.name}']`
  }), mdx(), vue(), db(), icon({
    include: {
      "fa-solid": ["memory", "hdd", "desktop"]
    }
  })],
  output: "hybrid",
  trailingSlash: "never",
  adapter: vercel()
});