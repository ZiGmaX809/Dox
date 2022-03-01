import { Module } from "vuex";
import { rootState } from "..";
import { getItem, setItem } from "../../script/utils/storage";

export interface caseinfoState {
  my_caselist: {
    [propName: string]: any;
  };
  this_ah: string;
  this_caseinfo: {
    [propName: string]: any;
  };
  this_caseid: string;
  previous_caseinfo: {
    [propName: string]: any;
  };
}

const caseinfo = getItem("casedetailInfo") || {};
const caselist = getItem("myCaseList") || {}

const caseinfoModule: Module<caseinfoState, rootState> = {
  state: {
    my_caselist:caselist,
    this_ah: caseinfo?.entry?.ajjbxx?.ah,
    this_caseinfo: caseinfo,
    this_caseid:caseinfo?.entry?.ajjbxx?.ahdm,
    previous_caseinfo: caseinfo?.entry?.yaxxEOList,
  },
  mutations: {
    request_caseinfo(state, data) {
      state.this_caseinfo = data;
      setItem("casedetailInfo", data);
    },
    request_mycaselist(state,data){
      state.my_caselist = data;
      setItem("myCaseList", data);
    }
  },
  actions: {},
};

export default caseinfoModule;
