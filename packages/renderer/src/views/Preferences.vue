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
        <el-switch v-model="switch_clipboard_bool" />
      </div>
      <div class="pref_div">
        <p class="pref_p">剪贴板缓存数量（自定义上限200）</p>
        <el-input
          v-model="STORE_setting_instance.clipboard_num"
          size="small"
          style="width: 50px"
          controls-position="right"
          :disabled="!STORE_setting_instance.clipboard_bool"
          @input="(val: any) => handleChange_clipboard_num(val)"
        />
      </div>
      <p class="pref_desc_p" style="margin-top: -3px">
        启用剪贴板功能后，将会监听系统剪贴板，并且将复制的文本存入缓存中。
        <br />条目数量过多将会导致索引效率降低，建议设置缓存条目数量控制在50以内。
        <br />超出数量将自动清除最先数据。
      </p>
      <div class="pref_div">
        <p class="pref_p">剪贴板监听字符长度（自定义上限600）</p>
        <el-input
          v-model="STORE_setting_instance.clipboard_textlength"
          size="small"
          style="width: 50px"
          controls-position="right"
          :disabled="!STORE_setting_instance.clipboard_bool"
          @input="(val: any) => handleChange_clipboard_textlength(val)"
        />
      </div>
      <p class="pref_desc_p" style="margin-top: -3px">
        为保证性能，建议监听300字符以内的文本。
        <br />超出设定长度依旧可以复制粘贴，但不会存入缓存。
      </p>
      <div class="pref_div">
        <p class="pref_p">复用剪贴板内容</p>
        <el-switch
          v-model="switch_writeSystemClipboard_bool"
          :disabled="!STORE_setting_instance.clipboard_bool"
        />
      </div>
      <p class="pref_desc_p" style="margin-top: -3px">
        开启后，点击剪贴板内容将会写入到系统剪贴板，以便于使用Ctrl+V进行多次粘贴。<br />关闭后，只会将点击内容插入至编辑器。
      </p>

      <h2 class="pref_h2">快捷输入</h2>
      <el-divider />
      <div class="pref_div">
        <p class="pref_p">已引入的法律法规文件</p>
        <el-button
          class="extra_btn_class"
          size="small"
          @click="Refresh_lawfiles"
          >刷新</el-button
        >
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
              @click="handleDelete(scope)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <p class="pref_p">引入新的法律法规文件</p>
      <p class="pref_desc_p" style="margin-top: -3px">
        <b>
          &#10059;&nbsp;注意：快捷输入工具仅仅作为更加便捷编辑而存在，对于导入文件尽可能进行准确匹配，但是无法保证任何法律法规文件导入后法条完整和准确性。
          <br />&#10059;&nbsp;裁判文书校对是案件审理的必要环节与步骤。
        </b>
        <br />
        <br />下载法律文书: http://gov.pkulaw.cn/
        (北大法宝中国法律法规数据库，需互联网下载后导入)
        <br />
        <i
          >国务院下属国家法律法规数据库因更新效率问题以及无法下载TXT文件格式而不被支持。</i
        >
        <br />
        <br />进入网页选择法律法规文件后，点击右上角下载按钮，选择「纯文本」去掉勾选「保留字段信息」以及「保留正文中的法宝联想」，下载后不要修改文件名称，请保持原有名称以便提取该文书完整名称。
        <br />目前支持法律、法规、司法解释的导入。
      </p>
      <div class="pref_div">
        <p class="pref_p">
          行政区划地址信息（更新时间：{{ pca_update_time() }}）
        </p>
        <el-button
          class="extra_btn_class"
          size="small"
          @click="import_pcafile()"
          >选择文件并更新</el-button
        >
      </div>
      <p class="pref_desc_p" style="margin-top: -3px">
        地域范围为国家统计局开展统计调查的全国31个省、自治区、直辖市，
        <br />未包括我国台湾省、香港特别行政区、澳门特别行政区。
        <br />项目更新地址：https://github.com/modood/Administrative-divisions-of-China
        <br />下载pca.json文件引入即可
      </p>

      <h2 class="pref_h2">其他</h2>
      <el-divider />
      <div class="pref_div">
        <p class="pref_p">导出配置及缓存数据</p>
        <el-button
          class="extra_btn_class"
          size="small"
          @click="export_localstorage()"
          >导出</el-button
        >
      </div>

      <div class="pref_div">
        <p class="pref_p">导入配置及缓存数据</p>
        <el-button
          class="extra_btn_class"
          size="small"
          @click="import_localstorage()"
          >选择文件并导入</el-button
        >
      </div>

      <h2 class="pref_h2">资源</h2>
      <el-divider />
      <div class="pref_div">
        <p class="pref_p">资源文件夹</p>
        <el-button
          class="extra_btn_class"
          size="small"
          @click="open_cachefile()"
          >打开</el-button
        >
      </div>

      <p class="pref_author">MADE BY ZiGma</p>
      <p class="pref_version">v0.0.1</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { setItem } from "../script/utils/storage";
