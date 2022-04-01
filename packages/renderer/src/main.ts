import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/index.css';
import svgIcon from './components/utils/SvgIcon.vue';

createApp(App).component('svg-icon', svgIcon).mount('#app').$nextTick(window.removeLoading);

// console.log('fs', window.fs)
// console.log('ipcRenderer', window.ipcRenderer)

// Usage of ipcRenderer.on
window.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args);
});
