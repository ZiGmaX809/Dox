import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '/views/index.vue';
import Search from '/views/Search/index.vue';
import Template from '/views/Template/index.vue';
import Casezone from '/views/CaseZone/index.vue';
import Preferences from '/views/Preferences/index.vue';
import { STORE_Editor } from '/store/modules/editor';

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/Casezone',
      name: 'Casezone',
      component: Casezone,
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/Template',
      name: 'Template',
      component: Template,
    },
    {
      path: '/Preferences',
      name: 'Preferences',
      component: Preferences,
    },
  ],
});

//路由守卫，对比编辑器和暂存文本并提示
// Router.beforeEach((to, from, next) => {
//   if (from.name === 'Casezone' && STORE_Editor().editor_isChanged) {
//     ElMessageBox.confirm('离开此页面将会导致未保存内容丢失，确认离开？', '警告', {
//       distinguishCancelAndClose: true,
//       closeOnClickModal: false,
//       closeOnPressEscape: false,
//       closeOnHashChange: false,
//       showClose: false,
//       confirmButtonText: '确认',
//       cancelButtonText: '取消',
//       type: 'warning',
//       buttonSize: 'small',
//     })
//       .then(() => {
//         STORE_Editor().Reset_editor_isChanged();
//         next();
//       })
//       .catch(() => {
//         return false;
//       });
//   } else {
//     next();
//   }
// });

export default Router;
