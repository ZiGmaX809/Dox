import { createRouter, createWebHashHistory } from "vue-router";
import Casezone from "@/views/CaseZone/Casezone.vue";
import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";
import Preferences from '@/views/Preferences.vue'
import { ElMessageBox } from "element-plus";
import { STORE_Editor } from "../store/modules/editor";

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/Casezone",
      name: "Casezone",
      component: Casezone,
    },
    {
      path: "/Search",
      name: "Search",
      component: Search,
    },
    {
      path: "/Preferences",
      name: "Preferences",
      component: Preferences,
    },
  ],
});

//路由守卫，对比编辑器和暂存文本并提示
Router.beforeEach((to, from, next) => {
  if (from.name === "Casezone" && STORE_Editor().editor_isChanged) {
    ElMessageBox.confirm(
      "离开此页面将会导致未保存内容丢失，确认离开？",
      "警告",
      {
        distinguishCancelAndClose: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        showClose: false,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(() => {
        STORE_Editor().Reset_editor_isChanged();
        next();
      })
      .catch(() => {
        return false;
      });
  } else {
    next();
  }
});

export default Router;
