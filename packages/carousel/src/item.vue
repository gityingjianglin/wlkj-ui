<template>
  <div
    v-show="ready"
    class="wl-carousel__item"
    :class="{
      'is-active': active,
      'wl-carousel__item--card': $parent.type === 'card',
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating
    }"
    @click="handleItemClick"
    :style="itemStyle">
    <div
      v-if="$parent.type === 'card'"
      v-show="!active"
      class="wl-carousel__mask">
    </div>
    <slot></slot>
  </div>
</template>
<script>
  import { autoprefixer } from 'wlkj-ui/src/utils/util';
  const CARD_SCALE = 0.83;
  export default {
    name: 'WlCarouselItem',
    props: {
      name: String,
      label: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        hover: false,
        translate: 0,
        scale: 1,
        active: false,
        ready: false,
        inStage: false,
        animating: false
      };
    },

    computed: {
      parentDirection() {
        return this.$parent.direction;
      },

      itemStyle() {
        const translateType = this.parentDirection === 'vertical' ? 'translateY' : 'translateX';
        const value = `${translateType}(${ this.translate }px) scale(${ this.scale })`;
        const style = {
          transform: value
        };
        return autoprefixer(style);
      }
    },
    methods: {
      processIndex(index, activeIndex, length) {
        // carousel只有当前元素和即将激活元素才附加动画属性，其它元素直接定位位置，提高性能。
        // 通过算法保证当前元素相邻的前后1-2个元素排序正常，其它元素则通过算法分布在当前元素两侧展示。
        if (activeIndex === 0 && index === length - 1) {
          // 设置最后一个元素的位置，紧邻第一个元素左边
          return -1;
        } else if (activeIndex === length - 1 && index === 0) {
          // 设置第一个元素的位置，紧邻最后一个元素的右边
          return length;
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
          // 以激活元素序号-当前元素序号，如果大于length/2，则当前元素向右边排列
          return length + 1;
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
          // 以当前元素序号-激活元素序号，如果大于length/2，则当前元素向左边边排列
          return -2;
        }
        return index;
      },

      calcCardTranslate(index, activeIndex) {
        const parentWidth = this.$parent.$el.offsetWidth;
        if (this.inStage) {
          return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
        } else if (index < activeIndex) {
          return -(1 + CARD_SCALE) * parentWidth / 4;
        } else {
          return (3 + CARD_SCALE) * parentWidth / 4;
        }
      },

      calcTranslate(index, activeIndex, isVertical) {
        const distance = this.$parent.$el[isVertical ? 'offsetHeight' : 'offsetWidth'];
        return distance * (index - activeIndex);
      },

      translateItem(index, activeIndex, oldIndex) {
        const parentType = this.$parent.type;
        const parentDirection = this.parentDirection;
        const length = this.$parent.items.length;
        if (parentType !== 'card' && oldIndex !== undefined) {
          this.animating = index === activeIndex || index === oldIndex;
        }
        if (index !== activeIndex && length > 2 && this.$parent.loop) {
          index = this.processIndex(index, activeIndex, length);
        }
        if (parentType === 'card') {
          if (parentDirection === 'vertical') {
            console.warn('[Element Warn][Carousel]vertical direction is not supported in card mode');
          }
          this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
          this.active = index === activeIndex;
          this.translate = this.calcCardTranslate(index, activeIndex);
          this.scale = this.active ? 1 : CARD_SCALE;
        } else {
          this.active = index === activeIndex;
          const isVertical = parentDirection === 'vertical';
          this.translate = this.calcTranslate(index, activeIndex, isVertical);
          this.scale = 1;
        }
        this.ready = true;
      },

      handleItemClick() {
        const parent = this.$parent;
        if (parent && parent.type === 'card') {
          const index = parent.items.indexOf(this);
          parent.setActiveItem(index);
        }
      }
    },
    created() {
      this.$parent && this.$parent.updateItems();
    },
    destroyed() {
      this.$parent && this.$parent.updateItems();
    }
  };
</script>
