import WlCollapse from './src/collapse';

/* istanbul ignore next */
WlCollapse.install = function(Vue) {
  Vue.component(WlCollapse.name, WlCollapse);
};

export default WlCollapse;
