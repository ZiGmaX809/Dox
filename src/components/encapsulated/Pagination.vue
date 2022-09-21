<template>
  <div class="flex flex-row items-center text-sm space-x-5">
    <Dropdown v-model="currentPagesize_label" btnSize="tiny" listSize="small" direction="top-end">
      <li v-for="item in pagesize_list" @click="changePageSize(item)">
        <a>
          {{ item + '/Page' }}
        </a>
      </li>
    </Dropdown>
    <div class="btn-group rounded-l-lg overflow-hidden items-center w-fit">
      <a
        @click="changePage(item)"
        :class="
          typeof item === `string`
            ? 'btn-disabled'
            : typeof item === `number` && currentPage === item
            ? `btn-active`
            : ``
        "
        class="btn btn-sm btn-ghost border border-base-content/5 bg-base-100"
        v-for="item in list"
        :key="item"
      >
        {{ item }}
      </a>
    </div>
    <span class="w-[100px]">Total {{ total }}</span>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  //数据总条数
  total: {
    type: Number,
    default: 0,
  },
  // 每页数据条数
  currentpagesize: {
    type: Number,
    default: 30,
  },
  // 默认初始页码
  page: {
    type: Number,
  },
  pagesize: {
    type: Array as PropType<number[]>,
  },
});

const emits = defineEmits(['change-page', 'change-page-size']);

const pagesize_list: number[] = props.pagesize!;
const currentPagesize_label = ref(pagesize_list[0] + '/Page');

// 总页数
const pages = computed(() => Math.ceil(props.total / props.currentpagesize));
// 当前页码
// 如果父组件没有传递档当前页码，默认是第一页
const currentPage = ref(props.page || 1);
const currentPagesize = ref(props.currentpagesize);
// 动态计算页码列表
const list = computed(() => {
  // 当父组件传递total的值发生变化时，计算属性会重新计算
  const result = [];
  // 总页码小于等于8；大于8
  if (pages.value == 0) {
    result.push(1);
  } else if (pages.value <= 8) {
    // 总页码小于等于8的情况
    for (let i = 1; i <= pages.value; i++) {
      result.push(i);
    }
  } else {
    // 总页码大于8
    if (currentPage.value < 4) {
      // 左侧临界值
      for (let i = 1; i <= 4; i++) {
        result.push(i);
      }
      result.push('...', pages.value);
    } else if (currentPage.value > pages.value - 3) {
      // 右侧临界值
      result.push(1, '...');
      for (let i = pages.value - 3; i <= pages.value; i++) {
        result.push(i);
      }
    } else {
      // 中间的状态
      result.push(1, '...');
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        result.push(i);
      }
      result.push('...', pages.value);
    }
  }
  return result;
});

const changePage = (type: number | string) => {
  // 点击页码
  if (typeof type === 'number') {
    currentPage.value = type;
    emits('change-page', currentPage.value);
  }
};

const changePageSize = (val: number) => {
  currentPagesize_label.value = `${val}/Page`;
  currentPage.value = 1;
  currentPagesize.value = val;
  emits('change-page-size', val);
};
</script>