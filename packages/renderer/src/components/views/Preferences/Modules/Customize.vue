<template>
  <b class="text-2xl mt-10">偏好</b>
  <el-divider />
  <div class="space-y-3">
    <div class="flex justify-between">
      <p class="font-bold ">暗黑模式</p>
      <div class="flex flex-row space-x-2 items-center">
        <div class="w-4 h-4 rounded-full bg-orange-500 ring-1 ring-gray-200" />
        <div class="w-4 h-4 rounded-full bg-green-400 ring-1 ring-gray-200"></div>
        <div class="w-4 h-4 rounded-full bg-sky-600 ring-1 ring-gray-200"></div>
      </div>
    </div>

    <div class="flex justify-between">
      <p class="font-bold ">显示自定义头像</p>
      <el-switch v-model="switch_coutom_avatar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { STORE_Setting } from '/store/modules/setting';
import { handleChange_num } from '/script/utils/settings';
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
