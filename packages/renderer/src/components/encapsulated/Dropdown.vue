<template>
  <div class="dropdown dropdown-end">
    <label
      ref="_dropdown"
      tabindex="0"
      class="btn gap-2 m-1 btn-sm bg-base-100 btn-ghost text-base-content"
    >
      {{ modelValue }}
      <svg-icon name="down" class="w-4 h-4" />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow-lg bg-base-100 border border-base-300 rounded-md w-auto max-h-80 "
      :class="scroll_class"
    >
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
    type: String,
  },
  isScroll: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'normal',
  },
  disabled: {
    type: Boolean,
    default: true,
  },
});

const scroll_class = ref();

const _dropdown = ref();

const isDisabled = (bool: boolean) => {
  if (bool) {
    _dropdown.value.removeAttribute('disabled');
  } else {
    _dropdown.value.setAttribute('disabled', '');
  }
};

watch(
  () => props.disabled,
  n => {
    isDisabled(n);
  }
);

onMounted(() => {
  isDisabled(props.disabled);
  const size_ = props.size == 'small' ? 'menu-compact' : '';
  if (props.isScroll) {
    scroll_class.value = `scrollbar-thin scrollbar-thumb-rounded hover:scrollbar-thumb-base-300 ${size_}`;
  }
});
</script>
