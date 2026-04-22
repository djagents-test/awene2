import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  adapter: vercel(),
  output: "server",
  site: process.env.SITE_URL || "http://localhost:4321",
  vite: {
    server: {
      host: true
    }
  }
});
