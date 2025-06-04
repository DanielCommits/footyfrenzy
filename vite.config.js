import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'FootyFrenzy',
        short_name: 'FootyFrenzy',
        description: 'Your average amazing app. Now installable!',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'public/WhatsApp Image 2025-06-04 at 18.45.01.jpeg.192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'public/CompressJPEG.Online_img(512x512).jpg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
  },
});
