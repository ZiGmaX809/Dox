<template>
  <div class="mt-96"><Pagination @change-page="changePage" :total="total" :page="1" /></div>
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
