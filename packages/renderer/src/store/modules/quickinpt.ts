import { defineStore } from "pinia";
import { load_local_json } from "../../script/utils/loadjson";
import { obj } from "../index";

export const STORE_quickinput = defineStore({
  id: "quickinput",
  state: () => {
    return {
      pcaCache: {} as obj,
      lawfileCache: {} as obj,
    };
  },
  actions: {
    async Set_pcaCache(now: number) {
      await load_local_json("/divisions/pca.json").then((res) => {
        if (res.status === 200) {
          //获取地区列表
          this.pcaCache = {
            loadtime: now,
            contents: res.data,
          };
        }
      });
    },
    async Set_lawfileCache(name: string) {
      const def_path = "/lawfiles/" + name + ".json";
      await load_local_json(def_path).then((res) => {
        if (res.status === 200) {
          //获取法律法规内容
          this.lawfileCache = {
            name: name,
            contents: res.data,
          };
        }
      });
    },
  },
});
