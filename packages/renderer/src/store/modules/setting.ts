import { defineStore } from "pinia";
import { getItem } from "../../script/utils/storage";

const default_setting = {
  ui_color: "",
  custom_avatar_bool: false,
  custom_avatar_url: "",
  auto_int2em: true,
  clipboard_bool: false,
  clipboard_num: 50,
  clipboard_textlength: 300,
  lawfilelist: [],
};

const saved_setting = getItem("settingInfo")
  ? getItem("settingInfo").setting
  : default_setting;

console.log("🚀 ~ file: setting.ts ~ line 16 ~ saved_setting", saved_setting);
export const STORE_setting = defineStore({
  id: "setting",
  state: () => {
    return {
      setting: saved_setting,
    };
  },
  actions: {
    Switch_clipboard_bool(bool: boolean) {
      this.setting.clipboard_bool = bool;
    },
    Change_clipboard_num(num: number) {
      this.setting.clipboard_num = num;
    },
    Change_clipboard_textlength(num: number) {
      this.setting.clipboard_textlength = num;
    },
    Switch_auto_int2em(bool: boolean) {
      this.setting.auto_int2em = bool;
    },
    Switch_custom_avatar(bool: boolean) {
      this.setting.custom_avatar_bool = bool;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "settingInfo",
        storage: localStorage,
        paths: ["setting"],
      },
    ],
  },
});
