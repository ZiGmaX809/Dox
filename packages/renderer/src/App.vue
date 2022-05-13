<template>
  <el-container class="w-screen h-screen">
    <el-aside class="w-[200px] bg-zinc-100 border-r border-r-gray-200 h-screen">
      <div class="w-full mt-6 mb-6 flex justify-center select-none items-baseline">
        <svg-icon id="black" name="Logo" class="w-12 h-12" />
        <b class="text-4xl font-sans" style="color: #4d4d4d">ox</b>
        <b class="text-4xl text-orange-400">.</b>
      </div>
      <div class="flex h-1px bg-gray-200 m-4 select-none" />
      <div
        id="Avatar"
        class="flex flex-col items-center justify-center mt-5 drop-shadow-md select-none cursor-pointer"
        @click="ShowLoginView"
      >
        <div class="w-24 h-24 relative">
          <div
            class="w-full h-full items-center justify-center rounded-full border-2 border-white overflow-hidden"
          >
            <img
              :src="avatar_src"
              style="-webkit-user-drag: none"
              class="rounded-full w-full h-full object-center"
            />
          </div>
          <div
            class="absolute w-3 h-3 bg-green-400 rounded-full border-2 border-white top-[75px] left-[75px]"
          />
        </div>
      </div>
      <span class="flex flex-col justify-between mt-5 space-y-1 select-none">
        <p class="text-xs text-gray-600 text-center">{{ unit }}</p>
        <p class="text-xs text-gray-600 text-center">{{ department }}</p>
        <div class="text-center">
          <b class="text-base cursor-pointer" @click="ShowLoginView">{{ username }}</b>
        </div>
      </span>
      <div class="flex h-1px bg-gray-200 m-4 select-none" />
      <div class="px-2 bg-zinc-100">
        <ul id="Sidebar" class="space-y-2">
          <li
            id="item_menu_1"
            class="sider_menu_active"
            :class="sider_menu_style"
            @click="(val:Event) => active(val)"
          >
            <a href="#" :class="sider_menu_a_style">
              <div class="flex justify-center m-auto">
                <svg-icon name="store" class="w-6 h-6" />
                <span class="ml-3 w-16 text-[15px]">我的案件</span>
              </div>
            </a>
          </li>
          <li id="item_menu_2" :class="sider_menu_style" @click="(val:Event) => active(val)">
            <a href="#Template" :class="sider_menu_a_style">
              <div class="flex justify-center m-auto">
                <svg-icon name="template" class="w-6 h-6" />
                <span class="ml-3 w-16 text-[15px]">模板管理</span>
              </div>
            </a>
          </li>
          <li id="item_menu_3" :class="sider_menu_style" @click="(val:Event) => active(val)">
            <a href="#Search" :class="sider_menu_a_style">
              <div class="flex justify-center m-auto">
                <svg-icon name="search" class="w-6 h-6" />
                <span class="ml-3 w-16 text-[15px]">案件查询</span>
              </div>
            </a>
          </li>
          <li id="item_menu_4" :class="sider_menu_style" @click="(val:Event) => active(val)">
            <a href="#Preferences" :class="sider_menu_a_style">
              <div class="flex justify-center m-auto">
                <svg-icon name="set" class="w-6 h-6" />
                <span class="ml-3 w-16 text-[15px]">设置</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </el-aside>

    <el-container>
      <el-header
        id="Layout-Header"
        class="bg-white !h-10 items-center border-b border-gray-200"
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
    <Login @CloseLoginView="handle_CloseLoginView" />
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

interface type_target {
  [id: string]: any;
}

const sider_menu_style = ref(
  'rounded-lg hover:bg-zinc-50 hover:shadow-md transition duration-300 ease-in-out'
);
const sider_menu_a_style = ref(
  'flex items-center p-2 text-base font-normal text-gray-700 drag_none'
);

const active = (val: Event) => {
  const { id } = val.currentTarget as type_target;
  remove_active_class();
  document.getElementById(id)!.classList.add('sider_menu_active');
};

const remove_active_class = () => {
  document.getElementById('Sidebar')!.childNodes.forEach(cls => {
    const { id } = cls as type_target;
    const class_list = Array.from(document.getElementById(id)!.classList);
    if (class_list.includes('sider_menu_active')) {
      document.getElementById(id)!.classList.remove('sider_menu_active');
    }
  });
};

const isLogined = ref(false);
const isRouterAlive = ref(true);

const avatar_src = ref();

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

set_avatar_src();

provide('avatar_src', set_avatar_src);
</script>

<style>
.sider_menu_active {
  @apply bg-zinc-50 shadow-md;
}

.drag_none {
  -webkit-user-drag: none;
}
</style>
