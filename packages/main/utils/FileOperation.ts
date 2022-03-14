import fs from "fs";

/**
 * @param {需删除的路径} url
 */
export function Remove(url: string) {
  // 读取原路径
  const STATUS = fs.statSync(url);
  // 如果原路径是文件
  if (STATUS.isFile()) {
    //删除原文件
    fs.unlinkSync(url);

    //如果原路径是目录
  } else if (STATUS.isDirectory()) {
    //如果原路径是非空目录,遍历原路径
    //空目录时无法使用forEach
    fs.readdirSync(url).forEach((item) => {
      //递归调用函数，以子文件路径为新参数
      Remove(`${url}/${item}`);
    });
    //删除空文件夹
    fs.rmdirSync(url);
  }
}

/**
 * @param {原始路径} originalUrl
 * @param {目标路径} targetUrl
 */
export function Copy(originalUrl: string, targetUrl: string) {
  try {
    // 读取原路径
    const STATUS = fs.statSync(originalUrl);
    // 获得原路径的末尾部分
    // 此部分亦可通过path模块中的basename()方法提取
    // const fileName = originalUrl.split("/")[originalUrl.split("/").length - 1];
    // 如果原路径是文件
    if (STATUS.isFile()) {
      // 在新目录中创建同名文件，并将原文件内容追加到新文件中
      fs.copyFile(originalUrl, targetUrl, (err) => {
        if (err) throw err;
      });

      //如果原路径是目录
    } else if (STATUS.isDirectory()) {
      //在新路径中创建新文件夹
      fs.mkdirSync(`${targetUrl}`);
      //如果原路径是非空目录,遍历原路径
      //空目录时无法使用forEach
      fs.readdirSync(originalUrl).forEach((item) => {
        //更新参数，递归调用
        Copy(`${originalUrl}/${item}`, `${targetUrl}/${item}`);
      });
    }
  } catch (error) {
    console.log("路径有误");
  }
}

/**
 * 定义移动函数(由复制函数与删除函数组成)
 * @param {原始路径} originalUrl
 * @param {目标路径} targetUrl
 */
export function Move(originalUrl: string, targetUrl: string) {
  console.log(originalUrl, targetUrl);
  //复制原路径中所有
  Copy(originalUrl, targetUrl);
  //删除原路径中所有
  Remove(originalUrl);
}
