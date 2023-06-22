import { defineConfig } from "vite";

export default defineConfig({
  base: "/invozone-art-gallery",
  build: {
    rollupOptions: {
      input: "/main.js",
    },
  },
});
