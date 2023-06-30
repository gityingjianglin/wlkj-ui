import { createTest, createVue, destroyVM } from '../util';
import Container from 'packages/container';
import Header from 'packages/header';
import Main from 'packages/main';
import Aside from 'packages/aside';
import Footer from 'packages/footer';

describe('Container', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Container, true);
    expect(vm.$el).to.exist;
  });

  it('vertical', () => {
    vm = createVue({
      template: `
        <wl-container>
          <wl-header></wl-header>
          <wl-main></wl-main>
        </wl-container>
      `
    }, true);
    expect(vm.$children[0].$el.classList.contains('is-vertical')).to.true;
  });

  it('direction', done => {
    vm = createVue({
      template: `
        <wl-container :direction="direction">
          <wl-header></wl-header>
          <wl-main></wl-main>
        </wl-container>
      `,
      data() {
        return {
          direction: 'horizontal'
        };
      }
    }, true);
    expect(vm.$children[0].$el.classList.contains('is-vertical')).not.to.true;
    vm.direction = 'vertical';
    vm.$nextTick(() => {
      expect(vm.$children[0].$el.classList.contains('is-vertical')).to.true;
      done();
    });
  });
});

describe('Header', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Header, true);
    expect(vm.$el).to.exist;
  });

  it('height', () => {
    vm = createVue({
      template: `
        <wl-header height="100px"></wl-header>
      `
    }, true);
    expect(vm.$children[0].$el.style.height).to.equal('100px');
  });
});

describe('Aside', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Aside, true);
    expect(vm.$el).to.exist;
  });

  it('width', () => {
    vm = createVue({
      template: `
        <wl-aside width="200px"></wl-aside>
      `
    }, true);
    expect(vm.$children[0].$el.style.width).to.equal('200px');
  });
});

describe('Main', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Main, true);
    expect(vm.$el).to.exist;
  });
});

describe('Footer', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Footer, true);
    expect(vm.$el).to.exist;
  });

  it('height', () => {
    vm = createVue({
      template: `
        <wl-footer height="100px"></wl-footer>
      `
    }, true);
    expect(vm.$children[0].$el.style.height).to.equal('100px');
  });
});

