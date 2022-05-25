<template>
  <Dropdown v-model="theme" :itemList="theme_list"></Dropdown>
  <label class="btn btn-disabled" >test</label>
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
];
const theme = ref('light')
</script>
