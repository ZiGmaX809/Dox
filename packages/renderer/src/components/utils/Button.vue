<template>
  <label :id="props.id" :for="props.for" :class="props.class">更换头像</label>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
    type: Boolean,
  },
  id: {
    type: String,
  },
  for: {
    type: String,
  },
  class: {
    type: String,
  },
});

watch(
  () => props.modelValue,
  n => {
    if (n) {
      document.getElementById(props.id!)!.classList.remove('btn-disabled');
    } else {
      document.getElementById(props.id!)!.classList.add('btn-disabled');
    }
    // custom_avatar_btn.value = n ? '' : 'btn-disabled';
  }
);
</script>
