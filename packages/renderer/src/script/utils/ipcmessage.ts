/** 与主进程通信相关方法 */

/** 与主进程通信获取特定名称的文件夹路径 */
export const ipcMsg_Get_Path = async (Folder: string) => {
  return await window.ipcRenderer.invoke('Get_Path', Folder).then((res: string) => {
    return res;
  });
};

