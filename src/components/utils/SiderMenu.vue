<template>
  <ul id="Sidebar" class="menu menu-compact w-full p-2" v-for="(item, index) in data" :key="index">
    <li class="h-8">
      <a
        :href="`#` + item[2]"
        class="justify-center ease-in-out duration-300"
        :class="[currentIndex === index ? 'active' : '']"
        @click="handleClick(index)"
        style="-webkit-user-drag: none"
      >
        <svg-icon :name="item[1]" class="w-6 h-6" />
        <span class="w-16 text-[15px]">{{ item[0] }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
//显示名称，图标，路由路径
const data = [
  ['我的案件', 'store', ''],
  ['案件查询', 'search', 'Search'],
  ['模板管理', 'template', 'Template'],
  ['设置', 'set', 'Preferences'],
];

const currentIndex = ref(0);

const handleClick = (index: number) => {
  currentIndex.value = index;
};
</script>
