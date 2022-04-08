<template>
  <el-container class="w-screen h-screen">
    <el-aside class="w-[200px] bg-custom_bg border-r border-r-gray-200 h-screen">
      <div class="w-full mt-6 mb-6 flex justify-center select-none items-baseline">
        <svg-icon id="black" name="Logo" class="w-12 h-12" />
        <b class="text-4xl font-sans" style="color: #4d4d4d">ox</b>
        <b class="text-4xl text-orange-400">.</b>
      </div>
      <div class="flex h-1px bg-gray-200 m-4 select-none" />
      <div
        id="Avatar"
        class="flex flex-col items-center justify-center mt-5 drop-shadow-md select-none cursor-pointer"
        @click="Login"
      >
        <div
          class="w-24 h-24 flex items-center justify-center rounded-full border-2 border-white overflow-hidden"
        >
          <img :src="avatar_src" style="-webkit-user-drag: none" class="rounded-full w-24 h-24" />
        </div>
        <div class="w-3 h-3 -mt-4 -mr-16 bg-green-400 rounded-full border-2 border-white" />
      </div>
      <span class="flex flex-col justify-between mt-5 space-y-1 select-none">
        <p class="text-xs text-gray-600 text-center">Alibaba Group</p>
        <p class="text-xs text-gray-600 text-center">Taobao</p>
        <div class="text-center">
          <b class="text-base cursor-pointer" @click="Login">ZiGma</b>
        </div>
      </span>
      <div class="flex h-1px bg-gray-200 m-4 select-none" />
      <el-menu router default-active="/" class="!space-y-2">
        <el-menu-item
          index="/"
          class="flex h-10 rounded-lg mx-2 select-none drop-shadow-md justify-center"
        >
          <svg-icon name="store" class="w-6 h-6" />
          <span class="!ml-3 w-16 text-[15px]">我的案件</span>
        </el-menu-item>
        <el-menu-item
          index="/Search"
          class="flex h-10 rounded-lg mx-2 select-none drop-shadow-md justify-center"
        >
          <svg-icon name="search" class="w-6 h-6" />
          <span class="!ml-3 w-16 text-[15px]">案件查询</span>
        </el-menu-item>
        <el-menu-item
          index="/Template"
          class="flex h-10 rounded-lg mx-2 select-none drop-shadow-md justify-center"
        >
          <svg-icon name="template" class="w-6 h-6" />
          <span class="!ml-3 w-16 text-[15px]">模板管理</span>
        </el-menu-item>
        <el-menu-item
          index="/Preferences"
          class="flex h-10 rounded-lg mx-2 select-none drop-shadow-md justify-center"
        >
          <svg-icon name="set" class="w-6 h-6" />
          <span class="!ml-3 w-16 text-[15px]">设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header
        id="Layout-Header"
        class="bg-white dark:bg-neutral-800 h-10 items-center border-b border-gray-200"
        style="-webkit-app-region: drag"
      >
        <TrafficLight />
      </el-header>
      <el-main v-if="isRouterAlive">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
  <div
    id="LoginView"
    class="absolute w-full h-full top-0 left-0 z-50 transition-all duration-500 ease-in-out opacity-0"
    v-if="isLogined"
  >
    <LoginView @CloseLoginView="handle_CloseLoginView" />
  </div>
</template>

<script setup lang="ts">
import TrafficLight from './components/utils/TrafficLight.vue';
import avatar from './assets/imgs/useravatar.jpg';
import LoginView from './components/views/Login/index.vue';

import { STORE_Login } from '/store/modules/login';
import { STORE_Editor } from '/store/modules/editor';
import { STORE_System } from '/store/modules/system';
import { STORE_Setting } from '/store/modules/setting';
import { STORE_Clipboard } from '/store/modules/clipboard';

import { Load_Image_To_Base64 } from '/script/utils/handlefiles';

const STORE_editor_instance = STORE_Editor();
const STORE_setting_instance = STORE_Setting();
const STORE_clipboard_instance = STORE_Clipboard();

const isLogined = ref(false);
const isRouterAlive = ref(true);

const avatar_src = ref();

const Login = () => {
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
  const local_avatar_path = `${STORE_System().CacheFile_Path}/images/`;
  if (STORE_setting_instance.custom_avatar_bool) {
    Load_Image_To_Base64(local_avatar_path + 'useravatar.jpg').then(res => {
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

set_avatar_src();

provide('avatar_src', set_avatar_src);
</script>

<style>
.el-menu {
  border-right: solid 0px;
  --el-menu-bg-color: rgba(0, 0, 0, 0);
  --el-menu-hover-bg-color: #fafafa;
}

.el-menu-item.is-active {
  background-color: #fafafa;
  color: #384151;
}
</style>
