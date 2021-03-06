import { HTTP_getmyCaseList } from "/scripts/api/apiList";
import { STORE_Login } from "/store/modules/login";
import { STORE_Request } from "/store/modules/request";

/**
 * 拉取当前账户审理案件列表
 */

export const REQUEST_get_caselist = async (bool:boolean) => {
  const STORE_login_instance = STORE_Login();
  const Request_Info = STORE_login_instance.LoginResult.data;

  const data = {
    yhdm: Request_Info?.yhdm,
    fydm: Request_Info?.fydm,
    yhxm: Request_Info?.yhxm,
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

  await HTTP_getmyCaseList(data, bool, bool).then((res: any) => {
    STORE_Request().Request_MyCaseList(res)
  });
};
