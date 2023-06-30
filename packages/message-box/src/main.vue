<template>
  <transition name="msgbox-fade">
    <div
      class="wl-message-box__wrapper"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'">
      <div class="wl-message-box" :class="[customClass, center && 'wl-message-box--center']">
        <div class="wl-message-box__header" v-if="title !== null">
          <div class="wl-message-box__title">
            <div
              :class="['wl-message-box__status', icon]"
              v-if="icon && center">
            </div>
            <span>{{ title }}</span>
          </div>
          <button
            type="button"
            class="wl-message-box__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')">
            <i class="wl-message-box__close wl-icon-CloseOutlined"></i>
          </button>
        </div>
        <div class="wl-message-box__content">
          <div class="wl-message-box__container">
            <div
              :class="['wl-message-box__status', icon]"
              v-if="icon && !center && message !== ''">
            </div>
            <div class="wl-message-box__message" v-if="message !== ''">
              <slot>
                <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
                <p v-else v-html="message"></p>
              </slot>
            </div>
          </div>
          <div class="wl-message-box__input" v-show="showInput">
            <wl-input
              v-model="inputValue"
              :type="inputType"
              @keydown.enter.native="handleInputEnter"
              :placeholder="inputPlaceholder"
              ref="input"></wl-input>
            <div class="wl-message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="wl-message-box__btns">
          <wl-button
            :loading="cancelButtonLoading"
            :class="[ cancelButtonClasses ]"
            v-if="showCancelButton"
            :round="roundButton"
            size="medium"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')">
            {{ cancelButtonText || t('wl.messagebox.cancel') }}
          </wl-button>
          <wl-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[ confirmButtonClasses ]"
            v-show="showConfirmButton"
            :round="roundButton"
            size="medium"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')">
            {{ confirmButtonText || t('wl.messagebox.confirm') }}
          </wl-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popup from 'wlkj-ui/src/utils/popup';
  import Locale from 'wlkj-ui/src/mixins/locale';
  // import ElInput from 'wlkj-ui/packages/input';
  import WlButton from 'wlkj-ui/packages/button';
  import { addClass, removeClass } from 'wlkj-ui/src/utils/dom';
  import { t } from 'wlkj-ui/src/locale';
  import Dialog from 'wlkj-ui/src/utils/aria-dialog';

  let messageBox;
  let typeMap = {
    success: 'wl-icon-CheckCircleOutline',
    info: 'wl-icon-InfoCircleFilled',
    warning: 'wl-icon-InfoCircleFilled',
    error: 'wl-icon-CloseCircleOutlined'
  };

  export default {
    mixins: [Popup, Locale],

    props: {
      modal: {
        default: true
      },
      lockScroll: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      closeOnHashChange: {
        // 配置路由切换是否关闭弹窗
        default: true
      },
      center: {
        default: false,
        type: Boolean
      },
      roundButton: {
        default: false,
        type: Boolean
      }
    },

    components: {
      // ElInput,
      WlButton
    },

    computed: {
      icon() {
        const { type, iconClass } = this;
        return iconClass || (type && typeMap[type] ? `${ typeMap[type] }` : '');
      },

      confirmButtonClasses() {
        return `wl-button--primary ${ this.confirmButtonClass }`;
      },
      cancelButtonClasses() {
        return `${ this.cancelButtonClass }`;
      }
    },

    methods: {
      getSafeClose() {
        const currentId = this.uid;
        return () => {
          this.$nextTick(() => {
            if (currentId === this.uid) this.doClose();
          });
        };
      },
      doClose() {
        if (!this.visible) return;
        this.visible = false;
        this._closing = true;

        this.onClose && this.onClose();
        messageBox.closeDialog(); // 解绑
        if (this.lockScroll) {
          setTimeout(this.restoreBodyStyle, 200);
        }
        this.opened = false;
        this.doAfterClose();
        setTimeout(() => {
          if (this.action) this.callback(this.action, this);
        });
      },

      handleWrapperClick() {
        if (this.closeOnClickModal) {
          this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel');
        }
      },

      handleInputEnter() {
        if (this.inputType !== 'textarea') {
          return this.handleAction('confirm');
        }
      },

      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        this.action = action;
        if (typeof this.beforeClose === 'function') {
          this.close = this.getSafeClose();
          this.beforeClose(action, this, this.close);
        } else {
          this.doClose();
        }
      },

      validate() {
        if (this.$type === 'prompt') {
          const inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || t('wl.messagebox.error');
            addClass(this.getInputElement(), 'invalid');
            return false;
          }
          const inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            const validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || t('wl.messagebox.error');
              addClass(this.getInputElement(), 'invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              addClass(this.getInputElement(), 'invalid');
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        removeClass(this.getInputElement(), 'invalid');
        return true;
      },
      getFirstFocus() {
        const btn = this.$el.querySelector('.wl-message-box__btns .wl-button');
        const title = this.$el.querySelector('.wl-message-box__btns .wl-message-box__title');
        return btn || title;
      },
      getInputElement() {
        const inputRefs = this.$refs.input.$refs;
        return inputRefs.input || inputRefs.textarea;
      },
      handleClose() {
        this.handleAction('close');
      }
    },

    watch: {
      inputValue: {
        immediate: true,
        handler(val) {
          this.$nextTick(_ => {
            if (this.$type === 'prompt' && val !== null) {
              this.validate();
            }
          });
        }
      },

      visible(val) {
        if (val) {
          this.uid++;
          if (this.$type === 'alert' || this.$type === 'confirm') {
            this.$nextTick(() => {
              this.$refs.confirm.$el.focus();
            });
          }
          this.focusAfterClosed = document.activeElement;
          messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
        }

        // prompt
        if (this.$type !== 'prompt') return;
        if (val) {
          setTimeout(() => {
            if (this.$refs.input && this.$refs.input.$el) {
              this.getInputElement().focus();
            }
          }, 500);
        } else {
          this.editorErrorMessage = '';
          removeClass(this.getInputElement(), 'invalid');
        }
      }
    },

    mounted() {
      this.$nextTick(() => {
        if (this.closeOnHashChange) {
          // 绑定路由切换事件，关闭弹窗
          window.addEventListener('hashchange', this.close);
        }
      });
    },

    beforeDestroy() {
      if (this.closeOnHashChange) {
        // 移除路由切换监听事件
        window.removeEventListener('hashchange', this.close);
      }
      setTimeout(() => {
        messageBox.closeDialog();
      });
    },

    data() {
      return {
        uid: 1,
        title: undefined,
        message: '',
        type: '',
        iconClass: '',
        customClass: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputType: 'text',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        action: '',
        confirmButtonText: '',
        cancelButtonText: '',
        confirmButtonLoading: false,
        cancelButtonLoading: false,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null,
        dangerouslyUseHTMLString: false,
        focusAfterClosed: null,
        isOnComposition: false,
        distinguishCancelAndClose: false
      };
    }
  };
</script>
