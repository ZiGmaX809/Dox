import { Stats } from "original-fs";

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
  window.fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = window.path.join(currentDirPath, name);
    var filename = name;
    var filename_withoutsuffix = name.replace(/\..*/g, "");
    var stat = window.fs.statSync(filePath);
    callback(filePath, filename, filename_withoutsuffix, stat);
  });
};

/**
 * 遍历法律法规文件夹，并打开读取其中name的值，以拿到相关文件的简称
 * 为保证性能仅暴露给设置中手动刷新
 * @param folderpath 法律法规文件夹目录地址
 * @returns 数组，包含每个文件path、fullname、name
 */
export const scan_allfiles = async (folderpath: string) => {
  const file_list: any[] = [];
  walkSync(folderpath, (filepath, name, w_name) => {
    if (w_name != "") {
      file_list.push({
        filepath: filepath,
        fullname: "",
        name: w_name,
      });
    }
  });

  file_list.forEach(async (file, index) => {
    window.fs.readFile(file.filepath, "utf8", (err, res) => {
      if (err) throw err;
      file_list[index]["fullname"] = JSON.parse(res).name;
    });
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
  window.fs.readdirSync(folderpath).forEach((item) => {
    num++;
  });
  return num;
};
