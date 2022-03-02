import { HTTP_getCaseDetail } from "../api/apiList";
import { getItem } from "../utils/storage";
import { STORE_caseinfo } from "../../store/modules/caseinfo";

/**
 * 通过案号代码获取案件详细信息
 * @param code 案号代码
 * @returns 是否请求成功
 */

export const REQUEST_get_casedetailinfo = (
  id: any,
  isloadingview: boolean,
  ismsg: boolean
) => {
  const yhdm = getItem("userID");

  const data = {
    ahdm: id,
    yhdm: yhdm,
    fydm: "1301",
  };

  HTTP_getCaseDetail(data, isloadingview, ismsg).then((res: any) => {
    const STORE_caseinfo_instance = STORE_caseinfo();
    // setItem("casedetailInfo", res);
    STORE_caseinfo_instance.request_caseinfo(res);
    // store.commit("caseinfoModule/request_caseinfo", res);
  });

  //判断是否请求成功
  if (id === getItem("casedetailInfo")?.entry?.ajjbxx?.ahdm) {
    return true;
  } else {
    return false;
  }
};
