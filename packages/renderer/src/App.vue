<template>
  <el-container style="height: 100%">
    <!-- 标题栏 -->
    <el-header style="text-align: center; font-size: 12px; user-select: none">
      <p>Documents Editor Lite</p>
      <!-- 红绿灯按钮开关 -->
      <div class="traffic-lights focus">
        <button
          class="traffic-light traffic-light-minimize"
          id="minimize"
          @click="minimize"
        >
          <svg
            width="7"
            height="2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="#000"
              stroke-width="1.2"
              stroke-linecap="round"
              d="M.61.703h5.8"
            />
          </svg>
        </button>
        <button
          class="traffic-light traffic-light-maximize"
          id="maximize"
          @click="maximize"
        >
          <svg
            width="8"
            height="7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="#000"
              stroke-width="1.2"
              stroke-linecap="round"
              d="M1.1 3.4h5.8M3.9 6.4V.6"
            />
          </svg>
        </button>
        <button
          class="traffic-light traffic-light-close"
          id="close"
          @click="close"
        >
          <svg
            width="7"
            height="7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="#000"
              stroke-width="1.2"
              stroke-linecap="round"
              d="M1.182 5.99L5.99 1.182M5.99 6.132L1.182 1.323"
            />
          </svg>
        </button>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="150px">
        <!-- 头像及名称 -->
        <div class="avatar">
          <div>
            <el-avatar
              id="avatar"
              :size="50"
              :src="avatar_url()"
              @click="drawer = true"
            ></el-avatar>
            <p class="login_text" @click="drawer = true">{{ username }}</p>
          </div>
        </div>
        <el-drawer v-model="drawer" :direction="'ltr'" :with-header="true">
          <loginpage @hideMethods="drawer = false" />
        </el-drawer>
        <el-menu
          router
          active-text-color="#3277f5"
          background-color="#f4f6f9"
          class="el-menu-vertical-demo"
          text-color="#000"
          default-active="/"
        >
          <el-menu-item index="/">
            <template #title>
              <el-icon><files /></el-icon>我的案件
            </template>
          </el-menu-item>
          <el-menu-item index="/Search">
            <template #title>
              <el-icon><search /></el-icon>案件查询
            </template>
          </el-menu-item>
          <el-menu-item index="/Template">
            <template #title>
              <el-icon><document /></el-icon>模板管理
            </template>
          </el-menu-item>
          <el-menu-item index="/Preferences">
            <template #title>
              <el-icon><setting /></el-icon>设置
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main v-if="isRouterAlive">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Ref, ref, nextTick, provide } from "vue";
import { Files, Search, Document, Setting } from "@element-plus/icons-vue";
import { getItem } from "./script/utils/storage";
import loginpage from "./views/Login.vue";
import "@/assets/css/global.scss";
import { useStore } from "vuex";
import { Modules } from "./store";
import ClipboardObserver from "./script/utils/clipboardmoni";
const store = useStore<Modules>();

const username = getItem("loginInfo")
  ? getItem("loginInfo").data.yhxm
  : "点击登录";

const isRouterAlive:Ref<boolean> = ref(true);
const drawer: Ref<boolean> = ref(false);
let fullscreen = false;

const maximize = () => {
  fullscreen = !fullscreen;
  window.ipcRenderer.send("Max");
};
const minimize = () => {
  window.ipcRenderer.send("Min");
};
const close = () => {
  window.ipcRenderer.send("Close");
};

const PreloadFiles = () => {
  //预载预设文本
  store.dispatch("editorModule/Set_presetText");
};

const avatar_url = () => {
  if (store.state.settingModule.setting.custom_avatar_bool) {
    return new URL("/images/useravatar.png", import.meta.url).href;
  } else {
    const babg_avatar_url = getItem("avatar_url");
    if (!babg_avatar_url) {
      return new URL("/images/fail.png", import.meta.url).href;
    } else {
      return babg_avatar_url;
    }
  }
};

