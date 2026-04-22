import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  adapter: node({ mode: "standalone" }),
  output: "server",
  site: process.env.SITE_URL || "http://localhost:4321",
  vite: {
    server: {
      host: true
    }
  }
});
