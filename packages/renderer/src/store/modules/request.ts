import { defineStore } from "pinia";
import { obj } from "..";
import { walkSync } from "../../script/utils/scanfolder";
import { STORE_System } from "./system";

interface RequestState {
  CaseDetail: {
    [propname: string]: any;
  };
  MyCaseList: {
    [propname: string]: any;
  };
  CaseIDList: string[];
}

export const STORE_Request = defineStore({
  id: "Request",
  state: (): RequestState => {
    return {
      CaseDetail: {},
      MyCaseList: {},
      CaseIDList: [],
    };
  },
  getters: {
    this_ah: (state) => {
      return state.CaseDetail.entry?.ajjbxx?.ah;
    },
    this_caseid: (state) => {
      return state.CaseDetail.entry?.ajjbxx?.ahdm;
    },
    previous_caseinfo: (state) => {
      return state.CaseDetail.entry?.yaxxEOList;
    },
    caselist_num: (state) => {
      //当前案件列表案号代码数组
      const arr_list: string[] = [];
      state.MyCaseList.data.forEach((item: obj) => {
        arr_list.push(item.ahdm);
      });
      state.CaseIDList = arr_list; //写入state待用
      //已缓存文件案号代码
      const arr_offline: string[] = [];
      walkSync(
        `${STORE_System().CacheFile_Path}/offlinecasefiles`,
        (filepath, name, w_name) => {
          arr_offline.push(w_name);
        }
      );
      //数组交集
      const has_offlined: string[] = arr_list.filter(function (v) {
        return arr_offline.indexOf(v) > -1;
      });
      return [has_offlined.length, arr_list.length];
    },
  },
  actions: {
    Request_CaseDetail(data: {}) {
      this.CaseDetail = data;
    },
    Request_MyCaseList(data: {}) {
      this.MyCaseList = data;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "RequestInfo",
        storage: localStorage,
      },
    ],
  },
});
