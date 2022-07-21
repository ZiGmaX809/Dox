import { defineStore } from "pinia";
import { obj } from "../index";
import { STORE_System } from "./system";

export const STORE_Quickinput = defineStore({
  id: "quickinput",
  state: () => {
    return {
      pcaCache: {} as obj,
      lawfileCache: {} as obj,
    };
  },
  actions: {
    Set_pcaCache(now: number) {
      const res = window.fs.readFileSync(
        `${STORE_System().CacheFile_Path}/divisions/pca.json`,
        "utf8"
      );
      this.pcaCache = {
        loadtime: now,
        contents: JSON.parse(res),
      };
    },
    Set_lawfileCache(name: string) {
      const res = window.fs.readFileSync(
        `${STORE_System().CacheFile_Path}/lawfiles/${name}.json`,
        "utf8"
      );
      this.lawfileCache = {
        name: name,
        contents: JSON.parse(res),
      };
    },
  },
});
