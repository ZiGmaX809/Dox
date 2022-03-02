import { obj } from "../../store";
import { STORE_caseinfo } from "../../store/modules/caseinfo";
import { date_format } from "./quickinput";

export const integrate_info = () => {
  const STORE_caseinfo_instance = STORE_caseinfo();
  const caseinfo = STORE_caseinfo_instance.this_caseinfo;
  const dsrlist = caseinfo?.entry?.dsrList;
  const dlrlist = caseinfo?.entry?.dlrList;

  const arr_final_text: string[] = [];

  dsrlist.forEach((item: obj) => {
    let dsrinfo_text = "";
    if (item.lxMc === "自然人") {
      const birthday =
        item.csrq != null ? (date_format(item.csrq) as string[]) : [];
      dsrinfo_text = `${item.ssdw2mc}（原审${item.ssdw1mc}）：${item.mc}，${item.xbMc}，${item.mzMc}，${birthday[0]}出生，住${item.dz}。公民身份号码：${item.sfzhm}。`;
    } else {
      const frlx = item.lxMc === "法人" ? "法定代表人" : "负责人";
      dsrinfo_text = `${item.ssdw2mc}（原审${item.ssdw1mc}）：${item.mc}，住${item.dz}。统一社会信用代码：${item.zzjgdm}。\n${frlx}：${item.fddbr}。`;
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
        }else if (item[0] == "法定代理人"){
          const dlrinfo_ = `法定代理人：${item[2]}。`;
          dsrinfo_text = dsrinfo_text + "\n" + dlrinfo_;
        }
      });
    }

    arr_final_text.push(dsrinfo_text);
  });

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
