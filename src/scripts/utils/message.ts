import { createVNode, render } from 'vue';
import _Msg from '/components/encapsulated/Msg.vue';

/**
 * 
 * @param text 消息内容
 * @param type 消息类型——'success'|'info'|'error'|'warning'
 * @param showtime 显示时常
 */
const Msg = (text: string, type: string, showtime: number) => {
  const msg_div = document.createElement('div');
  const class_ = `w-[400px] translate-x-[calc((100vw_-_200px)/2_-_50%)] mt-2 select-none`;
  msg_div.setAttribute('id', 'test_div');
  msg_div.setAttribute('class', class_);
  document.getElementById('msg_view')!.appendChild(msg_div);

  //createVNode 用于创建一个虚拟节点
  // 参数1 支持组件
  // 参数2 表示传递给组件的选项
  const vnode = createVNode(_Msg, { text, type, showtime });
  //把虚拟的节点渲染到页面的DOM中即可
  // render函数的参数
  //参数一：表示表示需要渲染的内容（虚拟节点）
  // 参数二：表示渲染的目标位置 （DOM元素）
  render(vnode, msg_div);

  let timeout = setTimeout(() => {
    render(null, msg_div);
    document.getElementById('msg_view')!.removeChild(msg_div);
    clearTimeout(timeout);
  }, showtime + 500);
};

export default Msg;
