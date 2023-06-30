import WlSlider from './src/main';

/* istanbul ignore next */
WlSlider.install = function(Vue) {
  Vue.component(WlSlider.name, WlSlider);
};

export default WlSlider;
