import { defineStore } from 'pinia';
import { STORE_Setting } from './setting';

interface SystemState {
  CacheFile_Path: string;
  Download_Path: string;
}

export const STORE_System = defineStore({
  id: 'system',
  state: (): SystemState => {
    return {
      CacheFile_Path: '',
      Download_Path: '',
    };
  },
  actions: {
    Set_LocalFolder_Path(pathlist: string[]) {
      this.CacheFile_Path = pathlist[0];
      this.Download_Path = pathlist[1];
      STORE_Setting().Set_exportfile_path(pathlist[2]);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'SystemInfo',
        storage: localStorage,
      },
    ],
  },
});
