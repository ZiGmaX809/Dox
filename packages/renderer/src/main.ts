import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import store from './store';
import { ipcMsg_Get_Path } from './script/utils/ipcmessage';
import { STORE_System } from './store/modules/system';
import { STORE_Setting } from './store/modules/setting';
import LottieAnimation from 'lottie-web-vue';

createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(router)
  .use(LottieAnimation)
  .mount('#app')
  .$nextTick(window.removeLoading);

// console.log('fs', window.fs)
// console.log('ipcRenderer', window.ipcRenderer)

// Usage of ipcRenderer.on
// window.ipcRenderer.on("main-process-message", (_event, ...args) => {
//   console.log("[Receive Main-process message]:", ...args);
// });
if (STORE_Setting().first_launch) {
  const path_list = ['userData', 'documents', 'downloads'];
  const paths = await ipcMsg_Get_Path(path_list);
  STORE_System().Set_LocalFolder_Path(paths);
  STORE_Setting().first_launch = false;
}
