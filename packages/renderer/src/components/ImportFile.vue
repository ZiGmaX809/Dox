<template>
  <el-upload
    ref="upload"
    action=""
    accept=".txt"
    :limit="1"
    :auto-upload="false"
    :on-change="handleSelected"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :http-request="uploadHandler"
  >
    <template #trigger>
      <el-button size="small" type="primary">选择文件</el-button>
    </template>
    <el-button size="small" type="success" @click="upl" class="upload_class" :disabled="import_btn">
      导入
    </el-button>
    <el-input size="small" v-model="input" placeholder="索引简称" class="upload_class-input" />
    <template #tip>
      <div class="el-upload__tip" style="color: #909090">
        因为需要设置索引缩写，所以只支持单个文件导入，如需导入多个文件请多次执行。
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ElUpload } from 'element-plus';
import { ref } from 'vue';
import Nzh from 'nzh';
import { Msg } from '/utils/message';
import { STORE_System } from '/store/modules/system';
import { STORE_Setting } from '/store/modules/setting';

const upload = ref();
const input = ref();
const import_btn = ref(true);

const handleSelected = (uploadfile: {}) => {
  if (uploadfile) {
    import_btn.value = false;
  }
};

const handleExceed = (files: any[]) => {
  upload.value.clearFiles()
  upload.value.handleStart(files[0])
}

const handleRemove = () => {
  import_btn.value = true;
};

const upl = () => {
  // 手动开始上传
  upload.value.submit();
};

const uploadHandler: any = (params: {
  file: { size: number };
  onProgress: (arg0: { percent: any }) => void;
}) => {
  if (input.value) {
    setTimeout(() => {
      readText(params);
    }, 100);
  } else {
    Msg('请输入索引简称', 'error');
  }
};



const nzh = Nzh.cn;

const readText = async (params: { file: any; onProgress: any; onSuccess?: any }) => {
  // UTF-8,GBK,GB2312
  const readFile = new FileReader();

  let filename = params.file.name.replace(/\.\w*/, '');
  readFile.onload = e => {
    const m_text: any = e.target?.result;
    //去除第一条之前的所有信息&编章节信息&附则等信息
    const m2_text = m_text.replace(
      /第.{0,4}[^条](编|章|节)\s{1}.*|^(.|\r|\n)+(?=\s{2}第一条)|[\u4e00-\u9fa5]{1,4}\、[\u4e00-\u9fa5]+(\n|\r)|(附则)/g,
      ''
    );
    //按条分割法条
    const arr_m = m2_text.split(/(?=\s{2}第[零一二三四五六七八九十百千]{1,8}条)/g);

    const info_json = {
      name: <string>filename,
      items: {},
    };

    const aLL: any[] = [];

    arr_m.forEach((element: any) => {
      //获取单条法条
      const t = element.replace(/\s{2}(?=[\u4e00-\u9fa5])/g, '|').replace(/\s{1}/g, '');
      //切割法条的条目和内容
      const ch_num = t.match(/^\|第[零一二三四五六七八九十百千]{1,8}条/)[0];
      //获取法条编号
      const num = nzh.decodeS(ch_num.replace(/(\|第)|(条)/g, ''));
      //获取法条内容
      const f_txt = t.replace(ch_num, '');

      //分割<项>
      const arr_x = f_txt.split('|');
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
      const f_x_json = [num, Object.fromEntries(temp_x_json)];
      aLL.push(f_x_json);
    });
    info_json.items = Object.fromEntries(aLL);

    //判断结果是否正确
    const arr_count = [];
    let i = 1;
    for (var key in info_json.items) {
      arr_count.push(key);
    }

    //对比分割法条数量和最后一条条文编码是否一致来确定是否全部导入
    if (arr_count.length == Number(arr_count[arr_count.length - 1])) {
      //导出结果到本地文件夹
      const export_path = `${STORE_System().CacheFile_Path}/lawfiles/${input.value}.json`;
      // const path = window.path.resolve(`packages/renderer/public/lawfiles/test.json`);
      window.fs.writeFileSync(export_path, JSON.stringify(info_json));

      //向Store添加条目
      const new_list = {
        fullname: filename,
        name: input.value,
      };
      STORE_Setting().Add_lawfile(new_list);
      Msg(`成功导入${arr_count.length}条法条，请手动核实条目数量，如不正确请重新导入`, 'success');

      //重置导入插件
      input.value = '';
      import_btn.value = true;
    } else {
      Msg('导入失败，请确认法条格式', 'error');
    }
  };
  readFile.readAsText(params.file);
};
</script>

<style lang="scss" scoped>
.upload_class {
  margin-left: 10px;
  margin-top: -1px;
  &-input {
    @extend .upload_class;
    width: 200px;
  }
}

.el-upload__tip {
  user-select: none;
}
</style>
