<template>
  <div id="scrollbarHoverView" class="group w-full h-full">
    <div
      id="PreferMainView"
      class="w-full h-full scrollbar-thin group-hover:scrollbar-thumb-base-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
    >
      <div
        id="PreferContentView"
        class="flex flex-col w-3/5 h-[calc(100vh_-_80px)] m-auto select-none"
      >
        <Customzie />
        <Edit />
        <Export />
        <QuickInput />
        <Advanced />
        <Others />

        <p class="font-barlow mt-20 text-center">MADE BY ZiGma</p>
        <p class="font-barlow text-sm text-center">v0.0.3 Alpha</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const test1 = defineAsyncComponent(() => import('./Modules/QuickInput.vue'))
// const test2 = defineAsyncComponent(() => import('./Modules/Advanced.vue'))
// const test3 = defineAsyncComponent(() => import('./Modules/Others.vue'))
</script>
