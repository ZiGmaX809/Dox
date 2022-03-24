<template></template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { ElMessageBox } from 'element-plus';

const { appContext } = getCurrentInstance()!;

const isFileExisted = (filepath: string) => {
  // ElMessageBox.alert('Hello world!', 'Title', {}, appContext);
  ElMessageBox.alert('Hello world!', 'Title', {}, appContext).then(res=>{
    console.log(res)
  });
  return "ajkshjkah"
};

defineExpose({
  isFileExisted,
});
</script>
