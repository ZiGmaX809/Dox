import { builtinModules } from 'module';
import { defineConfig, Plugin } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import resolve from 'vite-plugin-resolve';
import pkg from '../../package.json';

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '/public': path.resolve(__dirname, 'public'),
      '/store': path.resolve(__dirname, 'src/store'),
      '/script': path.resolve(__dirname, 'src/script'),
      '/utils': path.resolve(__dirname, 'src/script/utils'),
      '/components': path.resolve(__dirname, 'src/components'),
      '/views': path.resolve(__dirname, 'src/views'),
    },
  },
  base: './',
  build: {
    emptyOutDir: true,
    sourcemap: true,
    outDir: '../../dist/renderer',
    target: ['chrome90'],
  },
  server: {
    port: pkg.env.PORT,
    proxy: {
      '/api': {
        target: 'http://babg.zj.pcc/proxy/gzpt-widget-all-new/', //接口域名（你请求的第三方接口）
        changeOrigin: true, //是否跨域 （虚拟的站点需要更管origin）
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
