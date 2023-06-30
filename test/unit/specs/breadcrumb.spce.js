import { destroyVM, createVue } from '../util';
// import Breadcrumb from 'packages/breadcrumb';
// import BreadcrumbItem from 'packages/breadcrumbItem';

describe('Breadcrumb', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', () => {
    vm = createVue({
      template: `
        <wl-breadcrumb separator-class="wl-icon-RightOutline">
          <wl-breadcrumb-item :to="{ path: '/zh-CN/component/installation' }" :replace="true" target="blank">首页</wl-breadcrumb-item>
          <!--<wl-breadcrumb-item to="https://www.baidu.com/">百度</wl-breadcrumb-item>-->
          <!--<wl-breadcrumb-item>活动管理</wl-breadcrumb-item>-->
        </wl-breadcrumb>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('wl-breadcrumb')).to.be.true;
    expect(colElm.classList.contains('wl-breadcrumb__item')).to.be.true;
    expect(colElm.classList.contains('wl-breadcrumb__inner')).to.be.true;
  });
  it('separator-class', () => {
    vm = createVue({
      template: `
        <wl-breadcrumb separator-class="wl-icon-RightOutline">
          <wl-breadcrumb-item :to="{ path: '/zh-CN/component/installation' }" :replace="true" target="blank">首页</wl-breadcrumb-item>
        </wl-breadcrumb>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.getAttribute['separator-class']).to.be.true;
  });
  it('separator', () => {
    vm = createVue({
      template: `
        <wl-breadcrumb separator="/">
          <wl-breadcrumb-item :to="{ path: '/zh-CN/component/installation' }" :replace="true" target="blank">首页</wl-breadcrumb-item>
          <!--<wl-breadcrumb-item to="https://www.baidu.com/">百度</wl-breadcrumb-item>-->
          <!--<wl-breadcrumb-item>活动管理</wl-breadcrumb-item>-->
        </wl-breadcrumb>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.getAttribute['separator']).to.be.true;
  });
  it('to', () => {
    vm = createVue({
      template: `
        <wl-breadcrumb separator="/">
          <wl-breadcrumb-item :to="{ path: '/zh-CN/component/installation' }" :replace="true" target="blank">首页</wl-breadcrumb-item>
          <!--<wl-breadcrumb-item to="https://www.baidu.com/">百度</wl-breadcrumb-item>-->
          <!--<wl-breadcrumb-item>活动管理</wl-breadcrumb-item>-->
        </wl-breadcrumb>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.getAttribute['to']).to.be.true;
  });
  it('to', () => {
    vm = createVue({
      template: `
        <wl-breadcrumb separator="/">
          <wl-breadcrumb-item :to="{ path: '/zh-CN/component/installation' }" :replace="true" target="blank">首页</wl-breadcrumb-item>
        </wl-breadcrumb>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.getAttribute['to']).to.be.true;
  });
});
