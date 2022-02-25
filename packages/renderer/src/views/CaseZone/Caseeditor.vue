<template>
  <tinymce id="editorBase" ref="tinymce_eidtor" />
  <!-- 快捷区 -->
  <div class="quickview_right">
    <div style="display: flex; justify-content: space-between">
      <el-popconfirm
        confirm-button-text="是"
        cancel-button-text="否"
        @confirm="clear()"
        title="确认需要清除所有内容？"
      >
        <template #reference>
          <el-button type="danger" size="small" plain>清屏</el-button>
        </template>
      </el-popconfirm>
      <el-button size="small" plain @click="saveText(getText(), true)"
        >暂存</el-button
      >
      <el-button size="small" @click="getText()">生成文书</el-button>
    </div>

    <!-- 快捷输入工具 -->
    <div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 5px;
      "
    >
      <el-autocomplete
        size="small"
        ref="autocomplete"
        popper-class="el-autocomplete-suggestion"
        style="flex: 1; width: 100%"
        v-model="state"
        placement="bottom"
        :trigger-on-focus="false"
        :teleported="false"
        :clearable="true"
        :fetch-suggestions="querySearchAsync"
        @select="handleSelect"
        @clear="setBlur()"
      >
        <template #prefix>
          <el-tooltip
            :content="quick_input_introduction"
            placement="left-start"
            effect="dark"
            :show-after="500"
            raw-content
          >
            <el-icon class="el-input__icon"><EditPen /></el-icon>
          </el-tooltip>
        </template>
        <!-- 过长内容利用Tooltip显示 -->
        <template v-slot="{ item }">
          <EllipsisTooltip :text="item.value" :name="item.name" />
        </template>
      </el-autocomplete>
    </div>

    <!-- 预设文本选择框 -->
    <div
      style="
        margin-top: 5px;
        flex: 1;
        border-style: solid;
        border-width: 1px;
        border-color: #ccc;
        padding: 5px;
        display: flex;
        flex-direction: column;
        width: 182px;
        user-select: none;
      "
    >
      <el-select
        v-model="value"
        class="m-2"
        size="small"
        @change="handle_select_change"
      >
        <el-option
          v-for="(item, index) in presetText"
          :label="item.PartName"
          :value="item.PartName"
          :disabled="
            index == 6 && !store.state.settingModule.setting.clipboard_bool
              ? true
              : false
          "
        >
        </el-option>
      </el-select>

      <div
        style="display: flex; flex: 1; height: 0; width: 100%; margin-top: 5px"
        v-if="isReload_pt"
      >
        <!-- 常规 -->
        <div v-if="!isClipboard">
          <el-scrollbar>
            <div style="height: 0; width: 100%">
              <el-card
                shadow="hover"
                v-for="(item, index) in pt"
                :key="index"
                :class="[index === 0 ? 'select_card0' : 'select_card1']"
                @click="addText(item.ItemName)"
              >
                  <div style="display: flex; flex-direction: column">
                    <span
                      style="color: gray; font-size: 11px"
                      v-if="handle_presettxt(item.ItemName)[0]"
                      >{{ handle_presettxt(item.ItemName)[0] }}</span
                    >
                    <span
                      style="
                        margin-top: 5px;
                        line-height: 1.2;
                        max-height: 4.8em;
                        display: -webkit-box;
                        -webkit-line-clamp: 4;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                      "
                      >{{ handle_presettxt(item.ItemName)[1] }}
                    </span>
                  </div>
              </el-card>
            </div>
          </el-scrollbar>
        </div>
        <!-- 剪贴板 -->
        <div
          style="display: flex; flex-direction: column; width: 100%"
          v-if="isClipboard"
        >
          <!-- 剪贴板操作区 -->
          <div
            style="
              margin-bottom: 5px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              width: 100%;
            "
          >
            <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              @confirm="clear_clipboard"
              title="确认需要清除剪贴板所有内容？"
            >
              <template #reference>
                <el-button type="danger" size="small" style="width: 50%" plain
                  >清空剪贴板</el-button
                >
              </template>
            </el-popconfirm>
            <el-button
              size="small"
              :type="listen_type"
              @click="switch_listen()"
              style="width: 50%"
              >{{ listen_text }}</el-button
            >
          </div>
          <el-scrollbar ref="scrollbarRef" style="height: 100%; width: 100%">
            <div style="flex: 1; height: 0; width: 100%">
              <el-card
                :body-style="{ padding: '0px' }"
                shadow="hover"
                v-for="(item, index) in pt_clip"
                :key="index"
                :class="[index === 0 ? 'select_card0' : 'select_card1']"
                @click.stop="addText(item)"
                @mouseover="hoverIndex = index"
                @mouseleave="hoverIndex = -1"
              >
                <!-- <div style="display: flex; flex-direction: column"> -->
                <div style="height: 20px">
                  <el-icon
                    :size="15"
                    @click.stop="del_cache(index)"
                    style="margin-top: 5px; margin-left: 5px"
                    v-if="hoverIndex == index ? true : false"
                    ><Close
                  /></el-icon>
                </div>
                <div style="padding: 20px; margin-top: -20px">
                  <span style="word-wrap: break-word">{{ item }}</span>
                  <!-- </div> -->
                </div>
              </el-card>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, inject, watch } from "vue";
