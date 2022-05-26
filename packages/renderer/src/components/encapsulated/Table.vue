<template>
  <div class="border border-base-content/5 rounded-lg overflow-hidden">
    <table
      class="group flex flex-col table-auto min-w-full text-sm divide-y divide-base-content/5 border-base-content/5"
    >
      <thead class="block">
        <tr class="grid grid-cols-20 divide-x divide-base-content/5 bg-base-200/30">
          <th
            class="flex justify-center p-2 font-medium text-left text-base-content whitespace-nowrap"
          >
            序号
          </th>
          <th
            class="flex justify-center p-2 font-medium text-left text-base-content whitespace-nowrap"
          >
            详情
          </th>
          <th
            class="col-span-4 float-left p-2 font-medium text-left text-base-content whitespace-nowrap"
          >
            案号
          </th>
          <th
            class="flex justify-center p-2 font-medium text-left text-base-content whitespace-nowrap"
          >
            审限
          </th>
          <th
            class="col-span-4 float-left p-2 font-medium text-left text-base-content whitespace-nowrap"
          >
            案由
          </th>
          <th
            class="col-span-9 float-left p-2 font-medium text-left text-base-content whitespace-nowrap"
          >
            当事人信息
          </th>
        </tr>
      </thead>
      <tbody
        class="flex flex-col divide-y divide-base-content/5 h-[calc(100vh_-_180px)] overflow-y-auto overflow-x-hidden bg-base-100 scrollbar-thin scrollbar-thumb-rounded hover:scrollbar-thumb-base-300 "
      >
        <tr
          class="grid grid-cols-20 divide-x divide-base-content/5 hover:bg-base-300 last:!border-b-base-content"
          v-for="(item, index) in show_list.list"
        >
          <td
            class="flex items-center float-left p-2 justify-center text-center font-medium text-base-content"
          >
            {{ index + 1 + (page_ - 1) * page_size_ }}
          </td>
          <td class="float-left p-2 font-medium text-base-content"></td>
          <td class="flex items-center col-span-4 float-left p-2r text-info cursor-pointer">
            {{ item.ah }}
          </td>
          <td class="flex items-center justify-center p-2 text-center">
            {{ item.qx }}
          </td>
          <td class="flex items-center col-span-4 float-left p-2">
            {{ item.ayms }}
          </td>
          <td class="flex items-center col-span-9 float-left p-2">
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
  changePage(page_.value);
};

onMounted(() => {
  changePage(1);
});
</script>
