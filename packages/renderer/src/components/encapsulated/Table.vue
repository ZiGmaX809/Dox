<template>
  <div class="border border-base-200 rounded">
    <table class="flex flex-col table-auto min-w-full text-sm divide-y divide-base-200 bg-base-200/30">
      <thead class="block w-[calc(100%_-_10px)]">
        <tr class="grid grid-cols-20 divide-x divide-base-200 bg-base-200/30">
          <th class="flex justify-center  p-2 font-medium text-left text-base-content whitespace-nowrap">序号</th>
          <th class="flex justify-center  p-2 font-medium text-left text-base-content whitespace-nowrap">详情</th>
          <th
            class="col-span-4 float-left p-2 font-medium text-left text-base-content whitespace-nowrap"
          >
            案号
          </th>
          <th class="flex justify-center p-2 font-medium text-left text-base-content whitespace-nowrap">审限</th>
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
        class="flex flex-col divide-y divide-base-200 h-[calc(100vh_-_160px)] overflow-y-auto overflow-x-hidden bg-base-100"
      >
        <tr class="grid grid-cols-20 divide-x divide-base-200" v-for="(item, index) in case_list">
          <td
            class="flex items-center float-left p-2 justify-center text-center font-medium text-base-content"
          >
            {{ index + 1 }}
          </td>
          <td class="float-left p-2 font-medium text-base-content"></td>
          <td class="flex items-center col-span-4 float-left p-2r text-info cursor-pointer">
            {{ item.ah }}
            <!-- （2022）浙01民终999号 -->
          </td>
          <td class="flex  items-center justify-center p-2 text-center">
            {{ item.qx }}
            <!-- 12 -->
          </td>
          <td class="flex items-center col-span-4 float-left p-2">
            {{ item.ayms }}
            <!-- 民间借贷纠纷 -->
          </td>
          <td class="flex items-center col-span-9 float-left p-2">
            {{ item.dsr }}
            <!-- 上诉人：阿桑令爱哈三大竞赛帮囧啊刚思考；被上诉人：拉空哈当诉您昂三八节带把伞还办啊随便记得八年比赛 -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const list_json = JSON.parse(localStorage.getItem('RequestInfo')!);
const case_list = list_json.MyCaseList?.data;
</script>
