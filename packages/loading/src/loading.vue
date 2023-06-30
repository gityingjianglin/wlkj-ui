<template>
  <transition class="wl-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="wl-loading-mask"
      :style="{ backgroundColor: background || ''}"
      :class="[ customClass, fullscreen ? 'is-fullscreen' : '']"
    >
      <div class="wl-loading-spinner">
        <svg v-if="!spinner" class="circular" viewBox="24 24 44 44">
          <circle class="path" cx="46" cy="46" r="20" fill="none"></circle>
        </svg>
        <i v-else :class="spinner"></i>
        <div v-if="text" class="wl-loading-text">
          {{text}}
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'Loading',
    data() {
      return {
        visible: false, // 是否显示
        text: null, // loading 文字 加载中
        fullscreen: true, // 是否全屏展示
        spinner: null, // loading icon 来源于icon库 wl-icon-ClockCircleFilled
        background: null, // 背景颜色
        customClass: '' // 自定义样式类
      };
    },
    methods: {
      // 如有绑定after-leave事件，触发绑定的事件，用于组件消失有以后执行绑定函数
      handleAfterLeave() {
        this.$emit('after-leave');
      },
      setText(text) {
        this.text = text;
      }
    }
  };
</script>
