<template>
  <div id="MainView">
    <a-layout style="min-height: 100vh">
      <a-layout-sider class="bg-custom_bg border-r border-r-gray-200 h-screen">
        <div class="w-full mt-6 mb-6 flex justify-center select-none items-baseline">
          <svg-icon id="black" name="Logo" class="w-12 h-12" />
          <b class="text-4xl font-sans" style="color: #4d4d4d">ox</b>
          <b class="text-4xl text-orange-400">.</b>
        </div>
        <div class="flex h-1px bg-gray-200 m-4 select-none" />
        <div id="Avatar" class="flex flex-col items-center justify-center mt-5 drop-shadow-md">
          <div
            class="h-1/2 w-1/2 flex items-center justify-center rounded-full border-2 border-white"
          >
            <img :src="avatar" style="-webkit-user-drag: none" class="rounded-full" />
          </div>
          <div class="w-3 h-3 -mt-4 -mr-16 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <span class="flex flex-col justify-between mt-5 space-y-1 select-none">
          <p class="text-xs text-gray-600">Alibaba Group</p>
          <p class="text-xs text-gray-600">Taobao</p>
          <b class="text-base">ZiGma</b>
        </span>
        <div class="flex h-1px bg-gray-200 m-4 select-none" />
        <a-menu v-model:selectedKeys="selectedKeys">
          <a-menu-item
            key="1"
            class="flex rounded-lg ml-2 mr-2 select-none drop-shadow-md justify-center"
          >
            <solution-outlined class="!text-lg" />
            <span class="!ml-5 w-16">我的案件</span>
          </a-menu-item>
          <a-menu-item
            key="2"
            class="flex rounded-lg ml-2 mr-2 select-none drop-shadow-md justify-center"
          >
            <search-outlined class="!text-lg" />
            <span class="!ml-5 w-16">案件查询</span>
          </a-menu-item>
          <a-menu-item
            key="3"
            class="flex rounded-lg ml-2 mr-2 select-none drop-shadow-md justify-center"
          >
            <file-text-outlined class="!text-lg" />
            <span class="!ml-5 w-16">模版管理</span>
          </a-menu-item>
          <a-menu-item
            key="4"
            class="flex rounded-lg ml-2 mr-2 select-none drop-shadow-md justify-center"
          >
            <setting-outlined class="!text-lg" />
            <span class="!ml-5 w-16">设置</span>
          </a-menu-item>
          <div class="w-full absolute bottom-0 mb-8">
            <svg-icon name="Sun" color="#4d4d4d" class="w-8 h-8 m-auto hover:" />
          </div>
        </a-menu>
      </a-layout-sider>
      <a-layout class="bg-white">
        <a-layout-header
          id="Layout-Header"
          class="bg-white dark:bg-neutral-800 h-10 items-center border-b border-gray-200"
        >
          <TrafficLight />
        </a-layout-header>
        <a-layout-content class="m-5">
          <div
            id="ContentView"
            class="drop-shadow-md bg-white p-5 min-h-fit rounded-md dark:bg-gray-600 border border-gray-100"
          >
            <Table />
          </div>
        </a-layout-content>
        <!-- <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer> -->
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import {
  SearchOutlined,
  FileTextOutlined,
  SettingOutlined,
  SolutionOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import Table from './components/Table.vue';
import avatar from './assets/imgs/useravatar.jpg';
import TrafficLight from './components/utils/TrafficLight.vue';

const selectedKeys = ref<string[]>(['4']);
const collapsed = ref<boolean>(false);
</script>

<style>
#MainView {
  width: 100vw;
  height: 100vh;
  text-align: center;
  /* background-color: #fff;
  border-radius: 20px;
  border: gray;
  border-width: 0.5px; */
}

#ContentView {
  height: calc(100vh - 80px);
}

#Layout-Header {
  -webkit-app-region: drag;
  padding-right: 15px;
  user-select: none;
}

.cls-1 {
  fill: url(#grad);
}
.cls-2 {
  fill: #4d4d4d;
}
.cls-3 {
  mask: url(#mask);
}
.cls-4 {
  fill: #040000;
  opacity: 0.5;
}

/* #Avatar {
  height: 100px;
  margin: 16px;
  background: rgba(81, 79, 79, 0.3);
} */

/* .site-layout .site-layout-background {
  background: #fff;
} */

/* [data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
} */

/* 设置菜单样式 */
.ant-menu,
.ant-menu-sub,
.ant-menu-inline {
  background-color: #f3f4f6 !important;
  font-size: 15px;
}

/* 图标居中 */
.ant-menu-title-content {
  display: flex !important;
  align-items: center !important;
}

/* 去掉右边框 */
.ant-menu-inline {
  border: none;
}

/* 选中菜单状态 */
.ant-menu-item-selected {
  background-color: #fafafa !important;
  color: #384151 !important;
}
/* 设置未选中菜单项鼠标滑过样式 */
.ant-menu-item-active {
  background-color: #fafafa !important;
  color: #384151 !important;
}
</style>