import { setItem } from "../../script/utils/storage";
import tinymce from "../../components/TEditor.vue";
import { EditPen, Close, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { ElScrollbar } from "element-plus";
import { quick_input_introduction } from "../../html/introduction";
import { quickinput } from "../../script/utils/quickinput";
import { Stats } from "fs";
import EllipsisTooltip from "../../components/EllipsisTooltip.vue";
import { useStore } from "vuex";
import { Modules } from "../../store";
const store = useStore<Modules>();

const tinymce_eidtor = ref();
const value = ref("案件信息");
const hoverIndex = ref(-1); //单独删除剪贴板内容用
const isReload_pt = ref(true); //刷新组件用
const listen_type = ref(store.getters["clipboardModule/listen_type"]);
const listen_text = ref(store.getters["clipboardModule/listen_text"]);
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();

const listen_clip: any = inject("listen_clip");

//开关剪贴板监控实例
const switch_listen = () => {
  store.commit("clipboardModule/switch_listen");
  const bool = store.state.clipboardModule.clipboard_listen;
  listen_clip.listen_clip(bool);
  listen_type.value = bool ? "success" : "danger";
  listen_text.value = bool ? "正在监听" : "暂停监听";
};

// const presetText = getItem("presetText");
const presetText = store.state.editorModule.presetText;
const pt = ref(presetText[0].Items);
const pt_clip = ref();
const isClipboard = ref(false); //切换剪贴板、常规文本候选框

//切换预设文本
const handle_select_change = (val: string) => {
  if (val == "剪贴板") {
    pt_clip.value = store.state.clipboardModule.clipboard_cache;
    isClipboard.value = true;
  } else {
    presetText.forEach((item: any, index: number) => {
      if (item.PartName == val) {
        pt.value = presetText[index].Items;
      }
    });
    isClipboard.value = false;
  }

  refresh_select();
};

//刷新候选组件
const refresh_select = () => {
  isReload_pt.value = false;
  nextTick(() => {
    isReload_pt.value = true;
  });
};

//刷新滚动条
const refresh_scrollbar = () => {
  nextTick(() => {
    scrollbarRef.value!.update();
  });
};

const clear_clipboard = () => {
  store.dispatch("clipboardModule/clear_cache");
  //刷新粘贴板数据
  pt_clip.value = store.state.clipboardModule.clipboard_cache;
  refresh_scrollbar();
};

const del_cache = (index: number) => {
  store.dispatch("clipboardModule/del_cache", index);
  refresh_scrollbar();
};

//监控剪贴板缓存变化以刷新滚动条
watch(
  () => store.state.clipboardModule.clipboard_cache,
  (n, o) => {
    if (isClipboard.value) {
      refresh_scrollbar();
    }
  }
);

//获取编辑器文本
const getText = () => {
  const arr_str = tinymce_eidtor.value.getText().split("\n");
  const result = arr_str.filter((s: any) => {
    return s && s.trim();
  });
  const r = result.join("\n");
  return r;
};

const props = defineProps<{
  id: any;
}>();

//暂存文本
const saveText = (edit_text: string, ismsg: boolean) => {
  const txt = {
    ah: props.id,
    text: edit_text,
  };
  setItem("saveText", txt);
  store.commit("editorModule/Reset_editor_isChanged");

  if (ismsg) {
    ElMessage({
      message: "暂存成功！",
      grouping: true,
      type: "success",
    });
  }
};

//输出文本

//编辑器清屏
const clear = () => {
  tinymce_eidtor.value.clear();
  setTimeout(() => {
    if (store.state.settingModule.setting.auto_int2em) {
      int2em();
    }
    //清屏后无需提醒
    saveText("", false);
  }, 500);
};

const int2em = () => {
  tinymce_eidtor.value.int2em();
};

//插入文本
const addText = (data: string) => {
  const str = data.replace(/【.+】/, "");
  const arr_str = str.split("\n");
  if (arr_str.length > 1) {
    arr_str.forEach((item, index) => {
      if (index > 0) {
        tinymce_eidtor.value.addText("<p style='text-indent: 2em;''>" + item);
      } else {
        tinymce_eidtor.value.addText(item);
      }
    });
  } else {
    tinymce_eidtor.value.addText(str);
  }
};

//预设文本截取标题
const handle_presettxt = (str: string) => {
  if (/【.+】/.test(str)) {
    const title: any = str.match(/(?<=【).+(?=】)/);
    const maintxt = str.replace(/【.+】/, "");
    return [title[0], maintxt];
  } else {
    return [false, str];
  }
};

//快捷输入功能
const state = ref("");
const autocomplete = ref();
let timeout: NodeJS.Timeout;

interface item {
  id: number;
  value: string;
  name: string;
}

const links: any = ref<item[]>([]);

const querySearchAsync = async (
  queryString: string,
  cb: (arg: any) => void
) => {
  // if (queryString.length > 1 && queryString.indexOf(" ") > -1) {
  if (/^[a-zA-Z]+\s/.test(queryString)) {
    links.value = await quickinput(queryString, file_list);
    let isLaw = /(ft)|(法条)/g.test(queryString);
    if (typeof links.value != "string") {
      if (isLaw) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb(links.value);
        }, 500);
      } else {
        cb(links.value);
      }
    } else {
      const ttt = [{ id: -1, value: links.value }];
      cb(ttt);
    }
  } else {
    cb([]);
  }
};