import { STORE_Setting } from "../store/modules/setting";
import { scan_allfiles } from "../script/utils/scanfolder";
import { ipcMsg_Get_File, ipcMsg_Get_Path } from "../script/utils/ipcmessage";
import { STORE_System } from "../store/modules/system";

const STORE_setting_instance = STORE_Setting();
const STORE_system_instance = STORE_System();

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
const handleChange_clipboard_num = (value: String) => {
  const _str = value.replace(/[^0-9.]/g, "");
  const final_num = Number(_str) > 200 ? 200 : Number(_str);
  STORE_setting_instance.Change_clipboard_num(final_num);
};

const handleChange_clipboard_textlength = (value: String) => {
  const _str = value.replace(/[^0-9.]/g, "");
  const final_num = Number(_str) > 600 ? 600 : Number(_str);
  STORE_setting_instance.Change_clipboard_textlength(final_num);
};

const tableData = reactive({
  list: STORE_setting_instance.lawfilelist,
});

const Refresh_lawfiles = async () => {
  const final_list = await scan_allfiles("packages/renderer/public/lawfiles/");
  setTimeout(() => {
    tableData.list = final_list;
    STORE_setting_instance.Change_lawfilelist(final_list);
  }, 300);
};

//删除引入的法律法规
const handleDelete = (index: number) => {
  console.log(index);
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

    ElMessage({
      message: bool ? "已成功导入行政区划文件" : "导入失败，请校验文件！",
      grouping: true,
      type: bool ? "success" : "error",
    });
  }
};

//导出&导入缓存
const export_localstorage = async () => {
  const arr_text = [];
  for (var i = 0; i < window.localStorage.length; i++) {
    const key: string | null = window.localStorage.key(i); //获取本地存储的Key
    if (key != null) {
      arr_text.push([key, window.localStorage.getItem(key)]);
    }
  }
  const final_json = Object.fromEntries(arr_text);

  const downloads_path = await ipcMsg_Get_Path("downloads");

  if (downloads_path != undefined) {
    const file_fullpath = downloads_path + "/export_cache.json";
    window.fs.writeFileSync(file_fullpath, JSON.stringify(final_json));

    ElMessage({
      message: `成功将缓存内容导出至 ${file_fullpath} `,
      grouping: true,
      type: "success",
    });
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
      setItem(key, json_[key]);
    }

    ElMessage({
      message: "成功导入缓存文件，程序将在3秒内重启",
      grouping: true,
      type: "success",
    });

    setTimeout(() => {
      window.ipcRenderer.send("Restart");
    }, 3000);
  }
};

const open_cachefile = async () => {
  const cacheFile_path = STORE_system_instance.CacheFile_Path;

  if (cacheFile_path != "") {
    window.shell.openPath(cacheFile_path);
  }
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
