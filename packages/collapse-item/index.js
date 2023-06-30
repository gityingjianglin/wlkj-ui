import WlCollapseItem from '../collapse/src/collapse-item';

/* istanbul ignore next */
WlCollapseItem.install = function(Vue) {
  Vue.component(WlCollapseItem.name, WlCollapseItem);
};

export default WlCollapseItem;
