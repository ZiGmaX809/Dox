<template>
  <div class="tinymce-box">
    <Editor v-model="state.contentValue" :init="initOptions" />
  </div>
</template>

<script setup lang="ts">
//引入tinymce编辑器
import Editor from "@tinymce/tinymce-vue";
// 引入富文本编辑器主题的js和css
// import 'tinymce/skins/content/default/content.css'
//引入方式引入node_modules里的tinymce相关文件文件
import tinymce from "tinymce/tinymce"; //tinymce默认hidden，不引入则不显示编辑器
import { useStore } from "vuex";
import { Modules } from "../store";

import "tinymce/themes/silver"; //编辑器主题，不引入则报错
import "tinymce/icons/default"; //引入编辑器图标icon，不引入则不显示对应图标

// 引入编辑器插件
import "../static/tinymce/plugins/indent2em"
// import "tinymce/plugins/indent2em"; //首行缩进
import "tinymce/plugins/paste"; //粘贴插件
import "tinymce/plugins/quickbars"; //快速工具栏
import "tinymce/plugins/wordcount"; //字数统计
import "tinymce/plugins/charmap"; //特殊字符
import { reactive, ref, watch, inject } from "vue";

const store = useStore<Modules>();

const value: string = "";

const plugins: string = "charmap wordcount indent2em";

const toolbar: string =
  "undo redo | cut copy paste pastetext | indent2em | alignleft aligncenter alignright alignjustify outdent indent | charmap";

const state = reactive({
  contentValue: value,
});

const initOptions = ref({
  selector: "#tinymce_eidtor",
  auto_focus: true,
  // base_url: "@",
  //emoticons_database_url: "/tinymce/plugins/emoticons/js/emojis.js", //更改表情插件路径
  language_url: "plugins/tinymce/langs/zh_CN.js", //引入语言包文件
  language: "zh_CN", //语言类型

  skin_url: "plugins/tinymce/skins/ui/oxide", //皮肤：浅色
  // skin_url: '/tinymce/skins/ui/oxide-dark',//皮肤：暗色

  plugins: plugins, //插件配置
  toolbar: toolbar, //工具栏配置，设为false则隐藏
  menubar: false,
  // menubar: 'file edit',  //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”

  fontsize_formats:
    "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px", //字体大小
  font_formats:
    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",

  height: "610px", //注：引入autoresize插件时，此属性失效
  width: "100%",

  // autoresize_bottom_margin: 50,
  // autoresize_max_height: 650, // 编辑区域的最大高
  // autoresize_min_height: 350, //编辑区域的最小高度
  // autoresize_on_init: true,
  // autoresize_overflow_padding: 50,

  // placeholder: "开始编写吧……",
  branding: false, //tiny技术支持信息是否显示
  resize: true, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
  // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
  elementpath: false, //元素路径是否显示

  // content_style: 'img {max-width:100%;}', //直接自定义可编辑区域的css样式
  content_css: "plugins/tinymce/skins/content/default/content.css", //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
});

const clear = () => {
  state.contentValue = "";
};

const getText = () => {
  var cnt = tinymce.editors[0].getContent({ format: "text" });
  return cnt;
};

const addText = (data: string) => {
  tinymce.editors[0].insertContent(data);
};

const int2em = () => {
  tinymce.editors[0].execCommand("indent2em");
};

//监控编辑器内容变更
watch(
  () => state.contentValue,
  (newValue) => {
    if (!store.state.editorModule.editor_isChanged) {
      store.commit("editorModule/Set_editor_isChanged");
    }
  }
);

//暴露方法
defineExpose({
  clear,
  getText,
  addText,
  int2em,
});
</script>

<style lang="scss">
.tinymce-box {
  z-index: 2;
}

#tinymce {
  text-indent: 2em;
}
</style>
