import nzhcn from "nzh/cn";
import { ref } from "vue";
import store from "../../store";

var arr_pca: any[] = [];

export const quickinput = async (keyword: string, file_list: []) => {
  //分割命令
  const keys = keyword.split(/\s/);
  //判断功能
  switch (keys[0]) {
    case "rq":
      let result_date = date_format(keys[1]);
      if (result_date != undefined) {
        const t = result_date.map((item, index) => {
          return {
            id: item == "不存在该日期" ? -1 : index,
            value: item,
          };
        });
        return t;
      } else {
        return "不支持的日期格式";
      }
    case "je":
      const num = keys[1].replace(/[^0-9\.]/g, "");
      const num_ = num.replaceAll(/\./g, "");
      if (num.length <= num_.length + 1) {
        return [
          {
            id: 0,
            value: `人民币${num}元`,
          },
          {
            id: 1,
            value: `${nzhcn.toMoney(num)}`,
          },
        ];
      } else {
        return "金额数字格式错误";
      }
    case "dz":
      if (keys[1] == "") {
        return "请输入地区";
      } else {
        await introduce_pcafile();
        const arr_address = find_address(keys[1]);

        if (typeof arr_address == "object" && arr_address.length > 0) {
          const final_address = arr_address.map((item: any, index: any) => {
            return {
              id: index,
              value: item,
            };
          });
          return final_address;
        } else {
          return "未找到该地区";
        }
      }

    case "ft":
      let judge_ = judge_law(keys[1], file_list);
      if (typeof judge_ == "object") {
        const name_ = judge_[0];
        const index_ = judge_[1];
        if (index_ == "" || Number(index_) == 0) {
          return "请输入法条索引";
        }
        await introduce_lawarticle(name_);

        const arr_res = input_lawarticle(index_);
        if (typeof arr_res == "object") {
          const res = arr_res.map((item: any, index: any) => {
            return {
              id: index,
              value: item[1],
              name: item[0],
            };
          });
          return res;
        } else {
          return arr_res;
        }
      } else {
        switch (judge_) {
          case 0:
            return "请输入法律法规名称";
          case 1:
            return "未找到该法律法规";
        }
      }
  }
};

/*
 ***************
 * 格式化日期
 ***************
 */

function date_format(keys: string) {
  if (keys == "today") {
    //返回今天日期
    let today = new Date();
    return encodes_date(
      today.getFullYear().toString(),
      (today.getMonth() + 1).toString(),
      today.getDate().toString()
    );
  } else {
    const date = keys.split(/\.|\/|\\|\-/);
    let year = check_year(date[0]);
    if (date == null) {
      //判断年份是否符合格式
      if (year) {
        return [year.toString(), nzhcn.encodeS(year)];
      }
    } else {
      switch (date.length) {
        case 2:
          if (year && date[1] != "" && Number(date[1]) < 13) {
            const def_ym = year.toString() + "年" + date[1] + "月";
            const enc_ym =
              encodes_year(year.toString()) +
              "年" +
              nzhcn.encodeS(date[1]) +
              "月";
            return [def_ym, enc_ym];
          }
        case 3:
          let n_date = `${year}.${date[1]}.${date[2]}`;
          if (year) {
            if (
              year &&
              date[1] != "" &&
              Number(date[1]) < 13 &&
              check_Date(n_date)
            ) {
              return encodes_date(year.toString(), date[1], date[2]);
            } else {
              return ["不存在该日期"];
            }
          }
      }
    }
  }
}

function check_year(year: string) {
  const y = Number(year);
  if (y < 50 && y > 0) {
    return 2000 + y;
  } else if (y < 100) {
    return 1900 + y;
  } else if (y < 2100 && y > 1900) {
    return y;
  } else {
    return false;
  }
}

function encodes_year(year: string) {
  return year.replace(/./g, function () {
    const key = arguments[0];
    const value = "〇一二三四五六七八九";
    return value[key];
  });
}

