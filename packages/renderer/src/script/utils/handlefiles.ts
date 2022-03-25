import { OpenDialogSyncOptions } from 'electron';
import { ElMessageBox } from 'element-plus';
import { h, ref } from 'vue';

/**
 * 读取本地图片并返回一个相应callback类型的Promise
 * @param obj 读取路径或Blob文件
 * @returns
 */
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
    const res_path = await Select_FileOrFolder(['openFile'], fileter_);
    if (res_path) {
      return window.fs.readFileSync(res_path, encoding_);
    }
  }
};

/**
 * 选择文件并返回结果
 * @param filter 过滤器 { filters: [{ name: 'JSON',extensions: ['json'] }]}
 * @param properties dialog类型：['openFile','openDirectory']
 * @returns 文件内容
 */
export const Select_FileOrFolder = async (
  properties: (
    | 'openFile'
    | 'openDirectory'
    | 'multiSelections'
    | 'showHiddenFiles'
    | 'createDirectory'
    | 'promptToCreate'
    | 'noResolveAliases'
    | 'treatPackageAsDirectory'
    | 'dontAddToRecent'
  )[],
  filters?: any[]
) => {
  const options: OpenDialogSyncOptions = {
    properties: properties,
    filters: filters,
  };
  return await window.ipcRenderer.invoke('Select_FileOrFolder', options).then((res: string) => {
    return res;
  });
};

export const isFileExisted_And_Export = async (
  file: Blob | string,
  filepath: string,
  filename: string
) => {
  const isFile = (typeof file == 'string' ? file.length : file.size) > 0;
  const havetoExport = ref(false);
  if (filepath && isFile) {
    const existed = () => {
      try {
        window.fs.accessSync(filepath, window.fs.constants.F_OK);
        return true; //存在
      } catch (err) {
        return false; //不存在
      }
    };

    if (existed()) {
      await ElMessageBox({
        title: '警告',
        dangerouslyUseHTMLString: true,
        showCancelButton: true,
        message: h('p', null, [
          h(
            'b',
            {
              style: 'user-select: none',
            },
            `${filename}`
          ),
          ' 已存在，是否覆盖？',
        ]),
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        buttonSize: 'small',
        type: 'warning',
      })
        .then(action => {
          havetoExport.value = true;
        })
        .catch(err => {});
    }

    if (havetoExport.value) {
      window.Export_File(file, filepath + filename);
      return ['success', '成功！'];
    }
  } else {
    return ['error', '参数错误！'];
  }
};
