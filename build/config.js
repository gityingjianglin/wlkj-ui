var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var externals = {};

console.log('utilsList~~~~~~~~~~~~~~~~~~~~~');
console.log(utilsList);
console.log('utilsList end~~~~~~~~~~~~~~~~~~~~~');
Object.keys(Components).forEach(function(key) {
  externals[`wlkj-ui/packages/${key}`] = `wlkj-ui/lib/${key}`;
});

externals['wlkj-ui/src/locale'] = 'wlkj-ui/lib/locale';
utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`wlkj-ui/src/utils/${file}`] = `wlkj-ui/lib/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`wlkj-ui/src/mixins/${file}`] = `wlkj-ui/lib/mixins/${file}`;
});
transitionList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`wlkj-ui/src/transitions/${file}`] = `wlkj-ui/lib/transitions/${file}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

console.log('externals~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(externals);
console.log('externals end~~~~~~~~~~~~~~~~~~~~~~~~');
/*
 * 打印范例
 [
  {
    vue: 'vue',
    'wlkj-ui/packages/pagination': 'wlkj-ui/lib/pagination',
    'wlkj-ui/packages/dialog': 'wlkj-ui/lib/dialog',
    'wlkj-ui/packages/autocomplete': 'wlkj-ui/lib/autocomplete',
    'wlkj-ui/packages/dropdown': 'wlkj-ui/lib/dropdown',
    'wlkj-ui/packages/dropdown-menu': 'wlkj-ui/lib/dropdown-menu',
    'wlkj-ui/packages/dropdown-item': 'wlkj-ui/lib/dropdown-item',
    'wlkj-ui/packages/menu': 'wlkj-ui/lib/menu',
    'wlkj-ui/packages/submenu': 'wlkj-ui/lib/submenu',
    'wlkj-ui/packages/menu-item': 'wlkj-ui/lib/menu-item',
    'wlkj-ui/packages/menu-item-group': 'wlkj-ui/lib/menu-item-group',
    'wlkj-ui/packages/input': 'wlkj-ui/lib/input',
    'wlkj-ui/packages/input-number': 'wlkj-ui/lib/input-number',
    'wlkj-ui/packages/radio': 'wlkj-ui/lib/radio',
    'wlkj-ui/packages/radio-group': 'wlkj-ui/lib/radio-group',
    'wlkj-ui/packages/radio-button': 'wlkj-ui/lib/radio-button',
    'wlkj-ui/packages/checkbox': 'wlkj-ui/lib/checkbox',
    'wlkj-ui/packages/checkbox-button': 'wlkj-ui/lib/checkbox-button',
    'wlkj-ui/packages/checkbox-group': 'wlkj-ui/lib/checkbox-group',
    'wlkj-ui/packages/switch': 'wlkj-ui/lib/switch',
    'wlkj-ui/packages/select': 'wlkj-ui/lib/select',
    'wlkj-ui/packages/option': 'wlkj-ui/lib/option',
    'wlkj-ui/packages/option-group': 'wlkj-ui/lib/option-group',
    'wlkj-ui/packages/button': 'wlkj-ui/lib/button',
    'wlkj-ui/packages/button-group': 'wlkj-ui/lib/button-group',
    'wlkj-ui/packages/table': 'wlkj-ui/lib/table',
    'wlkj-ui/packages/table-column': 'wlkj-ui/lib/table-column',
    'wlkj-ui/packages/date-picker': 'wlkj-ui/lib/date-picker',
    'wlkj-ui/packages/time-select': 'wlkj-ui/lib/time-select',
    'wlkj-ui/packages/time-picker': 'wlkj-ui/lib/time-picker',
    'wlkj-ui/packages/popover': 'wlkj-ui/lib/popover',
    'wlkj-ui/packages/tooltip': 'wlkj-ui/lib/tooltip',
    'wlkj-ui/packages/message-box': 'wlkj-ui/lib/message-box',
    'wlkj-ui/packages/breadcrumb': 'wlkj-ui/lib/breadcrumb',
    'wlkj-ui/packages/breadcrumb-item': 'wlkj-ui/lib/breadcrumb-item',
    'wlkj-ui/packages/form': 'wlkj-ui/lib/form',
    'wlkj-ui/packages/form-item': 'wlkj-ui/lib/form-item',
    'wlkj-ui/packages/tabs': 'wlkj-ui/lib/tabs',
    'wlkj-ui/packages/tab-pane': 'wlkj-ui/lib/tab-pane',
    'wlkj-ui/packages/tag': 'wlkj-ui/lib/tag',
    'wlkj-ui/packages/tree': 'wlkj-ui/lib/tree',
    'wlkj-ui/packages/alert': 'wlkj-ui/lib/alert',
    'wlkj-ui/packages/notification': 'wlkj-ui/lib/notification',
    'wlkj-ui/packages/slider': 'wlkj-ui/lib/slider',
    'wlkj-ui/packages/loading': 'wlkj-ui/lib/loading',
    'wlkj-ui/packages/icon': 'wlkj-ui/lib/icon',
    'wlkj-ui/packages/row': 'wlkj-ui/lib/row',
    'wlkj-ui/packages/col': 'wlkj-ui/lib/col',
    'wlkj-ui/packages/upload': 'wlkj-ui/lib/upload',
    'wlkj-ui/packages/progress': 'wlkj-ui/lib/progress',
    'wlkj-ui/packages/spinner': 'wlkj-ui/lib/spinner',
    'wlkj-ui/packages/message': 'wlkj-ui/lib/message',
    'wlkj-ui/packages/badge': 'wlkj-ui/lib/badge',
    'wlkj-ui/packages/card': 'wlkj-ui/lib/card',
    'wlkj-ui/packages/rate': 'wlkj-ui/lib/rate',
    'wlkj-ui/packages/steps': 'wlkj-ui/lib/steps',
    'wlkj-ui/packages/step': 'wlkj-ui/lib/step',
    'wlkj-ui/packages/carousel': 'wlkj-ui/lib/carousel',
    'wlkj-ui/packages/scrollbar': 'wlkj-ui/lib/scrollbar',
    'wlkj-ui/packages/carousel-item': 'wlkj-ui/lib/carousel-item',
    'wlkj-ui/packages/collapse': 'wlkj-ui/lib/collapse',
    'wlkj-ui/packages/collapse-item': 'wlkj-ui/lib/collapse-item',
    'wlkj-ui/packages/cascader': 'wlkj-ui/lib/cascader',
    'wlkj-ui/packages/color-picker': 'wlkj-ui/lib/color-picker',
    'wlkj-ui/packages/transfer': 'wlkj-ui/lib/transfer',
    'wlkj-ui/packages/container': 'wlkj-ui/lib/container',
    'wlkj-ui/packages/header': 'wlkj-ui/lib/header',
    'wlkj-ui/packages/aside': 'wlkj-ui/lib/aside',
    'wlkj-ui/packages/main': 'wlkj-ui/lib/main',
    'wlkj-ui/packages/footer': 'wlkj-ui/lib/footer',
    'wlkj-ui/packages/timeline': 'wlkj-ui/lib/timeline',
    'wlkj-ui/packages/timeline-item': 'wlkj-ui/lib/timeline-item',
    'wlkj-ui/packages/link': 'wlkj-ui/lib/link',
    'wlkj-ui/packages/divider': 'wlkj-ui/lib/divider',
    'wlkj-ui/packages/image': 'wlkj-ui/lib/image',
    'wlkj-ui/packages/calendar': 'wlkj-ui/lib/calendar',
    'wlkj-ui/packages/backtop': 'wlkj-ui/lib/backtop',
    'wlkj-ui/packages/infinite-scroll': 'wlkj-ui/lib/infinite-scroll',
    'wlkj-ui/packages/page-header': 'wlkj-ui/lib/page-header',
    'wlkj-ui/packages/cascader-panel': 'wlkj-ui/lib/cascader-panel',
    'wlkj-ui/packages/avatar': 'wlkj-ui/lib/avatar',
    'wlkj-ui/packages/drawer': 'wlkj-ui/lib/drawer',
    'wlkj-ui/packages/popconfirm': 'wlkj-ui/lib/popconfirm',
    'wlkj-ui/packages/skeleton': 'wlkj-ui/lib/skeleton',
    'wlkj-ui/packages/skeleton-item': 'wlkj-ui/lib/skeleton-item',
    'wlkj-ui/packages/empty': 'wlkj-ui/lib/empty',
    'wlkj-ui/packages/descriptions': 'wlkj-ui/lib/descriptions',
    'wlkj-ui/packages/descriptions-item': 'wlkj-ui/lib/descriptions-item',
    'wlkj-ui/packages/result': 'wlkj-ui/lib/result',
    'wlkj-ui/src/locale': 'wlkj-ui/lib/locale',
    'wlkj-ui/src/utils/after-leave': 'wlkj-ui/lib/utils/after-leave',
    'wlkj-ui/src/utils/aria-dialog': 'wlkj-ui/lib/utils/aria-dialog',
    'wlkj-ui/src/utils/aria-utils': 'wlkj-ui/lib/utils/aria-utils',
    'wlkj-ui/src/utils/clickoutside': 'wlkj-ui/lib/utils/clickoutside',
    'wlkj-ui/src/utils/date-util': 'wlkj-ui/lib/utils/date-util',
    'wlkj-ui/src/utils/date': 'wlkj-ui/lib/utils/date',
    'wlkj-ui/src/utils/dom': 'wlkj-ui/lib/utils/dom',
    'wlkj-ui/src/utils/menu': 'wlkj-ui/lib/utils/menu',
    'wlkj-ui/src/utils/merge': 'wlkj-ui/lib/utils/merge',
    'wlkj-ui/src/utils/popper': 'wlkj-ui/lib/utils/popper',
    'wlkj-ui/src/utils/popup': 'wlkj-ui/lib/utils/popup',
    'wlkj-ui/src/utils/resize-event': 'wlkj-ui/lib/utils/resize-event',
    'wlkj-ui/src/utils/scroll-into-view': 'wlkj-ui/lib/utils/scroll-into-view',
    'wlkj-ui/src/utils/scrollbar-width': 'wlkj-ui/lib/utils/scrollbar-width',
    'wlkj-ui/src/utils/shared': 'wlkj-ui/lib/utils/shared',
    'wlkj-ui/src/utils/types': 'wlkj-ui/lib/utils/types',
    'wlkj-ui/src/utils/util': 'wlkj-ui/lib/utils/util',
    'wlkj-ui/src/utils/vdom': 'wlkj-ui/lib/utils/vdom',
    'wlkj-ui/src/utils/vue-popper': 'wlkj-ui/lib/utils/vue-popper',
    'wlkj-ui/src/mixins/emitter': 'wlkj-ui/lib/mixins/emitter',
    'wlkj-ui/src/mixins/focus': 'wlkj-ui/lib/mixins/focus',
    'wlkj-ui/src/mixins/locale': 'wlkj-ui/lib/mixins/locale',
    'wlkj-ui/src/mixins/migrating': 'wlkj-ui/lib/mixins/migrating',
    'wlkj-ui/src/transitions/collapse-transition': 'wlkj-ui/lib/transitions/collapse-transition'
  },
  [Function (anonymous)]
] */

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'wlkj-ui': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
