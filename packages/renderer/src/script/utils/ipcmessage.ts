/** 与主进程通信以获取相关目录的绝对地址 */
export const ipcMsg_Get_Path = async (Folder: string) => {
  return await window.ipcRenderer
    .invoke("Get_Path", Folder)
    .then((res: string) => {
      return res;
    });
};

export const ipcMsg_Get_File = async (filter: {}) => {
  return await window.ipcRenderer
    .invoke("Get_File", filter)
    .then((res: any) => {
      return res;
    });
};

export const ipcMsg_Export_Word = async (args: {}) => {
  return await window.ipcRenderer
    .invoke("Save_File", args)
    .then((res: string[]) => {
      return res;
    });
};
