import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // visualizer({
    //   filename: "stats.html",
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/uploads": "http://localhost:3000",
    },
  },
  // build: {
  //   sourcemap: true,
  // },
});
