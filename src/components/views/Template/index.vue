<template>
  <div class="flex flex-wrap">
    <button class="btn" @click="test1">success</button>
    <button class="btn" @click="test2">2</button>
    <button class="btn" @click="test3">3</button>
    <button class="btn" @click="test4">4</button>
  </div>
</template>

<script setup lang="ts">
import Msg from '/scripts/utils/message';
const test1 = () => {
  Msg('登录sdrfsdf失asasda败', 'success');
};
const test2 = () => {
  Msg('登录sdrfsdf失asasda败', 'info');
};
const test3 = () => {
  Msg('登录sdrfsdf失asasda败', 'error');
};
const test4 = () => {
  Msg('登录sdrfsdf失asasda败', 'warning');
};
</script>

<style></style>
