import { createRouter, createWebHashHistory } from "vue-router";
import Casezone from "@/views/CaseZone/Casezone.vue";
import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";
import Preferences from '@/views/Preferences.vue'

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

export default Router;
