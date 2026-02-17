import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "client", // ✅ IMPORTANT
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    outDir: "dist",       // resolves to client/dist
    emptyOutDir: true,
  },
  base: "/",              // ✅ Netlify-friendly
});
