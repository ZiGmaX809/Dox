<template>
  <el-tooltip
    ref="tlp"
    :content="detail_txt()"
    raw-content
    effect="customized"
    :disabled="!tooltipFlag"
    placement="left-start"
    class="tooltip"
  >
    <div
      class="tooltip-wrap"
      @mouseenter="handleTooltipIn($event)"
      @mouseleave="handleTooltipOut($event)"
    >
      {{ props.text }}
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
});

const detail_txt = () =>{
  if(props.name != ""){
    return "<p>" + props.text + "<p/><p><div align='right'><i>—— " + props.name + "</i></div></p>"
  }else{
    return props.text
  }
}

const tooltipFlag = ref(false); // 是否显示tooltip

const handleTooltipIn = (event: any) => {
  // scrollWidth: 对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。
  // offsetWidth对象整体的实际宽度，包滚动条等边线，会随对象显示大小的变化而改变。
  tooltipFlag.value = event.target.scrollWidth > event.target.offsetWidth;
};
const handleTooltipOut = (event: any) => {
  tooltipFlag.value = false;
};
</script>

<style lang="scss">
$tooltip-color: #303030;

.tooltip-wrap {
  width: 100%;
  /*文本不换行*/
  /* white-space: nowrap; */
  overflow: hidden;
  /*文字超出用省略号*/
  text-overflow: ellipsis;
}

.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  max-width: 500px;
  color: #fff;
  background: linear-gradient(90deg, $tooltip-color, $tooltip-color);
  border: 1px;
  box-shadow: 5px;
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, $tooltip-color, $tooltip-color);
  right: 0;
}
</style>
