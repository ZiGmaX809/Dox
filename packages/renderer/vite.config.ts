import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from '../../package.json';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers';
import { svgBuilder } from './src/plugins/svgBuilder';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '/public': path.resolve(__dirname, 'public'),
      '/store': path.resolve(__dirname, 'src/store'),
      '/scripts': path.resolve(__dirname, 'src/scripts'),
      '/components': path.resolve(__dirname, 'src/components'),
      '/views': path.resolve(__dirname, 'src/components/views'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      resolvers: [HeadlessUiResolver()],
      imports: ['vue', 'vue-router'],
    }),
    Components({
      resolvers: [HeadlessUiResolver()],
    }),
    [svgBuilder(path.resolve(__dirname, 'src/assets/svgs/'))],
  ],
  base: './',
  build: {
    emptyOutDir: true,
    sourcemap: true,
    outDir: '../../dist/renderer',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 初始化tailwindcss文件，放入至main.ts中路径一致
          if (id.includes('./src/assets/styles/main.css')) {
            return 'tailwindcss';
          }
        },
      },
    },
  },
  server: {
    port: pkg.env.PORT,
  },
});
