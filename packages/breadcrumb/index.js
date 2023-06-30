import WlBreadcrumb from './src/main';

/* istanbul ignore next */
WlBreadcrumb.install = function(Vue) {
  Vue.component(WlBreadcrumb.name, WlBreadcrumb);
};

export default WlBreadcrumb;
