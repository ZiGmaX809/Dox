<template>
  <b class="text-2xl mt-10">偏好</b>
  <div class="divider before:!h-[1px] after:!h-[1px] select-none" />
  <div class="space-y-3 text-base-content">
    <div class="flex justify-between items-center">
      <p class="font-bold">主题</p>
      <div class="dropdown dropdown-end">
        <label
          tabindex="0"
          class="btn m-1 btn-sm bg-base-100 hover:bg-base-100 active:bg-base-300 text-base-content border-0"
        >
          {{ active_theme }}
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow-lg bg-base-100 border border-base-300 rounded-md w-60 max-h-56 scrollbar-thin hover:scrollbar-thumb-gray-500"
        >
          <li v-for="item in theme_list" @click="theme(item)">
            <a>{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <div class="flex flex-row items-center">
        <p class="font-bold">显示自定义头像</p>
        <div class="tooltip tooltip-bottom ml-1" :data-tip="customze_avater_tooltip">
          <svg-icon name="question" class="w-4 h-4 fill-base-content/70"></svg-icon>
        </div>
      </div>

      <!-- <div class="flex justify-between">
        <p class="font-bold">显示自定义头像</p> -->
      <!-- <el-switch v-model="switch_coutom_avatar" /> -->
      <!-- </div>
      <div class="flex justify-between">
        <p class="text-xs text-base-content/70">
          自定义显示本地头像，不影响远程服务器头像显示。
          <br />
          虽然可以进行裁剪，但是尽量选择正方形的图片，裁剪后最大尺寸为500*500px。
          <br />
          为保证性能，虽未对裁剪前的图片大小做限制，但尽量控制在2000*2000px以下。
        </p> -->
      <!-- <div> -->
      <!-- <el-button
            size="small"
            @click="CropperDialogVisible = true"
            :disabled="!switch_coutom_avatar"
          >
            更换头像
          </el-button>
          <el-dialog v-model="CropperDialogVisible" title="裁剪头像">
            <AvatarCropper @dialog_close="close_dialog" />
          </el-dialog> -->
      <!-- </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { STORE_Setting } from '/store/modules/setting';
import AvatarCropper from '/components/utils/AvatarCropper.vue';

const theme: (val: string) => void = inject('theme')!;

const customze_avater_tooltip =
  '自定义本地头像，不影响远程服务器头像显示。\n\r尽量选择正方形的图片，裁剪后最大尺寸为500*500px。';

const theme_list: string[] = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];

const STORE_setting_instance = STORE_Setting();
const CropperDialogVisible = ref(false);
const avatar_src: () => void = inject('avatar_src')!;

const active_theme = ref('主题');

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

<style>
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
}
</style>
