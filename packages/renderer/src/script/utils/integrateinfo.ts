/** 整合案件信息 */

import { obj } from "../../store";
import { STORE_Editor } from "../../store/modules/editor";
import { STORE_Request } from "../../store/modules/request";
import { date_format } from "./quickinput";

export const integrate_info = () => {
  const STORE_request_instance = STORE_Request();
  const caseinfo = STORE_request_instance.CaseDetail;
  const dsrlist = caseinfo?.entry?.dsrList;
  const dlrlist = caseinfo?.entry?.dlrList;

  const arr_final_text: string[] = [];

  dsrlist.forEach((item: obj) => {
    let dsrinfo_text = "";
    const ysdw = item.ssdw2mc.includes("原审") ? "" : `（原审${item.ssdw1mc}）`;
    if (item.lxMc === "自然人") {
      const birthday =
        item.csrq != null ? (date_format(item.csrq) as string[]) : [];
      dsrinfo_text = `${item.ssdw2mc}${ysdw}：${item.mc}，${item.xbMc}，${item.mzMc}，${birthday[0]}出生，住${item.dz}。公民身份号码：${item.sfzhm}。`;
    } else {
      const frlx = item.lxMc === "法人" ? "法定代表人" : "负责人";
      dsrinfo_text = `${item.ssdw2mc}${ysdw}：${item.mc}，住所地${item.dz}。统一社会信用代码：${item.zzjgdm}。\n${frlx}：${item.fddbr}。`;
    }

    const dlrinfo = final_dlr(item.xh, dlrlist);
    if (dlrinfo.length > 0) {
      dlrinfo.forEach((item) => {
        if (item[0] == "诉讼代理人") {
          const dlrinfo_ =
            item[1] == "执业律师"
              ? `委托诉讼代理人：${item[2]}，${item[3]}律师。`
              : `委托诉讼代理人：${item[2]}，${item[3]}员工。`;
          dsrinfo_text = dsrinfo_text + "\n" + dlrinfo_;
        } else if (item[0] == "法定代理人") {
          const dlrinfo_ = `法定代理人：${item[2]}。`;
          dsrinfo_text += "\n" + dlrinfo_;
        }
      });
    }
    arr_final_text.push(dsrinfo_text);
  });

  arr_final_text.push(final_info(caseinfo));

  return arr_final_text;
};

const final_dlr = (dsrxh: string, dlrlist: obj) => {
  const dlr_arr: string[][] = [];
  dlrlist.forEach((element: any) => {
    if (element.dsrxh == dsrxh) {
      dlr_arr.push([element.lb, element.bhrlxmc, element.mc, element.szdw]);
    }
  });
  return dlr_arr;
};

const final_info = (caseinfo: obj) => {
  const dsrlist_: string[] = (caseinfo?.entry?.ajjbxx?.dsr).split(";");

  const dsrlist = dsrlist_.map((item: string) => {
    return item.replaceAll(",", "、").replaceAll(":", "");
  });

  const final_dsr_text = () => {
    switch (dsrlist.length) {
      case 1:
        return dsrlist[0];
      case 2:
        return dsrlist[0] + "因与" + dsrlist[1];
      case 3:
        return dsrlist[0] + "因与" + dsrlist[1] + "及" + dsrlist[2];
      default:
        const def = dsrlist[0] + "因与" + dsrlist[1] + "及" + dsrlist[2];
        const oth = dsrlist.splice(0, 3).join("、");
        return def + oth;
    }
  };

  const previous_ah = caseinfo?.entry?.yaxxEOList[0]?.ah;
  const previous_fy = STORE_Editor().prev_fy;
  const la_data = (date_format(caseinfo?.entry?.ajjbxx?.larq) as string[])[0];
  const ay = caseinfo?.entry?.ajjbxx?.ayms;
  const final_oth_text = `${ay}一案，不服${previous_fy}${previous_ah}民事裁定，向本院提起上诉。本院于${la_data}立案后，依法组成合议庭审理了本案。本案现已审理终结。`;

  return final_dsr_text() + final_oth_text;
};
