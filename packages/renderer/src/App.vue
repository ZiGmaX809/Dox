<template>
  <div id="MainView">
    <a-layout style="min-height: 100vh">
      <a-layout-sider class="bg-custom_bg border-r border-r-gray-200 h-screen">
        <div class="w-full mt-6 mb-6 flex justify-center select-none items-baseline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 385.29 392.3"
            class="w-12 h-12"
          >
            <defs>
              <linearGradient
                id="grad"
                x1="198.56"
                y1="342.02"
                x2="116.45"
                y2="164.61"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.1" />
                <stop offset="0.84" stop-color="#fff" />
              </linearGradient>
              <mask
                id="mask"
                x="0"
                y="95.5"
                width="195.49"
                height="199.5"
                maskUnits="userSpaceOnUse"
              >
                <g transform="translate(-112.2 -71.63)">
                  <polygon
                    class="cls-1"
                    points="307.69 366.63 112.2 366.63 112.2 167.13 202.21 167.13 307.69 366.63"
                  />
                </g>
              </mask>
            </defs>
            <path
              class="cls-2"
              d="M304.43,71.63H176.72a64.51,64.51,0,0,0-64.51,64.51V399.42a64.51,64.51,0,0,0,64.51,64.51H307.88C412.6,463.93,497.5,379,497.5,274.31v-9.62C497.5,158.06,411.06,71.63,304.43,71.63Zm96,197.51c0,48.17-39.22,97.49-92.7,97.49L202.21,167.13h96.85c56,0,101.34,45.67,101.34,102Z"
              transform="translate(-112.2 -71.63)"
            />
            <g class="cls-3">
              <polygon class="cls-4" points="195.49 295 0 295 0 95.5 90.01 95.5 195.49 295" />
            </g>
            <path
              class="cls-2"
              d="M303.14,71.63H176.5a64.29,64.29,0,0,0-64.29,65.2h0V238.06q24.86-60.27,90-70.93H303.92Z"
              transform="translate(-112.2 -71.63)"
            />
          </svg>
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
          <p class="text-xs text-gray-600">Alibaba Group Lte.</p>
          <p class="text-xs text-gray-600">Taobao</p>
          <b class="text-base">ZiGma</b>
        </span>
        <div class="flex h-1px bg-gray-200 m-4 select-none" />
        <a-menu v-model:selectedKeys="selectedKeys">
          <a-menu-item
            key="1"
            class="flex rounded-lg ml-2 mr-2 select-none drop-shadow-md justify-center"
          >
            <inbox-outlined class="!text-lg" />
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

          <div class="w-full absolute bottom-0 mb-10">
            <svg-icon name="sun"  class="w-12 h-12"/>
            <!-- <svg
              t="1648803007225"
              class="w-7 h-7 fill-neutral-700 m-auto"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3858"
              width="200"
              height="200"
            >
              <path
                d="M520.021333 208.284444c-165.987556 0-301.041778 135.04-301.041777 301.027556 0 165.987556 135.04 301.027556 301.041777 301.027556 166.001778 0 301.056-135.025778 301.056-301.027556 0-165.987556-135.054222-301.027556-301.056-301.027556z m0 545.194667c-134.613333 0-244.152889-109.525333-244.152889-244.152889 0-134.627556 109.525333-244.138667 244.152889-244.138666 134.641778 0 244.167111 109.511111 244.167111 244.138666 0 134.641778-109.525333 244.152889-244.167111 244.152889z"
                fill=""
                p-id="3859"
              ></path>
              <path
                d="M493.027556 317.240889a164.949333 164.949333 0 0 0-141.212445 80.426667 14.250667 14.250667 0 0 0 24.476445 14.535111 136.32 136.32 0 0 1 116.736-66.517334 14.222222 14.222222 0 1 0 0-28.444444zM350.307556 433.265778a14.307556 14.307556 0 0 0-17.095112 10.595555c-2.773333 11.747556-4.323556 19.015111-4.323555 32.284445a14.222222 14.222222 0 1 0 28.444444 0c0-10.183111 1.095111-15.260444 3.569778-25.784889a14.222222 14.222222 0 0 0-10.595555-17.095111zM531.484444 846.222222a28.444444 28.444444 0 0 0-28.444444 28.444445v85.333333a28.444444 28.444444 0 0 0 56.888889 0v-85.333333a28.444444 28.444444 0 0 0-28.444445-28.444445zM531.484444 177.777778a28.444444 28.444444 0 0 0 28.444445-28.444445v-85.333333a28.444444 28.444444 0 0 0-56.888889 0v85.333333a28.444444 28.444444 0 0 0 28.444444 28.444445zM242.56 745.642667l-60.330667 60.330666a28.444444 28.444444 0 1 0 40.220445 40.220445l60.330666-60.330667a28.444444 28.444444 0 1 0-40.220444-40.220444zM775.552 281.315556c7.281778 0 14.549333-2.773333 20.110222-8.334223l60.330667-60.330666a28.444444 28.444444 0 1 0-40.220445-40.220445l-60.330666 60.330667a28.444444 28.444444 0 0 0 20.110222 48.554667zM242.56 272.981333c5.560889 5.560889 12.828444 8.334222 20.110222 8.334223a28.444444 28.444444 0 0 0 20.110222-48.554667l-60.330666-60.330667a28.444444 28.444444 0 1 0-40.220445 40.220445l60.330667 60.330666zM795.662222 745.642667a28.444444 28.444444 0 1 0-40.220444 40.220444l60.330666 60.359111c5.560889 5.560889 12.828444 8.334222 20.110223 8.334222s14.549333-2.773333 20.110222-8.334222c11.093333-11.107556 11.093333-29.112889 0-40.220444l-60.330667-60.359111zM149.333333 490.666667h-85.333333a28.444444 28.444444 0 0 0 0 56.888889h85.333333a28.444444 28.444444 0 0 0 0-56.888889zM960 490.666667h-85.333333a28.444444 28.444444 0 0 0 0 56.888889h85.333333a28.444444 28.444444 0 0 0 0-56.888889z"
                fill=""
                p-id="3860"
              ></path>
            </svg> -->
            <!-- <img :src="sun" /> -->
            <!-- <img :src="moon" /> -->
          </div>
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
  InboxOutlined,
  SearchOutlined,
  FileTextOutlined,
  SettingOutlined,
  AntDesignOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import Table from './components/Table.vue';
import svg from './assets/svgs/Logo.svg';
import avatar from './assets/imgs/useravatar.jpg';
// import sun from './assets/svgs/Sun.svg';
import moon from './assets/svgs/Moon.svg';

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
  border: gray;
  border-width: 0.5px;
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
