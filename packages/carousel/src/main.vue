<template>
  <div
    :class="carouselClasses"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave">
    <div
      class="wl-carousel__container"
      :style="{ height: height }">
      <transition
        v-if="arrowDisplay"
        name="carousel-arrow-left">
        <button
          type="button"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)"
          class="wl-carousel__arrow wl-carousel__arrow--left">
          <i class="wl-icon-LeftOutline"></i>
        </button>
      </transition>
      <transition
        v-if="arrowDisplay"
        name="carousel-arrow-right">
        <button
          type="button"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)"
          class="wl-carousel__arrow wl-carousel__arrow--right">
          <i class="wl-icon-RightOutline"></i>
        </button>
      </transition>
      <slot></slot>
    </div>
    
    <ul
      v-if="indicatorPosition !== 'none'"
      :class="indicatorsClasses">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="[
          'wl-carousel__indicator',
          'wl-carousel__indicator--' + direction,
          { 'is-active': index === activeIndex }]"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">
        <button class="wl-carousel__button">
          <span v-if="hasLabel">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
  import throttle from 'throttle-debounce/throttle';
  import { addResizeListener, removeResizeListener } from 'wlkj-ui/src/utils/resize-event';
  export default {
    name: 'WlCarousel',

    props: {
      direction: {
        type: String,
        default: 'horizontal',
        validator(val) {
          return ['horizontal', 'vertical'].indexOf(val) !== -1;
        }
      },
      type: String,
      height: String, // carousel高度
      loop: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      arrow: {
        type: String,
        default: 'hover' // carousel arrow show type，has three display type，es：default：hover（悬浮显示），always（持续显示），never（不显示）
      },
      indicatorPosition: String,
      indicator: {
        type: Boolean,
        default: true
      },
      trigger: {
        type: String,
        default: 'hover'
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        items: [], // 存储所有carousel-item组件
        activeIndex: -1, // 当前slider选中序号
        containerWidth: 0,
        timer: null, // 动画计时器id
        hover: false // 标识是否悬停在slider
      };
    },

    computed: {
      arrowDisplay() {
        return this.arrow !== 'never' && this.direction !== 'vertical';
      },
      carouselClasses() {
        const classes = ['wl-carousel', 'wl-carousel--' + this.direction];
        if (this.type === 'card') {
          classes.push('wl-carousel--card');
        }
        return classes;
      },
      hasLabel() {
        return this.items.some(item => item.label.toString().length > 0);
      },
      indicatorsClasses() {
        const classes = ['wl-carousel__indicators', 'wl-carousel__indicators--' + this.direction];
        if (this.hasLabel) {
          classes.push('wl-carousel__indicators--labels');
        }
        if (this.indicatorPosition === 'outside' || this.type === 'card') {
          classes.push('wl-carousel__indicators--outside');
        }
        return classes;
      }
    },
    watch: {
      autoplay(val) {
        val ? this.startTimer() : this.pauseTimer();
      },
      interval() {
        this.pauseTimer();
        this.startTimer();
      },
      loop() {
        this.setActiveItem(this.activeIndex);
      },
      activeIndex(val, oldVal) {
        this.resetItemPosition(oldVal);
        if (oldVal > -1) {
          this.$emit('change', val, oldVal);
        }
      },
      items(val) {
        if (val.length > 0) this.setActiveItem(this.initialIndex);
      }
    },
    methods: {
      handleMouseEnter() {
        this.hover = true;
        this.pauseTimer();
      },
      handleMouseLeave() {
        this.hover = false;
        this.startTimer();
      },
      itemInStage(item, index) {
        // 判断当前元素是否在舞台内，并且位于激活元素左边或者右边
        const length = this.items.length;
        if (index === length - 1 && item.inStage && this.items[0].active ||
          (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
          return 'left';
        } else if (index === 0 && item.inStage && this.items[length - 1].active ||
          (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
          return 'right';
        }
        return false;
      },
      handleButtonEnter(arrow) {
        if (this.direction === 'vertical') return;
        this.items.forEach((item, index) => {
          if (arrow === this.itemInStage(item, index)) {
            item.hover = true;
          }
        });
      },
      handleButtonLeave() {
        if (this.direction === 'vertical') return;
        this.items.forEach(item => {
          item.hover = false;
        });
      },
      updateItems() {
        this.items = this.$children.filter(child => child.$options.name === 'WlCarouselItem');
      },
      resetItemPosition(oldIndex) {
        this.items.forEach((item, index) => {
          item.translateItem(index, this.activeIndex, oldIndex);
        });
      },
      playSlides() {
        if (this.activeIndex < this.items.length - 1) {
          this.activeIndex++;
        } else if (this.loop) {
          this.activeIndex = 0;
        }
      },
      pauseTimer() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      startTimer() {
        if (this.interval < 0 || !this.autoplay || this.timer) return;
        this.timer = setInterval(this.playSlides, this.interval);
      },
      resetTimer() {
        this.pauseTimer();
        this.startTimer();
      },
      setActiveItem(index) {
        if (typeof index === 'string') {
          const filteredItems = this.items.filter(item => item.name === index);
          if (filteredItems.length > 0) {
            index = this.items.indexOf(filteredItems[0]);
          }
        }
        index = Number(index);
        if (isNaN(index) || index !== Math.floor(index)) {
          console.warn('[wlkj Warn][Carousel]index must be an integer.');
          return;
        }
        let length = this.items.length;
        const oldIndex = this.activeIndex;
        if (index < 0) {
          this.activeIndex = this.loop ? length - 1 : 0;
        } else if (index >= length) {
          this.activeIndex = this.loop ? 0 : length - 1;
        } else {
          this.activeIndex = index;
        }
        if (oldIndex === this.activeIndex) {
          this.resetItemPosition(oldIndex);
        }
        this.resetTimer();
      },
      prev() {
        this.setActiveItem(this.activeIndex - 1);
      },

      next() {
        this.setActiveItem(this.activeIndex + 1);
      },

      handleIndicatorClick(index) {
        this.activeIndex = index;
      },

      handleIndicatorHover(index) {
        if (this.trigger === 'hover' && index !== this.activeIndex) {
          this.activeIndex = index;
        }
      }
    },

    created() {
      this.throttledArrowClick = throttle(300, true, index => {
        this.setActiveItem(index);
      });
      this.throttledIndicatorHover = throttle(300, index => {
        this.handleIndicatorHover(index);
      });
    },
    mounted() {
      this.updateItems();
      this.$nextTick(() => {
        addResizeListener(this.$el, this.resetItemPosition);
        if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
          this.activeIndex = this.initialIndex;
        }
        this.startTimer();
      });
    },
    beforeDestroy() {
      if (this.$el) removeResizeListener(this.$el, this.resetItemPosition);
      this.pauseTimer();
    }
  };
</script>
