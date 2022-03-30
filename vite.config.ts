import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';

import { version } from './package.json';

const vitePWA = VitePWA;

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    build: {
      assetsInlineLimit: 0,
    },
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        entry: '/src/index.tsx',
        inject: {
          data: {
            version,
            title: process.env.VITE_APP_NAME,
            description: process.env.VITE_APP_DESCRIPTION,
            url: process.env.VITE_APP_URL,
          },
        },
      }),
      vitePWA({
        manifest: {
          name: process.env.VITE_APP_NAME,
          short_name: process.env.VITE_APP_NAME,
          description: process.env.VITE_APP_DESCRIPTION,
          theme_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-256x256.png',
              sizes: '256x256',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
  };
});
