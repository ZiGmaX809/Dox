import { ipcMsg_Export_File, ipcMsg_Select_File } from './ipcmessage';

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

export const Load_Image_To_Base64 = (path: string) => {
  const buffer = window.fs.readFileSync(path);
  //获取图片后缀
  const suffix = path.replace(/.*\./, '');
  const suffix_ = suffix === 'jpg' ? 'jpeg' : suffix;
  const base64String =
    `data:image/${suffix_};base64,` + btoa(String.fromCharCode(...new Uint8Array(buffer)));
  return base64String;
};

export const Load_Local_Files = async (path: string, filter: string[], encoding: {}) => {
  //无路径即进行选择
  if (path != '') {
    return window.fs.readFileSync(path, encoding);
  } else {
    const res_path = await ipcMsg_Select_File(filter);
    return window.fs.readFileSync(res_path[0], encoding);
  }
};
