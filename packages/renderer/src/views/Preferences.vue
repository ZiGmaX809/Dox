<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      overflow: auto;
    "
  >
    <!-- 主设置页面 -->
    <div style="width: 600px; height: 100%">
      <h2 class="pref_h2">外观</h2>
      <el-divider />
      <p class="pref_p">主题颜色</p>
      <div class="pref_div">
        <p class="pref_p">自定义头像</p>
        <el-switch v-model="coutom_avatar" />
      </div>
      <h2 class="pref_h2">编辑</h2>
      <el-divider />
      <div class="pref_div">
        <p class="pref_p">默认启用首行缩进</p>
        <el-switch v-model="auto_int2em" />
      </div>
      <p class="pref_desc_p" style="margin-top: -3px">
        编辑器内的格式并不会影响导出文书的格式，启用首行缩进仅仅为了便于编辑文书。
      </p>

      <div class="pref_div">
        <p class="pref_p">启用剪贴板</p>
        <el-switch v-model="swich_clipboard_bool" />
      </div>
      <div class="pref_div">
        <p class="pref_p">剪贴板缓存数量（自定义上限200）</p>
        <el-input
          v-model="store.state.settingModule.setting.clipboard_num"
          size="small"
          style="width: 50px"
          controls-position="right"
          :disabled="!store.state.settingModule.setting.clipboard_bool"
          @input="handleChange_clipboard_num"
        />
      </div>
      <p class="pref_desc_p" style="margin-top: -3px">
        启用剪贴板功能后，将会监听系统剪贴板，并且将复制的文本存入缓存中。<br />
        条目数量过多将会导致索引效率降低，建议设置缓存条目数量控制在50以内。<br />
        超出数量将自动清除最先数据。
      </p>
      <div class="pref_div">
        <p class="pref_p">剪贴板监听字符长度（自定义上限600）</p>
        <el-input
          v-model="store.state.settingModule.setting.clipboard_textlength"
          size="small"
          style="width: 50px"
          controls-position="right"
          :disabled="!store.state.settingModule.setting.clipboard_bool"
          @input="handleChange_clipboard_textlength"
        />
      </div>
      <p class="pref_desc_p" style="margin-top: -3px">
        为保证性能，建议监听300字符以内的文本。<br />
        超出设定长度依旧可以复制粘贴，但不会存入缓存。
      </p>

      <h2 class="pref_h2">快捷输入</h2>
      <el-divider />
      <p class="pref_p">已引入的文件</p>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="fullname" label="引入文件名称" />
        <el-table-column prop="name" label="索引缩写" width="200" />
        <el-table-column align="center" label="操作" width="80">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              :icon="Delete"
              @click="handleDelete(scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <p class="pref_p">引入新的文件</p>

      <h2 class="pref_h2">其他</h2>
      <el-divider />

      <p class="pref_p">导出配置及缓存文件</p>
      <el-button
        class="extra_btn_class"
        size="small"
        @click="export_localstorage()"
        >导出</el-button
      >

      <p class="pref_p">导入配置及缓存文件</p>
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
        "
      >
        <el-upload
          ref="upload"
          action=""
          accept=".json"
          :limit="1"
          :auto-upload="false"
          :on-exceed="importlocalstorage_handleExceed"
          :on-Change="importlocalstorage_handleChange"
          :http-request="uploadHandler"
          style="width: 100%"
        >
          <template #trigger>
            <el-button
              class="extra_btn_class"
              size="small"
              style="margin-right: 20px"
              >选择导入文件</el-button
            >
          </template>

          <el-button
            class="extra_btn_class"
            size="small"
            @click="import_localstorage()"
            >导入</el-button
          >
        </el-upload>
      </div>

      <p class="pref_author">MADE BY ZiGma</p>
      <p class="pref_version">v0.0.1</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { Modules } from "../store";
import { ElMessage, ElUpload } from "element-plus";
import { ElFile } from "element-plus/es/components/upload/src/upload.type";
import { setItem } from "../script/utils/storage";
const store = useStore<Modules>();

//自定义头像取值&设置
const coutom_avatar = computed({
  get() {
    return store.state.settingModule.setting.custom_avatar_bool;
  },
  set(newVal: boolean) {
    store.dispatch("settingModule/Switch_custom_avatar", newVal);
  },
});

