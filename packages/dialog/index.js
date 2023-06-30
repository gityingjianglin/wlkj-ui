import WlDialog from './src/component';

/* istanbul ignore next */
WlDialog.install = function(Vue) {
  Vue.component(WlDialog.name, WlDialog);
};

export default WlDialog;
