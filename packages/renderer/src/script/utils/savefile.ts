import { ipcMsg_Export_File } from './ipcmessage';

/**
 *
 * @param blob 需要保存的二进制文件
 * @param savepath 保存路径
 * @param savename 保存名称
 */
export const Save_File_From_Blob = async (blob: Blob, savepath: string, savename: string) => {
  if (savepath && savename && blob.size > 0) {
    let reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onload = async result => {
      await ipcMsg_Export_File({
        WordFile: result.target?.result,
        SavePath: savepath,
        SaveName: savename,
      });
    };
    return ['success', '成功！'];
  } else {
    return ['error', '参数错误！'];
  }
};
