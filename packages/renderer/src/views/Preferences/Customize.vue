<template>
  <h2 class="pref_h2">自定义</h2>
  <el-divider />
  <div class="pref_div">
    <p class="pref_p">主题颜色</p>
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
  <div class="pref_div">
    <p class="pref_p">自定义头像</p>
    <el-switch v-model="switch_coutom_avatar" />
  </div>
  <div class="div_class">
    <div class="div_class_end">
      <el-button size="small" @click="" :disabled="!switch_coutom_avatar">
        选择图片
      </el-button>
    </div>
    <p class="pref_desc_p">自定义显示本地头像，不影响远程服务器头像显示。</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { STORE_Setting } from '../../store/modules/setting';
import { handleChange_num } from '../../script/utils/settings';

const STORE_setting_instance = STORE_Setting();

//自定义头像取值&设置
const switch_coutom_avatar = computed({
  get() {
    return STORE_setting_instance.custom_avatar_bool;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_custom_avatar(newVal);
  },
});
</script>
