import { ElMessageBox} from 'element-plus';

tinymce.PluginManager.add('clear', function (editor, url) {
  var pluginName = '清屏';
  var clearText = function () {
    ElMessageBox.confirm('确认清除所有内容', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      showClose: false,
    })
      .then(() => {
        //判断是否缩进
        let orgin_text = editor.getContent();

        editor.resetContent();
        if (orgin_text.includes('text-indent')) {
          editor.execCommand('indent2em');
        }
      })
      .catch(() => {});
  };

  editor.ui.registry.addIcon(
    'clear',
    '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABf0lEQVRIid3VTUtVURQG4McyPyhSMkchJGbQzEEjS+hHBA2chE3SgVP9IyohiD+gaJqYzoOa1CAdRFAmZVQ00CDT22Av7XA7t7sPKEgLFnsd9nrPuz722ptjltMV/W+iD++PIRbwNDRbWisSVM3YqaqAE0dQpUSduFCwfxx1MI9QC32YC2qpQPATc4G5j7YcUKMetGAC69iXoj6Dz9gKuxZ7axhvFGyjHoxjBkt4XMhgMey2QgZDmA17rklCh7KOJ7nOEcjrso1GGVzBBqYyCVpxNTeas/6clqraWf+zsiZ3xXpXalyO3gvMuRyCg2H68I8sYQBjYW/G2p1DMBjrRhOC25hHR4GgP4fgGvbwrgAaLfH7GPhL0vtQC2xTght4hZ34npRmol4OAriMb9LAjZT4/SVf8AZ3pJo+w2qJ33ns4gGmpTJ9qncqG++JAPThl/TIrGEF22hHj3Tur8f+Pp4H2UIzAlLpRnALw1KdL6IX3/EVb/ESL7As3VP/ofwGc9VSi8CkWzwAAAAASUVORK5CYII="/>'
  );

  // 注册一个工具栏按钮名称
  editor.ui.registry.addToggleButton('clear', {
    icon: 'clear',
    tooltip: pluginName,
    onAction: function () {
      clearText();
    },
  });

  // 注册一个菜单项名称 menu/menubar
  editor.ui.registry.addMenuItem('eclear', {
    text: '清屏',
    onAction: function () {
      clearText();
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
