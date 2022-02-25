import { Module } from "vuex";
import { rootState } from "..";
import { getItem, setItem } from "../../script/utils/storage";

interface Setting {
  ui_color: string;
  custom_avatar_bool: boolean;
  custom_avatar_url: string;
  auto_int2em: boolean;
  clipboard_bool: boolean;
  clipboard_num: number;
  clipboard_textlength: number;
  lawfilelist: [];
}

export interface settingState {
  setting: Setting;
}

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

const saved_setting =
  getItem("settingInfo") == null ? default_setting : getItem("settingInfo");

const settingModule: Module<settingState, rootState> = {
  namespaced: true,
  state: {
    setting: {
      ui_color: saved_setting.ui_color,
      custom_avatar_bool: saved_setting.custom_avatar_bool,
      custom_avatar_url: saved_setting.custom_avatar_url,
      auto_int2em: saved_setting.auto_int2em,
      clipboard_bool: saved_setting.clipboard_bool,
      clipboard_num: saved_setting.clipboard_num,
      clipboard_textlength: saved_setting.clipboard_textlength,
      lawfilelist: saved_setting.lawfilelist,
    },
  },
  mutations: {
    Switch_clipboard_bool(state, bool) {
      state.setting.clipboard_bool = bool;
    },
    Change_clipboard_num(state, num) {
      state.setting.clipboard_num = num;
    },
    Change_clipboard_textlength(state, num) {
      state.setting.clipboard_textlength = num;
    },
    Switch_auto_int2em(state, bool) {
      state.setting.auto_int2em = bool;
    },
    Switch_custom_avatar(state, bool) {
      state.setting.custom_avatar_bool = bool;
    },
    Save_settings(state) {
      setItem("settingInfo", state.setting);
    },
  },
  actions: {
    Switch_clipboard_bool(state, bool) {
      state.commit("Switch_clipboard_bool", bool);
      state.commit("Save_settings");
    },
    Change_clipboard_num(state, num) {
      state.commit("Change_clipboard_num", num);
      state.commit("Save_settings");
    },
    Change_clipboard_textlength(state, num) {
      state.commit("Change_clipboard_textlength", num);
      state.commit("Save_settings");
    },
    Switch_auto_int2em(state, bool) {
      state.commit("Switch_auto_int2em", bool);
      state.commit("Save_settings");
    },
    Switch_custom_avatar(state, bool) {
      state.commit("Switch_custom_avatar", bool);
      state.commit("Save_settings");
    },
  },
};

export default settingModule;
