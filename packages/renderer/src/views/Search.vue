<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">案件查询</el-breadcrumb-item>
  </el-breadcrumb>
  <el-upload
    ref="upload"
    action=""
    accept=".txt"
    :limit="1"
    :auto-upload="false"
    :http-request="uploadHandler"
  >
    <el-button class="extra_btn_class" size="small" style="right: 20px"
      >选择</el-button
    >
  </el-upload>
  <el-button
    class="extra_btn_class"
    size="small"
    style="right: 20px"
    @click="upl"
    >导入</el-button
  >
  <el-button
    class="extra_btn_class"
    size="small"
    style="right: 20px"
    @click="test2"
    >开启粘贴板</el-button
  >
  <el-button
    class="extra_btn_class"
    size="small"
    style="right: 20px"
    @click="test2"
    >测试</el-button
  >
</template>

<script lang="ts" setup>
import { ElMessage, ElUpload } from "element-plus";
import { ref } from "vue";
import Nzh from "nzh";
import ClipboardObserver from "../script/utils/clipboardmoni";
import { useStore } from "vuex";
import { Modules } from "../store";
const store = useStore<Modules>();

const upload = ref<InstanceType<typeof ElUpload>>();

const upl = () => {
  // 手动开始上传
  upload.value!.submit();
};

const uploadHandler = (params: {
  file: { size: number };
  onProgress: (arg0: { percent: any }) => void;
}) => {
  setTimeout(() => {
    readText(params);
  }, 100);
};

const nzh = Nzh.cn;

const readText = async (params: {
  file: any;
  onProgress: any;
  onSuccess?: any;
}) => {
  // UTF-8,GBK,GB2312
  const readFile = new FileReader();

  let filename = params.file.name.replace(/\.\w*/, "");
  readFile.onload = (e) => {
    const m_text: any = e.target?.result;
    //获取法律名称
    // const law_name = m_text.match(
    //   /中华人民共和国.+(典|法)((\(|（).+修正(\)|）)|\r|\n)|中华人民共和国.+(典|法)|最高人民.+释((\(|（).+(\)|）)|\r|\n)|最高人民.+释/
    // );
    // const law_name = filename;

    //去除多余信息
    // const m2_text = m_text.replace(
    //   /第.{0,4}[^条](编|章|节)\s{1}.*|中华人民共和国(.|\r|\n)*(目\s{0,4}录)|北大法宝|原文链接.*|[\u4e00-\u9fa5]{1,4}\、[\u4e00-\u9fa5]+(\n|\r)/g,
    //   ""
    // );
    //去除第一条之前的所有信息&编章节信息&附则等信息
    const m2_text = m_text.replace(
      /第.{0,4}[^条](编|章|节)\s{1}.*|^(.|\r|\n)+(?=\s{2}第一条)|[\u4e00-\u9fa5]{1,4}\、[\u4e00-\u9fa5]+(\n|\r)|(附则)/g,
      ""
    );
    //按条分割法条
    const arr_m = m2_text.split(
      /(?=\s{2}第[零一二三四五六七八九十百千]{1,8}条)/g
    );
    // console.log("🚀 ~ file: Search.vue ~ line 81 ~ arr_m", arr_m)
    // arr_m.shift(); //删除第一个空值

    interface info_json {
      name?: string;
      items?: any;
    }

    const info_json = {
      name: filename,
      items: {},
    };

    const aLL: any[] = [];

    arr_m.forEach((element: any) => {
      //获取单条法条
      const t = element
        .replace(/\s{2}(?=[\u4e00-\u9fa5])/g, "|")
        .replace(/\s{1}/g, "");
      //切割法条的条目和内容
      const ch_num = t.match(/^\|第[零一二三四五六七八九十百千]{1,8}条/)[0];
      //获取法条编号
      const num = nzh.decodeS(ch_num.replace(/(\|第)|(条)/g, ""));
      //获取法条内容
      const f_txt = t.replace(ch_num, "");

      //分割<项>
      const arr_x = f_txt.split("|");
      const temp_x_json: any[] = [];
      for (let a = 0; a < arr_x.length; a++) {
        //判断是否存在<款>
        if (/（[一二三四五六七八九十]）/.test(arr_x[a])) {
          const arr_k = arr_x[a].split(/(?=（.{0,3}）)/); //分割<款>
          const temp_k_json = [];
          //建立json字符串，以款-项-条的顺序
          //格式化<款>的条文
          for (let b = 0; b < arr_k.length; b++) {
            const t_k = [b, arr_k[b]];
            temp_k_json.push(t_k);
          }
          //数组转为键值后push至上一层数组
          const f_k_json = [a + 1, Object.fromEntries(temp_k_json)];
          temp_x_json.push(f_k_json);
        } else {
          //格式化<项>的条文 
          const t_x = [a + 1, arr_x[a]];
          temp_x_json.push(t_x);
        }
      }

      //格式化<条>并整合json
      const f_x_json = [num,Object.fromEntries(temp_x_json)]
      aLL.push(f_x_json);
    });
    info_json.items = Object.fromEntries(aLL)
    console.log("🚀 ~ file: Search.vue ~ line 166 ~ info_json.items", info_json.items)

    //判断结果是否正确
    const arr_count = [];
    let i = 1;
    for (var key in info_json.items) {
      arr_count.push(key);
    }

    if (arr_count.length == Number(arr_count[arr_count.length - 1])) {
      //导出结果
      const path = window.path.resolve(
        `packages/renderer/public/lawfiles/test.json`
      );
      window.fs.writeFileSync(path, JSON.stringify(info_json));
      ElMessage({
        message: `成功导入${arr_count.length}条法条，请手动核实条目数量，如不正确请重新导入`,
        grouping: true,
        type: "success",
      });
    } else {
      ElMessage({
        message: `导入失败，请确认法条格式`,
        grouping: true,
        type: "error",
      });
    }
  };
  readFile.readAsText(params.file);
};

// const test = () => {
//   clipboardObserver.start();
// };

// const clipboardObserver = new ClipboardObserver({
//   duration: 500,
//   textChange: (text: string, beforeText: string) => {
//     //  处理文本变化的逻辑
//     console.log(text);
//   },
// });

//  也可以暂停
// clipboardObserver.stop();

//  也可以再开始
// clipboardObserver.start();

const test2 = async () => {
  await store.commit("editorModule/Set_presetText");

  console.log(store.state.editorModule.presetText);
};
</script>

<style lang="scss">
.login-wrap {
  width: 100%;
  height: 100px;
  background-color: #f5f5f5;
}
</style>
