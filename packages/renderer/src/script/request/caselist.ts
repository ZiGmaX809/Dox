import { HTTP_getmyCaseList } from "../api/apiList";
import { STORE_login } from "../../store/modules/login";
import { STORE_caseinfo } from "../../store/modules/caseinfo";

/**
 * 拉取当前账户审理案件列表
 */

export const REQUEST_get_caselist = () => {
  const STORE_login_instance = STORE_login();
  const STORE_caseinfo_instance = STORE_caseinfo();
  const loginInfo = STORE_login_instance.loginInfo;

  const data = {
    yhdm: loginInfo?.yhdm,
    fydm: loginInfo?.fydm,
    yhxm: loginInfo?.yhxm,
    appid: "SPXT",
    yydm: "SPXT",
    roleId: "ALL",
    nd: "",
    dz: "",
    xh: "",
    dsr: "",
    ajzt: ["500"],
    dateType: "LARQ",
    date: [],
    pageNum: 1,
    pageCount: 300,
    orderByMap: {},
    siftSearchData: {},
    sort: "MOREN-ASC",
    sfhxt: true,
  };

  HTTP_getmyCaseList(data, true, true).then((res: any) => {
    STORE_caseinfo_instance.request_mycaselist(res);
  });
};
