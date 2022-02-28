import { Module } from "vuex";
import { rootState } from "..";
import { getItem, setItem } from "../../script/utils/storage";

export interface clipboardState {
  clipboard_cache: any[];
  clipboard_listen: boolean;
  pin_num: number;
}

const saved_cache = getItem("clipboardCache") || [0, []];

const clipboardModule: Module<clipboardState, rootState> = {
  namespaced: true,
  state: {
    clipboard_cache: saved_cache[1],
    clipboard_listen: false,
    pin_num: saved_cache[0],
  },
  mutations: {
    add_cache(state, data) {
      state.clipboard_cache.splice(state.pin_num, 0, data);
    },
    pin_cache(state, data) {
      state.clipboard_cache.splice(0, 0, data);
      state.pin_num++;
    },
    unpin_cache(state) {
      state.pin_num--;
    },
    del_cache(state, index) {
      state.clipboard_cache.splice(index[0], index[1]);
    },
    clear_cache(state) {
      state.clipboard_cache = [];
      setItem("clipboardCache", [0, []]);
    },
    save_cache(state) {
      setItem("clipboardCache", [state.pin_num, state.clipboard_cache]);
    },
    switch_listen(state) {
      state.clipboard_listen = !state.clipboard_listen;
    },
  },
  getters: {
    listen_type(state) {
      return state.clipboard_listen ? "success" : "danger";
    },
    listen_text(state) {
      return state.clipboard_listen ? "正在监听" : "暂停监听";
    },
    get_cache_length(state) {
      return state.clipboard_cache.length;
    },
  },
  actions: {
    add_cache(state, data: string) {
      const set_clip_num = state.rootState.settingModule.setting.clipboard_num; //设定的剪贴板数量
      const cache_clip_num = state.state.clipboard_cache.length; // 实际剪贴板数量

      //判断是否超出设置缓存数量
      if (cache_clip_num >= set_clip_num) {
        const num: number = cache_clip_num - set_clip_num;
        state.commit("del_cache", [set_clip_num - 1, num + 1]);
      }

      //判断是否已经存在该缓存条目
      const arr_c = state.state.clipboard_cache;
      const _index = arr_c.indexOf(data);
      if (_index > -1) {
        state.commit("del_cache", [_index, 1]);
      }

      //判断是否为空字符组成
      if (data.replace(/\s/g, "") != "") {
        state.commit("add_cache", data);
        state.commit("save_cache");
      }
    },
    pin_cache(state, index: number) {
      //获取原数据
      const origin_text = state.state.clipboard_cache[index];
      //删除原来数据
      state.commit("del_cache", [index, 1]);
      if (index >= state.state.pin_num) {
        //Pin
        //添加到pin最后
        state.commit("pin_cache", origin_text);
      } else {
        //unPin
        state.commit("unpin_cache");
        state.commit("add_cache", origin_text);
      }

      state.commit("save_cache");
    },
    clear_cache(state) {
      state.commit("clear_cache");
    },
    del_cache(state, index: number) {
      if (index < state.state.pin_num) {
        state.commit("unpin_cache");
      }
      state.commit("del_cache", [index, 1]);
      state.commit("save_cache");
    },
  },
};

export default clipboardModule;
