import { defineStore } from "pinia";
import { getItem, setItem } from "../../script/utils/storage";

const caseinfo = getItem("casedetailInfo") || {};
const caselist = getItem("myCaseList") || {};

export const STORE_caseinfo = defineStore({
  id: "caseinfo",
  state: () => {
    return {
      my_caselist: caselist,
      this_ah: caseinfo?.entry?.ajjbxx?.ah,
      this_caseinfo: caseinfo,
      this_caseid: caseinfo?.entry?.ajjbxx?.ahdm,
      previous_caseinfo: caseinfo?.entry?.yaxxEOList,
    };
  },
  actions: {
    request_caseinfo(data: {}) {
      this.this_caseinfo = data;
      setItem("casedetailInfo", data);
    },
    request_mycaselist(data: {}) {
      this.my_caselist = data;
      setItem("myCaseList", data);
    },
  },
});
