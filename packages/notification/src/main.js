import Vue from 'vue';
import Main from './main.vue';
import merge from 'wlkj-ui/src/utils/merge';
import { PopupManager } from 'wlkj-ui/src/utils/popup';
import { isVNode } from 'wlkj-ui/src/utils/vdom';

const NotificationConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Notification = function(options) {
  if (Vue.prototype.$isServer) return;
  options = merge({}, options);
  let userOnClose = options.onClose;
  const id = 'notification_' + seed++;
  const position = options.position || 'top-right';

  options.onClose = function() {
    Notification.close(id, userOnClose);
  };

  instance = new NotificationConstructor({
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
  instance.dom = instance.$el;
  instance.dom.style.zIndex = PopupManager.nextZIndex();

  let verticalOffset = options.offset || 0;
  instances.filter((item) => {return item.position === position;}).forEach((item) => {
    verticalOffset += item.dom.offsetHeight + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance;
};
['success', 'warning', 'info', 'error'].forEach(type => {
  Notification[type] = options => {
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options
      };
    }
    options.type = type;
    return Notification(options);
  };
});
Notification.close = function(id, userOnClose) {
  let index = -1;
  let len = instances.length;
  const instance = instances.filter((item, i) => {
    if (item.id === id) {
      index = i;
      return true;
    } else {
      return false;
    }
  })[0];
  if (!instance) return;
  if (typeof userOnClose === 'function') {
    userOnClose();
  }
  instances.splice(index, 1);
  if (len <= 1) return;
  const position = instance.position;
  const removedHeight = instance.dom.offsetHeight;
  for (let i = 0; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].dom.style[instance.verticalProperty] = parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - 16 + 'px';
    }
  }
};
Notification.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Notification;
