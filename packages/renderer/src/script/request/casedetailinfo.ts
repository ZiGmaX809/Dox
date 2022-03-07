import { HTTP_getCaseDetail } from "../api/apiList";
import { STORE_Request } from "../../store/modules/request";
import { STORE_Login } from "../../store/modules/login";

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
  const yhdm = STORE_Login().UserID;

  const data = {
    ahdm: id,
    yhdm: yhdm,
    fydm: "1301",
  };

  HTTP_getCaseDetail(data, isloadingview, ismsg).then((res: any) => {
    // const STORE_caseinfo_instance = STORE_caseinfo();
    // // setItem("casedetailInfo", res);
    // STORE_caseinfo_instance.request_caseinfo(res);
    STORE_Request().Request_CaseDetail(res);
    // store.commit("caseinfoModule/request_caseinfo", res);
  });

  //判断是否请求成功
  if (id === STORE_Request().CaseDetail.entry?.ajjbxx?.ahdm) {
    return true;
  } else {
    return false;
  }
};
