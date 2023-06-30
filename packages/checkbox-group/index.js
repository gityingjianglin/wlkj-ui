import WlCheckboxGroup from '../checkbox/src/checkbox-group.vue';

/* istanbul ignore next */
WlCheckboxGroup.install = function(Vue) {
  Vue.component(WlCheckboxGroup.name, WlCheckboxGroup);
};

export default WlCheckboxGroup;
