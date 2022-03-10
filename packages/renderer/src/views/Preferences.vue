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
      <h2 class="pref_h2">自定义</h2>
      <el-divider />
      <div class="pref_div">
        <p class="pref_p">主题颜色</p>
      </div>
      <div class="pref_div">
        <p class="pref_p">自定义头像</p>
        <el-switch v-model="coutom_avatar" />
      </div>
      <div class="pref_div">
        <p class="pref_p">所在单位代码</p>
        <el-input
          v-model="STORE_setting_instance.org_code"
          size="small"
          style="width: 50px"
          controls-position="right"
          @input="(val: any) => handleChange_num(val,9999)"
        />
      </div>
      <p class="pref_desc_p">登录用户名前缀数字。</p>

      <h2 class="pref_h2">编辑</h2>
      <el-divider />
      <div class="pref_div">
        <p class="pref_p">默认字体</p>
        <el-select
          v-model="default_font_name"
          class="m-2"
          placeholder="Select"
          size="small"
          style="width: 80px"
          @change="(val:Event) => Set_Editer_font_name(val)"
        >
          <el-option
            v-for="item in fonts_family"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="pref_div">
        <p class="pref_p">默认字号</p>
        <el-select
          v-model="default_font_size"
          class="m-2"
          placeholder="Select"
          size="small"
          style="width: 60px"
          @change="(val:Event) => Set_Editer_font_size(val)"
        >
          <el-option v-for="item in font_sizes" :key="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="pref_div">
        <p class="pref_p">默认启用首行缩进</p>
        <el-switch v-model="auto_int2em" />
      </div>
      <p class="pref_desc_p">
        编辑器内的字体、字号、段落格并不会影响导出文书的格式，仅为了便于编辑文书。
      </p>

      <div class="pref_div">
        <p class="pref_p">启用剪贴板</p>
        <el-switch v-model="switch_clipboard_bool" />
      </div>
      <p class="pref_desc_p">
        启用剪贴板功能后，将会监听系统剪贴板，并且将复制的文本存入缓存中。
      </p>
      <div class="pref_div">
        <p class="pref_p">剪贴板缓存数量（自定义上限200）</p>
        <el-input
          v-model="STORE_setting_instance.clipboard_num"
          size="small"
          style="width: 50px"
          controls-position="right"
          :disabled="!switch_clipboard_bool"
          @input="(val: any) => handleChange_num(val,200)"
        />
      </div>
      <p class="pref_desc_p">
        条目数量过多将会导致索引效率降低，建议设置缓存条目数量控制在50以内。
        <br />超出数量将自动清除最先数据。
      </p>
      <div class="pref_div">
        <p class="pref_p">剪贴板监听字符长度（自定义上限600）</p>
        <el-input
          v-model="STORE_setting_instance.clipboard_textlength"
          size="small"
          style="width: 50px"
          controls-position="right"
          :disabled="!switch_clipboard_bool"
          @input="(val: any) => handleChange_num(val,600)"
        />
      </div>
      <p class="pref_desc_p">
        为保证性能，建议监听300字符以内的文本。
        <br />超出设定长度依旧可以复制粘贴，但不会存入缓存。
      </p>
      <div class="pref_div">
        <p class="pref_p">复用剪贴板内容</p>
        <el-switch
          v-model="switch_writeSystemClipboard_bool"
          :disabled="!switch_clipboard_bool"
        />
      </div>
      <p class="pref_desc_p">
        启用后，点击剪贴板内容时，将会把点击内容写入到系统剪贴板，以便于使用Ctrl+V进行多次粘贴。
      </p>

      <h2 class="pref_h2">快捷输入</h2>
      <el-divider />
      <div class="pref_div">
        <p class="pref_p">已引入的法律法规文件</p>
        <el-button size="small" @click="Refresh_lawfiles">刷新</el-button>
      </div>
      <el-table
        :data="tableData.list"
        border
        style="width: 100%; max-height: 500px"
      >
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

      <p class="pref_p">引入新的法律法规文件</p>
      <p class="pref_desc_p">
        <b>
          &#10059;&nbsp;注意：快捷输入工具仅为编辑文书的辅助性功能。对于导入的文件，工具将尽可能进行准确匹配、转换，但是无法保证任何法律法规文件导入后法条完整和准确性。
          <br />&#10059;&nbsp;请不要过度依赖该功能！裁判文书校对依旧是案件审理的必要环节与步骤！
        </b>
        <br />
        <br />下载法律法规:
        <el-link
          type="success"
          class="pref_desc_p"
          @click="copy_url(law_url)"
          >{{ law_url }}</el-link
        >
        (北大法宝中国法律法规数据库，需互联网下载后导入)
        <br />
        <i
          >国务院下属国家法律法规数据库因更新效率问题以及无法下载TXT文件格式而不被支持。</i
        >
        <br />
        <br />进入网页选择法律法规文件后，点击右上角下载按钮，选择「纯文本」去掉勾选「保留字段信息」以及「保留正文中的法宝联想」，下载后不要修改文件名称，请保持原有名称以便提取该文书完整名称。
        <br />目前支持<b>法律、法规、司法解释</b>的导入，其他指导性文件、意见暂不支持。
      </p>
      <div class="pref_div">
        <p class="pref_p">
          行政区划地址信息（更新时间：{{ pca_update_time() }}）
        </p>
        <el-button size="small" @click="import_pcafile()"
          >选择文件并更新</el-button
        >
      </div>
      <p class="pref_desc_p">
        地域范围为国家统计局开展统计调查的全国31个省、自治区、直辖市，
        <br />未包括我国台湾省、香港特别行政区、澳门特别行政区。
        <br />项目更新地址：
        <el-link
          type="success"
          class="pref_desc_p"
          @click="copy_url(pca_url)"
          name="ajsh"
          >{{ pca_url }}</el-link
        >
        <br />下载pca.json文件引入即可
      </p>

      <h2 class="pref_h2">高级</h2>
      <el-divider />
      <div class="pref_div">
        <p class="pref_p">本地资源文件夹</p>
        <el-button size="small" @click="open_cachefile()">打开</el-button>
      </div>
      <p class="pref_desc_p">
        本地保存行政区划地址信息、法律法规文件等的文件夹。
      </p>
      <div class="pref_div">
        <p class="pref_p">离线功能</p>
        <div class="div_class_center">
          <el-switch v-model="switch_offline_bool" />
        </div>
      </div>
      <div class="div_class">
        <div class="div_class_end">
          <el-button
            class="btn-right"
            size="small"
            @click="download_offline_files()"
            :disabled="!switch_offline_bool"
            >离线数据</el-button
          ><el-button
            class="btn-right"
            size="small"
            type="danger"
            @click=""
            :disabled="!switch_offline_bool"
            >清理过期数据</el-button
          >
        </div>
        <p class="pref_desc_p">
          <b
            >&#10059;&nbsp;注意：此功能仅缓存「我的案件」中尚在审理的案件信息，因涉及当事人信息，请遵守相关规章制度！</b
          ><br />
          开启离线功能后，可在脱机状态下查看案件、编辑、生成文书。<br />
          考虑到服务器负载，拉取数据间隔为60秒，请手动点击离线数据按钮进行数据离线。<br />
          已拉取案件数量：{{ offline_files_num.data }}；上次拉取时间：{{
            STORE_setting_instance.offline_time
          }}；
        </p>
      </div>

      <h2 class="pref_h2">其他</h2>
      <el-divider />
      <div class="pref_div">
        <p class="pref_p">导出配置及缓存数据</p>
        <el-button size="small" @click="export_localstorage()">导出</el-button>
      </div>
      <div class="pref_div">
        <p class="pref_p">导入配置及缓存数据</p>
        <el-button size="small" @click="import_localstorage()"
          >选择文件并导入</el-button
        >
      </div>
      <div class="pref_div">
        <p class="pref_p">重置应用</p>
        <el-button size="small" type="danger" @click="reset_program()"
          >重置</el-button
        >
      </div>
      <p class="pref_desc_p">
        <b style="color: #f56c6c"
          >&#10059;&nbsp;注意：重置应用将删除所有与本工具相关文件与配置，包括已导入的法律法规文件、模板、行政区划文件，该操作不可逆！</b
        ><br />
      </p>

      <p class="pref_author">MADE BY ZiGma</p>
      <p class="pref_version">v0.0.1</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, reactive, ref } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessageBox, ElNotification } from "element-plus";
