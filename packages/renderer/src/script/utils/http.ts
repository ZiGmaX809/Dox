import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { showLoading, hideLoading } from "../utils/loading";

// 接口类型和方法
interface BaseType {
  baseURL: string;
  getConfigParams(): any;
  interceptors(
    instance: AxiosInstance,
    url: string | number | undefined,
    isloading: boolean,
    ismsg: boolean,
    msg_txt: string
  ): any;
  request(
    options: AxiosRequestConfig,
    isloading: boolean,
    loading_txt: string,
    ismsg: boolean,
    msg_txt: string
  ): any;
}

interface AxiosRequestType {
  baseURL?: string;
  url?: string | undefined;
  data?: any;
  params?: any;
  method?: string;
  headers?: any;
  timeout?: number;
  value?: any;
  cancelToken?: any;
}

// 取消重复请求
const CancelToken = axios.CancelToken;
// 用于存储每个请求的取消函数以及对应标识
let sources: any = [];

// 取消函数
let removeSource = (config: any) => {
  for (let item in sources) {
    if (sources[item].umet === config.url + "&" + config.method) {
      sources[item].cancel("已取消重复请求，请勿重复请求");
      sources.splice(item, 1);
    }
  }
};

class AxiosHttpRequest implements BaseType {
  baseURL: string;
  timeout: number;
  //withCredentials: boolean;
  constructor() {
    this.baseURL = "http://203.49.26.247:8080/api/v1";
    this.timeout = 3000;
    //this.withCredentials = true;
  }
  // 配置参数
  getConfigParams() {
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {},
    };
    return config;
  }
  // 拦截设置
  interceptors(
    instance: AxiosInstance,
    url: string | number | undefined,
    isloading: boolean,
    ismsg: boolean,
    msg_txt: string
  ) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestType) => {
        // 非请求当事人信息时,取消重复请求
        if (!config.url?.includes("caseDetail")) {
          removeSource(config);
          config.cancelToken = new CancelToken((c) => {
            // 将取消函数存起来
            sources.push({ umet: config.url + "&" + config.method, cancel: c });
          });
        }

        // 添加全局的loading..
        // if (config.url?.indexOf("queryCaseDsrList") != -1) {
        //   showLoading("拼命加载中......");
        // }
        // 请求头携带token
        //config.headers['Authorization'] = 'Bearer ' + 'token666'
        //config.headers['Cookie']="wdajAjlx=sp; gzptAuthCookie=9901d3bc-9d58-4dd8-9fc9-79bbfc9d397e"
        if (config.method === "put") {
          config.headers["Content-Type"] =
            "application/x-www-form-urlencoded;charset=utf-8";
        } else {
          config.headers["Content-Type"] = "application/json;charset=utf-8";
        }
        // get请求映射params参数
        if (config.method === "get" && config.params) {
          let url = config.url + "?";
          for (const propName of Object.keys(config.params)) {
            const value = config.params[propName];
            var part = encodeURIComponent(propName) + "=";
            if (value !== null && typeof value !== "undefined") {
              if (typeof value === "object") {
                for (const key of Object.keys(value)) {
                  let params = propName + "[" + key + "]";
                  var subPart = encodeURIComponent(params) + "=";
                  url += subPart + encodeURIComponent(value[key]) + "&";
                }
              } else {
                url += part + encodeURIComponent(value) + "&";
              }
            }
          }
          url = url.slice(0, -1);
          config.params = {};
          config.url = url;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截
    instance.interceptors.response.use(
      (res: any) => {
        // 取消重复请求
        removeSource(res.config);
        // console.log(res);
        // 未设置状态码则默认成功状态
        const code = res.status;
        //判断登陆信息
        const login_status = res.data["status"] || false;
        //console.log(code)
        // 获取错误信息
        let msg = res.data["msg"] || "";
        switch (code) {
          case "401":
            msg = "认证失败，无法访问系统资源";
            break;
          case "403":
            msg = "当前操作没有权限";
            break;
          case "404":
            msg = "访问资源不存在";
            break;
        }
        
        if (isloading) {
          hideLoading();
        }

        if (code == 200 || login_status) {
          if (ismsg) {
            ElMessage({
              message: msg_txt === "null" ? "请求成功！" : msg_txt,
              grouping: true,
              type: "success",
              offset: 50,
            });
          }

          return Promise.resolve(res.data);
        } else {
          ElMessage.error({
            message: msg,
            duration: 5 * 1000,
            offset: 50,
          });
          //return Promise.reject(res.data);
          return res.data;
        }
      },
      (error: any) => {
        console.log("err" + error);
        if (ismsg) {
          let { message } = error;
          if (message == "Network Error") {
            message = "后端接口连接异常，请稍后重试。";
          } else if (message.includes("timeout")) {
            message = "系统接口请求超时，请稍后重试。";
          } else if (message.includes("Request failed with status code")) {
            message =
              "系统接口" +
              message.substr(message.length - 3) +
              "异常，请稍后重试。";
          }
          ElMessage.error({
            message: message,
            duration: 5 * 1000,
            offset: 50,
          });
        }
        if (isloading) {
          hideLoading();
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * 外部调用方法
   * @param options axios请求参数
   * @param isloading 是否显示loading界面
   * @param loading_txt loding界面显示文本
   * @param ismsg 是否显示消息
   * @param msg_txt 请求成功消息文本
   * @returns 实例
   */
  request(
    options: AxiosRequestConfig,
    isloading: boolean,
    loading_txt: string,
    ismsg: boolean,
    msg_txt: string
  ) {
    const instance = axios.create();
    if (isloading) {
      showLoading(loading_txt === "null" ? "努力加载中......" : loading_txt);
    }
    options = Object.assign(this.getConfigParams(), options);
    this.interceptors(instance, options.url, ismsg, isloading, msg_txt);
    return instance(options);
  }
}

// 实例化请求类
const http = new AxiosHttpRequest();

export default http;
