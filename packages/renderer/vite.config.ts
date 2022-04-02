import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from '../../package.json';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
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
      '/script': path.resolve(__dirname, 'src/script'),
      '/components': path.resolve(__dirname, 'src/components'),
      '/views': path.resolve(__dirname, 'src/components/views'),
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    [svgBuilder(path.resolve(__dirname, 'src/assets/svgs/'))],
  ],
  base: './',
  build: {
    sourcemap: true,
    outDir: '../../dist/renderer',
    target: ['chrome90'],
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
});
