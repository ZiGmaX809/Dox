import 'element-plus/dist/index.css';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router/index';
import ElementPlus from 'element-plus';
import store from './store';
import LottieAnimation from 'lottie-web-vue';

import { ipcMsg_Get_Path } from '/utils/ipcmessage';
import { STORE_System } from '/store/modules/system';
import { STORE_Setting } from '/store/modules/setting';
import { Scan_Lawfiles } from '/utils/scanfolder';

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
  await Scan_Lawfiles();
}
