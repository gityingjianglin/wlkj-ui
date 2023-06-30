import WlIcon from './src/icon.vue';

/* istanbul ignore next */
WlIcon.install = function(Vue) {
  Vue.component(WlIcon.name, WlIcon);
};

export default WlIcon;
