<template>
  <div class="flex flex-wrap">
    <button class="m-2 p-2 rounded bg-primary text-primary-content" v-for="item in theme_list" @click="theme(item)">
      {{ item }}
    </button>
  </div>
</template>

<script setup lang="ts">
const theme_list: string[] = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];

const theme: (val: string) => void = inject('theme')!;
</script>

<style></style>
