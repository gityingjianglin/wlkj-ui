import WlBreadcrumbItem from './src/main';

/* istanbul ignore next */
WlBreadcrumbItem.install = function(Vue) {
  Vue.component(WlBreadcrumbItem.name, WlBreadcrumbItem);
};

export default WlBreadcrumbItem;
