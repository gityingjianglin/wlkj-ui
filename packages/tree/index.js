import WlTree from './src/main';

/* istanbul ignore next */
WlTree.install = function(Vue) {
  Vue.component(WlTree.name, WlTree);
};

export default WlTree;
