import Vue from 'vue';
import { addClass, removeClass } from 'wlkj-ui/src/utils/dom';

/*
 * 弹窗管理类库
 * 功能，统一管理zIndex层级顺序，统一存储弹窗主体实例对象
 * PopupManager.modalDom 遮罩dom对象
 * 弹窗遮罩数组 modalStack，存储所有遮罩对象相关信息，包括遮罩层级，遮罩所属弹窗主体popupId，遮罩样式等等
 * 弹窗主体instances对象存储弹窗主体对象，以popupId为key，value为弹窗主体对象，可以访问弹窗主体属性及方法
 *
*/
let hasModal = false;
let hasInitZIndex = false;
let zIndex;

const getModal = function() {
  if (Vue.prototype.$isServer) return;
  let modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    // 生成遮罩层modal，并保存到PopupManager对象
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom;
  }
  modalDom.addEventListener('touchmove', function(event) {
    event.preventDefault();
    event.stopPropagation();
  });
  modalDom.addEventListener('click', function() {
    PopupManager.doOnModalClick && PopupManager.doOnModalClick();
  });
  return modalDom;
};

const instances = {}; // 弹窗实例对象，以popupId为key，popupObj为value保存所有激活弹窗对象
const PopupManager = {
  modalFade: true,
  // 获取弹窗实例
  getInstance: function(id) {
    return instances[id];
  },
  // 注册弹窗实例
  register: function(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  // 反注册弹窗实例
  deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  nextZIndex: function() {
    return PopupManager.zIndex++;
  },
  modalStack: [], // 弹窗管理堆栈，保存弹窗相关信息，包括popupId，zIndex，可通过popupId从instances对象中查找实例
  // 弹窗管理类
  doOnModalClick() {
    const topModal = this.modalStack[this.modalStack.length - 1];
    if (!topModal) return;
    const instance = PopupManager.getInstance(topModal.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },
  // 打开遮罩
  openModal: function(id, zIndex, dom, modalClass, modalFade) {
    if (Vue.prototype.$isServer) return;
    if (!id || zIndex === undefined) return;

    this.modalFade = modalFade;
    const modalStack = this.modalStack;
    for (let i = 0; i < modalStack.length; i++) {
      const item = modalStack[i];
      if (item.id === id) return;
    }

    const modalDom = getModal();

    // 增加缓动v-modal-enter样式，形成缓动动画展示modal
    addClass(modalDom, 'v-modal');
    if (this.modalFade && !hasModal) {
      addClass(modalDom, 'v-modal-enter');
    }

    if (modalClass) {
      const classArr = modalClass.trim().split(/\s+/);
      classArr.forEach((v, i) => {
        addClass(modalDom, v);
      });
    }

    setTimeout(() => {
      removeClass(modalDom, 'v-modal-enter');
    }, 200);

    // 根据dom节点类型判断，modal是插入body节点下还是dom所在父元素根内部
    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }

    modalDom.tabIndex = 0;
    modalDom.style.display = '';

    // 弹窗堆栈推入modal实例相关信息
    this.modalStack.push({
      id: id,
      zIndex: zIndex,
      modalClass: modalClass
    });
  },
  // 关闭遮罩
  closeModal: function(id) {
    const modalStack = this.modalStack;
    const modalDom = getModal();

    if (modalStack.length > 0) {
      const topModal = modalStack[modalStack.length - 1];
      if (topModal.id === id) {
        if (topModal.modalClass) {
          const classArr = topModal.modalClass.trim().split(/\s+/);
          classArr.forEach((v, i) => {
            removeClass(modalDom, v);
          });
        }
        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1]['zIndex'];
        }
      } else {
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(modalDom, 'v-modal-leave');
      }

      setTimeout(() => {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = 'none';
          PopupManager.modalDom = undefined;
        }
        removeClass(modalDom, 'v-modal-leave');
      }, 200);
    }

  }
};

// 设置PopupManager.zIndex属性
Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    if (!hasInitZIndex) {
      zIndex = zIndex || (Vue.prototype.$WLKJ || {}).zIndex || 2000;
      hasInitZIndex = true;
    }
    return zIndex;
  },
  set(value) {
    zIndex = value;
  }
});

// 获取最上层弹窗实例
const getTopPopup = function() {
  if (Vue.prototype.$isServer) return;
  if (PopupManager.modalStack.length > 0) {
    const topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topPopup) return;
    const instance = PopupManager.getInstance(topPopup.id);
    return instance;
  }
};

if (!Vue.prototype.$isServer) {
  // 绑定keydown事件，监听键盘按键Esc，调用弹窗实例关闭事件，关闭弹窗
  window.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) {
      const topPopup = getTopPopup();
      if (topPopup && topPopup.closeOnPressEscape) {
        topPopup.handleClose ? topPopup.handleClose : (topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.close());
      }
    }
  });
}

export default PopupManager;
