import { rmSync } from 'fs'
import { join } from 'path'
import { defineConfig } from 'vite'
import { svgBuilder } from './src/plugins/svgBuilder';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import path from 'path';
import pkg from './package.json'


rmSync('dist', { recursive: true, force: true }) // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '/public': path.resolve(__dirname, '/public'),
      '/store': path.resolve(__dirname, '/src/store'),
      '/scripts': path.resolve(__dirname, '/src/scripts'),
      '/components': path.resolve(__dirname, '/src/components'),
      '/views': path.resolve(__dirname, '/src/components/views'),
    },
  },
  plugins: [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', 'vue-router'],
    }),
    Components({
      resolvers: [],
    }),
    vue(),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            outDir: 'dist/electron/main',
          },
        },
      },
      preload: {
        input: {
          // You can configure multiple preload here
          index: join(__dirname, 'electron/preload/index.ts'),
        },
        vite: {
          build: {
            // For debug
            sourcemap: 'inline',
            outDir: 'dist/electron/preload',
          },
        },
      },
      // Enables use of Node.js API in the Renderer-process
      renderer: {},
    }),
    [svgBuilder(path.resolve(__dirname, 'src/assets/svgs/'))],
  ],
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
});
