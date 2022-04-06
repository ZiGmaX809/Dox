<template>
  <div
    class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12 select-none"
    style="-webkit-user-drag: none"
  >
    <img
      :src="basms"
      class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 blur"
      width="1308"
    />
    <div
      class="absolute inset-0 bg-login-grid bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <div
      id="LoginWindow"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl ring-1 ring-gray-900/5 w-96 h-96 rounded-md"
    >
      <div class="mx-auto max-w-md w-full text-center space-y-6 py-8">
        <b class="text-2xl text-gray-600">Sign in to your account</b>
      </div>
      <div class="space-y-2">
        <p class="flex flex-1 w-4/5 m-auto text-sm">用户名</p>
        <el-input v-model="account" clearable class="!w-4/5 mx-10 rounded-md" />
        <p class="flex flex-1 w-4/5 m-auto text-sm">密码</p>
        <el-input v-model="password" show-password class="!w-4/5 mx-10 rounded-md" />
        <div class="w-full flex">
          <el-checkbox v-model="remember_me" class="flex flex-1 !w-4/5 mx-10 text-gray-700">
            记住用户名和密码
          </el-checkbox>
        </div>
        <div class="w-full flex flex-col space-y-2">
          <el-button
            type="primary"
            class="!w-4/5 mx-10 rounded-md justify-center bg-sky-500 text-white"
          >
            登陆
          </el-button>
          <el-button @click="Close_Login_View" class="!w-4/5 !mx-10 rounded-md justify-center">
            取消
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import basms from '@/assets/imgs/beams.jpeg';

const account = ref<string>('');
const password = ref<string>('');
const remember_me = ref(false);

const emit = defineEmits(['CloseLoginView']);
const Close_Login_View = () => {
  emit('CloseLoginView');
};
</script>
