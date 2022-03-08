import { defineStore } from "pinia";

interface SettingState {
  ui_color: string;
  custom_avatar_bool: boolean;
  custom_avatar_url: string;
  auto_int2em: boolean;
  clipboard_bool: boolean;
  clipboard_num: number;
  clipboard_textlength: number;
  writeSystemClipboard_bool: boolean;
  offline_bool: boolean;
  offline_num: number;
  offline_time: string;
  lawfilelist: string[];
}

export const STORE_Setting = defineStore({
  id: "Setting",
  state: (): SettingState => {
    return {
      ui_color: "",
      custom_avatar_bool: false,
      custom_avatar_url: "",
      auto_int2em: true,
      clipboard_bool: false,
      clipboard_num: 50,
      clipboard_textlength: 300,
      writeSystemClipboard_bool: false,
      offline_bool: false,
      offline_num: 0,
      offline_time: "从未",
      lawfilelist: [],
    };
  },
  actions: {
    Switch_clipboard_bool(bool: boolean) {
      this.clipboard_bool = bool;
    },
    Change_clipboard_num(num: number) {
      this.clipboard_num = num;
    },
    Change_clipboard_textlength(num: number) {
      this.clipboard_textlength = num;
    },
    Switch_auto_int2em(bool: boolean) {
      this.auto_int2em = bool;
    },
    Switch_custom_avatar(bool: boolean) {
      this.custom_avatar_bool = bool;
    },
    Change_lawfilelist(list: any[]) {
      this.lawfilelist = list;
    },
    Switch_writeSystemClipboard_bool(bool: boolean) {
      this.writeSystemClipboard_bool = bool;
    },
    Switch_offline_bool(bool: boolean) {
      this.offline_bool = bool;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "SettingConfig",
        storage: localStorage,
      },
    ],
  },
});
