import { STORE_Request } from "../../store/modules/request";
import { STORE_Login } from "../../store/modules/login";
import { STORE_System } from "../../store/modules/system";

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

  // HTTP_getCaseDetail(data, isloadingview, ismsg).then((res: any) => {
  //   STORE_Request().Request_CaseDetail(res);
  // });

  //离线读取本地json文件
  window.fs.readFile(
    `${STORE_System().CacheFile_Path}/casesinfo/${id}.json`,
    "utf8",
    (err, res) => {
      if (err) throw err;
      STORE_Request().Request_CaseDetail(JSON.parse(res));
    }
  );

  //判断是否请求成功
  if (id === STORE_Request().CaseDetail.entry?.ajjbxx?.ahdm) {
    return true;
  } else {
    return false;
  }
};
