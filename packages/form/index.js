import WlForm from './src/form';

/* istanbul ignore next */
WlForm.install = function(Vue) {
  Vue.component(WlForm.name, WlForm);
};

export default WlForm;
