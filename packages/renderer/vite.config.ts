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
    resolveElectron(),
    /**
     * Here you can specify other modules
     * 🚧 You have to make sure that your module is in `dependencies` and not in the` devDependencies`,
     *    which will ensure that the electron-builder can package it correctly
     * @example
     * {
     *   'electron-store': 'const Store = require("electron-store"); export default Store;',
     * }
     */
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

/**
 * For usage of Electron and NodeJS APIs in the Renderer process
 * @see https://github.com/caoxiemeihao/electron-vue-vite/issues/52
 */
export function resolveElectron(resolves: Parameters<typeof resolve>[0] = {}): Plugin[] {
  const builtins = builtinModules.filter(t => !t.startsWith('_'));

  /**
   * @see https://github.com/caoxiemeihao/vite-plugins/tree/main/packages/resolve#readme
   */

  return resolve({
    electron: electronExport(),
    ...builtinModulesExport(builtins),
    ...resolves,
  });

  function electronExport() {
    return `
/**
 * For all exported modules see https://www.electronjs.org/docs/latest/api/clipboard -> Renderer Process Modules
 */
const electron = require("electron");
const {
  clipboard,
  nativeImage,
  shell,
  contextBridge,
  crashReporter,
  ipcRenderer,
  webFrame,
  desktopCapturer,
  deprecate,
} = electron;

export {
  electron as default,
  clipboard,
  nativeImage,
  shell,
  contextBridge,
  crashReporter,
  ipcRenderer,
  webFrame,
  desktopCapturer,
  deprecate,
}
`;
  }

  function builtinModulesExport(modules: string[]) {
    return modules
      .map(moduleId => {
        const nodeModule = require(moduleId);
        const requireModule = `const M = require("${moduleId}");`;
        const exportDefault = `export default M;`;
        const exportMembers =
          Object.keys(nodeModule)
            .map(attr => `export const ${attr} = M.${attr}`)
            .join(';\n') + ';';
        const nodeModuleCode = `
${requireModule}

${exportDefault}

${exportMembers}
`;

        return { [moduleId]: nodeModuleCode };
      })
      .reduce((memo, item) => Object.assign(memo, item), {});
  }
}
