import { defineStore } from "pinia";
import { getItem, removeItem, setItem } from "../../script/utils/storage";

export const STORE_login = defineStore({
  id: "login",
  state: () => {
    return {
      loginInfo: getItem("loginInfo") ? getItem("loginInfo") : "",
      userInfo: getItem("userInfo") ? getItem("userInfo") : "",
      token: getItem("token") ? getItem("token") : "",
      avatar: getItem("avatar_url") ? getItem("avatar_url") : "",
    };
  },
  actions: {
    SetUser(data: {}) {
      this.userInfo = data;
      if (data) {
        setItem("userInfo", JSON.stringify(data));
      }
    },
    SetUserID(data: string) {
      if (data) {
        setItem("userID", JSON.stringify(data));
      }
    },
    SetToken(data: string) {
      if (data) {
        this.token = data;
        setItem("token", data);
      }
    },
    SetAvatar(data: string) {
      if (data) {
        setItem("avatar_url", data);
      }
    },
  },
});
