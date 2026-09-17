import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: {
        name: 'Machina Caelestis Universalis',
        short_name: 'Machina',
        lang: 'es',
        start_url: './',
        scope: './',
        description: 'Computadora Celestial: coronas concéntricas y calendarios del mundo',
        theme_color: '#09151b',
        background_color: '#09151b',
        display: 'standalone',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webp,json,woff2,ttf}'],
        maximumFileSizeToCacheInBytes: 5000000,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  test: { include: ['src/tests/**/*.test.ts'] },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          astronomy: ['astronomy-engine'],
        },
      },
    },
  },
});