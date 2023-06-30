import WlTableColumn from '../table/src/table-column';

/* istanbul ignore next */
WlTableColumn.install = function(Vue) {
  Vue.component(WlTableColumn.name, WlTableColumn);
};

export default WlTableColumn;
