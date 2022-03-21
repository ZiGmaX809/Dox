import { STORE_Request } from '../../store/modules/request';
import { STORE_Login } from '../../store/modules/login';
import { STORE_System } from '../../store/modules/system';
import { HTTP_getCaseDetail } from '../api/apiList';
import { STORE_Setting } from '../../store/modules/setting';

/**
 * 通过案号代码获取案件详细信息
 * @param code 案号代码
 * @returns 是否请求成功
 */

export const REQUEST_get_casedetailinfo = async (
  id: any,
  isloadingview: boolean,
  ismsg: boolean,
  _autoRequest: boolean
) => {
  let request_success = false;
  try {
    //是否为打开案件空间自动加载
    if (_autoRequest) {
      if (STORE_Setting().offline_bool) {
        //是否开启离线功能
        //离线读取本地json文件
        const res = window.fs.readFileSync(
          `${STORE_System().CacheFile_Path}/offlinecasefiles/${id}.json`,
          'utf8'
        );
        STORE_Request().Request_CaseDetail(JSON.parse(res));
        request_success = check_request_success(id);
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (!request_success) {
      const data = {
        ahdm: id,
        yhdm: STORE_Login().UserID,
        fydm: STORE_Setting().org_code.toString(),
      };
      await HTTP_getCaseDetail(data, isloadingview, ismsg).then((res: any) => {
        STORE_Request().Request_CaseDetail(res);
      });
      request_success = check_request_success(id);
    }
  }
  return request_success;
};

function check_request_success(id: string) {
  //判断是否请求成功
  if (id === STORE_Request().this_caseid) {
    return true;
  } else {
    return false;
  }
}

export const REQUEST_get_ALL_casedetailinfo = async (
  id: any,
  isloadingview: boolean,
  ismsg: boolean
) => {
  const yhdm = STORE_Login().UserID;
  const fydm = STORE_Setting().org_code.toString();
  const data = {
    ahdm: id,
    yhdm: yhdm,
    fydm: fydm,
  };
  return await HTTP_getCaseDetail(data, isloadingview, ismsg)
    .then((res: any) => {
      window.fs.writeFileSync(
        `${STORE_System().CacheFile_Path}/offlinecasefiles/${id}.json`,
        JSON.stringify(res)
      );
      return true;
    })
    .catch(err => {
      return false;
    });
};
