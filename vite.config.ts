import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

import { version } from './package.json';

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
          },
        },
      }),
    ],
  };
});
