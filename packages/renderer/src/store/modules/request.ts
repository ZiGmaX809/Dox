import { defineStore } from "pinia";

interface RequestState {
  CaseDetail: {
    [propname: string]: any;
  };
  MyCaseList: {
    [propname: string]: any;
  };
}

export const STORE_Request = defineStore({
  id: "Request",
  state: (): RequestState => {
    return {
      CaseDetail: {},
      MyCaseList: {},
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
