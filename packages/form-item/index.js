import WlFormItem from '../form/src/form-item';

/* istanbul ignore next */
WlFormItem.install = function(Vue) {
  Vue.component(WlFormItem.name, WlFormItem);
};

export default WlFormItem;
