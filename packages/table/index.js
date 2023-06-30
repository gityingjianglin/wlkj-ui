import WlTable from './src/table';

/* istanbul ignore next */
WlTable.install = function(Vue) {
  Vue.component(WlTable.name, WlTable);
};

export default WlTable;
