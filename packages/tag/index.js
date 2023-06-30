import WlTag from './src/main';

/* istanbul ignore next */
WlTag.install = function(Vue) {
  Vue.component(WlTag.name, WlTag);
};

export default WlTag;
