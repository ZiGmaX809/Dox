import { Msg } from '@/script/utils/message';
import { STORE_Editor } from '@/store/modules/editor';

tinymce.PluginManager.add('customsave', function (editor, url) {
  var pluginName = '保存';
  var saveText = function () {
    // window.localStorage.setItem('');
    const case_id = STORE_Editor().case_id;
    Msg('已暂存', 'success');

    const txt = {
      ah: case_id,
      text: editor.getContent({ format: 'text' }),
    };

    window.localStorage.setItem('SaveText', JSON.stringify(txt));
    STORE_Editor().Reset_editor_isChanged();
  };

  editor.ui.registry.addIcon(
    'saveicon',
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" focusable="false"><path d="M 7.104 2.778 C 7.067 2.779 7.03 2.783 6.993 2.789 L 5.594 2.789 C 4.062 2.789 2.803 4.047 2.803 5.58 L 2.803 18.264 C 2.803 19.796 4.062 21.055 5.594 21.055 L 6.484 21.055 C 6.566 21.068 6.649 21.068 6.73 21.055 L 17.139 21.055 C 17.22 21.068 17.304 21.068 17.385 21.055 L 18.278 21.055 C 19.81 21.055 21.069 19.796 21.069 18.264 L 21.069 7.61 C 21.069 7.391 20.975 7.184 20.814 7.041 L 16.247 2.981 C 16.108 2.857 15.927 2.789 15.741 2.789 L 15.358 2.789 C 15.277 2.775 15.194 2.775 15.111 2.789 L 7.241 2.789 C 7.196 2.781 7.15 2.778 7.104 2.778 Z M 5.594 4.311 L 6.355 4.311 L 6.355 7.102 C 6.355 8.074 7.159 8.878 8.131 8.878 L 14.22 8.878 C 15.191 8.878 15.995 8.074 15.995 7.102 L 15.995 4.793 L 19.547 7.951 L 19.547 18.264 C 19.547 18.973 18.987 19.532 18.278 19.532 L 18.024 19.532 L 18.024 13.696 C 18.024 12.727 17.22 11.922 16.249 11.922 L 7.623 11.922 C 6.652 11.922 5.848 12.727 5.848 13.696 L 5.848 19.532 L 5.594 19.532 C 4.884 19.532 4.325 18.973 4.325 18.264 L 4.325 5.58 C 4.325 4.87 4.884 4.311 5.594 4.311 Z M 7.878 4.311 L 14.472 4.311 L 14.472 7.102 C 14.472 7.251 14.369 7.356 14.22 7.356 L 8.131 7.356 C 7.981 7.356 7.878 7.251 7.878 7.102 L 7.878 4.311 Z M 7.623 13.444 L 16.249 13.444 C 16.399 13.444 16.503 13.548 16.503 13.696 L 16.503 19.532 L 7.369 19.532 L 7.369 13.696 C 7.369 13.548 7.473 13.444 7.623 13.444 Z"></path></svg>'
  );

  // 注册一个工具栏按钮名称
  editor.ui.registry.addToggleButton('customsave', {
    icon: 'saveicon',
    tooltip: pluginName,
    onAction: function () {
      saveText();
    },
  });

  // 注册一个菜单项名称 menu/menubar
  editor.ui.registry.addMenuItem('example', {
    text: '暂存',
    onAction: function () {
      saveText();
    },
  });

  return {
    getMetadata: function () {
      return {
        //插件名和链接会显示在“帮助”→“插件”→“已安装的插件”中
        name: pluginName, //插件名称
        url: 'http://exampleplugindocsurl.com', //作者网址
      };
    },
  };
});
