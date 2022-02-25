import { getPartyInfoList, getqueryCaseDsrList } from "../api/apiList";
import { getItem, setItem, removeItem } from "../utils/storage";

/**
 * 通过案件代码请求当事人信息
 * @param code 案号代码
 * @returns 是否请求成功
 */

export const get_dsrdetialinfo = (
  id: any,
  isloadingview: boolean,
  ismsg: boolean
) => {
  const get_loginInfo = getItem("loginInfo").data;

  interface data {
    yhdm?: string;
    fydm?: string;
    yhxm?: string;
    appid?: string;
    yydm?: string;
    item?: any;
  }

  let data: data = {
    yhdm: get_loginInfo.yhdm,
    fydm: get_loginInfo.fydm,
    yhxm: get_loginInfo.yhxm,
    appid: "SPXT",
    yydm: "SPXT",
    item: { ahdm: id, start: 1, limit: 20 },
  };
  const dsrInfoList: any[] = [];

  getqueryCaseDsrList(data, isloadingview, ismsg).then(async (res: any) => {
    //console.log(res.total);
    for (let index = 1; index < res.total + 1; index++) {
      const num = index.toString().padStart(4, "0"); //输出序号为“0001“格式
      data.item = { ahdm: id, xh: num };
      await getPartyInfoList(data, isloadingview, ismsg).then((res: any) => {
        if (res.code === 0) {
          dsrInfoList.push(res.data[0].partyItem);
        }
        setItem("dsrInfoList", dsrInfoList);
      });
    }
  });

  //判断是否请求成功
  if (id === getItem("dsrInfoList")[0].ahdm) {
    return true;
  } else {
    return false;
  }
};
