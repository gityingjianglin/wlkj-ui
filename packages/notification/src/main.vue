<template>
  <transition name="wl-notification-fade">
    <div
      :class="['wl-notification', customClass, horizontalClass]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="click"
      role="alert"
    >
      <i
        class="wl-notification__icon"
       :class="[type, typeClass, iconClass]"
       v-if="type || iconClass">
      </i>
      <div class="wl-notification__group">
        <h2 class="wl-notification__title" v-text="title"></h2>
        <div class="wl-notification__content" v-show="message">
          <slot>
            <p v-if="!dangerouslyUseHtmlString">{{message}}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div v-if="showClose" class="wl-notification__closeBtn wl-icon-CloseOutlined" @click.stop="close"></div>
      </div>
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
        type: '',
        iconClass: '',
        customClass: '',
        title: '',
        message: '',
        dangerouslyUseHtmlString: false,
        duration: 4500,
        onClick: null,
        onClose: null,
        showClose: true,
        timer: '', // 定时器
        position: 'top-right', // 位置
        verticalOffset: 0,
        closed: false
      };
    },
    computed: {
      horizontalClass() {
        return this.position.indexOf('right') > -1 ? 'right' : 'left';
      },
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
      verticalProperty() {
        return /^top-/.test(this.position) ? 'top' : 'bottom';
      },
      positionStyle() {
        return {
          [this.verticalProperty]: `${ this.verticalOffset }px`
        };
      }
    },
    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.$el.addEventListener('transitionend', this.destroyElement);
        }
      }
    },
    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$el.parentNode.removeChild(this.$el);
        this.$destroy(true);
      },
      click() {
        if (typeof this.onClick === 'function') {
          this.onClick();
        }
      },
      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose();
        }
      },
      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.closed = true;
            }
          }, this.duration);
        }
      },
      clearTimer() {
        clearTimeout(this.timer);
      },
      keydown(e) {
        if (e.keyCode === 48 || e.keyCode === 8) {
          // keyCode 46=Delete 8=Backspace
          clearTimeout(this.timer);
        } else if (e.keyCode === 27) {
          // keyCode 27=esc
          if (!this.closed) {
            this.closed = true;
          }
        } else {
          // 回复倒计时
          this.startTimer();
        }
      }
    },
    mounted() {
      /* if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.closed = true;
          }
        }, this.duration)
      } */
      this.startTimer();
      document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>