<template>
  <transition name="wl-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="['wl-message',
        customClass,
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        type && !iconClass ? `wl-message--${type}` : ''
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert"
    >
      <i :class="iconClass" v-if="iconClass"></i>
      <i v-else :class="['wl-message__icon', typeClass]"></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="wl-message__content">{{ message }}</p>
        <p v-else v-html="message" class="wl-message__content"></p>
      </slot>
      <i v-if="showClose" class="wl-message__closeBtn wl-icon-CloseOutlined" @click="close"></i>
    </div>
  </transition>
</template>
<script>
  let typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
  };
  export default {
    data() {
      return {
        visible: false,
        type: 'info',
        iconClass: '',
        customClass: '',
        message: '',
        dangerouslyUseHTMLString: false,
        duration: 3000,
        onClose: null,
        showClose: true,
        timer: '', // 定时器
        verticalOffset: 20,
        closed: false,
        center: false
      };
    },
    computed: {
      typeClass() {
        if (typeMap[this.type]) {
          if (this.type === 'success') {
            return 'wl-icon-CheckCircleOutline';
          } else if (this.type === 'info' || this.type === 'warning') {
            return 'wl-icon-InfoCircleFilled';
          } else if (this.type === 'error') {
            return 'wl-icon-CloseCircleFilled';
          }
        }
      },
      positionStyle() {
        return {
          'top': `${ this.verticalOffset }px`
        };
      }
    },
    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
        }
      }
    },
    methods: {
      handleAfterLeave() {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },
      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },
      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      },
      clearTimer() {
        clearTimeout(this.timer);
      },
      keydown(e) {
        if (e.keyCode === 27) {
          // keyCode 27=esc
          if (!this.closed) {
            this.close();
          }
        }
      }
    },
    mounted() {
      this.startTimer();
      document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>