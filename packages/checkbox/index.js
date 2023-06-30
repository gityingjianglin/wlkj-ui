import WlCheckbox from './src/checkbox';

/* istanbul ignore next */
WlCheckbox.install = function(Vue) {
  Vue.component(WlCheckbox.name, WlCheckbox);
};

export default WlCheckbox;
