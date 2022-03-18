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
 * @param encoding 编码 { encoding: 'utf-8' }
 * @returns 文件内容
 */
export const ipcMsg_Get_File = async (filter: any[], encoding: {}) => {
  const arg = { filter, encoding };
  return await window.ipcRenderer.invoke('Get_File', arg).then((res: any) => {
    return res;
  });
};

export const ipcMsg_Get_Image = async (filter: any[]) => {
  return await window.ipcRenderer.invoke('Get_Image', filter).then((res: any) => {
    return res;
  });
};

export const ipcMsg_Export_File = async (args: {}) => {
  return await window.ipcRenderer.invoke('Save_File', args).then((res: string[]) => {
    return res;
  });
};

/** 与主进程通信，打开dialog并返回选择文件夹路径 */
export const ipcMsg_Choose_Folder = async () => {
  return await window.ipcRenderer.invoke('Choose_Folder').then((res: string) => {
    return res;
  });
};
