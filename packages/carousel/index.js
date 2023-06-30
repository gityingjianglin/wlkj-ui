import WlCarousel from './src/main';

/* istanbul ignore next */
WlCarousel.install = function(Vue) {
  Vue.component(WlCarousel.name, WlCarousel);
};

export default WlCarousel;
