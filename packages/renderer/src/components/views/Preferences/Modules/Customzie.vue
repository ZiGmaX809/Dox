<template>
  <b class="text-2xl mt-10">偏好</b>
  <Divider />
  <div class="text-base-content">
    <PreferencesItem>
      <p class="font-bold">主题</p>
      <Dropdown v-model="active_theme">
        <li v-for="item in theme_list" @click="change_theme(item)">
          <a>
            {{ item }}
          </a>
        </li>
      </Dropdown>
    </PreferencesItem>

    <PreferencesItem>
      <div class="flex items-center">
        <p class="font-bold">显示自定义头像</p>
        <Explain>
          <b>1.</b>
          自定义显示本地头像，不影响远程服务器头像显示。
          <br />
          <b>2.</b>
          虽然可以进行裁剪，但是尽量选择正方形的图片，裁剪后最大尺寸为500*500px。
          <br />
          <b>3.</b>
          为保证性能，虽未对裁剪前的图片大小做限制，但尽量控制在2000*2000px以下。
        </Explain>
      </div>

      <div class="flex items-center">
        <Switch v-model="switch_coutom_avatar_bool" />
        <Dialog
          v-model="switch_coutom_avatar_bool"
          for="change_avatar_modal"
          class="btn btn-xs ml-3 modal-button"
          slot_class="modal-box w-[668px] max-w-5xl"
          label="更换头像"
        >
          <AvatarCropper />
        </Dialog>
      </div>
    </PreferencesItem>
  </div>
</template>

<script setup lang="ts">
import { STORE_Setting } from '/store/modules/setting';

const STORE_setting_instance = STORE_Setting();

const theme: (val: string) => void = inject('theme')!;
const avatar_src: () => void = inject('avatar_src')!;

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

const active_theme = ref(STORE_setting_instance.theme);

const change_theme = (themename: string) => {
  theme(themename);
  active_theme.value = themename;
};

const switch_coutom_avatar_bool = computed({
  get() {
    return STORE_setting_instance.custom_avatar_bool;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_custom_avatar(newVal);
    avatar_src();
  },
});
</script>
