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
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emoji_u1f4b8.svg/192px-Emoji_u1f4b8.svg.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emoji_u1f4b8.svg/512px-Emoji_u1f4b8.svg.png',
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
