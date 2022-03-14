import { ElMessage } from "element-plus";

export function Msg(msg: string, type: any) {
  ElMessage({
    message: msg,
    grouping: true,
    offset: 50,
    type: type,
  });
}