function encodes_date(y: string, m: string, d: string) {
  const def_ymd = y + "年" + m + "月" + d + "日";
  const enc_ymd =
    encodes_year(y) + "年" + nzhcn.encodeS(m) + "月" + nzhcn.encodeS(d) + "日";
  return [def_ymd, enc_ymd];
}

/**
 *  判断输入的日期是否为正确的日期
 * @param {*} date
 * @returns
 */
function check_Date(date: any) {
  const regExp = /^(\d{1,4})(\.|\/|\\|\-)(\d{1,2})(\.|\/|\\|\-)(\d{1,2})$/;
  let result = date.match(regExp);
  if (result == null) return false;

  let dt = new Date(result[1], result[3] - 1, result[5]);

  if (Number(dt.getFullYear()) != Number(result[1])) return false;
  if (Number(dt.getMonth()) + 1 != Number(result[3])) return false;
  if (Number(dt.getDate()) != Number(result[5])) return false;
  return true;
}

/*
 ***************
 * 插入法条
 ***************
 */

function judge_law(str: any, file_list: any[]) {
  const name = str.match(/^[\u4e00-\u9fa5]{0,}/)[0];
  // 判断是否输入法律法规名称及是否存在该文件
  if (name != null && name.length > 0) {
    const index = str.replace(name, "");
    if (file_list.includes(name)) {
      return [name, index];
    } else {
      return 1;
    }
  }
  return 0;
}

async function introduce_lawarticle(name: any) {
  //判断是否存在缓存
  const lawfileCache = store.state.lawfileCache;
  if (lawfileCache.name != name) {
    await store.dispatch("Set_lawfileCache",name);
  }
}

function input_lawarticle(index: any) {
  //从缓存中读取
  let result: any = [];
  const law_cache = store.state.lawfileCache.contents;
  const reslut_law = get_detail_law(law_cache, index);
  if (typeof reslut_law == "object") {
    result.push(reslut_law);
  } else {
    result = reslut_law;
  }

  return result;
}

function get_detail_law(contents: any, index: string) {
  const law_name =
    "《" +
    contents.name
      .replace(/(\(|\（)(.+修正)(\）|\))/g, "")
      .replace("《", "<")
      .replace("》", ">") +
    "》";
  const title_name = contents.name;
  const max_index = Object.keys(contents.items).length;

  //获取条文索引
  const arr_index = index.match(/\d+/g);
  const t_index = ref(0);
  const k_index = ref(0);
  const x_index = ref(0);
  const t_detail: any = ref(Object);
  const k_detail: any = ref(Object);
  if (arr_index != null) {
    switch (arr_index.length) {
      //仅索引条
      case 1:
        t_index.value = Number(arr_index[0]);
        if (t_index.value <= max_index) {
          t_detail.value = contents.items[t_index.value];
          return [
            title_name,
            law_name +
              "第" +
              nzhcn.encodeS(t_index.value) +
              "条“" +
              iter_lawJson(t_detail.value) +
              "”",
          ];
        }

      //索引 条、款
      case 2:
        //判断索引编号是否超过最大值
        t_index.value = Number(arr_index[0]);
        k_index.value = Number(arr_index[1]);

        if (t_index.value <= max_index) {
          t_detail.value = contents.items[t_index.value];
          const k_max_index = Object.keys(t_detail.value).length;
          if (k_index.value <= k_max_index) {
            if (k_index.value * k_max_index == 1) {
              return [
                title_name,
                law_name +
                  "第" +
                  nzhcn.encodeS(t_index.value) +
                  "条“" +
                  iter_lawJson(t_detail.value) +
                  "”",
              ];
            } else {
              const k_detail = t_detail.value[k_index.value.toString()];
              return [
                title_name,
                law_name +
                  "第" +
                  nzhcn.encodeS(t_index.value) +
                  "条" +
                  "第" +
                  nzhcn.encodeS(k_index.value) +
                  "款“" +
                  iter_lawJson(k_detail) +
                  "”",
              ];
            }
          }
        }
      //索引 条、款、项
      case 3:
        //判断索引编号是否超过最大值
        t_index.value = Number(arr_index[0]);
        k_index.value = Number(arr_index[1]);
        x_index.value = Number(arr_index[2]);

        if (t_index.value <= max_index) {
          t_detail.value = contents.items[t_index.value];
          const k_max_index = Object.keys(t_detail.value).length;
          if (k_index.value <= k_max_index) {
            k_detail.value = t_detail.value[k_index.value.toString()];
            const x_max_index = Object.keys(k_detail.value).length - 1;
            if (
              x_index.value <= x_max_index &&
              typeof k_detail.value == "object"
            ) {
              /*
               * 仅需判断k_max_index是否大于1即可确定有无 款 存在
               * 存在 ——> 返回 款 内容
               * 不存在 ——> 返回 项 内容
               */
              if (x_max_index > 1) {
                const x_detail = k_detail.value[x_index.value.toString()];
                const x_suffix = k_detail.value["0"];
                return [
                  title_name,
                  law_name +
                    "第" +
                    nzhcn.encodeS(t_index.value) +
                    "条" +
                    "第" +
                    nzhcn.encodeS(k_index.value) +
                    "款" +
                    "第（" +
                    nzhcn.encodeS(x_index.value) +
                    "）项“" +
                    iter_lawJson(x_suffix) +
                    iter_lawJson(x_detail) +
                    "”",
                ];
              }
            }
          }
        }
      default:
        return `不存在该条款，该法律法规至多${max_index}条`;
    }
  }
}

