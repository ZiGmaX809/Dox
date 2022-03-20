/** 与主进程通信相关方法 */

/** 与主进程通信获取特定名称的文件夹路径 */
export const ipcMsg_Get_Path = async (Folder: string) => {
  return await window.ipcRenderer.invoke('Get_Path', Folder).then((res: string) => {
    return res;
  });
};

/**
 * 选择文件并返回结果
 * @param filter 过滤器 { filters: [{ name: 'JSON',extensions: ['json'] }]}
 * @param openDirectory dialog类型：['openFile','openDirectory']
 * @returns 文件内容
 */
export const ipcMsg_Select_FileOrFolder = async (openDirectory: string[], filter?: any[]) => {
  const res_path = await window.ipcRenderer
    .invoke('Select_FileOrFolder', openDirectory, filter)
    .then((res: any) => {
      return res;
    });

  if (res_path) {
    return res_path;
  }
};

export const ipcMsg_Export_File = async (args: {}) => {
  return await window.ipcRenderer.invoke('Export_File', args).then((res: string[]) => {
    return res;
  });
};
