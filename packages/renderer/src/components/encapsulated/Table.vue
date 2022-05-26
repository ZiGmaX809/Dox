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
        class="flex flex-col divide-y divide-base-content/5 h-[calc(100vh_-_180px)] overflow-y-auto overflow-x-hidden bg-base-100 scrollbar-thin scrollbar-thumb-rounded hover:scrollbar-thumb-base-300"
      >
        <tr class="grid grid-cols-20 divide-x divide-base-content/5" v-for="(item, index) in case_list">
          <td
            class="flex items-center float-left p-2 justify-center text-center font-medium text-base-content"
          >
            {{ index + 1 }}
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
  <div class="btn-group justify-center mt-5">
    <button
      class="btn btn-sm btn-ghost border border-base-content/5 bg-base-100 "
      v-for="page_num in total_page"
      @click="select_page(page_num)"
      :key="page_num"
      :id="`page${page_num}`"
    >
      {{ page_num }}
    </button>
  </div>
</template>

<script setup lang="ts">
const list_json = JSON.parse(localStorage.getItem('RequestInfo')!);
const case_list = list_json.MyCaseList?.data;
const total_page = Math.ceil(case_list.length / 20);

const itemRefs: any[] = [];
const setItemRef = (el: any) => {
  if (el) {
    itemRefs.push(el);
  }
};

const select_page = (p: number) => {
  document.getElementById(`page${p}`)?.classList.add('btn-active');
};
</script>