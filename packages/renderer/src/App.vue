<template>
  <div id="MainView">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="1">
            <pie-chart-outlined />
            <span>Option 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <desktop-outlined />
            <span>Option 2</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                <span>User</span>
              </span>
            </template>
            <a-menu-item key="3">Tom</a-menu-item>
            <a-menu-item key="4">Bill</a-menu-item>
            <a-menu-item key="5">Alex</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <team-outlined />
                <span>Team</span>
              </span>
            </template>
            <a-menu-item key="6">Team 1</a-menu-item>
            <a-menu-item key="8">Team 2</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="9">
            <file-outlined />
            <span>File</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header
          id="Layout-Header"
          class="bg-white h-10 flex flex-row-reverse items-center"
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
              class="opacity-0 hover:opacity-100"
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
              class="opacity-0 hover:opacity-100"
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
              class="opacity-0 hover:opacity-100"
            >
              <path stroke="#995700" stroke-width="1.2" stroke-linecap="round" d="m3.1,6l5.8,0" />
            </svg>
          </button>
        </a-layout-header>
        <a-layout-content class="m-10">
          <div id="ContentView" class="drop-shadow-md p-5 bg-white min-h-fit rounded-md">
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
  height: calc(100vh - 150px);
}

#Layout-Header {
  -webkit-app-region: drag;
  padding-right: 15px;
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
</style>
