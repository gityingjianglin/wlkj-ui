import { destroyVM, createVue } from '../util';

describe('Col', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', () => {
    vm = createVue({
      template: `
        <wl-col :span="6"></wl-col>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('wl-col')).to.be.true;
  });
  it('span', () => {
    vm = createVue({
      template: `
        <wl-col :span="12"></wl-col>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('wl-col-12')).to.be.true;
  });
  it('pull', () => {
    vm = createVue({
      template: `
        <wl-col :span="12" :pull="6"></wl-col>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('wl-col-pull-6')).to.be.true;
  });
  it('push', () => {
    vm = createVue({
      template: `
        <wl-col :span="12" :push="5"></wl-col>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('wl-col-push-5')).to.be.true;
  });
  it('gutter', () => {
    vm = createVue({
      template: `
        <wl-row :gutter="10">
          <wl-col :span="12"  ref="col"></wl-col>
        </wl-row>
      `
    }, true);
    let colElm = vm.$refs.col.$el;
    expect(colElm.style.paddingLeft === '5px').to.be.true;
    expect(colElm.style.paddingRight === '5px').to.be.true;
  });
  it('response', () => {
    vm = createVue({
      template: `
        <wl-row :gutter="10">
          <wl-col :md="6" ref="col" :xs="{ span: 2, offset: 1 }" :lg="{ span: 4, offset: 3}"></wl-col>
        </wl-row>
      `
    }, true);
    let colElm = vm.$refs.col.$el;
    expect(colElm.classList.contains('wl-col-md-6')).to.be.true;
    expect(colElm.classList.contains('wl-col-xs-2')).to.be.true;
    expect(colElm.classList.contains('wl-col-xs-offset-1')).to.be.true;
    expect(colElm.classList.contains('wl-col-lg-4')).to.be.true;
    expect(colElm.classList.contains('wl-col-lg-offset-3')).to.be.true;
  });
});
