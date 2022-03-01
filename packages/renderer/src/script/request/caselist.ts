import { getmyCaseList } from "../api/apiList";
import store from "../../store"

/**
 * 拉取当前账户审理案件列表
 */

const loginInfo = store.state.loginModule.loginInfo;

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

export const get_caselist = () => {
  getmyCaseList(data, true, true).then((res: any) => {
    store.commit("caseinfoModule/request_mycaselist", res);
  });
};
