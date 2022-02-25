import { getmyCaseList } from "../api/apiList";
import { getItem, setItem, removeItem } from "../utils/storage";

/**
 * 拉取当前账户审理案件列表
 */

const get_loginInfo = getItem("loginInfo").data;

const data = {
  yhdm: get_loginInfo != null ? get_loginInfo.yhdm : "",
  fydm: get_loginInfo != null ? get_loginInfo.fydm : "",
  yhxm: get_loginInfo != null ? get_loginInfo.yhxm : "",
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
    setItem("myCaseList", JSON.stringify(res));
  });
};
