<template>
  <transition name="wl-fade-in">
    <div
      v-if="visible"
      @click.stop="handleClick"
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }" 
      class="wl-backtop">
      <slot>
        <wl-icon name="CaretUpFilled"></wl-icon>
      </slot>
    </div>
  </transition>
</template>
<script>
  import throttle from 'throttle-debounce/throttle';
  const cubic = value => Math.pow(value, 3);
  const easeInOutCubic = value => value < 0.5
    ? cubic(value * 2) / 2
    : 1 - cubic((1 - value) * 2) / 2;

  export default {
    name: 'WlBacktop',
    props: {
      right: {
        type: Number,
        default: 40
      },
      bottom: {
        type: Number,
        default: 40
      },
      target: [String],
      visibilityHeight: {
        type: Number,
        default: 200
      }
    },
    data() {
      return {
        el: null,
        container: null,
        visible: false
      };
    },

    computed: {
      styleBottom() {
        return `${this.bottom}px`;
      },
      styleRight() {
        return `${this.right}px`;
      }
    },

    methods: {
      init() {
        this.container = document;
        this.el = document.documentElement;
        if (this.target) {
          this.el = document.querySelector(this.target);
          if (!this.el) {
            throw new Error(`target is not existed: ${this.target}`);
          }
          this.container = this.el;
        }
      },
      onScroll() {
        const scrollTop = this.el.scrollTop;
        this.visible = scrollTop >= this.visibilityHeight;
      },
      handleClick(evt) {
        this.scrollToTop();
        this.$emit('click', evt);
      },
      scrollToTop() {
        const el = this.el;
        const beginTime = Date.now();
        const beginValue = el.scrollTop;
        const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
        const frameFunc = () => {
          const progress = (Date.now() - beginTime) / 500;
          if (progress < 1) {
            el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
            rAF(frameFunc);
          } else {
            el.scrollTop = 0;
          }
        };
        rAF(frameFunc);
      }
    },
    mounted() {
      this.init();
      // 生成节流函数
      this.throttledScrollHandler = throttle(300, this.onScroll);
      // container元素绑定scroll事件，监听滚动高度，通过this.visible展示返回顶部元素
      this.container.addEventListener('scroll', this.throttledScrollHandler);
    },
    beforeDestroy() {
      this.container.removeEventListener('scroll', this.throttledScrollHandler);
    }
  };
</script>
