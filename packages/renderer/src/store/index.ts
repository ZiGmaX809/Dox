import { createStore } from "vuex";
import loginModule, { loginState } from "./modules/login";
import editorModule, { editorState } from "./modules/editor";
import settingModule, { settingState } from "./modules/setting";
import { load_local_json } from "../script/utils/loadjson";
import clipboardModule, { clipboardState } from "./modules/clipboard";

export interface rootState {
  [x: string]: any;
  // 因单独ts文件中无法读取module，故将调用缓存放置主store
  pcaCache: any;
  lawfileCache: any;
}

export default createStore<rootState>({
  state: {
    pcaCache: "",
    lawfileCache: "",
  },
  modules: {
    loginModule,
    editorModule,
    settingModule,
    clipboardModule,
  },
  getters:{
    get_clipboard_num(state) {
      // return state.settingModule.
    }
  },
  mutations: {
    Set_pcaCache(state, data) {
      state.pcaCache = data;
    },
    Set_lawfileCache(state, data) {
      state.lawfileCache = data;
    },
  },
  actions: {
    async Set_pcaCache(state, now) {
      await load_local_json("/divisions/pca.json").then((res) => {
        if (res.status === 200) {
          //获取地区列表
          state.commit("Set_pcaCache", {
            loadtime: now,
            contents: res.data,
          });
        }
      });
    },
    async Set_lawfileCache(state, name) {
      const def_path = "/lawfiles/" + name + ".json";
      await load_local_json(def_path).then((res) => {
        if (res.status === 200) {
          //获取法律法规内容
          state.commit("Set_lawfileCache", {
            name: name,
            contents: res.data,
          });
        }
      });
    },
  },
});

export interface Modules extends rootState {
  loginModule: loginState;
  editorModule: editorState;
  settingModule: settingState;
  clipboardModule: clipboardState;
}
