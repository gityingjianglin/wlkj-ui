import Vue from 'vue';

export default function scrollIntoView(container, selected) {
  if (Vue.prototype.$isServer) return;

  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  const offsetParents = [];
  let pointer = selected.offsetParent;
  // 重复寻找selected带有定位的父元素，将带定位的父元素插入offsetParents数组中
  // 用于计算所有父元素offsetTop属性值求和，最终计算出selected节点针对最外层container元素的相对距离
  while (pointer && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer);
    pointer = pointer.offsetParent;
  }
  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => (prev + curr.offsetTop), 0);
  const bottom = top + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    // selected节点top值小于container已滚动的高度(selected已被top顶部遮罩)，重新设置container.scrollTop = top
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    // selected节点top值小于container已滚动的高度(selected已被top顶部遮罩)，重新设置container.scrollTop =  bottom - container.clientHeight
    container.scrollTop = bottom - container.clientHeight;
  }
}
