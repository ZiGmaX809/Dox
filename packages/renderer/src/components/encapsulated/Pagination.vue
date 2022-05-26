<template>
  <div class="flex flex-row items-center text-sm space-x-5">
    <Dropdown v-model="current_pagesize" btn_size="tiny" list_size="small" direction="top-end">
      <li v-for="item in pagesize_list" @click="changePageSize(item)">
        <a>
          {{ item }}
        </a>
      </li>
    </Dropdown>
    <div class="btn-group items-center w-fit">
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
const props = defineProps({
  //数据总条数
  total: {
    type: Number,
    default: 0,
  },
  //每页数据条数
  //   pagesize: {
  //     type: Number,
  //     default: 20,
  //   },
  //   默认初始页码
  page: {
    type: Number,
  },
});

const emits = defineEmits(['change-page', 'change-page-size']);

// attrs表示父组件传递的属性，但是props没有接收的属性，这种属性不是响应式的  attrs接收父组件传递的当前页

const pagesize = ref(20);
const pagesize_list: string[] = ['20/Pages', '30/Pages', '50/Pages', '100/Pages'];
const current_pagesize = ref('20/Pages');

// 总页数
const pages = computed(() => Math.ceil(props.total / pagesize.value));
// 当前页码
// console.log(attrs.page)
// 如果父组件没有传递档当前页码，默认是第一页
const currentPage = ref(props.page || 1);
// 动态计算页码列表
const list = computed(() => {
  // 当父组件传递total的值发生变化时，计算属性会重新计算
  // pages = Math.ceil(props.total / props.pagesize)
  const result = [];
  // 总页码小于等于8；大于8
  if (pages.value == 0) {
    result.push(1);
  } else if (pages.value <= 8) {
    // 总页码小于等于10的情况
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

const changePageSize = (val: string) => {
  current_pagesize.value = val;
  pagesize.value = Number(val.split('/')[0]);
  emits('change-page-size', pagesize.value);
};
</script>
