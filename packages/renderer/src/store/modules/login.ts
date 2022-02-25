import { Module } from "vuex";
import { rootState } from "..";
import { getItem, setItem, removeItem } from "../../script/utils/storage";

interface userinfo {
  username: string;
  password: string;
  rememberP: string;
  rememberU: string;
  themeurl: string;
}

export interface loginState {
  userInfo: userinfo;
  token: string;
  avatar: string;
}

const loginModule: Module<loginState, rootState> = {
  namespaced: true,
  state: {
    userInfo: getItem("userInfo") != "" ? getItem("userInfo") : "",
    token: getItem("token"),
    avatar: getItem("avatar_url"),
  },
  mutations: {
    SetUser(state: any, data) {
      state.userInfo = data;
      if (data) {
        setItem("userInfo", JSON.stringify(data));
      } else {
        removeItem("userInfo");
      }
    },
    SetUserID(state: any, data) {
      if (data) {
        setItem("userID", JSON.stringify(data));
      } else {
        removeItem("userID");
      }
    },
    SetToken(state, data) {
      if (data) {
        setItem("token", data);
      } else {
        removeItem("token");
      }
    },
    SetAvatar(state, data) {
      if (data) {
        setItem("avatar_url", data);
      } else {
        removeItem("avatar_url");
      }
    },
  },
};
export default loginModule;
