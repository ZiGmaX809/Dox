<template>
  <b class="text-2xl mt-10">编辑</b>
  <el-divider />
  <div class="space-y-2">
    <div class="flex justify-between">
      <p class="font-bold text-gray-800">默认字体</p>
      <el-select
        v-model="default_font_name"
        size="small"
        style="width: 80px"
        @change="(val:Event) => Set_Editer_font_name(val)"
      >
        <el-option
          v-for="item in fonts_family"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <div class="flex justify-between">
      <p class="font-bold text-gray-800">默认字号</p>
      <el-select
        v-model="default_font_size"
        size="small"
        style="width: 60px"
        @change="(val:Event) => Set_Editer_font_size(val)"
      >
        <el-option v-for="item in font_sizes" :key="item" :value="item"></el-option>
      </el-select>
    </div>

    <div class="flex justify-between">
      <p class="font-bold text-gray-800">默认行高</p>
      <el-select
        v-model="default_lineheight"
        size="small"
        style="width: 50px"
        @change="(val:Event) => Set_Editer_lineheight(val)"
      >
        <el-option v-for="item in lineheights" :key="item" :value="item"></el-option>
      </el-select>
    </div>

    <div>
      <div class="flex justify-between">
        <p class="font-bold text-gray-800">默认启用首行缩进</p>
        <el-switch v-model="switch_auto_int2em" />
      </div>
      <p class="text-sm text-gray-400">
        编辑器内的字体、字号、段落格并不会影响导出文书的格式，仅为了便于编辑文书。
      </p>
    </div>

    <div>
      <div class="flex justify-between">
        <p class="font-bold text-gray-800">启用剪贴板</p>
        <el-switch v-model="switch_clipboard_bool" />
      </div>
      <p class="text-sm text-gray-400">
        启用剪贴板功能后，将会监听系统剪贴板，并且将复制的文本存入缓存中。
      </p>
    </div>

    <div>
      <div class="flex justify-between">
        <p class="font-bold text-gray-800">剪贴板缓存数量（自定义上限200）</p>
        <el-input
          v-model="STORE_setting_instance.clipboard_num"
          size="small"
          style="width: 50px"
          controls-position="right"
          :disabled="!switch_clipboard_bool"
          @input="(val: string) => handleChange_num(val,200)"
        />
      </div>
      <p class="text-sm text-gray-400">
        条目数量过多将会导致索引效率降低，建议设置缓存条目数量控制在50以内。
        <br />
        超出数量将自动清除最先数据。
      </p>
    </div>

    
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { handleChange_num } from '/script/utils/settings';
import { STORE_Setting } from '/store/modules/setting';

const STORE_setting_instance = STORE_Setting();

//首行缩进取值&设置
const switch_auto_int2em = computed({
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

//编辑器字体字号设置
const default_font_name = ref(STORE_setting_instance.editor_font_name.split('=')[0]);
const fonts_family = [
  {
    value: '系统字体=',
    label: '系统字体',
  },
  {
    value: '微软雅黑=Microsoft YaHei',
    label: '微软雅黑',
  },
  {
    value: '苹果苹方=PingFang SC',
    label: '苹果苹方',
  },
  {
    value: '仿宋=FangSong,serif',
    label: '仿宋',
  },
  {
    value: '宋体=simsun,serif',
    label: '宋体',
  },
  {
    value: '黑体=SimHei,sans-serif',
    label: '黑体',
  },
];
const default_font_size = ref(STORE_setting_instance.editor_font_size);
const font_sizes = ['12px', '14px', '16px', '18px', '20px', '22px', '24px'];
const default_lineheight = ref(STORE_setting_instance.editor_lineheight);
const lineheights = [1, 1.5, 2, 2.5, 3];

const Set_Editer_font_name = (val: Event) => {
  const res = val.toString();
  STORE_setting_instance.Set_font_name(res);
};

const Set_Editer_font_size = (val: Event) => {
  const res = val.toString();
  STORE_setting_instance.Set_font_size(res);
};

const Set_Editer_lineheight = (val: Event) => {
  const res = val.toString();
  STORE_setting_instance.Set_lineheight(res);
};
</script>