//实体化剪贴板监听
const clipboardObserver = new ClipboardObserver({
  duration: 500,
  textChange: (text: string, beforeText: string) => {
    //  处理文本变化的逻辑

    //限制监听文本长度
    const t_l = store.state.settingModule.setting.clipboard_textlength;
    if (text.length <= t_l) {
      store.dispatch("clipboardModule/add_cache", text);
    }
  },
});

//开启程序，监听剪贴板
const Listen_Clipboard = () => {
  clipboardObserver.stop();
  if (store.state.settingModule.setting.clipboard_bool) {
    clipboardObserver.start();
    store.commit("clipboardModule/switch_listen");
  }
};

PreloadFiles();
Listen_Clipboard();

provide("reload", {
  reload: () => {
    isRouterAlive.value = false;
    nextTick(() => {
      isRouterAlive.value = true;
    });
  },
});
provide("drawer", drawer);
provide("listen_clip", {
  listen_clip: (value: boolean) => {
    if (!value) {
      clipboardObserver.stop();
    } else {
      clipboardObserver.start();
    }
  },
});
</script>

<style lang="scss">
$close-red: #ff6159;
$close-red-active: #bf4942;
$close-red-icon: #740000bf;
$close-red-icon-active: #190000;

$minimize-yellow: #ffbd2e;
$minimize-yellow-active: #bf8e22;
$minimize-yellow-icon: #995700;
$minimize-yellow-icon-active: #592800;

$maximize-green: #28c941;
$maximize-green-active: #1d9730;
$maximize-green-icon: #006500;
$maximize-green-icon-active: #003200;

$disabled-gray: #ddd;

$headerbgcolor: #409eff;
$asidebgcolor: #f4f6f9;

.el-menu {
  border-right: solid 0px var(--el-menu-border-color) !important;
  --el-menu-hover-bg-color: var(--el-color-primary-light-8) !important;
}

.el-header {
  background-color: $headerbgcolor;
  color: white;
  height: 40px !important;
  -webkit-app-region: drag;
}

.el-aside {
  background-color: $asidebgcolor;
  color: var(--el-text-color-primary);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.el-main {
  position: relative;
}

.el-avatar {
  //鼠标金手指样式
  cursor: pointer;
}

.avatar {
  display: flex;
  width: 100%;
  height: 180px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login_text {
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
  line-height: 0px;
}

.traffic-lights {
  position: absolute;
  top: 6px;
  right: 10px;

  &.focus,
  &:hover,
  &:active {
    > .traffic-light-close {
      background-color: $close-red;

      &:active:hover {
        background-color: $close-red-active;
      }
    }
    > .traffic-light-minimize {
      background-color: $minimize-yellow;

      &:active:hover {
        background-color: $minimize-yellow-active;
      }
    }
    > .traffic-light-maximize {
      background-color: $maximize-green;

      &:active:hover {
        background-color: $maximize-green-active;
      }
    }
  }

  &:hover,
  &:active {
    > .traffic-light {
      &:before,
      &:after,
      svg {
        visibility: visible;
      }
    }
  }
}

.traffic-light {
  border-radius: 100%;
  padding: 0;
  height: 12px;
  width: 12px;
  border: 0.8px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-top: 8px;
  margin-right: 10px;
  background-color: $disabled-gray;
  position: relative;
  outline: none;

  > svg {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    visibility: hidden;
  }

  &-close {
    svg path {
      stroke: $close-red-icon;
    }

    &:active:hover svg path {
      stroke: $close-red-icon-active;
    }
  }

  &-minimize {
    svg {
      transform: translate(-50%, -30%);
      > path {
        stroke: $close-red-icon;
      }
    }

    &:active:hover svg path {
      stroke: $close-red-icon-active;
    }
  }

  &-maximize {
    svg path {
      stroke: $maximize-green-icon;
    }
    &:active:hover svg path {
      stroke: $maximize-green-icon-active;
    }
  }
}

html,
body,
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
  overflow: hidden;
}

img {
  -webkit-user-drag: none;
}

/* body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
} */
</style>
