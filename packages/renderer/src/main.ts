import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import store from "./store";

createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(store)
  .mount("#app")
  .$nextTick(window.removeLoading);

// console.log('fs', window.fs)
// console.log('ipcRenderer', window.ipcRenderer)

// Usage of ipcRenderer.on
window.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})