import { STORE_Setting } from "../store/modules/setting";
import { STORE_System } from "../store/modules/system";
import { STORE_Request } from "../store/modules/request";
import { scan_allfiles } from "../script/utils/scanfolder";
import { ipcMsg_Get_File, ipcMsg_Get_Path } from "../script/utils/ipcmessage";
import { REQUEST_get_ALL_casedetailinfo } from "../script/request/casedetailinfo";
import { delay } from "../script/utils/delay";
import { Msg } from "../script/utils/message";
import Notice from "../components/Notice.vue";

const STORE_setting_instance = STORE_Setting();
const STORE_system_instance = STORE_System();
const STORE_request_instance = STORE_Request();

const pca_url = ref(
  "https://github.com/modood/Administrative-divisions-of-China"
);
const law_url = ref("http://gov.pkulaw.cn/");

//自定义头像取值&设置
const coutom_avatar = computed({
  get() {
    return STORE_setting_instance.custom_avatar_bool;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_custom_avatar(newVal);
  },
});

//首行缩进取值&设置
const auto_int2em = computed({
  get() {
    return STORE_setting_instance.auto_int2em;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_auto_int2em(newVal);
  },
});

//是否启用剪贴板开关
const switch_clipboard_bool = computed({
  get() {
    return STORE_setting_instance.clipboard_bool;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_clipboard_bool(newVal);
  },
});