const handleSelect = (item: any) => {
  // console.log(item.value);
  if (item.id != -1) addText(item.value);
  state.value = "";
  links.value = [];
};

const setBlur = () => {
  //  在点击由 clearable 属性生成的清空按钮时，主动触发失去焦点，解决‘fetch-suggestions’输入建议不提示的bug
  (<HTMLInputElement>document.activeElement).blur();
};

const handleBlur = () => {
  autocomplete.value.suggestions = [];
  autocomplete.value.highlightedIndex = -1;
};

//遍历存在的法律法规文件
const walkSync = (
  currentDirPath: any,
  callback: (arg0: string, arg1: string, arg2: string, arg3: Stats) => void
) => {
  window.fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = window.path.join(currentDirPath, name);
    var filename = name;
    var filename_withoutsuffix = name.replace(/\..*/g, "");
    var stat = window.fs.statSync(filePath);
    callback(filePath, filename, filename_withoutsuffix, stat);
  });
};

const file_list: any = [];

walkSync(
  "packages/renderer/public/lawfiles/",
  function (filePath, name, w_name, stat) {
    file_list.push(w_name);
  }
);

defineExpose({
  int2em,
  addText,
});
</script>

<style lang="scss">
.quickview_right {
  height: 610px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.el-autocomplete-suggestion {
  width: 194px !important;
}

.quick_select_card {
  width: 180px;
  font-size: 13px;
  cursor: pointer;

  :hover {
    background-color: #fcfcfc;
  }
}

.select_card {
  &0 {
    @extend .quick_select_card;
    margin-top: 0px;
  }

  &1 {
    @extend .quick_select_card;
    margin-top: 10px;
  }
}
</style>
