export default {
  name: 'WlCol',
  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  computed: {
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== 'WlRow') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render(h) {
    let classList = [];
    let style = {};
    if (this.gutter) {
      style.paddingLeft = `${this.gutter / 2}px`;
      style.paddingRight = style.paddingLeft;
    }
    // 生成span，offset，pull，push相关类名
    ['span', 'offset', 'pull', 'push'].forEach((prop) => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `wl-col-${prop}-${this[prop]}`
            : `wl-col-${this[prop]}`
        );
      }
    });
    // 生成xs，sm，md，lg，xl相关类名
    ['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
      if (typeof this[size] === 'number') {
        classList.push(`wl-col-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        let props = this[size];
        Object.keys(props).forEach((prop) => {
          classList.push(
            prop !== 'span'
              ? `wl-col-${size}-${prop}-${props[prop]}`
              : `wl-col-${size}-${props[prop]}`
          );
        });
      }
    });
    return h(this.tag, {
      class: ['wl-col', classList],
      style
    }, this.$slots.default);
  }
};
