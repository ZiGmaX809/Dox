<template>
  <el-button @click="tttt">test</el-button>
  <!-- <MsgBox ref="tee" /> -->
</template>

<script lang="ts" setup>
import { test } from '@/script/api/apiList';
const path = '/Users/zigma/Documents/裁定1';
const tttt = async () => {
  window.fs.access(path, window.fs.constants.W_OK, cb => {
    console.log('🚀 ~ file: Search.vue ~ line 11 ~ tttt ~ cb', cb ? '不存在' : '存在');
  });
};
</script>

<style lang="scss"></style>
