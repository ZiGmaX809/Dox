<template>
  <label :id="dialog_id" :for="props.for" :class="props.class">更换头像</label>
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
});

const dialog_id = 'dialog_' + Math.ceil(Math.random() * 10).toString();

const isDisabled = (bool: boolean) => {
  if (bool) {
    document.getElementById(dialog_id)!.removeAttribute('disabled');
  } else {
    document.getElementById(dialog_id)!.setAttribute('disabled', '');
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
