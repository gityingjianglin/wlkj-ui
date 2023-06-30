import WlOption from '../select/src/option';

/* istanbul ignore next */
WlOption.install = function(Vue) {
  Vue.component(WlOption.name, WlOption);
};

export default WlOption;
