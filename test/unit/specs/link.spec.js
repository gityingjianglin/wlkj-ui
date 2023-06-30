import { createTest, createVue, destroyVM } from '../util';
import Link from 'packages/link';

// describe： 定义一个测试套件
// it：定义一个测试用例
// expect：断言的判断条件
// toBe：断言的比较结果
// exist 存在
describe('Link', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', () => {
    vm = createTest(Link, {
      type: 'default'
    }, true);
    let linkElm = vm.$el;
    expect(linkElm.classList.contains('wl-link--default')).to.be.true;
  });
  it('disabled', () => {
    vm = createTest(Link, {
      disabled: true
    }, true);
    let linkElm = vm.$el;
    expect(linkElm.classList.contains('is-disabled')).to.be.true;
  });
  it('underline', () => {
    vm = createTest(Link, {
      underline: true
    }, true);
    let linkElm = vm.$el;
    expect(linkElm.classList.contains('is-underline')).to.be.true;
  });
  it('linkHref', () => {
    vm = createVue({
      template: `
        <wl-link :href="linkHref" ref="linkDom"></wl-link>
      `,
      data() {
        return {
          linkHref: 'www.baidu.com'
        };
      }
    });
    let linkElm = vm.$el;
    expect(linkElm.getAttribute('href')).to.be.equals('www.baidu.com');
  });
  it('icon', () => {
    vm = createTest(Link, {
      icon: 'wl-icon-RightCircleFilled'
    }, true);
    let linkElm = vm.$el;
    expect(linkElm.querySelector('.wl-icon-RightCircleFilled')).to.be.exist;
  });
});
