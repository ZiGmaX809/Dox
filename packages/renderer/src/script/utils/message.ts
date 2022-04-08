import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/src/message.scss';

export function Msg(msg: string, type: any) {
  ElMessage({
    message: msg,
    grouping: true,
    offset: 50,
    type: type,
  });
}
