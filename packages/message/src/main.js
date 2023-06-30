import Vue from 'vue';
import Main from './main.vue';
import { PopupManager } from 'wlkj-ui/src/utils/popup';
import { isVNode } from 'wlkj-ui/src/utils/vdom';
import { isObject } from 'wlkj-ui/src/utils/types';

const MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  let userOnClose = options.onClose;
  const id = 'message_' + seed++;
  // const position = options.position || 'top-right';
  options.onClose = function() {
    Message.close(id, userOnClose);
  };

  instance = new MessageConstructor({
    data: options
  });

  if (isVNode(options.message)) {
    instance.$slots.default = [options.message];
    options.message = 'REPLACED_BY_VNODE';
  }

  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  instance.$el.style.zIndex = PopupManager.nextZIndex();

  let verticalOffset = options.offset || 20;
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance;
};
['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (isObject(options) && !isVNode(options)) {
      return Message({
        ...options,
        type
      });
    } else {
      return Message({
        message: options,
        type
      });
    }
  };
});
Message.close = function(id, userOnClose) {
  let index = -1;
  let len = instances.length;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      if (typeof userOnClose === 'function') {
        userOnClose();
      }
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1 ; i++) {
    let dom = instances[i].$el;
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
  }
};
Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
