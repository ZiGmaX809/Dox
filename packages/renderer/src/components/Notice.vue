<template>
  <div style="display: flex; width: 270px; justify-content: space-between">
    <div class="progress" style="display: flex; flex: 1">
      <el-progress :percentage="res" :show-text="false" />
    </div>
    <p style="margin-left: 10px">0/{{ STORE_Request().caselist_num[1] }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "element-plus/dist/index.css";
import { STORE_Request } from "../store/modules/request";

const res = ref(40);

window.addEventListener("message", receiveMessage, false);
// receiveMessage 处理函数[$event]
function receiveMessage(event: any) {
  res.value = event.data <= 100 ? event.data : 100;
  // 参数 event
  // event.data 就是你传的参数
  // event.origin 发送者的目标url，做安全验证
  // event.source 发送者的window对象
}
</script>

<style lang="scss" scoped>
.progress .el-progress--line {
  width: 202px;
}
</style>
