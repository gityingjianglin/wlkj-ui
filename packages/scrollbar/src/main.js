// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js

import { addResizeListener, removeResizeListener } from 'wlkj-ui/src/utils/resize-event';
import scrollbarWidth from 'wlkj-ui/src/utils/scrollbar-width';
import { toObject } from 'wlkj-ui/src/utils/util';
import Bar from './bar';

/* istanbul ignore next */
export default {
  name: 'WlScrollbar',

  components: { Bar },

  props: {
    native: Boolean,
    wrapStyle: {}, // wl-scrollbar组件可传入自定义样式，可传入数组[{'color': 'red'}]，字符串'color:red;'
    wrapClass: {}, // 增加滚动区域wrap样式名，和wl-scrollbar__wrap样式名并列
    viewClass: {}, // 增加视图区域样式名，和wl-scrollbar__view样式名并列
    viewStyle: {},
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: { // 视图层渲染标签，可动态改变
      type: String,
      default: 'div'
    }
  },

  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    };
  },

  computed: {
    wrap() {
      return this.$refs.wrap;
    }
  },

  render(h) {
    let gutter = scrollbarWidth(); // 浏览器原生滚动条宽度
    let style = this.wrapStyle;

    if (gutter) {
      const gutterWith = `-${gutter}px`;
      // margin-right，margin-bottom负数值用于隐藏处理横向，纵向滚动条
      const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle);
        style.marginRight = style.marginBottom = gutterWith;
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle;
      } else {
        style = gutterStyle;
      }
    }
    // 视图view层
    const view = h(this.tag, {
      class: ['wl-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default);

    // 视图包裹层wrap
    const wrap = (
      <div
        ref="wrap"
        style={ style }
        onScroll={ this.handleScroll }
        class={ [this.wrapClass, 'wl-scrollbar__wrap', gutter ? '' : 'wl-scrollbar__wrap--hidden-default'] }>
        { [view] }
      </div>
    );
    let nodes;

    if (!this.native) {
      // 全部子节点层，包含wrap->view，bar横向滚动条，bar纵向滚动条
      nodes = ([
        wrap,
        <Bar
          move={ this.moveX }
          size={ this.sizeWidth }></Bar>,
        <Bar
          vertical
          move={ this.moveY }
          size={ this.sizeHeight }></Bar>
      ]);
    } else {
      nodes = ([
        <div
          ref="wrap"
          class={ [this.wrapClass, 'wl-scrollbar__wrap'] }
          style={ style }>
          { [view] }
        </div>
      ]);
    }
    // 最终渲染最外层元素div.wl-scrollbar，内层nodes元素分别为A->div.wl-scrollbar__wrap(子元素为div.wl-scrollbar__view)
    // B->div.wl-scrollbar__bar(横向滚动条)，C->div.wl-scrollbar__bar(纵向滚动条)
    return h('div', { class: 'wl-scrollbar' }, nodes);
  },

  methods: {
    handleScroll() {
      const wrap = this.wrap;
      this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
      this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
      // console.log('wrap.scrollTop:', wrap.scrollTop);
      // console.log('wrap.clientHeight:', wrap.clientHeight);
      // console.log('this.moveY:', this.moveY);
    },

    update() {
      let heightPercentage, widthPercentage;
      const wrap = this.wrap;
      if (!wrap) return;
      // 获取滚动条滑块的高度，wrap可视区域高度 / wrap可滚动区域高度 * 100（百分比），可滚动区域越高，滑块高度越小，初始化计算一次
      heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
      widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);

      this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
      this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
      // console.log('wrap.scrollHeight:', wrap.scrollHeight);
      // console.log('wrap.clientHeight:', wrap.clientHeight);
      // console.log('heightPercentage:', heightPercentage);
    }
  },

  mounted() {
    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && addResizeListener(this.$refs.resize, this.update);
  },

  beforeDestroy() {
    if (this.native) return;
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  }
};
