<template>
  <input
    class="toggle"
    ref="_switch"
    type="checkbox"
    :checked="checked"
    @change="handleInput"
    :class="custom_class"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
    type: Boolean,
  },
  size: {
    type: String,
    default: 'middle',
  },
});
const emits = defineEmits(['update:modelValue']);

//获取input元素
const _switch = ref();
//判断当前组件是否是打开状态
const checked = ref();
const custom_class = ref();

//input事件 获取当前input事件
const handleInput = () => {
  nextTick(() => {
    const val = _switch.value.checked;
    emits('update:modelValue', val); // 开关点击后的状态传给v-model
  });
};

interface size {
  [key: string]: string;
}

const size_json: size = {
  small: 'toggle-sm',
  tiny: 'toggle-xs',
  middle: 'toggle-md',
  large: 'toggle-lg',
};

onMounted(() => {
  checked.value = props.modelValue;
  custom_class.value = size_json[props.size];
});
</script>
