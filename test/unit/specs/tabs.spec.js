import { createVue, destroyVM, createTest, wait} from '../util';
import Tabs from 'packages/tabs';

describe('Tabs', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('type', () => {
    vm = createTest(Tabs, {
      type: 'card'
    }, true);
    let tabsElm = vm.$el;
    expect(tabsElm.classList.contains('wl-tabs--card')).to.be.true;
  });
  it('disabled', async() => {
    vm = createVue({
      template: `
      <wl-tabs :value="activeName" ref="tabs" >
      <wl-tab-pane label="用户" name="first" disabled>用户</wl-tab-pane>
      <wl-tab-pane label="配置管理" name="second">配置管理</wl-tab-pane>
      <wl-tab-pane label="角色管理" name="third">角色管理</wl-tab-pane>
      <wl-tab-pane label="定时任务补偿"  name="fourth">定时任务补偿</wl-tab-pane>
    </wl-tabs>
      `,
      data() {
        return {
          activeName: 'second',
          headerList: [{label: '用户管理', name: 'first', activeFlag: false, disabled: true}, {label: '配置管理', name: 'second', activeFlag: false, disabled: false}, {label: '角色管理', name: 'third', activeFlag: false, disabled: false}, {label: '定时任务补偿', name: 'fourth', activeFlag: false, disabled: false}]
        };
      }
    });
    let tabsElm = vm.$refs.tabs;
    await wait();
    let tabsItemElm = tabsElm.$el.querySelector('.wl-tabs__item');
    expect(tabsItemElm.classList.contains('is-disabled')).to.be.true;
  });
  it('tabPosition', () => {
    vm = createVue({
      template: `
      <wl-tabs tabPosition="right" style="height: 200px;" ref="tabs">
      <wl-tab-pane label="用户管理" name="first">用户管理</wl-tab-pane>
      <wl-tab-pane label="配置管理" name="second">配置管理</wl-tab-pane>
      <wl-tab-pane label="角色管理" name="third">角色管理</wl-tab-pane>
      <wl-tab-pane label="定时任务补偿" disabled name="fourth">定时任务补偿</wl-tab-pane>
    </wl-tabs>
      `,
      data() {
        return {
          activeName: 'second',
          headerList: [{label: '用户管理', name: 'first', activeFlag: false, disabled: false}, {label: '配置管理', name: 'second', activeFlag: false, disabled: false}, {label: '角色管理', name: 'third', activeFlag: false, disabled: false}, {label: '定时任务补偿', name: 'fourth', activeFlag: false, disabled: true}]
        };
      }
    });
    let tabsElm = vm.$refs.tabs;
    // console.log(vm.$el, '/////');
    expect(tabsElm.$el.classList.contains('wl-tabs--right')).to.be.true;
  });
});
