import WlTabPane from './src/main';

/* istanbul ignore next */
WlTabPane.install = function(Vue) {
  Vue.component(WlTabPane.name, WlTabPane);
};

export default WlTabPane;
