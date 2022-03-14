import { defineStore } from "pinia";

interface SystemState {
  CacheFile_Path: string;
}

export const STORE_System = defineStore({
  id: "system",
  state: (): SystemState => {
    return {
      CacheFile_Path: "",
    };
  },
  actions: {
    Set_CacheFile_Path(path: string) {
      this.CacheFile_Path = path;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "SystemInfo",
        storage: localStorage,
      },
    ],
  },
});
