<template>
  <el-button @click="tttt">test</el-button>
  <!-- <MsgBox ref="tee" /> -->
</template>

<script lang="ts" setup>
import { Msg } from '@/script/utils/message';
import { isFileExisted_And_Export } from '/utils/handlefiles';
const path = '/Users/zigma/Documents/裁定/';
const tttt = async () => {
  const result: string[] | undefined = await isFileExisted_And_Export('123', path, 'test2.txt');
  if (result) {
    Msg('导出' + result[1], result[0]);
  }
};
</script>

<style lang="scss">
</style>
