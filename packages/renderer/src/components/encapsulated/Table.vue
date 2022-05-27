<template>
  <div class="border border-base-content/5 rounded-lg overflow-hidden">
    <table class="min-w-full text-sm divide-y divide-base-content/5">
      <thead>
        <tr
          class="grid grid-cols-20 divide-x divide-base-content/5 bg-base-200/50 font-medium text-base-content"
        >
          <th class="p-2">序号</th>
          <th class="p-2">详情</th>
          <th class="p-2 col-span-4">案号</th>
          <th class="p-2">审限</th>
          <th class="p-2 col-span-4">案由</th>
          <th class="p-2 col-span-9">当事人信息</th>
        </tr>
      </thead>
      <tbody
        class="flex flex-col h-[calc(100vh_-_180px)] scrollbar-thin scrollbar-thumb-rounded hover:scrollbar-thumb-base-300"
      >
        <tr
          class="grid grid-cols-20 divide-x divide-base-content/5 border-base-content/5"
          v-for="(item, index) in show_list.list"
          :class="{
            'border-b': index + 1 !== page_ * page_size_, // 当前页的最后一条数据不显示下边框
          }"
        >
          <td
            class="flex justify-center items-center p-2 font-medium text-base-content text-center"
          >
            {{ index + 1 + (page_ - 1) * page_size_ }}
          </td>
          <td class="flex p-2 font-medium text-base-content"></td>
          <td class="flex items-center col-span-4 p-2 text-info cursor-pointer">
            {{ item.ah }}
          </td>
          <td class="flex justify-center items-center p-2">
            {{ item.qx }}
          </td>
          <td class="flex items-center col-span-4 p-2">
            {{ item.ayms }}
          </td>
          <td class="flex items-center col-span-9 p-2">
            {{ item.dsr }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex w-full mt-5 justify-center">
    <Pagination
      @change-page="changePage"
      @change-page-size="changePageSize"
      :total="total_case"
      :page="page_"
      :page-size="page_size_"
    />
  </div>
</template>

<script setup lang="ts">
const list_json = JSON.parse(localStorage.getItem('RequestInfo')!);
const case_list = list_json.MyCaseList?.data;
const page_ = ref(1);
const page_size_ = ref(20);

interface Case {
  [key: string]: any;
}
const show_list: Case = reactive({
  list: [],
});
const total_case = ref(case_list.length);

const changePage = (page: number) => {
  show_list.list = [];
  page_.value = page;
  for (let i = 0; i < case_list.length; i++) {
    if (i >= (page - 1) * page_size_.value && i < page * page_size_.value) {
      show_list.list.push(case_list[i]);
    }
  }
};

const changePageSize = (page_size: number) => {
  page_size_.value = page_size;
  changePage(1);
};

onMounted(() => {
  changePage(1);
});
</script>
