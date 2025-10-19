import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import icon from "astro-icon";
import node from "@astrojs/node";
const site = "https://jackbailey.dev";

const forbiddenPages = ["/contact/error", "/contact/success", "/contact/remove", "/contact/submission*", "/availability"].map(page => site + page);

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [sitemap({
    filter: page => !forbiddenPages.includes(page)
  }), expressiveCode({
    themes: ["github-dark-dimmed", "github-light"],
    themeCssSelector: theme => `[data-ec-theme='${theme.name}']`
  }), mdx(), vue(), icon({
    include: {
      "fa-solid": ["memory", "hdd", "desktop"]
    }
  })],
  output: "server",
  trailingSlash: "never",
  adapter: node({
    mode: "standalone"
  }),
  // session: {
  //   driver: "memory"
  // }
});