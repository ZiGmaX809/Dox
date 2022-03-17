import { Msg } from '@/script/utils/message';
import { STORE_Editor } from '../../../../store/modules/editor';

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
    '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABGklEQVRIie3Vu0oDQRgF4M9LHYN5Be3TSsRC8AmsrEUbH8BO0opVAlZioaSxTBrBUkTwAXwM0bURQYnFbkicZHYTogiSA8vu8F/Pnpl/mGFClNFCgu4YzweaWIglnAvWLWzjHFXUcByJXc/s0MYO3ooYJGhk3/Wsyxh69gMpk3tUQqf5YF3Cc1EXAU6lrKt4wOqgcTEnMMneR3gfYd8c8GljCx1cYyWWtCulTkr3Dp9GC/yC3SB+6LfmMXiSCjkVQg1+HH9aYN94By7BXixJngYneMRtQZMbme/ZpAVKuNHfVTHUsRYz/m+Rf6XAK5anyFfRHx8YFrkj3XK9417DYUHS3shuZLFXec5lXBr/wgln0wWWChqa4Tu+AFUrU4r0sBiwAAAAAElFTkSuQmCC"/>'
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
