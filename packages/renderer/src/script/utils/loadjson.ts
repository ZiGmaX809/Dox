import axios from "axios";

/**
 * 读取本地文件并返回Promise
 * @param filepath 文件路径（绝对路径）
 * @returns Promise
 */
export const load_local_json = async (filepath:string) => {
  return await axios.get(filepath).then((res) => {
    // return res.data.Template;
    return res;
  });
};
