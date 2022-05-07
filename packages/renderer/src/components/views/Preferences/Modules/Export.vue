<template>
  <b class="text-2xl mt-10">导出</b>
  <el-divider />
  <div class="space-y-3">
    <div>
      <div class="flex justify-between h-8">
        <p class="font-bold">文件导出路径</p>
        <el-button size="small" @click="Select_export_path">选择文件夹</el-button>
      </div>
      <p class="text-xs text-neutral-400">当前路径：{{ STORE_setting_instance.exportfile_path }}</p>
    </div>

    <div>
      <div class="flex justify-between h-8">
        <p class="font-bold">导出格式</p>
        <el-select
          v-model="STORE_setting_instance.export_format"
          size="small"
          style="width: 80px"
          @change="(val:Event) => Set_Export_format(val)"
        >
          <el-option v-for="item in export_formats" :key="item" :value="item"></el-option>
        </el-select>
      </div>
      <p class="text-xs text-neutral-400">
        如当前导出格式无法打开，可以尝试更改导出格式，但是从原理上不同格式的二进制文件并无区别。
      </p>
    </div>

    <div>
      <div class="flex justify-between h-8">
        <p class="font-bold">以年份分类</p>
        <el-switch v-model="switch_class_year_bool" />
      </div>

      <div class="flex justify-between">
        <p class="text-xs text-neutral-400">
          启用后，将会以案号中的年度或者编辑日期的年度创建文件夹，以归档该年度案件。
        </p>
        <el-select
          v-model="STORE_setting_instance.class_year_type"
          size="small"
          style="width: 100px"
          :disabled="!switch_class_year_bool"
          @change="(val:Event) => Set_class_year_type(val)"
        >
          <el-option v-for="item in export_year_type" :key="item" :value="item"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Select_FileOrFolder } from '/scripts/utils/handlefiles';
import { STORE_Setting } from '/store/modules/setting';

const STORE_setting_instance = STORE_Setting();

//文本导出
const export_formats = ['docx', 'doc'];
const export_year_type = ['案号年度', '编辑年度'];

const Set_class_year_type = (val: Event) => {
  const res = val.toString();
  STORE_setting_instance.Set_class_year_type(res);
};

const Set_Export_format = (val: Event) => {
  const res = val.toString();
  STORE_setting_instance.Set_export_format(res);
};

//开关以案号为目录归档
const switch_class_year_bool = computed({
  get() {
    return STORE_setting_instance.class_year_bool;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_class_year_bool(newVal);
  },
});

//开关以案号为目录归档
const switch_class_caseid_bool = computed({
  get() {
    return STORE_setting_instance.class_caseid_bool;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_class_caseid_bool(newVal);
  },
});

const Select_export_path = async () => {
  const res = await Select_FileOrFolder(['openDirectory']);
  if (res) {
    const f_path = res;
    STORE_setting_instance.Set_exportfile_path(f_path);
  }
};
</script>
