<template>
  <div style="display: flex; width: 270px; flex-direction: column">
    <div class="progress" style="display: flex; flex: 1">
      <el-progress :percentage="res" :show-text="false" />
    </div>
    <div style="display: flex; margin-top: 10px;justify-content: space-between;">
      <el-tag class="mx-1">共计：{{ total }}</el-tag>
      <el-tag class="mx-1" type="success">成功：{{ success_num }}</el-tag>
      <el-tag class="mx-1" type="danger">失败：{{ fail_num }}</el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "element-plus/dist/index.css";
import { STORE_Request } from "../store/modules/request";

const res = ref(0);
const success_num = ref(0);
const fail_num = ref(0);
const total = STORE_Request().caselist_num[1];

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event: any) {
  //进行的index
  const present = event.data[1] / total;

  //缓存成功数量
  success_num.value = event.data[0];

  //缓存失败数量
  fail_num.value = event.data[1] - event.data[0];

  //进度条数值
  res.value = present <= 1 ? present * 100 : 100;

  if (present == 1) {
    window.removeEventListener("message", receiveMessage, false);
  }
}
</script>

<style lang="scss" scoped>
.progress .el-progress--line {
  margin-top: 5px;
  width: 100%;
}

</style>
