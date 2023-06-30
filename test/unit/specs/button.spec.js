import { createTest, createVue, destroyVM } from '../util';
import Button from 'packages/button';

describe('Button', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', () => {
    vm = createTest(Button, {
      type: 'primary'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('wl-button--primary')).to.be.true;
  });
  it('disabled', () => {
    vm = createTest(Button, {
      disabled: true
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('is-disabled')).to.be.true;
  });
  it('circle', () => {
    vm = createTest(Button, {
      circle: true
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('is-circle')).to.be.true;
  });
  it('size', () => {
    vm = createTest(Button, {
      size: 'medium'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('wl-button--medium')).to.be.true;
  });
  it('round', () => {
    vm = createVue({
      template: `
        <wl-button :round="true"></wl-button>
      `
    });
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('is-round')).to.be.true;
  });
  it('plain', () => {
    vm = createTest(Button, {
      plain: true
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('is-plain')).to.be.true;
  });
  it('icon', () => {
    vm = createTest(Button, {
      icon: 'wl-icon-UnlockFilled'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.querySelector('.wl-icon-UnlockFilled')).to.be.ok;
  });
  it('nativeType', () => {
    vm = createTest(Button, {
      nativeType: 'submit'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.getAttribute('type')).to.be.equal('submit');
  });
  it('loading', () => {
    vm = createTest(Button, {
      loading: true
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('is-loading')).to.be.true;
    expect(buttonElm.querySelector('.wl-icon-ClockCircleFilled')).to.be.ok;
  });
  it('click', done => {
    let result;
    vm = createVue({
      template: `
        <wl-button @click="handlerClick">haha</wl-button>
      `,
      methods: {
        handlerClick(evt) {
          result = evt;
        }
      }
    });
    vm.$el.click();
    setTimeout(() => {
      expect(result).to.exist;
      done();
    }, 20);
  });
  it('click inside', (done) => {
    let result;
    vm = createVue({
      template: `
        <wl-button @click="handlerClick"><span class="inner-slot">inner-slot</span></wl-button>
      `,
      methods: {
        handlerClick(evt) {
          result = evt;
        }
      }
    });
    vm.$el.querySelector('.inner-slot').click();
    setTimeout(() => {
      expect(result).to.exist;
      done();
    }, 20);
  });
  it('loading diabled', done => {
    let result;
    vm = createVue({
      template: `
        <wl-button loading @click="handlerClick"><span class="inner-slot">inner-slot</span></wl-button>
      `,
      methods: {
        handlerClick(evt) {
          result = evt;
        }
      }
    });
    vm.$el.querySelector('.inner-slot').click();
    setTimeout(() => {
      expect(result).to.not.exist;
      done();
    }, 20);
  });
});
