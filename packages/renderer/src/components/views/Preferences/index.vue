<template>
  <div id="PreferMainView" class="w-full h-full">
    <el-scrollbar>
      <div id="PreferContentView" class="flex flex-col w-3/5 h-auto m-auto select-none">
        <Customzie />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Customzie from './Modules/Customize.vue';
</script>
