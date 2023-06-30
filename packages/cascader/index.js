import WlCascader from './src/main';

/* istanbul ignore next */
WlCascader.install = function(Vue) {
  Vue.component(WlCascader.name, WlCascader);
};

export default WlCascader;
