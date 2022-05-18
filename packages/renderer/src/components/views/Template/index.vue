<template>
  <div class="flex flex-wrap">
    <button class="btn" @click="test1">success</button>
    <button class="btn" @click="test2">2</button>
    <button class="btn" @click="test3">3</button>
    <button class="btn" @click="test4">4</button>
  </div>
</template>

<script setup lang="ts">
import Message from '/scripts/utils/message';
const test1 = () => {
  Message('登录sdrfsdf失asasda败', 'success', 3000);
};
const test2 = () => {
  Message('登录sdrfsdf失asasda败', 'info', 3000);
};
const test3 = () => {
  Message('登录sdrfsdf失asasda败', 'error', 3000);
};
const test4 = () => {
  Message('登录sdrfsdf失asasda败', 'warning', 3000);
};
</script>

<style></style>
