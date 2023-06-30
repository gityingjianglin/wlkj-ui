import WlOptionGroup from '../select/src/option-group';

/* istanbul ignore next */
WlOptionGroup.install = function(Vue) {
  Vue.component(WlOptionGroup.name, WlOptionGroup);
};

export default WlOptionGroup;
