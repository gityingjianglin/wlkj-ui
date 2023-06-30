import navConfig from './nav.config';
import langs from './i18n/route';

const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/zh-CN/${name}.vue`)),
    'zh-CN');
  }
};

const load = function(lang, path) {
  return LOAD_MAP[lang](path);
};

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/zh-CN${path}.md`)),
    'zh-CN');
  }
};

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

const registerRoute = (navConfig) => {
  let route = [];
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang];
    route.push({
      path: `/${ lang }/component`,
      redirect: `/${ lang }/component/installation`,
      component: load(lang, 'component'),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });
  function addRoute(page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }
  console.log('route~~~~~~~~~~~~~~~~~~~~~~');
  console.log(route);
  console.log('route end~~~~~~~~~~~~~~~~~~~~~~');
  return route;
};
let route = registerRoute(navConfig);
console.log('route');
console.log(route);

const generateMiscRoutes = function(lang) {
  /* let guideRoute = {
    path: `/${ lang }/guide`, // 指南
    redirect: `/${ lang }/guide/design`,
    component: load(lang, 'guide'),
    children: [{
      path: 'design', // 设计原则
      name: 'guide-design' + lang,
      meta: { lang },
      component: load(lang, 'design')
    }, {
      path: 'nav', // 导航
      name: 'guide-nav' + lang,
      meta: { lang },
      component: load(lang, 'nav')
    }]
  };

  let themeRoute = {
    path: `/${ lang }/theme`,
    component: load(lang, 'theme-nav'),
    children: [
      {
        path: '/', // 主题管理
        name: 'theme' + lang,
        meta: { lang },
        component: load(lang, 'theme')
      },
      {
        path: 'preview', // 主题预览编辑
        name: 'theme-preview-' + lang,
        meta: { lang },
        component: load(lang, 'theme-preview')
      }]
  };

  let resourceRoute = {
    path: `/${ lang }/resource`, // 资源
    meta: { lang },
    name: 'resource' + lang,
    component: load(lang, 'resource')
  }; */

  let testRoute = {
    path: `/${ lang }/test`, // 测试页
    meta: { lang },
    name: 'test' + lang,
    component: load(lang, 'test')
  };

  /* let guideRoute = {
    path: `/${ lang }/guide`, // 设计指导
    redirect: `/${ lang }/guide/color`,
    component: load(lang, 'guide'),
    children: [
      {
        path: 'color', // 色彩
        name: 'guide-color' + lang,
        meta: { lang },
        component: load(lang, 'color')
      },
      {
        path: 'font', // 色彩
        name: 'guide-font' + lang,
        meta: { lang },
        component: load(lang, 'font')
      }
    ]
  }; */
  let guideRoute = {
    path: `/${ lang }/guide`, // 设计指导
    name: 'guide',
    component: load(lang, 'guide')
  };
  let resourceRoute = {
    path: `/${ lang }/resource`, // 资源库
    name: 'resource',
    component: load(lang, 'resource')
  };
  let guidDesignRoute = {
    path: `/${ lang }/design-web`, // 设计指导
    redirect: `/${ lang }/design-web/color`,
    component: load(lang, 'design-web'),
    children: [
      {
        path: 'color', // 色彩
        name: 'design-web-color' + lang,
        meta: { lang },
        component: load(lang, 'design-web-color')
      },
      {
        path: 'font', // 字体
        name: 'design-web-font' + lang,
        meta: { lang },
        component: load(lang, 'design-web-font')
      },
      {
        path: 'net-grid', // 网格
        name: 'design-web-grid' + lang,
        meta: { lang },
        component: load(lang, 'design-web-net-grid')
      },
      {
        path: 'radius', // 圆角
        name: 'design-web-radius' + lang,
        meta: { lang },
        component: load(lang, 'design-web-radius')
      },
      {
        path: 'shadow', // 投影
        name: 'design-web-shadow' + lang,
        meta: { lang },
        component: load(lang, 'design-web-shadow')
      },
      {
        path: 'icon', // 图标
        name: 'design-web-icon' + lang,
        meta: { lang },
        component: load(lang, 'design-web-icon')
      },
      {
        path: 'grid', // 栅格
        name: 'design-web-grid' + lang,
        meta: { lang },
        component: load(lang, 'design-web-grid')
      },
      {
        path: 'zindex', // 层级
        name: 'design-web-zindex' + lang,
        meta: { lang },
        component: load(lang, 'design-web-zindex')
      },
      {
        path: 'button', // 按钮
        name: 'design-web-button' + lang,
        meta: { lang },
        component: load(lang, 'design-web-button')
      },
      {
        path: 'input', // 输入框
        name: 'design-web-input' + lang,
        meta: { lang },
        component: load(lang, 'design-web-input')
      },
      {
        path: 'select', // 选择器
        name: 'design-web-select' + lang,
        meta: { lang },
        component: load(lang, 'design-web-select')
      },
      {
        path: 'form', // 表单
        name: 'design-web-form' + lang,
        meta: { lang },
        component: load(lang, 'design-web-form')
      },
      {
        path: 'nav', // 导航
        name: 'design-web-nav' + lang,
        meta: { lang },
        component: load(lang, 'design-web-nav')
      },
      {
        path: 'table', // 表格
        name: 'design-web-table' + lang,
        meta: { lang },
        component: load(lang, 'design-web-table')
      },
      {
        path: 'layout', // 结构类
        name: 'design-web-layout' + lang,
        meta: { lang },
        component: load(lang, 'design-web-layout')
      },
      {
        path: 'layout-frontend', // 前端布局
        name: 'design-web-layout-frontend' + lang,
        meta: { lang },
        component: load(lang, 'design-web-layout-frontend')
      },
      {
        path: 'layout-backend', // 结构类
        name: 'design-web-layout-backend' + lang,
        meta: { lang },
        component: load(lang, 'design-web-layout-backend')
      }
    ]
  };

  let indexRoute = {
    path: `/${ lang }`, // 首页
    meta: { lang },
    name: 'home' + lang,
    component: load(lang, 'index')
  };

  /* let homeRoute = {
    path: '/home', // 首页
    meta: { lang },
    name: 'home',
    component: r => require.ensure([], () =>
      r(require('./pages/home/index.vue')),
    'zh-CN')
  }; */

  // return [guideRoute, resourceRoute, themeRoute, indexRoute];
  return [ indexRoute, testRoute, guideRoute, guidDesignRoute, resourceRoute];
};

langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang));
});

/* route.push({
  path: '/play',
  name: 'play',
  component: require('./play/index.vue')
}); */

/* route.push({
  path: '/home',
  name: 'home',
  meta: 'zh-CN',
  component: r => require.ensure([], () =>
    r(require('./pages/home/index.vue')),
  'zh-CN')
}); */

console.log(route);
// let userLanguage = localStorage.getItem('WLKJ_LANGUAGE') || window.navigator.language || 'en-US';
let defaultPath = '/zh-CN';

route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]);

export default route;
