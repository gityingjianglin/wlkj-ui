import WlProgress from './src/progress.vue';

/* istanbul ignore next */
WlProgress.install = function(Vue) {
  Vue.component(WlProgress.name, WlProgress);
};

export default WlProgress;
