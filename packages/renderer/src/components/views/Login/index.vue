<template>
  <div
    class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
    style="-webkit-user-drag: none"
  >
    <img
      src="https://play.tailwindcss.com/img/beams.jpg"
      class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 blur"
      width="1308"
    />
    <div
      class="absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <div
      id="LoginWindow"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl ring-1 ring-gray-900/5 w-96 h-96 rounded-md"
    >
      <div class="mx-auto max-w-md w-full text-center space-y-6 py-8">
        <b class="text-2xl text-gray-600">Sign in to your account</b>
      </div>
      <div class="space-y-3">
        <p class="flex flex-1 w-4/5 m-auto">用户名</p>
        <a-input v-model:value="account" class="flex flex-1 w-4/5 m-auto rounded-md" />
        <p class="flex flex-1 w-4/5 m-auto">密码</p>
        <a-input-password v-model:value="password" class="flex flex-1 w-4/5 m-auto rounded-md" />
        <a-button class="flex flex-1 w-4/5 m-auto rounded-md justify-center bg-sky-500 text-white" >登陆</a-button>
        <a-button
          @click="Close_Login_View"
          class="flex flex-1 w-4/5 m-auto rounded-md justify-center"
        >
          取消
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const account = ref<string>('');
const password = ref<string>('');

const emit = defineEmits(['CloseLoginView']);
const Close_Login_View = () => {
  emit('CloseLoginView');
};
</script>
