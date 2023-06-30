import defaultLang from 'wlkj-ui/src/locale/lang/zh-CN';
import Vue from 'vue';
import deepmerge from 'deepmerge';
import Format from './format';

const format = Format(Vue);
let lang = defaultLang;
let merged = false;
let i18nHandler = function() {
  const vuei18n = Object.getPrototypeOf(this || Vue).$t; // 第三方的语言包解析方法，如vue-i18n，挂载以后，会在Vue.prototype.$t = 解析方法
  if (typeof vuei18n === 'function' && !!Vue.locale) {
    if (!merged) {
      // merge一次，将默认插件vue-i18n的语言包合并到默认的zh-CN语言包
      merged = true;
      Vue.locale(
        Vue.config.lang,
        deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
      );
    }
    return vuei18n.apply(this, arguments);
  }
};

// 解析语言包方法
export const t = function(path, options) {
  // 优先用插件如vue-i18n的$t解析方法，如没有使用国际化插件，则使用自定义逻辑解析国际化文件
  let value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  // 使用path参数，自定义方式解析国际化文件
  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    // 国际化文件中带参数的模板解析，如total: '共 {total} 条',
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

export const use = function(l) {
  lang = l || lang;
};

export const i18n = function(fn) {
  i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n };
