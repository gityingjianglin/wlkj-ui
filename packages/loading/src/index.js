import Vue from 'vue';
import loadingVue from './loading.vue';
import { addClass, removeClass, getStyle } from 'wlkj-ui/src/utils/dom';
import { PopupManager } from 'wlkj-ui/src/utils/popup';
import afterLeave from 'wlkj-ui/src/utils/after-leave';
import merge from 'wlkj-ui/src/utils/merge';

// 创建Vue子类，可直接使用new LoadingConstructor(options) 生成子类实例，即loading.vue组件实例
const LoadingConstructor = Vue.extend(loadingVue);

// loading默认参数配置
const defaults = {
  text: null, // loading文字内容
  fullscreen: true, // 是否全屏标识
  body: false, // 是否插入body标签内
  lock: false, // 是否锁定窗口（禁止滚动）
  customClass: '' // 自定义loading样式类
};

let fullscreenLoading; // 单例全屏loading实例，关闭以后自动销毁

LoadingConstructor.prototype.originalPosition = '';
LoadingConstructor.prototype.originalOverflow = '';

LoadingConstructor.prototype.close = function() {
  // console.log('CCCCCCCCCCCCCCCCCCCCC');
  // console.log(this);
  if (this.fullscreen) {
    // 销毁全屏loading实例
    fullscreenLoading = undefined;
  }
  afterLeave(this, _ =>{
    // 清除父元素添加样式类，清除子元素loading实例，销毁loading实例
    // console.log('EEEEEEEEEEEEEEEEEE');
    // console.log(this);
    const target = this.fullscreen || this.body
      ? document.body
      : this.target;
    removeClass(target, 'wl-loading-parent--relative');
    removeClass(target, 'wl-loading-parent--hidden');
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    this.$destroy();
  }, 300);
  this.visible = false; // 隐藏loading实例
  // console.log('DDDDDDDDDDDDDDDDDD');
  // console.log(this);
};

/**
 * @param {*} options 实例参数
 * @param {*} parent 父元素dom节点
 * @param {*} instance 实例对象
 * 为loading实例增加样式，top，left，width，height，zIndex
 */
const addStyle = (options, parent, instance) => {
  let maskStyle = {};
  if (options.fullscreen) {
    instance.originalPosition = getStyle(document.body, 'position');
    instance.originalOverflow = getStyle(document.body, 'overflow');
    maskStyle.zIndex = PopupManager.nextZIndex();
  } else if (options.body) {
    instance.originalPosition = getStyle(document.body, 'position');
    ['top', 'left'].forEach(property => {
      let scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
      maskStyle[property] = options.target.getBoundingClientRect()[property] +
        document.body[scroll] +
        document.documentElement[scroll] +
        'px';
    });
    ['width', 'height'].forEach((property) => {
      maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px';
    });
  } else {
    instance.originalPosition = getStyle(parent, 'position');
  }
  Object.keys(maskStyle).forEach((property) => {
    instance.$el.style[property] = maskStyle[property];
  });
};

/**
 *
 * @param {*} options loading对象options参数
 * @returns 返回loading实例对象
 * 生成loading实例对象，并且插入到父节点中
 */
const loading = (options = {}) => {
  if (Vue.prototype.$isServer) return;
  options = merge({}, defaults, options);
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }

  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }

  let parent = options.body ? document.body : options.target;
  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  });
  addStyle(options, parent, instance);
  if (instance.originalPosition !== 'absolute' && instance.originalPosition !== 'fixed') {
    addClass(parent, 'wl-loading-parent--relative');
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, 'wl-loading-parent--hidden');
  }
  parent.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  if (options.fullscreen) {
    fullscreenLoading = instance;
  }
  return instance;
};

export default loading;
