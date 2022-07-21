<template>
  <label ref="_dialog" :for="props.for" :class="props.class">{{ props.label }}</label>
  <input type="checkbox" :id="props.for" class="modal-toggle" />
  <div class="modal">
    <div :class="props.slot_class">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
    type: Boolean,
    default: true,
  },
  for: {
    type: String,
  },
  class: {
    type: String,
  },
  slot_class: {
    type: String,
  },
  label: {
    type: String,
  }
});

const _dialog = ref()

const isDisabled = (bool: boolean) => {
  if (bool) {
    _dialog.value.removeAttribute('disabled');
  } else {
    _dialog.value.setAttribute('disabled', '');
  }
};

watch(
  () => props.modelValue,
  n => {
    isDisabled(n);
  }
);

onMounted(() => {
  isDisabled(props.modelValue);
});
</script>
