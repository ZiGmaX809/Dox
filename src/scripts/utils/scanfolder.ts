import { STORE_Setting } from '/store/modules/setting';
import { STORE_System } from '/store/modules/system';
import { Stats } from 'original-fs';
import fs from 'node:fs';
import path from 'node:path';

/**
 * 遍历文件夹并返回文件名称
 * @param currentDirPath 遍历地址
 * @param callback 回调参数
 */
export const walkSync = (
  currentDirPath: string,
  callback: (
    filePath: string,
    filename: string,
    filename_withoutsuffix: string,
    stat: Stats
  ) => void
) => {
  fs.readdirSync(currentDirPath).forEach(function (name) {
    let filePath = path.join(currentDirPath, name);
    let filename = name;
    let filename_withoutsuffix = name.replace(/\..*/g, '');
    let stat = fs.statSync(filePath);
    callback(filePath, filename, filename_withoutsuffix, stat);
  });
};

/**
 * 遍历法律法规文件夹，并打开读取其中name的值，以拿到相关文件的简称
 * 为保证性能仅暴露给设置中手动刷新
 * @param folderpath 法律法规文件夹目录地址
 * @returns 数组，包含每个文件path、fullname、name
 */
const scan_allfiles = (folderpath: string) => {
  const file_list: any[] = [];
  walkSync(folderpath, (filepath, _name, w_name) => {
    if (w_name != '') {
      const content = fs.readFileSync(filepath, 'utf8');
      file_list.push({
        fullname: JSON.parse(content).name,
        name: w_name,
      });
    }
  });
  return file_list;
};

/**
 * 遍历文件夹中文件数量
 * @param folderpath 文件夹地址
 * @returns 文件数量
 */
export const scan_filesnum = async (folderpath: string) => {
  let num = 0;
  fs.readdirSync(folderpath).forEach(item => {
    num++;
  });
  return num;
};

/**
 * 遍历本地法律法规文件夹
 */
export function Scan_Lawfiles() {
  const final_list = scan_allfiles(`${STORE_System().CacheFile_Path}/lawfiles`);
  STORE_Setting().Change_lawfilelist(final_list);
  return final_list;
}
