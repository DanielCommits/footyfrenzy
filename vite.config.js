import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist", // Make sure the build output is directed to `dist`
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0', 
  },
});
