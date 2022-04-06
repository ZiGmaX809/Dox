import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/main.css';
import router from './router/index';
import store from './store';
import svgIcon from './components/utils/SvgIcon.vue';

createApp(App)
  .use(store)
  .use(router)
  .component('svg-icon', svgIcon)
  .mount('#app')
  .$nextTick(window.removeLoading);

// console.log('fs', window.fs)
// console.log('ipcRenderer', window.ipcRenderer)

// Usage of ipcRenderer.on
window.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args);
});
