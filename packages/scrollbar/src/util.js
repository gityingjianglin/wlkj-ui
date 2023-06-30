export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height', // 滑块高度，根据不同区域的高度，滑块高度不固定
    key: 'vertical',
    axis: 'Y', // css translate方位
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
};

// 设置滚动条滑块thumb的样式
export function renderThumbStyle({ move, size, bar }) {
  const style = {};
  const translate = `translate${bar.axis}(${ move }%)`;

  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.webkitTransform = translate;

  return style;
};
