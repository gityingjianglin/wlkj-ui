/*
 构建wlkj ui组件库加载文件，入口位置为src/index.js
*/
var Components = require('../../components.json'); // 获取组件名称和对应路径json文件
var fs = require('fs');
var render = require('json-templater/string'); // 模板字符串替换插件
var uppercamelcase = require('uppercamelcase'); // 文件转化为首字符大写驼峰命名法，menu-item -> MenuItem
var path = require('path');
var endOfLine = require('os').EOL; // 获取操作系统换行符

var OUTPUT_PATH = path.join(__dirname, '../../src/index.js'); // 输出路径
var IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';'; // import导入组件，字符串模板
var INSTALL_COMPONENT_TEMPLATE = '  {{name}}';
// 模板字符串
var MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */

{{include}}
import locale from 'wlkj-ui/src/locale';
import CollapseTransition from 'wlkj-ui/src/transitions/collapse-transition';

const components = [
{{install}},
  CollapseTransition
];

const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.use(InfiniteScroll);
  Vue.use(Loading.directive);

  Vue.prototype.$WLKJ = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };

  Vue.use(Loading.directive);
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '{{version}}',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  CollapseTransition,
  Loading,
{{list}}
};
`;

delete Components.font;

var ComponentNames = Object.keys(Components);

var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

ComponentNames.forEach(name => {
  var componentName = uppercamelcase(name);

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));

  if (['Loading', 'MessageBox', 'Notification', 'Message', 'InfiniteScroll'].indexOf(componentName) === -1) {
    installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
      name: componentName,
      component: name
    }));
  }

  if (componentName !== 'Loading') listTemplate.push(`  ${componentName}`);
});

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);

