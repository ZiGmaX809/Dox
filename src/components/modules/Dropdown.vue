<template>
  <div class="dropdown" :class="dropdown_direction_class">
    <label
      ref="disabled_dropdown"
      tabindex="0"
      class="btn gap-2 m-1 bg-base-100 btn-ghost text-base-content"
      :class="btn_size_class"
    >
      {{ modelValue }}
      <svg-icon name="down" class="w-4 h-4" />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow-lg bg-base-100 border border-base-300 rounded-md w-auto max-h-80 flex-nowrap z-50 overflow-auto"
      :class="list_class"
    >
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
/**
 * 列表框组件
 * 可自定义 按钮大小、列表大小、列表方向
 * 按钮大小：tiny、small、normal、large
 * 列表大小：small、normal
 * 列表方向：top、left、righgt、bottom-end、top-end、left-end、right-end
 */
const props = defineProps({
  modelValue: {
    //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
    type: String,
  },
  isScroll: {
    type: Boolean,
    default: true,
  },
  btnSize: {
    type: String,
    default: 'normal',
  },
  listSize: {
    type: String,
    default: 'normal',
  },
  disabled: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String,
    default: 'bottom-end',
  },
});

const list_class = ref();
const btn_size_class = ref();
const dropdown_direction_class = ref();

const disabled_dropdown = ref();

const isDisabled = (bool: boolean) => {
  if (bool) {
    disabled_dropdown.value.removeAttribute('disabled');
  } else {
    disabled_dropdown.value.setAttribute('disabled', '');
  }
};

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

const btn_size_list: {
  [key: string]: string;
} = {
  normal: '',
  tiny: 'btn-xs',
  small: 'btn-sm',
  large: 'btn-lg',
};

watch(
  () => props.disabled,
  n => {
    isDisabled(n);
  }
);

onMounted(() => {
  //是否有效
  isDisabled(props.disabled);

  //列表大小
  const list_size_ = props.listSize == 'small' ? 'menu-compact' : '';

  //按钮大小
  btn_size_class.value = btn_size_list[props.btnSize];

  //列表方向
  dropdown_direction_class.value = direction_list[props.direction];

  //是否显示滚动条
  if (props.isScroll) {
    const scroll_class = 'scrollbar-thin scrollbar-w-1 group-hover:scrollbar-thumb-base-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full';
    list_class.value = `${scroll_class} ${list_size_}`;
  } else {
    list_class.value = `${list_size_}`;
  }
});
</script>
