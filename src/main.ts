import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/main.css';
import router from './router/index';
import store from './store';
import svgIcon from './components/utils/SvgIcon.vue';

import { ipcMsg_Get_Path } from './scripts/utils/ipcmessage';
import { STORE_System } from './store/modules/system';
import { STORE_Setting } from './store/modules/setting';
import { Scan_Lawfiles } from './scripts/utils/scanfolder';
import { ipcRenderer } from 'electron';

createApp(App)
  .use(store)
  .use(router)
  .component('svg-icon', svgIcon)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*');
  });


// console.log('fs', window.fs)
// console.log('ipcRenderer', window.ipcRenderer)

// Usage of ipcRenderer.on
ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args);
});

if (STORE_Setting().first_launch) {
  const path_list = ['userData', 'documents', 'downloads'];
  const paths = await ipcMsg_Get_Path(path_list);
  STORE_System().Set_LocalFolder_Path(paths);
  STORE_Setting().first_launch = false;
  Scan_Lawfiles();
}
