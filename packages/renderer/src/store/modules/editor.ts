import { Module } from "vuex";
import { rootState } from "..";
import { load_local_json } from "../../script/utils/loadjson";

export interface editorState {
  lawfileCache: any;
  presetText: any;
  prev_fy: string;
  editor_isChanged: boolean;
}

const editorModule: Module<editorState, rootState> = {
  namespaced: true,
  state: {
    lawfileCache: "",
    presetText: "",
    prev_fy: "",
    editor_isChanged: false,
  },
  getters: {
    getText(state) {
      return state.presetText;
    },
  },
  mutations: {
    Set_prev_fy(state, data) {
      state.prev_fy = data;
    },
    Set_presetText(state, data) {
      state.presetText = data;
    },
    Set_editor_isChanged(state) {
      state.editor_isChanged = true;
    },
    Reset_editor_isChanged(state) {
      state.editor_isChanged = false;
    },
    Add_presetText(state,data){
      state.presetText[0].Items = data;
    }
  },
  actions: {
    async Set_presetText(state, data) {
      //启动程序时即加载
      await load_local_json("/presettext/EditStrings.json").then((r) => {
        const res = r.data.Template;
        state.commit("Set_presetText", res);
      });
    },
  },
};
export default editorModule;
