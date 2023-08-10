<template>
  <svg :class="svgClass" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  }
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  // console.log(props.name, 'props.name');
  if (props.name) {
    return `svg-icon icon-${props.name}`;
  }
  return 'svg-icon';
});
</script>
