<template>
  <div id="MainView">
    <a-layout style="min-height: 100vh">
      <a-layout-sider style="background-color: #f3f4f6" class="border-r border-r-gray-200">
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys">
          <a-menu-item key="1" class="flex rounded-lg ml-2 mr-2">
            <pie-chart-outlined />
            <span class="!ml-5">我的案件</span>
          </a-menu-item>
          <a-menu-item key="2" class="flex rounded-lg ml-2 mr-2">
            <desktop-outlined />
            <span class="!ml-5">案件查询</span>
          </a-menu-item>
          <a-menu-item key="3" class="flex rounded-lg ml-2 mr-2">
            <user-outlined />
            <span class="!ml-5">模版管理</span>
          </a-menu-item>
          <a-menu-item key="4" class="flex rounded-lg ml-2 mr-2">
            <team-outlined />
            <span class="!ml-5">设置</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout class="bg-white">
        <a-layout-header
          id="Layout-Header"
          class="bg-white dark:bg-neutral-800 h-10 items-center border-b border-gray-200"
        >
          <div
            id="traffic_light"
            class="group absolute top-5 right-4 -translate-y-1/2 flex flex-row-reverse w-3 h-3 rounded-xl items-center"
          >
            <button
              class="w-3 h-3 bg-traffic_close ring-0.5 ring-inset ring-opacity-80 ring-traffic_close_ring rounded-full mr-0 active:bg-red-600"
              style="-webkit-app-region: no-drag"
              @click="close"
            >
              <svg
                width="12"
                height="12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="opacity-0 group-hover:opacity-100"
              >
                <path
                  stroke="#740000bf"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  d="m3.596,8.333l4.808,-4.808m0,4.95l-4.808,-4.809"
                />
              </svg>
            </button>
            <button
              class="w-3 h-3 bg-traffic_max ring-0.5 ring-inset ring-opacity-80 ring-traffic_max_ring rounded-full mr-2 active:bg-green-600"
              style="-webkit-app-region: no-drag"
              @click="maximize"
            >
              <svg
                width="12"
                height="12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="opacity-0 group-hover:opacity-100"
              >
                <path
                  stroke="#006500"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  d="m3.1,5.9l5.8,0m-3,3l0,-5.8"
                />
              </svg>
            </button>
            <button
              class="w-3 h-3 bg-traffic_min ring-0.5 ring-inset ring-opacity-80 ring-traffic_min_ring rounded-full mr-2 active:bg-yellow-600"
              style="-webkit-app-region: no-drag"
              @click="minimize"
            >
              <svg
                width="12"
                height="12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="opacity-0 group-hover:opacity-100"
              >
                <path stroke="#995700" stroke-width="1.2" stroke-linecap="round" d="m3.1,6l5.8,0" />
              </svg>
            </button>
          </div>
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
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import Table from './components/Table.vue';

let fullscreen = false;

const maximize = () => {
  fullscreen = !fullscreen;
  window.ipcRenderer.send('Max');
};
const minimize = () => {
  window.ipcRenderer.send('Min');
};
const close = () => {
  window.ipcRenderer.send('Close');
};

const selectedKeys = ref<string[]>(['4']);
const collapsed = ref<boolean>(false);
</script>

<style>
/* body {
  background-color: rgba(0, 0, 0, 0);
} */
#MainView {
  width: 100vw;
  height: 100vh;
  text-align: center;
  background-color: #fff;
  border-radius: 20px;
}

#ContentView {
  height: calc(100vh - 90px);
}

#Layout-Header {
  -webkit-app-region: drag;
  padding-right: 15px;
  user-select: none;
}

.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.ant-menu-title-content {
  display: flex !important;
  align-items: center !important;
}

/* 设置菜单样式 */
.ant-menu,
.ant-menu-sub,
.ant-menu-inline {
  background-color: #f3f4f6 !important;
  font-size: 15px;
}

/* 去掉右边框 */
.ant-menu-inline {
  border: none;
}

/* 选中菜单状态 */
.ant-menu-item-selected {
  background-color: #e5e7eb !important;
  color: #384151 !important;
}
/* 设置未选中菜单项鼠标滑过样式 */
.ant-menu-item-active {
  background-color: #e5e7eb !important;
  color: #384151 !important;
}
</style>
