<template>
  <div class="divider before:!h-[1px] after:!h-[1px] select-none" :class="custom_class" />
</template>

<script setup lang="ts">
defineProps({
  custom_class: {
    type: String,
  },
});
</script>
