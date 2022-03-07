import { ElMessage } from "element-plus";
import { STORE_Login } from "../../store/modules/login";

export const check_login_info = () => {
  if (STORE_Login().LoginResult.data == undefined) {
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
