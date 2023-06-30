import WlInput from './src/input';

/* istanbul ignore next */
WlInput.install = function(Vue) {
  Vue.component(WlInput.name, WlInput);
};

export default WlInput;
