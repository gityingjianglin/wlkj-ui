import WlDatePicker from './src/main';

/* istanbul ignore next */
WlDatePicker.install = function(Vue) {
  Vue.component(WlDatePicker.name, WlDatePicker);
};

export default WlDatePicker;
