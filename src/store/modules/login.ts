import { defineStore } from "pinia";

interface LoginState {
  LoginResult: {
    [propsname: string]: any;
  };
  LoginInfo: {
    [propsname: string]: any;
  };
  UserID: string;
  Avatar: string;
  Token: string;
}

export const STORE_Login = defineStore({
  id: "login",
  state: (): LoginState => {
    return {
      LoginResult: {},
      LoginInfo: {},
      UserID: "",
      Avatar: "",
      Token: "",
    };
  },
  actions: {
    Set_LoginResult(data: {}) {
      this.LoginResult = data;
    },
    Set_LoginInfo(data: {}) {
      this.LoginInfo = data;
    },
    Set_UserID(data: string) {
      this.UserID = data;
    },
    Set_Avatar(data: string) {
      this.Avatar = data;
    },
    Set_Token(data: string) {
      this.Token = data;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "LoginInfo",
        storage: localStorage,
      },
    ],
  },
});
