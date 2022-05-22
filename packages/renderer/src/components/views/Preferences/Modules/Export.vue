<template>
  <b class="text-2xl mt-10">导出</b>
  <Divider />
  <div class="text-base-content">
    <PreferencesItem>
      <div class="flex items-center">
        <p class="font-bold">文件导出路径</p>
        <Explain>当前路径：{{ STORE_setting_instance.exportfile_path }}</Explain>
      </div>
      <button class="btn btn-xs" @click="Select_export_path">选择文件夹</button>
    </PreferencesItem>

    <PreferencesItem>
      <div class="flex items-center">
        <p class="font-bold">导出格式</p>
        <Explain>
          如当前导出格式无法打开，可以尝试更改导出格式，但是从原理上不同格式的二进制文件并无区别。
        </Explain>
      </div>
      <Dropdown v-model="STORE_setting_instance.export_format">
        <li v-for="item in export_formats" @click="Set_Export_format(item)">
          <a>
            {{ item }}
          </a>
        </li>
      </Dropdown>
    </PreferencesItem>

    <PreferencesItem>
      <div class="flex items-center">
        <p class="font-bold">以年份分类</p>
        <Explain>
          启用后，将会以案号中的年度或者编辑日期的年度创建文件夹，以归档该年度案件。
        </Explain>
      </div>
      <div class="flex items-center">
        <Switch v-model="switch_class_year_bool" />
        <Dropdown v-model="STORE_setting_instance.class_year_type" :disabled="switch_class_year_bool">
          <li v-for="item in export_year_type" @click="Set_class_year_type(item)">
            <a>
              {{ item }}
            </a>
          </li>
        </Dropdown>
      </div>
    </PreferencesItem>

    <PreferencesItem>
      <div class="flex items-center">
        <p class="font-bold">以案号分类</p>
        <Explain>
          启用后，将会创建案号文件夹，以归档该案所有材料。
          <br />
          文件夹创建优先级：年度>案号
        </Explain>
      </div>
      <Switch v-model="switch_class_caseid_bool" />
    </PreferencesItem>
  </div>
</template>

<script setup lang="ts">
import Msg from '@/scripts/utils/message';
import { Select_FileOrFolder } from '/scripts/utils/handlefiles';
import { STORE_Setting } from '/store/modules/setting';

const STORE_setting_instance = STORE_Setting();

//文本导出
const export_formats = ['docx', 'doc'];
const export_year_type = ['案号年度', '编辑年度'];

const Set_class_year_type = (val: string) => {
  STORE_setting_instance.Set_class_year_type(val);
};

const Set_Export_format = (val: string) => {
  STORE_setting_instance.Set_export_format(val);
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
    Msg(`已将导出目录修改为${f_path}`, 'success', 3000);
    STORE_setting_instance.Set_exportfile_path(f_path);
  }
};
</script>
