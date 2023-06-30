import WlTransfer from './src/main';

/* istanbul ignore next */
WlTransfer.install = function(Vue) {
  Vue.component(WlTransfer.name, WlTransfer);
};

export default WlTransfer;
