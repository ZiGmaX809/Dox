<template>
  <div style="width: 100%; height: 100%; display: flex; justify-content: center">
    <el-scrollbar>
      <!-- 主设置页面 -->
      <div
        style="
          height: 100%;
          padding-left: calc((100vh - 300px) / 2);
          padding-right: calc((100vh - 300px) / 2);
        "
      >
        <Customzie />
        <Editor />
        <Export />
        <Quickinput />
        <Advanced />
        <Others />

        <p class="pref_author">MADE BY ZiGma</p>
        <p class="pref_version">v0.0.2</p>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Customzie from './Customize.vue';
import Editor from './Editor.vue';
import Export from './Export.vue';
import Quickinput from './Quickinput.vue';
import Advanced from './Advanced.vue';
import Others from './Others.vue';
</script>

<style lang="scss">
.pref_h2 {
  user-select: none;
  margin-top: 50px;
}

.pref_p {
  user-select: none;
  color: #393939;
  font-weight: bold;
}

.pref_desc_p {
  user-select: none;
  color: #909090;
  font-size: 13px;
  margin-top: 0px;
}

.pref_desc_table {
  user-select: none;
  color: #909090;
  font-size: 13px;
  margin-top: 0px;
}

.pref_div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
}

.pref_author {
  text-align: center;
  margin-top: 100px;
  font-family: 'Barlow';
  font-size: 0.9rem;
}

.pref_version {
  text-align: center;
  color: #909090;
  font-size: 0.88rem;
  margin-top: -10px;
  height: 50px;
  font-family: 'Barlow';
}

.btn-right {
  margin-top: 10px;
}

.div_class {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  &_center {
    @extend .div_class;
    align-items: center;
  }
  &_end {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}

.el-dialog__header span {
  user-select: none;
}

p {
  user-select: none;
}
</style>
