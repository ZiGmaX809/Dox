<template>
  <input
    class="toggle"
    ref="input"
    type="checkbox"
    :checked="checked"
    @change="handleInput"
    :true-value="trueValue"
    :false-value="falseValue"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
    type: [Number, String, Boolean],
  },
  trueValue: {
    //switch 打开时的值 可以自定义组件打开的时的值
    type: [Number, String, Boolean],
    default: true,
  },
  falseValue: {
    //    switch 关闭时的值  可以自定义组件关闭的时的值
    type: [Number, String, Boolean],
    default: true,
  },
  size: {
    type:String,
    default: 'small'
  }
});
const emits = defineEmits(['update:modelValue', 'change']);

//获取input元素
const input = ref();
//判断当前组件是否是打开状态
const checked = computed(() => {
  //因为可以自定义打开和关闭的值 所以这里必须判断 v-model绑定的值 === 组件自定义打开的值
  return props.modelValue === props.trueValue;
});

//input事件 获取当前input事件
const handleInput = () => {
  nextTick(() => {
    const val = input.value.checked;
    emits('update:modelValue', val); // 开关点击后的状态传给v-model
    emits('change', val); //给组件增加change 事件
  });
};
</script>
