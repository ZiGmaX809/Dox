<template>
  <div
    class="w-96 h-52 shadow-xl image-full overflow-hidden rounded-lg border border-solid border-gray-200"
  >
    <img
      class="h-full w-auto overflow-auto"
      src="https://upload.wikimedia.org/wikipedia/zh/thumb/1/18/Fantastic_Beasts_-_The_Secrets_of_Dumbledore_Poster.jpg/220px-Fantastic_Beasts_-_The_Secrets_of_Dumbledore_Poster.jpg"
    />
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
