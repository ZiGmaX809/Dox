<template>
  <div id="PreferMainView" class="w-full h-full">
    <el-scrollbar>
      <div id="PreferContentView" class="flex flex-col w-3/5 m-auto select-none">
        <Customzie />
        <Edit />
        <Export />
        <!-- <QuickInput /> -->
        <!-- <Advanced /> -->
        <!-- <Others /> -->
        <test1 />
        <test2 />
        <test3 />
        <p class="font-barlow mt-10 text-center">MADE BY ZiGma</p>
        <p class="font-barlow text-sm text-center">v0.0.3 Alpha</p>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
const test1 = defineAsyncComponent(() => import('./Modules/QuickInput.vue'))
const test2 = defineAsyncComponent(() => import('./Modules/Advanced.vue'))
const test3 = defineAsyncComponent(() => import('./Modules/Others.vue'))
</script>