//是否在点击剪贴板选项后写入到系统剪贴板
const switch_writeSystemClipboard_bool = computed({
  get() {
    return STORE_setting_instance.writeSystemClipboard_bool;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_writeSystemClipboard_bool(newVal);
  },
});

//设置剪贴板相关设置的上限
const handleChange_num = (value: String, max: number) => {
  const _str = value.replace(/[^0-9.]/g, "");
  const final_num = Number(_str) > max ? max : Number(_str);
  switch (max) {
    case 200:
      STORE_setting_instance.Change_clipboard_num(final_num);
      break;
    case 600:
      STORE_setting_instance.Change_clipboard_textlength(final_num);
      break;
    case 9999:
      STORE_setting_instance.Change_org_code(final_num);
      break;
  }
};

//编辑器字体字号设置
const default_font_name = ref(
  STORE_setting_instance.editor_font_name.split("=")[0]
);
const fonts_family = [
  {
    value: "系统字体=",
    label: "系统字体",
  },
  {
    value: "微软雅黑=Microsoft YaHei",
    label: "微软雅黑",
  },
  {
    value: "苹果苹方=PingFang SC",
    label: "苹果苹方",
  },
  {
    value: "仿宋=FangSong,serif",
    label: "仿宋",
  },
  {
    value: "宋体=simsun,serif",
    label: "宋体",
  },
  {
    value: "黑体=SimHei,sans-serif",
    label: "黑体",
  },
];
const default_font_size = ref(STORE_setting_instance.editor_font_size);
const font_sizes = ["12px", "14px", "16px", "18px", "20px", "22px", "24px"];

const Set_Editer_font_name = (val: Event) => {
  const res = val.toString();
  STORE_setting_instance.Set_font_name(res);
};

const Set_Editer_font_size = (val: Event) => {
  const res = val.toString();
  STORE_setting_instance.Set_font_size(res);
};

//法律法规文件管理
const tableData = reactive({
  list: STORE_setting_instance.lawfilelist,
});

const copy_url = (url: string) => {
  window.clipboard.writeText(url);
  Msg("已复制", "success");
};

const Refresh_lawfiles = async () => {
  const final_list = await scan_allfiles(
    `${STORE_system_instance.CacheFile_Path}/lawfiles`
  );
  setTimeout(() => {
    tableData.list = final_list;
    STORE_setting_instance.Change_lawfilelist(final_list);
  }, 300);
};

//删除引入的法律法规
const handleDelete = (index: number) => {
  console.log(STORE_Setting().lawfilelist[index]);
};

//行政区划信息更新
const pca_update_time = () => {
  const data = window.fs.statSync(
    STORE_system_instance.CacheFile_Path + "/divisions/pca.json"
  );
  return data.ctime.toLocaleDateString();
};

