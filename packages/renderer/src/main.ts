import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import store from './store';
import { ipcMsg_Get_Path } from './script/utils/ipcmessage';
import { STORE_System } from './store/modules/system';
import { STORE_Setting } from './store/modules/setting';

createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(router)
  .mount('#app')
  .$nextTick(window.removeLoading);

// console.log('fs', window.fs)
// console.log('ipcRenderer', window.ipcRenderer)

// Usage of ipcRenderer.on
// window.ipcRenderer.on("main-process-message", (_event, ...args) => {
//   console.log("[Receive Main-process message]:", ...args);
// });
if (STORE_Setting().first_launch) {
  STORE_System().Set_CacheFile_Path(
    (await ipcMsg_Get_Path('userData')).replace(/\s/g, '') + '/CacheFiles'
  );
  STORE_Setting().Set_exportfile_path(await ipcMsg_Get_Path('documents'));
  STORE_Setting().first_launch = false;
}
