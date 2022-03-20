<template>
  <h2 class="pref_h2">导出</h2>
  <el-divider />
  <div class="pref_div">
    <p class="pref_p">文书导出路径</p>
    <el-button size="small" @click="Select_export_path">选择文件夹</el-button>
  </div>
  <p class="pref_desc_p">当前路径：{{ exportfile_path }}</p>
  <div class="pref_div">
    <p class="pref_p">以年份分类</p>
    <el-switch v-model="switch_class_year_bool" />
  </div>
  <div class="div_class">
    <div class="div_class_end">
      <el-select
        v-model="export_type_defult"
        class="m-2"
        size="small"
        style="width: 80px"
        :disabled="!switch_class_year_bool"
        @change="(val:Event) => Set_class_year_type(val)"
      >
        <el-option v-for="item in export_type" :key="item" :value="item"></el-option>
      </el-select>
    </div>
    <p class="pref_desc_p">
      启用后，将会以案号中的年度或者编辑日期的年度创建文件夹，以归档该年度案件。
    </p>
  </div>

  <div class="pref_div">
    <p class="pref_p">以案号分类</p>
    <el-switch v-model="switch_class_caseid_bool" />
  </div>
  <p class="pref_desc_p">
    启用后，将会创建案号文件夹，以归档该案所有材料。
    <br />
    文件夹创建优先级：年度>案号
  </p>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { STORE_Setting } from '../../store/modules/setting';
import { ipcMsg_Select_FileOrFolder } from '../../script/utils/ipcmessage';

const STORE_setting_instance = STORE_Setting();

//文本导出
const exportfile_path = ref(STORE_setting_instance.exportfile_path);
const export_type = ['案号年度', '编辑年度'];
const export_type_defult = ref(STORE_setting_instance.class_year_type);

const Set_class_year_type = (val: Event) => {
  const res = val.toString();
  STORE_setting_instance.Set_class_year_type(res);
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
  const res = await ipcMsg_Select_FileOrFolder(['openDirectory']);
  if (res) {
    const f_path = res + '/';
    STORE_setting_instance.Set_exportfile_path(f_path);
    exportfile_path.value = f_path;
  }
};
</script>
