/**
 * indent2em (Enhancement 1.5v) 2021-01-13
 * The tinymce-plugins is used to set the first line indent (Enhancement)
 * 
 * https://github.com/Five-great/tinymce-plugins
 * 
 * Copyright 2020, Five(Li Hailong) The Chengdu, China https://www.fivecc.cn/
 *
 * Licensed under MIT
 */
tinymce.PluginManager.add('indent2em', function(editor, url) {
    var pluginName='首行缩进';
    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
    var indent2em_val = editor.getParam('indent2em_val', '2em');
    editor.on('init', function() {
        editor.formatter.register({
            indent2em: {
                selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table',
                styles: { 'text-indent': '%value' },
            }
        });
    });
    function _indent2$getValue( key, str ) { 
        var m = str.match( new RegExp(key + ':?(.+?)"?[;}]') );
        return m ? m[ 1 ] : false;
    }
    var doAct = function () {
        editor.undoManager.transact(function(){
            editor.focus();
            var dom = editor.dom;
            var blocks = editor.selection.getSelectedBlocks();
            var act = '';
            global$1.each(blocks, function (block) {
                let kv = "";
                let kl = "";
                if(block&&block.children['0']&&block.children['0'].attributes&&block.children['0'].attributes.style){
                    kv = _indent2$getValue('font-size',block.children['0'].attributes.style.textContent);
                    kl = _indent2$getValue('letter-spacing',block.children['0'].attributes.style.textContent);
                    if(kv) {kv=(parseInt(kv)+parseInt((kl?kl:0)))*2+'px';}
                    else kv=(parseInt((kl?kl:0))+16)*2+'px';
                }
                if(act==''){
                    act = dom.getStyle(block,'text-indent') == (indent2em_val!='2em'?indent2em_val:kv?kv:'2em') ? 'remove' : 'add';
                }
                if( act=='add'){
                    dom.setStyle(block, 'text-indent',indent2em_val!='2em'?indent2em_val:kv?kv:'2em');
                }else{
                    var style=dom.getAttrib(block,'style');
                    var reg = new RegExp('text-indent?(.+?)"?[;}]', 'ig');
                    style = style.replace(reg, '');
                    dom.setAttrib(block,'style',style);
                }
            });
        });
    };
    editor.ui.registry.getAll().icons.indent2em || editor.ui.registry.addIcon('indent2em','<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" focusable="false"><path d="M 11.518 5 L 18.052 5 C 18.652 5 19.052 5.4 19.052 6 C 19.052 6.6 18.652 7 18.052 7 L 11.518 7 C 10.749 7 10.267 6.167 10.652 5.5 C 10.831 5.191 11.161 5 11.518 5 Z M 6.046 9 L 18.052 9 C 18.652 9 19.052 9.4 19.052 10 C 19.052 10.6 18.652 11 18.052 11 L 6.046 11 C 5.276 11 4.795 10.167 5.18 9.5 C 5.359 9.191 5.689 9 6.046 9 Z M 6.033 13 L 18.052 13 C 18.652 13 19.052 13.4 19.052 14 C 19.052 14.6 18.652 15 18.052 15 L 6.033 15 C 5.263 15 4.782 14.167 5.167 13.5 C 5.346 13.191 5.676 13 6.033 13 Z M 6.052 17 L 18.052 17 C 18.822 17 19.303 17.833 18.918 18.5 C 18.739 18.809 18.409 19 18.052 19 L 6.052 19 C 5.282 19 4.801 18.167 5.186 17.5 C 5.365 17.191 5.695 17 6.052 17 Z"></path></svg>');

    var stateSelectorAdapter = function (editor, selector) {
      return function (buttonApi) {
        return editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;
      };
    };
    editor.ui.registry.addToggleButton('indent2em', {
        icon: 'indent2em',
        tooltip: pluginName,
        onAction: function () {
            doAct();
        },
        onSetup: stateSelectorAdapter(editor, [
          '*[style*="text-indent"]',
          '*[data-mce-style*="text-indent"]',
        ])
    });
    editor.ui.registry.addMenuItem('indent2em', {
        text: pluginName,
        onAction: function() {
            doAct();
        }
    });
    editor.addCommand('indent2em', doAct  );
    return {
        getMetadata: function () {
            return  {
                name: pluginName,
                url: "https://github.com/Five-great/tinymce-plugins",
            };
        }
    };
});
