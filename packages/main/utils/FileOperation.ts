import { dialog, OpenDialogSyncOptions } from 'electron';
import fs from 'fs';

/**
 * @param {需删除的路径} Path
 */
export function Remove(Path: string) {
  // 读取原路径
  const STATUS = fs.statSync(Path);
  // 如果原路径是文件
  if (STATUS.isFile()) {
    //删除原文件
    // fs.unlinkSync(Path);
    fs.rmSync(Path);
    //如果原路径是目录
  } else if (STATUS.isDirectory()) {
    //如果原路径是非空目录,遍历原路径
    //空目录时无法使用forEach
    fs.readdirSync(Path).forEach(item => {
      //递归调用函数，以子文件路径为新参数
      Remove(`${Path}/${item}`);
    });
    //删除空文件夹
    fs.rmdirSync(Path);
  }
}

/**
 * @param {原始路径} originalPath
 * @param {目标路径} targetPath
 */
export function Copy(originalPath: string, targetPath: string) {
  try {
    // 读取原路径
    const STATUS = fs.statSync(originalPath);
    // 获得原路径的末尾部分
    // 此部分亦可通过path模块中的basename()方法提取
    // const fileName = originalUrl.split("/")[originalUrl.split("/").length - 1];
    // 如果原路径是文件
    if (STATUS.isFile()) {
      // 在新目录中创建同名文件，并将原文件内容追加到新文件中
      fs.copyFile(originalPath, targetPath, err => {
        if (err) throw err;
      });

      //如果原路径是目录
    } else if (STATUS.isDirectory()) {
      //在新路径中创建新文件夹
      fs.mkdirSync(`${targetPath}`);
      //如果原路径是非空目录,遍历原路径
      //空目录时无法使用forEach
      fs.readdirSync(originalPath).forEach(item => {
        //更新参数，递归调用
        Copy(`${originalPath}/${item}`, `${targetPath}/${item}`);
      });
    }
  } catch (error) {
    console.log('路径有误');
  }
}

/**
 * 定义移动函数(由复制函数与删除函数组成)
 * @param {原始路径} originalPath
 * @param {目标路径} targetPath
 */
export function Move(originalPath: string, targetPath: string) {
  console.log(originalPath, targetPath);
  //复制原路径中所有
  Copy(originalPath, targetPath);
  //删除原路径中所有
  Remove(originalPath);
}

/**
 * 保存Blob数据为文件
 * @param blob 需要保存的二进制文件
 * @param Path 保存路径
 * @param Name 保存名称
 */
export function Export_File(blob: Blob, Path: string, Name: string) {
  if (Path && Name && blob.size > 0) {
    blob.arrayBuffer().then(res => {
      fs.writeFileSync(Path + Name, Buffer.from(res));
    });
    return ['success', '成功！'];
  } else {
    return ['error', '参数错误！'];
  }
}