import { defineStore } from "pinia";
import { load_local_json } from "../../script/utils/loadjson";
import { obj } from "../index"

export const STORE_editor = defineStore({
  id: "editor",
  state: () => {
    return {
      lawfileCache: "",
      presetText: [] as obj,
      prev_fy: "",
      editor_isChanged: false,
    };
  },
  getters: {
    getText(state) {
      return state.presetText;
    },
  },
  actions: {
    Set_prev_fy(data: string) {
      this.prev_fy = data;
    },
    Set_editor_isChanged() {
      this.editor_isChanged = true;
    },
    Reset_editor_isChanged() {
      this.editor_isChanged = false;
    },
    Add_presetText(data: {}) {
      this.presetText[0].Items = data;
    },
    async Set_presetText() {
      //启动程序时即加载
      await load_local_json("/presettext/EditStrings.json").then((r) => {
        this.presetText = r.data.Template;
      });
    },
  },
});
