import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    outDir: "dist", // Changed to match Netlify's default expectation
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5173,
  },
  // Add base configuration for Netlify deployment
  base: "./",
  // Optimize for static hosting
  appType: "custom",
  // Fix for optimization issues
  optimizeDeps: {
    exclude: ["app/routes/home.tsx", "app/routes/cart.tsx"]
  }
});
