import { ipcMsg_Export_File, ipcMsg_Select_FileOrFolder } from './ipcmessage';

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

export const Load_Image_To_Base64 = (obj: string | Blob) => {
  let blob: Blob;
  if (typeof obj == 'string') {
    const buffer = window.fs.readFileSync(obj);
    blob = new Blob([buffer]);
  } else {
    blob = obj;
  }

  return new Promise(resolve => {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) {
      resolve(reader.result); // 读取到的base64文件流
    };
  });
};

/**
 * 打开并读取本地文件，返回读取结果
 * @param path （可选）需要读取文件路径，不填则打开dialog选择文件
 * @param filter （可选）过滤器
 * @param encoding （可选）读取文件编码
 * @returns 读取结果
 */
export const Load_Local_Files = async (
  path?: string,
  filter?: any[],
  encoding?: { encoding: BufferEncoding }
) => {
  const fileter_ = filter ?? [
    {
      name: 'JSON',
      extensions: ['json'],
    },
  ];
  const encoding_ = encoding ?? { encoding: 'utf-8' };

  //无路径即进行选择
  if (path) {
    return window.fs.readFileSync(path, encoding_);
  } else {
    const res_path = await ipcMsg_Select_FileOrFolder(['openFile'], fileter_);
    if (res_path) {
      return window.fs.readFileSync(res_path[0], encoding_);
    }
  }
};
