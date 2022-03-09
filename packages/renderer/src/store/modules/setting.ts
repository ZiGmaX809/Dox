import { defineStore } from "pinia";

interface SettingState {
  ui_color: string;
  org_code: number;
  custom_avatar_bool: boolean;
  custom_avatar_url: string;
  auto_int2em: boolean;
  clipboard_bool: boolean;
  clipboard_num: number;
  clipboard_textlength: number;
  writeSystemClipboard_bool: boolean;
  offline_bool: boolean;
  offline_time: string;
  offline_timestamp: number;
  lawfilelist: string[];
}

export const STORE_Setting = defineStore({
  id: "Setting",
  state: (): SettingState => {
    return {
      ui_color: "",
      org_code: 1301,
      custom_avatar_bool: false,
      custom_avatar_url: "",
      auto_int2em: true,
      clipboard_bool: false,
      clipboard_num: 50,
      clipboard_textlength: 300,
      writeSystemClipboard_bool: false,
      offline_bool: false,
      offline_time: "从未",
      offline_timestamp: 0,
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
    Change_org_code(num: number) {
      this.org_code = num;
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
    Set_offline_time() {
      const date = new Date();
      this.offline_time =
        date.toLocaleDateString() +
        ` ${date.getHours()}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
      this.offline_timestamp = date.getTime();
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
