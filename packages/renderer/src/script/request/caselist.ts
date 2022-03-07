import { HTTP_getmyCaseList } from "../api/apiList";
import { STORE_Login } from "../../store/modules/login";
import { STORE_Request } from "../../store/modules/request";

/**
 * 拉取当前账户审理案件列表
 */

export const REQUEST_get_caselist = () => {
  const STORE_login_instance = STORE_Login();
  const loginInfo = STORE_login_instance.LoginResult;

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
    pageCount: 200,
    orderByMap: {},
    siftSearchData: {},
    sort: "MOREN-ASC",
    sfhxt: true,
  };

  HTTP_getmyCaseList(data, true, true).then((res: any) => {
    STORE_Request().Request_MyCaseList(res)
  });
};
