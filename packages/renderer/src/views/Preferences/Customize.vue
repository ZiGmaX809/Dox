<template>
  <h2 class="pref_h2">偏好</h2>
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
      <el-button size="small" @click="CropperDialogVisible = true" :disabled="!switch_coutom_avatar">
        更换头像
      </el-button>
      <el-dialog v-model="CropperDialogVisible" title="裁剪头像">
        <AvatarCropper @dialog_close="close_dialog" />
      </el-dialog>
    </div>
    <p class="pref_desc_p">
      自定义显示本地头像，不影响远程服务器头像显示。<br/>
      虽然可以进行裁剪，但是尽量选择正方形的图片，裁剪后最大尺寸为500*500px。<br/>
      为保证性能，虽未对裁剪前的图片大小做限制，但尽量控制在2000*2000px以下。
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { STORE_Setting } from '../../store/modules/setting';
import { handleChange_num } from '../../script/utils/settings';
import AvatarCropper from '../../components/AvatarCropper.vue';

const STORE_setting_instance = STORE_Setting();
const CropperDialogVisible = ref(false);
const avatar_src: () => void = inject('avatar_src')!;

//自定义头像取值&设置
const switch_coutom_avatar = computed({
  get() {
    return STORE_setting_instance.custom_avatar_bool;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_custom_avatar(newVal);
    avatar_src();
  },
});

const close_dialog = () => {
  CropperDialogVisible.value = false;
};
</script>
