<template>
  <transition name="down">
    <div class="alert shadow-lg" v-show="isShow" :class="alert_type('bg')">
      <div>
        <svg-icon :name="alert_type('icon')!" class="w-5 h-5" />
        <span :class="alert_type('text')">{{ props.text }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    // warning 警告  error 错误  success 成功 info 信息
    default: 'warning',
  },
  showtime: {
    type: Number,
    default: 3000,
  },
});

//存在bug，直接返回props.type无法读取，只能返回字符串
const alert_type = (type: string) => {
  switch (props.type) {
    case 'warning':
      return type == 'bg' ? 'alert-warning' : type == 'text' ? 'text-warning-content' : 'warning';
    case 'success':
      return type == 'bg' ? 'alert-success' : type == 'text' ? 'text-success-content' : 'success';
    case 'error':
      return type == 'bg' ? 'alert-error' : type == 'text' ? 'text-error-content' : 'error';
    case 'info':
      return type == 'bg' ? 'alert-info' : type == 'text' ? 'text-info-content' : 'info';
  }
};

const isShow = ref(false);
// 组件模板渲染成功后触发
onMounted(() => {
  // bg_type.value = `alert alert-${props.type} shadow-lg `;
  // console.log(document.getElementById("alert-test"))
  isShow.value = true;
});

//超出设定时间后移出
let timeout = setTimeout(() => {
  isShow.value = false;
  clearTimeout(timeout);
}, props.showtime);
</script>

<style>
.down-enter-from {
  transform: translate3d(0, -75px, 0);
  opacity: 0;
}

.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-to {
  transform: none;
  opacity: 1;
}

.down-leave-to {
  opacity: 0;
}
</style>
