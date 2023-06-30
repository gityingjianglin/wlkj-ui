import WlTabs from './src/main';

/* istanbul ignore next */
WlTabs.install = function(Vue) {
  Vue.component(WlTabs.name, WlTabs);
};

export default WlTabs;
