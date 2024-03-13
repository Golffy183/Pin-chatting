import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import { VitePWA } from 'vite-plugin-pwa';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  // ssl debugging
  server: {
    https: {
      key: './sslcert/private.key',
      cert: './sslcert/certificate.crt',
    },
  },
  plugins: [
    react(),
    million.vite({}),
    WindiCSS(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    VitePWA({
      manifest: {
        name: 'React DD',
        short_name: 'React DD',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        prefer_related_applications: true,
        icons: [
          {
            src: '/images/maskable_icon.png',
            sizes: '196x196',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/images/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,gif,webmanifest}'],
      },
      registerType: 'autoUpdate',
    }),
  ],
  resolve: {
    dedupe: ['react'],
  },
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
  build: {
    // outDir: './hosting/public',
    cssCodeSplit: true,
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
    },
  },
});
