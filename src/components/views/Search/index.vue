<template>
  <table class="border-collapse border border-slate-500 table-auto w-full">
    <thead>
      <tr class="bg-base-200/30">
        <th class="border border-slate-600">State</th>
        <th class="border border-slate-600">City</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-slate-700">Indiana</td>
        <td class="border border-slate-700">Indianapolis</td>
      </tr>
      <tr>
        <td class="border border-slate-700">Ohio</td>
        <td class="border border-slate-700">Columbus</td>
      </tr>
      <tr>
        <td class="border border-slate-700">Michigan</td>
        <td class="border border-slate-700">Detroit</td>
      </tr>
    </tbody>
  </table>

  <div class="btn-group">
    <button class="btn">1</button>
    <button class="btn btn-active">2</button>
    <button class="btn">3</button>
    <button class="btn">4</button>
  </div>
</template>

<script setup lang="ts">
const total = ref(200);
// const pageSize = ref(20);
// 控制页码的变化
const changePage = (page: any) => {
  // 修改分页参数，重新调用接口即可
  // 重新调用接口，渲染数据
  console.log(page);
};
</script>