<template>
  <section class="wl-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>

<script>
  export default {
    name: 'WlContainer',
    componentName: 'WlContainer',
    props: {
      direction: String
    },
    computed: {
      isVertical() {
        if (this.direction === 'vertical') {
          return true;
        } else if (this.direction === 'horizontal') {
          return false;
        }
        // 判断默认插槽里面包含的vnode节点是否是wl-header/wl-footer，如果是则wl-container元素flex布局方向为纵向排列，flex-direction: column。
        return this.$slots && this.$slots.default
          ? this.$slots.default.some((vnode) => {
            const tag = vnode.componentOptions && vnode.componentOptions.tag;
            return tag === 'wl-header' || tag === 'wl-footer';
          })
          : false;
      }
    }
  };
</script>
