/** 与主进程通信相关方法 */

/** 与主进程通信获取特定名称的文件夹路径 */
export const ipcMsg_Get_Path = async (Folder: string) => {
  return await window.ipcRenderer.invoke('Get_Path', Folder).then((res: string) => {
    return res;
  });
};

export const ipcMsg_Get_File = async (filter: {}) => {
  return await window.ipcRenderer.invoke('Get_File', filter).then((res: any) => {
    return res;
  });
};

export const ipcMsg_Export_Word = async (args: {}) => {
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
