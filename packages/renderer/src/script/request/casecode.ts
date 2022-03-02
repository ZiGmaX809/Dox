import { HTTP_getCodeList } from "../api/apiList";
import { getItem, setItem } from "../utils/storage";

/**
 * 暂时弃用
 * 拉取后端相关代码对比列表
 * @param code 代码字符串，以“,”分割
 * @returns 无
 */

export const REQUEST_getcasecode = (code: any) => {
  //获取当事人代码
  const loginInfo = getItem("loginInfo");
  const arr_code = code.split(",");
  const dto: string[] = [];

  arr_code.forEach((item: any) => {
    dto.push(`{kind:${item}}`)
  });

  if (loginInfo) {
    const data = {
      yhdm: loginInfo.data.yhdm,
      fydm: loginInfo.data.fydm,
      yhxm: loginInfo.data.yhxm,
      appid: "SPXT",
      yydm: "SPXT",
      dto: dto,
    };

    HTTP_getCodeList(data, false, false).then((res: any) => {
      setItem("codeList", res);
    });
  }
};