//首行缩进取值&设置
const auto_int2em = computed({
  get() {
    return store.state.settingModule.setting.auto_int2em;
  },
  set(newVal: boolean) {
    // if(typeof newVal)
    // typeof newVal
    store.dispatch("settingModule/Switch_auto_int2em", newVal);
  },
});

//是否启用剪贴板开关
const swich_clipboard_bool = computed({
  get() {
    return store.state.settingModule.setting.clipboard_bool;
  },
  set(newVal: boolean) {
    // if(typeof newVal)
    // typeof newVal
    store.dispatch("settingModule/Switch_clipboard_bool", newVal);
  },
});

//设置剪贴板相关设置的上限
const handleChange_clipboard_num = (value: string) => {
  const _str = value.replace(/[^0-9.]/g, "");
  const final_num = Number(_str) > 200 ? 200 : Number(_str);
  store.dispatch("settingModule/Change_clipboard_num", final_num);
};

const handleChange_clipboard_textlength = (value: string) => {
  const _str = value.replace(/[^0-9.]/g, "");
  const final_num = Number(_str) > 600 ? 600 : Number(_str);
  store.dispatch("settingModule/Change_clipboard_textlength", final_num);
};

const tableData = [
  {
    fullname: "中华人民共和国民事诉讼法",
    name: "民诉法",
  },
  {
    fullname: "最高人民法院关于适用《中华人民共和国民事诉讼法》的解释",
    name: "民诉法解释",
  },
];

//删除引入的法律法规
const handleDelete = (index: number) => {
  console.log(index);
};

//导出&导入缓存
const upload = ref();

const export_localstorage = () => {
  const arr_text = [];
  for (var i = 0; i < window.localStorage.length; i++) {
    const key: any = window.localStorage.key(i); //获取本地存储的Key

    arr_text.push([key, window.localStorage.getItem(key)]);
  }
  const final_json = Object.fromEntries(arr_text);

  window.ipcRenderer.send("Get_Path", "downloads");
  window.ipcRenderer.on("final_path", (event, arg) => {
    if (arg != undefined) {
      const file_fullpath = arg + "/export_cache.json";
      window.fs.writeFileSync(file_fullpath, JSON.stringify(final_json));

      ElMessage({
        message: `成功将缓存内容导出至 ${file_fullpath} `,
        grouping: true,
        type: "success",
      });
    }
  });
};

const importlocalstorage_handleExceed = (files: ElFile[]) => {
  upload.value.clearFiles();
  upload.value.handleStart(files[0]);
};

const importlocalstorage_handleChange = (files: ElFile[]) => {
  console.log(upload.value);
};

const uploadHandler = (params: { file: { size: number } }) => {
  setTimeout(() => {
    read_localstorage_file(params);
  }, 100);
};

const read_localstorage_file = async (params: { file: any }) => {
  // UTF-8,GBK,GB2312
  const readFile = new FileReader();
  readFile.onload = (e) => {
    const m_text: any = e.target?.result;
    const json_ = JSON.parse(m_text);
    for (let key in json_) {
      setItem(key, json_[key]);
    }

    ElMessage({
      message: "成功导入缓存文件，程序将重启",
      grouping: true,
      type: "success",
    });

    setTimeout(() => {
      window.ipcRenderer.send("Restart");
    }, 1000);
  };
  readFile.readAsText(params.file);
};
// const upload = ref<InstanceType<typeof ElUpload>>();
const import_localstorage = () => {
  upload.value.submit();
  upload.value.clearFiles();
  // }
};
</script>

<style lang="scss" scoped>
.pref_h2 {
  user-select: none;
  margin-top: 50px;
}

.pref_p {
  user-select: none;
  color: #393939;
  font-weight: bold;
}

.pref_desc_p {
  user-select: none;
  color: #909090;
  font-size: 13px;
}

.pref_div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
}

.pref_author {
  text-align: center;
  margin-top: 100px;
  font-family: "Barlow";
  font-size: 0.9rem;
}

.pref_version {
  text-align: center;
  color: #909090;
  font-size: 0.88rem;
  margin-top: -10px;
  height: 50px;
  font-family: "Barlow";
}

p {
  user-select: none;
}
</style>
