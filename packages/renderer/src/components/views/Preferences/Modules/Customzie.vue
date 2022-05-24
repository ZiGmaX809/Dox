<template>
  <b class="text-2xl mt-10">偏好</b>
  <Divider />
  <div class="text-base-content">
    <PreferencesItem>
      <p class="font-bold">浅色主题</p>
      <Dropdown v-model="active_light_theme">
        <li v-for="item in theme_light_list" @click="change_theme(false, item)">
          <a>
            {{ item }}
          </a>
        </li>
      </Dropdown>
    </PreferencesItem>

    <PreferencesItem>
      <p class="font-bold">深色主题</p>
      <Dropdown v-model="active_dark_theme">
        <li v-for="item in theme_dark_list" @click="change_theme(true, item)">
          <a>
            {{ item }}
          </a>
        </li>
      </Dropdown>
    </PreferencesItem>

    <PreferencesItem>
      <p class="font-bold">跟随系统自动切换</p>
      <Switch v-model="switch_auto_darkmode_bool" />
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

const theme: (darkmode: boolean, val: string) => void = inject('theme')!;
const avatar_src: () => void = inject('avatar_src')!;

const theme_light_list: string[] = [
  'light',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'retro',
  'cyberpunk',
  'valentine',
  'garden',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'cmyk',
  'autumn',
  'acid',
  'lemonade',
  'winter',
];

const theme_dark_list: string[] = [
  'dark',
  'synthwave',
  'halloween',
  'forest',
  'aqua',
  'black',
  'luxury',
  'dracula',
  'business',
  'night',
  'coffee',
];

const active_light_theme = ref(STORE_setting_instance.light_theme);
const active_dark_theme = ref(STORE_setting_instance.dark_theme);

const change_theme = (darkmode: boolean, themename: string) => {
  theme(darkmode, themename);
  if (!darkmode) {
    active_light_theme.value = themename;
    STORE_setting_instance.Change_light_theme(themename);
  } else {
    active_dark_theme.value = themename;
    STORE_setting_instance.Change_dark_theme(themename);
  }
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

const switch_auto_darkmode_bool = computed({
  get() {
    return STORE_setting_instance.auto_darkmode;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_auto_darkmode_bool(newVal);
  },
});
</script>
