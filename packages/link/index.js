import WlLink from './src/main';

/* istanbul ignore next */
WlLink.install = function(Vue) {
  Vue.component(WlLink.name, WlLink);
};

export default WlLink;
