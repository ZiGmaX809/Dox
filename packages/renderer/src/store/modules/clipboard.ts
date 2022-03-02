import { defineStore } from "pinia";
import { STORE_setting } from "./setting";

// const saved_cache = getItem("clipboardCache") || [0, []];

export const STORE_clipboard = defineStore({
  id: "clipboard",
  state: () => {
    return {
      clipboard_cache: [] as Array<string>,
      clipboard_listen: false,
      pin_num: 0,
    };
  },
  getters: {
    listen_type(state) {
      return () => {
        return state.clipboard_listen ? "success" : "danger";
      };
    },
    listen_text(state) {
      return () => {
        return state.clipboard_listen ? "正在监听" : "暂停监听";
      };
    },
    get_cache_length(state) {
      return () => {
        return state.clipboard_cache.length;
      };
    },
  },
  actions: {
    add_cache(data: string) {
      const STORE_setting_instance = STORE_setting();
      const set_clip_num = STORE_setting_instance.setting.clipboard_num; //设定的剪贴板数量
      const cache_clip_num = this.clipboard_cache.length; // 实际剪贴板数量

      //判断是否超出设置缓存数量
      if (cache_clip_num >= set_clip_num) {
        const num: number = cache_clip_num - set_clip_num;
        this.clipboard_cache.splice(set_clip_num - 1, num + 1);
      }

      //判断是否已经存在该缓存条目
      const arr_c = this.clipboard_cache;
      const _index = arr_c.indexOf(data);
      if (_index > -1) {
        this.clipboard_cache.splice(_index, 1);
      }

      //判断是否为空字符组成
      if (data.replace(/\s/g, "") != "") {
        this.clipboard_cache.splice(this.pin_num, 0, data);
      }
    },
    pin_cache(index: number) {
      //获取原数据
      const origin_text = this.clipboard_cache[index];
      //删除原来数据
      this.clipboard_cache.splice(index, 1);
      if (index >= this.pin_num) {
        //Pin
        //添加到pin最后
        this.clipboard_cache.splice(0, 0, origin_text);
        this.pin_num++;
      } else {
        //unPin
        this.pin_num--;
        this.clipboard_cache.splice(this.pin_num, 0, origin_text);
      }
    },
    clear_cache() {
      this.clipboard_cache = [];
      this.pin_num = 0;
    },
    del_cache(index: number) {
      if (index < this.pin_num) {
        this.pin_num--;
      }
      this.clipboard_cache.splice(index, 1);
    },
    switch_listen() {
      this.clipboard_listen = !this.clipboard_listen;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "clipboardCache",
        storage: localStorage,
      },
    ],
  },
});
