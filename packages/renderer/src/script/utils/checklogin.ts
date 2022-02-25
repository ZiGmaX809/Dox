import { getItem } from "./storage";
import { ElMessage } from "element-plus";

const get_loginInfo = getItem("loginInfo").data;

export const check_login_info = () => {
  if (get_loginInfo == undefined) {
    ElMessage({
      message: "未登录",
      grouping: true,
      type: "warning",
    });
    return false;
  } else {
    return true;
  }
};
