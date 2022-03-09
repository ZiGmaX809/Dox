import { STORE_Login } from "../../store/modules/login";
import { Msg } from "./message";

export const check_login_info = () => {
  if (STORE_Login().LoginResult.data == undefined) {
    Msg("未登录", "warning");
    return false;
  } else {
    return true;
  }
};
