<template>
  <div class="dropdown">
    <label tabindex="0" class="btn btn-circle btn-ghost btn-xs m-1 text-base-content/70">
      <svg-icon :name="props.icon_name" class="w-4 h-4"></svg-icon>
    </label>
    <div
      tabindex="0"
      class="card compact dropdown-content shadow-xl bg-base-100 border border-base-300 rounded-box"
      :class="card_style"
    >
      <div class="card-body">
        <p class="text-base-content"><slot /></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
    type: Boolean,
  },
  icon_name: {
    type: String,
    default: 'question',
  },
  width: {
    type: String,
    default: '400px'
  },
  offset:{
    type: String,
    default: '0'
  }
});

const card_style = ref()

onMounted(() => {
  const css_w = `w-[${props.width}]`
  const css_off = ` -translate-x-${props.offset}`
  card_style.value = css_w + css_off;

})
</script>
