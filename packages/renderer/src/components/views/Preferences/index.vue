<template>
  <div id="PreferMainView" class="w-full h-full">
    <el-scrollbar>
      <div id="PreferContentView" class="flex flex-col w-3/5 h-auto m-auto select-none">
        <Customzie />
        <Edit />
        <QuickInput />

        <p class="font-barlow mt-10 text-center" >MADE BY ZiGma</p>
        <p  class="font-barlow text-sm text-center">v0.0.3 Alpha</p>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Customzie from './Modules/Customize.vue';
import Edit from './Modules/Edit.vue'
import QuickInput from './Modules/QuickInput.vue';
</script>
