import { getItem } from "./storage";

const codelist = getItem("codeList").data;

/**
 * 通过当事人信息的Code在List中查询Value返回Key(暂时弃用)
 * @param code 数据的Code
 * @returns Code的名称
 */

export const findkey = (code: string, fn = (a: any, b: any) => a === b) => {
  if (code != null) {
    //通过正则获取code类型的key
    const typ: string = /(?<=\_).+(?=\-)/.exec(code)?.toString() || "";
    const obj = codelist[typ];
    //返回code的名称
    const index: string =
      Object.keys(obj).find((k) => fn(obj[k].code, code)) || "";
    return obj[index].mc;
  } else {
    return "";
  }
};
