function broadcast(componentName, eventName, params) {
  // 循环所有子组件，找到子组件名称为componentName的子组件，并触发$emit eventName事件
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    // 子级向父级组件派发事件（事件冒泡）
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      // 向上循环查找父级组件componentName等于指定componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        // 父级组件触发eventName事件
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    // 父级向子级广播事件
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