/** 导入行政区划信息 */
const import_pcafile = async () => {
  const File_Result = await ipcMsg_Get_File({
    name: "JSON",
    extensions: ["json"],
  });
  if (File_Result) {
    const bool = JSON.parse(File_Result)["北京市"] != undefined ? true : false;
    if (bool) {
      window.fs.writeFileSync(
        STORE_system_instance.CacheFile_Path + "/divisions/pca.json",
        File_Result
      );
    }

    Msg(
      bool ? "已成功导入行政区划文件" : "导入失败，请校验文件！",
      bool ? "success" : "error"
    );
  }
};

const open_cachefile = async () => {
  const cacheFile_path = STORE_system_instance.CacheFile_Path;

  if (cacheFile_path != "") {
    window.shell.openPath(cacheFile_path);
  }
};

//开关离线功能
const switch_offline_bool = computed({
  get() {
    return STORE_setting_instance.offline_bool;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_offline_bool(newVal);
  },
});

//计算并返回离线文件数量
const offline_files_num = reactive({
  data: STORE_setting_instance.offline_bool
    ? STORE_request_instance.caselist_num.join("/")
    : "0",
});

//缓存离线数据
const download_offline_files = async () => {
  const time = new Date();
  const interval_time =
    time.getTime() - STORE_setting_instance.offline_timestamp;

  if (interval_time < 60 * 1000) {
    Msg(
      `请勿重复拉取离线数据，请在${Math.floor(
        60 - interval_time / 1000
      )}秒后再试。`,
      "warning"
    );
  } else {
    const notice_instance = ElNotification({
      title: "正在缓存离线文件……",
      dangerouslyUseHTMLString: true,
      message: h(Notice, {
        style: "user-select: none",
      }),
      offset: 50,
      duration: 0,
      showClose: false,
    });

    const arr_caselist = STORE_request_instance.CaseIDList;
    const downloaded_num = ref(0);

    arr_caselist.forEach(async (caseid, index) => {
      await delay(300);
      const result = await REQUEST_get_ALL_casedetailinfo(caseid, false, false);
      if (result) {
        downloaded_num.value++;
      }
      window.postMessage([downloaded_num.value, index + 1]);
      if (index + 1 == arr_caselist.length) {
        await delay(2000);
        notice_instance.close();
      }
    });

    const arr_final_offline_num = [downloaded_num.value, arr_caselist.length];

    STORE_setting_instance.Set_offline_time();
    offline_files_num.data = arr_final_offline_num.join("/");
  }
};

//导出&导入缓存
const export_localstorage = async () => {
  const now = new Date();
  const arr_text = [];
  for (var i = 0; i < window.localStorage.length; i++) {
    const key: string | null = window.localStorage.key(i); //获取本地存储的Key
    if (key != null) {
      arr_text.push([key, window.localStorage.getItem(key)]);
    }
  }
  const final_json = Object.fromEntries(arr_text);

  const downloads_path = await ipcMsg_Get_Path("downloads");

  if (downloads_path) {
    const file_fullpath = `${downloads_path}/export_${now.getTime()}.json`;
    window.fs.writeFileSync(file_fullpath, JSON.stringify(final_json));

    Msg(`已导出至 ${file_fullpath} `, "success");
  }
};

const import_localstorage = async () => {
  const File_Result = await ipcMsg_Get_File({
    name: "JSON",
    extensions: ["json"],
  });
  if (File_Result) {
    const json_ = JSON.parse(File_Result);
    for (let key in json_) {
      window.localStorage.setItem(key, json_[key]);
    }

    Msg("成功导入缓存文件，应用将在3秒内重启", "success");

    setTimeout(() => {
      window.ipcRenderer.send("Restart");
    }, 3000);
  }
};

const reset_program = () => {
  ElMessageBox.confirm("确认重置应用？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    Msg("重置成功，应用将在3秒内重启！", "success");
  });
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
  margin-top: -3px;
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

.btn-right {
  margin-top: 10px;
}

.div_class {
  display: flex;
  flex-direction: row-reverse;
  &_center {
    @extend .div_class;
    align-items: center;
  }
  &_end {
    @extend .div_class;
    flex-direction: column !important;
    align-items: flex-end;
  }
}

p {
  user-select: none;
}
</style>
