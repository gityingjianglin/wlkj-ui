import WlRadio from './src/radio';

/* istanbul ignore next */
WlRadio.install = function(Vue) {
  Vue.component(WlRadio.name, WlRadio);
};

export default WlRadio;
