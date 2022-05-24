<template>
  <div class="dropdown">
    <label tabindex="0" class="btn btn-circle btn-ghost btn-xs m-1 text-base-content/70">
      <svg-icon :name="props.icon_name" class="w-4 h-4"></svg-icon>
    </label>
    <div
      tabindex="0"
      class="card compact dropdown-content drop-shadow-xl bg-base-100 border border-base-300 rounded-box"
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
  z_class: {
    type: String,
    default:'w-96'
  }
});

const card_style = ref()

onMounted(() => {
  card_style.value = props.z_class;
})
</script>
