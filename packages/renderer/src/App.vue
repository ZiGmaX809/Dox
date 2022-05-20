<template>
  <div id="container_view" class="flex w-screen h-screen" :data-theme="theme">
    <div id="sider_view" class="w-[200px] bg-base-200 border-r border-base-300 h-screen">
      <div class="w-full mt-6 mb-6 flex justify-center select-none items-baseline">
        <svg-icon id="Logo" name="Logo" class="w-12 h-12" />
        <b class="text-4xl font-sans text-themeable-logo_text">ox</b>
        <b class="text-4xl text-orange-400">.</b>
      </div>
      <div class="divider before:!h-[1px] after:!h-[1px] m-4 select-none" />
      <div
        id="Avatar"
        class="flex flex-col items-center justify-center mt-5 drop-shadow-md select-none cursor-pointer"
        @click="ShowLoginView"
      >
        <div class="w-24 h-24 relative">
          <div class="avatar online">
            <div class="w-24 rounded-full ring-2 ring-base-100">
              <img :src="avatar_src" style="-webkit-user-drag: none" />
            </div>
          </div>
        </div>
      </div>
      <span class="flex flex-col justify-between mt-5 space-y-1 select-none">
        <p class="text-xs text-base-content text-center">{{ unit }}</p>
        <p class="text-xs text-base-content text-center">{{ department }}</p>
        <div class="text-center">
          <b class="text-base text-base-content cursor-pointer" @click="ShowLoginView">
            {{ username }}
          </b>
        </div>
      </span>
      <div class="divider before:!h-[1px] after:!h-[1px] m-4 select-none" />
      <SiderMenu />
    </div>
    <div class="flex-1 flex flex-col">
      <div
        id="header_view"
        class="bg-base-200/50 h-10 items-center border-b border-base-300"
        style="-webkit-app-region: drag"
        @dblclick="trafficlight.maximize"
      >
        <TrafficLight ref="trafficlight" />
      </div>
      <div id="main_view" class="flex-1 p-5 bg-base-100">
        <router-view />
      </div>
    </div>
    <div
      class="absolute translate-x-[200px] translate-y-10 w-[calc(100vw_-_200px)] h-[calc(100vh_-_40px)] pointer-events-none overflow-hidden"
    >
      <div id="msg_view" class="flex flex-col-reverse"></div>
    </div>
    <div
      id="LoginView"
      class="absolute w-full h-full top-0 left-0 z-50 transition-all duration-500 ease-in-out opacity-0"
      v-if="isLogined"
    >
      <Login @CloseLoginView="handle_CloseLoginView" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { STORE_Login } from '/store/modules/login';
import { STORE_Editor } from '/store/modules/editor';
import { STORE_System } from '/store/modules/system';
import { STORE_Setting } from '/store/modules/setting';
import { STORE_Clipboard } from '/store/modules/clipboard';

import { Load_Image_To_Base64 } from '/scripts/utils/handlefiles';

const STORE_editor_instance = STORE_Editor();
const STORE_setting_instance = STORE_Setting();
const STORE_clipboard_instance = STORE_Clipboard();

const theme = ref(STORE_setting_instance.theme);

const isLogined = ref(false);
const isRouterAlive = ref(true);

const avatar_src = ref();
const trafficlight = ref()

const username = STORE_Login()?.LoginResult?.data?.yhxm ?? '点击登录';
const department = STORE_Login()?.LoginResult?.data?.depart?.bmmc ?? '-';
const unit = STORE_Login()?.LoginResult?.data?.fy?.fymc ?? '-';

const ShowLoginView = () => {
  isLogined.value = true;
  setTimeout(() => {
    document.getElementById('LoginView')!.classList.remove('opacity-0');
    document.getElementById('LoginView')!.classList.add('opacity-100');
  }, 300);
};

const handle_CloseLoginView = (): void => {
  setTimeout(() => {
    isLogined.value = false;
  }, 300);
  document.getElementById('LoginView')!.classList.remove('opacity-100');
  document.getElementById('LoginView')!.classList.add('opacity-0');
};

const set_avatar_src = () => {
  const local_avatar_path = `${STORE_System().CacheFile_Path}/images/useravatar.jpg`;
  if (STORE_setting_instance.custom_avatar_bool) {
    Load_Image_To_Base64(local_avatar_path).then(res => {
      avatar_src.value = res;
    });
  } else {
    const babg_avatar_url = STORE_Login().Avatar;
    if (!babg_avatar_url) {
      avatar_src.value = new URL('../public/images/fail.png', import.meta.url).href;
    } else {
      avatar_src.value = babg_avatar_url;
    }
  }
};

const set_theme = (val: string) => {
  theme.value = val;
  STORE_setting_instance.Change_theme(val);
};

set_avatar_src();

provide('avatar_src', set_avatar_src);
provide('theme', set_theme);
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

.drag_none {
  -webkit-user-drag: none;
}

.cls-2 {
  @apply fill-base-content;
}
.cls-4 {
  @apply fill-neutral opacity-80;
}
</style>
