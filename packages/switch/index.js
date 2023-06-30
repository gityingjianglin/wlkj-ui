import WlSwitch from './src/main';

/* istanbul ignore next */
WlSwitch.install = function(Vue) {
  Vue.component(WlSwitch.name, WlSwitch);
};

export default WlSwitch;