function iter_lawJson(json: any): any {
  const res = [];
  for (var key in json) {
    if (json[key] && typeof json[key] == "object") {
      res.push(iter_lawJson(json[key]));
    } else {
      res.push(json[key]);
      // console.log(json[key])
    }
  }
  return res.join("");
}

/*
 ***************
 * 查询地址
 ***************
 */
//判断是否存在缓存以及缓存是否已经超时
async function introduce_pcafile() {
  //获取当前时间戳
  let now = new Date().getTime();

  const isReload = () => {
    if (store.state.pcaCache == "") {
      return true;
    } else {
      let loadtime = Number(store.state.pcaCache.loadtime);
      //缓存有效期1小时
      if (loadtime + 60 * 1000 >= now) {
        return false;
      }
      return true;
    }
  };

  if (isReload()) {
    await store.dispatch("Set_pcaCache", now);
  }
}

function find_address(str: string) {
  const pca_contents = store.state.pcaCache.contents;
  arr_pca = [];
  iter_pcaJson("", str, pca_contents);
  return arr_pca;
}

function iter_pcaJson(ss: string, str: string, json: any): any {
  if (str != "") {
    for (let key in json) {
      const ttt = Array.isArray(json[key]); //判断是否到区级
      if (!ttt) {
        /*
         * 判断省级、市级节点,进行递归
         */
        iter_pcaJson(key, str, json[key]);
      } else {
        //查询区级并返回市级+区级
        let arr_length = arr_pca.length;
        json[key].forEach((item: string) => {
          const last_k = item.charAt(item.length - 1);
          if (item.indexOf(str) > -1 && /区|县|市|旗/.test(last_k)) {
            //修正无效字符
            const final_s = (ss + key + item)
              .replace("自治区直辖县级行政区划", "")
              .replace("市辖区", "");
            arr_pca.push(final_s);
          }
        });

        //查询市级并将结果push到数组
        if (key.indexOf(str) > -1) {
          arr_pca.push(ss + key);
          //如果区县级未命中，则将市级项下全部推送
          if (arr_length + 1 == arr_pca.length) {
            json[key].forEach((item: string) => {
              const last_k = item.charAt(item.length - 1);
              if (/区|县|市|旗/.test(last_k)) {
                //修正无效字符
                const final_s = (ss + key + item)
                  .replace("自治区直辖县级行政区划", "")
                  .replace("市辖区", "");
                arr_pca.push(final_s);
              }
            });
          }
        }
      }
    }
  }
}
