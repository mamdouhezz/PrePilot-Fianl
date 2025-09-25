import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react({
          jsxImportSource: 'react'
        }),
        VitePWA({
          registerType: 'autoUpdate',
          injectRegister: 'auto',
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                handler: 'CacheFirst',
                options: { 
                  cacheName: 'google-fonts-cache', 
                  expiration: { 
                    maxEntries: 10, 
                    maxAgeSeconds: 60 * 60 * 24 * 365 // سنة واحدة
                  } 
                }
              },
              {
                urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                handler: 'CacheFirst',
                options: { 
                  cacheName: 'google-fonts-stylesheets', 
                  expiration: { 
                    maxEntries: 10, 
                    maxAgeSeconds: 60 * 60 * 24 * 365 // سنة واحدة
                  } 
                }
              },
              {
                urlPattern: /^https:\/\/.*\.googleapis\.com\/.*/i,
                handler: 'StaleWhileRevalidate',
                options: { 
                  cacheName: 'google-apis-cache',
                  expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 60 * 24 // يوم واحد
                  }
                }
              }
            ],
            skipWaiting: true,
            clientsClaim: true,
          },
          manifest: {
            name: 'PrePilot.Cloud - AI-Powered Ad Campaign Forecasting',
            short_name: 'PrePilot',
            description: 'منصة ذكية لتخطيط وتوقع الحملات الإعلانية باستخدام الذكاء الاصطناعي',
            theme_color: '#8B5CF6',
            background_color: '#1F2937',
            display: 'standalone',
            orientation: 'portrait',
            scope: '/',
            start_url: '/',
            icons: [
              {
                src: 'icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: 'icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png'
              },
              {
                src: 'icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
              }
            ],
            categories: ['business', 'productivity', 'marketing'],
            lang: 'ar',
            dir: 'rtl'
          },
          devOptions: {
            enabled: true
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./', import.meta.url)),
        }
      },
      build: {
        rollupOptions: {
          external: [],
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              ui: ['framer-motion', 'react-icons'],
              excel: ['exceljs'],
              charts: ['@tanstack/react-query'],
            }
          }
        },
        chunkSizeWarningLimit: 1000
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion', 'react-icons']
      }
    };
});