<template>
  <el-button @click="tttt">test</el-button>
  <MsgBox ref="tee" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MsgBox from '/components/MsgBox.vue';

const tee = ref();

const tttt = () => {
  const ss = tee.value.isFileExisted('ss');
  console.log(ss);
};
</script>

<style lang="scss"></style>
