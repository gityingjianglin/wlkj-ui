import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import WLKJ from 'main/index.js';
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainHeader from './components/header';
import MainFooter from './components/footer';
import SideNav from './components/side-nav';
import title from './i18n/title';

import 'packages/theme-chalk/src/index.scss';
import './assets/styles/common.scss';
import './demo-styles/index.scss';
import icon from './icon.json';

Vue.use(WLKJ);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-header', MainHeader);
Vue.component('main-footer', MainFooter);
Vue.component('side-nav', SideNav);

const globalEle = new Vue({
  data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isEle: {
      get: () => (globalEle.$data.$isEle),
      set: (data) => {globalEle.$data.$isEle = data;}
    }
  }
});

Vue.prototype.$icon = icon; // docs 列表页用

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'WLKJ';
  // ga('send', 'event', 'PageView', route.name);
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
