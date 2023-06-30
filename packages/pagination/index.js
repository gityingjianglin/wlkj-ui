import WlPagination from './src/pagination';

/* istanbul ignore next */
WlPagination.install = function(Vue) {
  Vue.component(WlPagination.name, WlPagination);
};

export default WlPagination;
