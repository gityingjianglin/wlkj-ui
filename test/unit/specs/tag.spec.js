import { createTest, createVue, destroyVM } from '../util';
import Tag from 'packages/tag';

// describe： 定义一个测试套件
// it：定义一个测试用例
// expect：断言的判断条件
// toBe：断言的比较结果
// exist 存在
describe('Tag', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', () => {
    vm = createTest(Tag, {
      effect: 'light'
    }, true);
    let TagElm = vm.$el;
    expect(TagElm.classList.contains('wl-tag--light')).to.be.true;
  });
  it('hit', () => {
    vm = createTest(Tag, {
      hit: true
    }, true);
    let TagElm = vm.$el;
    expect(TagElm.classList.contains('is-hit')).to.be.true;
  });
  it('closable', () => {
    vm = createTest(Tag, {
      closable: true
    }, true);
    let TagElm = vm.$el;
    expect(TagElm.querySelector('.wl-tag__close')).to.be.exist;
  });
  it('size', () => {
    vm = createTest(Tag, {
      size: 'medium'
    }, true);
    let TagElm = vm.$el;
    expect(TagElm.classList.contains('wl-tag--medium')).to.be.true;
  });
  it('close', done => {
    let result;
    vm = createVue({
      template: `
        <wl-tag class="wl-tag" >tag组件
        <i
        ref="icon"
        class="wl-tag__close wl-icon-CloseOutlined"
        @click="handlerClick"
        ></i>
        </wl-tag>
      `,
      methods: {
        handlerClick(evt) {
          result = evt;
        }
      }
    });
    console.log(vm.$el.querySelector('.wl-tag__close'), 'close');
    vm.$el.querySelector('.wl-tag__close').click();
    setTimeout(() => {
      expect(result).to.be.exist;
      done();
    }, 20);
  });
  it('color', () => {
    vm = createTest(Tag, {
      color: 'red'
    }, true);
    let TagElm = vm.$el;
    expect(TagElm.style.backgroundColor).to.be.equal('red');
  });
});
