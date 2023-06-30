// 布局父元素，支持flex布局
export default {
  name: 'WlRow',
  componentName: 'WlRow',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: String
  },
  computed: {
    style() {
      const res = {};
      if (this.gutter) {
        res.marginLeft = `-${this.gutter / 2}px`;
        res.marginRight = res.marginLeft;
        return res;
      }
    }
  },
  render(h) {
    return h(this.tag, {
      class: [
        'wl-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align ? `is-align-${this.align}` : '',
        { 'wl-row--flex': this.type === 'flex'}
      ],
      style: this.style
    }, this.$slots.default);
  }
};
