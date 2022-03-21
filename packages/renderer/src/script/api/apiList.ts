import http from "../utils/http";

/**
 * 外部调用方法
 * @param token 请求携带token，后台校验token无需loading和msg
 * @returns 实例
 */
export const HTTP_checkToken = (
  token: string,
) => {
  return http.request(
    {
      url: "/spxt/checkTokenid?tokenid=&token=" + token,
      method: "POST",
    },
    false,
    "null",
    false,
    "null"
  );
};

/**
 * 外部调用方法
 * @param data 请求携带data
 * @param isloading 是否显示loading界面
 * @param ismsg 是否显示消息
 * @returns 实例
 */
export const HTTP_getmyCaseList = (
  data: object,
  isloading: boolean,
  ismsg: boolean
) => {
  return http.request(
    {
      url: "/myCaseHearing/queryMyCaseList",
      method: "POST",
      data,
    },
    isloading,
    "null",
    ismsg,
    "刷新成功！"
  );
};

/**
 * 外部调用方法
 * @param data 请求携带data
 * @param isloading 是否显示loading界面
 * @param ismsg 是否显示消息
 * @returns 实例
 */
export const HTTP_getCaseDetail = (
  data: object,
  isloading: boolean,
  ismsg: boolean
) => {
  return http.request(
    {
      url: "/api/widgets/searchCase/sp/caseDetail",
      method: "POST",
      data,
    },
    isloading,
    "null",
    ismsg,
    "刷新成功！"
  );
};

/**
 * 外部调用方法
 * @param data 请求携带data
 * @param isloading 是否显示loading界面
 * @param ismsg 是否显示消息
 * @returns 实例
 */
export const HTTP_getqueryCaseDsrList = (
  data: object,
  isloading: boolean,
  ismsg: boolean
) => {
  return http.request(
    {
      url: "/party/queryCaseDsrList",
      method: "POST",
      data,
    },
    isloading,
    "null",
    ismsg,
    "null"
  );
};

/**
 * 外部调用方法
 * @param data 请求携带data
 * @param isloading 是否显示loading界面
 * @param ismsg 是否显示消息
 * @returns 实例
 */
export const HTTP_checkuserinfo = (
  data: string
) => {
  return http.request(
    {
      url: "http://203.49.14.89/gzpt3-platform/api/pub/session",
      method: "PUT",
      data,
    },
    false,
    "null",
    false,
    "null"
  );
};

/**
 * 外部调用方法
 * @param data 请求携带data
 * @param isloading 是否显示loading界面
 * @param ismsg 是否显示消息
 * @returns 实例
 */
export const HTTP_getPartyInfoList = (
  data: object,
  isloading: boolean,
  ismsg: boolean
) => {
  return http.request(
    {
      url: "/party/getPartyInfoList",
      method: "POST",
      data,
    },
    isloading,
    "null",
    ismsg,
    "null"
  );
};

/**
 * 外部调用方法
 * @param data 请求携带data
 * @param isloading 是否显示loading界面
 * @param ismsg 是否显示消息
 * @returns 实例
 */
export const HTTP_getCodeList = (data: object, isloading: boolean, ismsg: boolean) => {
  return http.request(
    {
      url: "/code/queryTsBzdmListMul",
      method: "POST",
      data,
    },
    isloading,
    "null",
    ismsg,
    "null"
  );
};
