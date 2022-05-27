<template>
  <div class="dropdown" :class="direction_list[direction]">
    <label tabindex="0" class="btn btn-circle btn-ghost btn-xs m-1 text-base-content/70" @click="show = !show">
      <svg-icon :name="props.iconName" :class="iconSize"></svg-icon>
    </label>
    <div
      tabindex="0"
      class="card compact dropdown-content drop-shadow-xl bg-base-100 border border-base-300 rounded-box"
      :class="card_style"
      v-if="show"
    >
      <div class="card-body">
        <slot />
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
  iconName: {
    type: String,
    default: 'question',
  },
  z_class: {
    type: String,
    default: 'w-96',
  },
  iconSize:{
    type: String,
    default: 'w-4 h-4',
  },
  direction: {
    type: String,
    default: 'bottom',
  },
});

const card_style = ref();
const show = ref(false);

const direction_list: {
  [key: string]: string;
} = {
  bottom: '',
  top: 'dropdown-top ',
  left: 'dropdown-left ',
  right: 'dropdown-right',
  'bottom-end': 'dropdown-end',
  'top-end': 'dropdown-top dropdown-end',
  'left-end': 'dropdown-left dropdown-end',
  'right-end': 'dropdown-right dropdown-end',
};

onMounted(() => {
  card_style.value = props.z_class;
});
</script>
