import Vue from 'vue';
import merge from 'wlkj-ui/src/utils/merge';
import PopupManager from 'wlkj-ui/src/utils/popup/popup-manager';
import getScrollBarWidth from '../scrollbar-width';
import { getStyle, addClass, removeClass, hasClass } from '../dom';

/*
 * 弹窗主体基础类，抽取默认属性及方法，可通过mixins方式注入到各种弹窗组件中，减少各组件公共代码
 * 各个弹窗组件需依赖common/popup.scss
 *
*/

let idSeed = 1; // 弹窗自增长id
let scrollBarWidth; // 滚动条宽度

export default {
  props: {
    // 弹窗显示
    visible: {
      type: Boolean,
      default: false
    },
    // 打开延迟
    openDelay: {},
    // 关闭延迟
    closeDelay: {},
    // 设置弹窗和遮罩起始层级
    zIndex: {},
    // 是否需要遮罩
    modal: {
      type: Boolean,
      default: false
    },
    // 弹窗以动画fade方式渐入
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {},
    // 是否将遮罩层插入body标签根部
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    // 锁定body，在有遮罩弹窗的时候，不允许滚动
    lockScroll: {
      type: Boolean,
      default: true
    },
    // 是否允许按esc键，关闭弹窗
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    // 是否允许点击遮罩层关闭弹窗
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  beforeMount() {
    this._popupId = 'popup-' + idSeed++;
    PopupManager.register(this._popupId, this);
  },

  beforeDestroy() {
    PopupManager.deregister(this._popupId);
    PopupManager.closeModal(this._popupId);

    this.restoreBodyStyle();
  },

  data() {
    return {
      opened: false, // 已经打开标识
      bodyPaddingRight: null,
      computedBodyPaddingRight: 0,
      withoutHiddenClass: true,
      rendered: false // 已经渲染标识
    };
  },

  watch: {
    visible(val) {
      if (val) {
        if (this._opening) return;
        if (!this.rendered) {
          this.rendered = true;
          Vue.nextTick(() => {
            this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    }
  },

  methods: {
    open(options) {
      if (!this.rendered) {
        this.rendered = true;
      }

      const props = merge({}, this.$props || this, options);

      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._openTimer);

      const openDelay = Number(props.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null;
          this.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },

    doOpen(props) {
      if (this.$isServer) return;
      if (this.willOpen && !this.willOpen()) return;
      if (this.opened) return;

      this._opening = true;

      const dom = this.$el;

      const modal = props.modal;

      const zIndex = props.zIndex;
      if (zIndex) {
        PopupManager.zIndex = zIndex;
      }

      if (modal) {
        if (this._closing) {
          PopupManager.closeModal(this._popupId);
          this._closing = false;
        }
        // 注册并打开弹窗遮罩层
        PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), this.modalAppendToBody ? undefined : dom, props.modalClass, props.modalFade);
        if (props.lockScroll) {
          // 弹窗body禁止滚动，为防止弹窗打开有抖动效果，需动态计算出body，padding-right补白（如果有的话）
          this.withoutHiddenClass = !hasClass(document.body, 'wl-popup-parent--hidden');
          if (this.withoutHiddenClass) {
            this.bodyPaddingRight = document.body.style.paddingRight;
            this.computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10);
          }
          scrollBarWidth = getScrollBarWidth();
          let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
          let bodyOverflowY = getStyle(document.body, 'overflowY');
          if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
            // body padding-right补白，又自身body padding-right补白 + 滚动条宽度，用以防止抖动效果
            document.body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px';
          }
          // 添加body禁止滚动样式 overflow：hidden
          addClass(document.body, 'wl-popup-parent--hidden');
        }
      }

      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }

      // 设置弹窗主体层级顺序，zIndex顺序由PopupManager统一管理，存储在PopupManager.zIndex中
      dom.style.zIndex = PopupManager.nextZIndex();
      this.opened = true;

      this.onOpen && this.onOpen();

      this.doAfterOpen();
    },

    doAfterOpen() {
      // 打开弹窗以后，关闭弹窗正在打开status
      this._opening = false;
    },

    close() {
      if (this.willClose && !this.willClose()) return;

      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }
      clearTimeout(this._closeTimer);

      const closeDelay = Number(this.closeDelay);

      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null;
          this.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },

    doClose() {
      this._closing = true;

      this.onClose && this.onClose();

      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }

      this.opened = false;

      this.doAfterClose();
    },

    doAfterClose() {
      PopupManager.closeModal(this._popupId);
      this._closing = false;
    },

    restoreBodyStyle() {
      if (this.modal && this.withoutHiddenClass) {
        document.body.style.paddingRight = this.bodyPaddingRight;
        removeClass(document.body, 'wl-popup-parent--hidden');
      }
      this.withoutHiddenClass = true;
    }
  }
};

export {
  PopupManager
};
