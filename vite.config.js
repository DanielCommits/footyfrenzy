import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist", // Make sure the build output is directed to `dist`
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to Vercel
    },
  },
});
