<template>
  <b class="text-2xl mt-10">偏好</b>
  <el-divider />
  <div class="space-y-3">
    <div class="flex justify-between">
      <p class="font-bold">暗黑模式</p>
      <div class="flex flex-row space-x-2 items-center">
        <div class="w-4 h-4 rounded-full bg-orange-500 ring-1 ring-gray-200" />
        <div class="w-4 h-4 rounded-full bg-green-400 ring-1 ring-gray-200"></div>
        <div class="w-4 h-4 rounded-full bg-sky-600 ring-1 ring-gray-200"></div>
      </div>
    </div>

    <div>
      <div class="flex justify-between">
        <p class="font-bold">显示自定义头像</p>
        <el-switch v-model="switch_coutom_avatar" />
      </div>
      <div class="flex justify-between">
        <p class="text-xs text-neutral-400">
          自定义显示本地头像，不影响远程服务器头像显示。
          <br />
          虽然可以进行裁剪，但是尽量选择正方形的图片，裁剪后最大尺寸为500*500px。
          <br />
          为保证性能，虽未对裁剪前的图片大小做限制，但尽量控制在2000*2000px以下。
        </p>
        <div>
          <el-button
            size="small"
            @click="CropperDialogVisible = true"
            :disabled="!switch_coutom_avatar"
          >
            更换头像
          </el-button>
          <el-dialog v-model="CropperDialogVisible" title="裁剪头像">
            <AvatarCropper @dialog_close="close_dialog" />
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { STORE_Setting } from '/store/modules/setting';
import AvatarCropper from '/components/utils/AvatarCropper.vue';

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
