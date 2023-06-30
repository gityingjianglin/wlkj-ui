import { createVue, destroyVM, waitImmediate, wait, triggerEvent } from '../util';

describe('Input', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', async() => {
    vm = createVue({
      template: `
        <wl-input
          :minlength="3"
          :maxlength="5"
          placeholder="请输入内容"
          @focus="handleFocus"
          :value="input"
        ></wl-input>
      `,
      data() {
        return {
          input: 'input',
          inputfocus: false
        };
      },
      methods: {
        handleFocus() {
          this.inputfocus = true;
        }
      }
    }, true);
    let inputEle = vm.$el.querySelector('input');
    inputEle.focus();
    expect(vm.inputfocus).to.be.true;
    expect(inputEle.getAttribute('placeholder')).to.equal('请输入内容');
    expect(inputEle.value).to.equal('input');
    expect(inputEle.getAttribute('minlength')).to.equal('3');
    expect(inputEle.getAttribute('maxLength')).to.equal('5');
    vm.input = 'text';
    await waitImmediate();
    expect(inputEle.value).to.equal('text');
  });

  it('default to empty', () => {
    vm = createVue({
      template: `
        <wl-input />
      `
    }, true);
    let inputElm = vm.$el.querySelector('input');
    expect(inputElm.value).to.equal('');
  });

  it('disabled', () => {
    vm = createVue({
      template: `
        <wl-input disabled></wl-input>
      `
    }, true);
    let inputElm = vm.$el.querySelector('input');
    expect(inputElm.getAttribute('disabled')).to.ok;
  });

  it('suffixIcon', () => {
    vm = createVue({
      template: `
        <wl-input suffix-icon="world"></wl-input>
      `
    }, true);
    let suffixIconEle = vm.$el.querySelector('.wl-input__icon');
    expect(suffixIconEle).to.exist;
  });
  it('prefixIcon', () => {
    vm = createVue({
      template: `
        <wl-input prefix-icon="world"></wl-input>
      `
    }, true);
    let prefixIconEle = vm.$el.querySelector('.wl-input__icon');
    expect(prefixIconEle).to.exist;
  });

  it('size', () => {
    vm = createVue({
      template: `
        <wl-input size="large"></wl-input>
      `
    }, true);
    expect(vm.$el.classList.contains('wl-input--large')).to.true;
  });

  it('type', () => {
    vm = createVue({
      template: `
        <wl-input type="textarea"></wl-input>
      `
    }, true);
    expect(vm.$el.classList.contains('wl-textarea')).to.true;
  });

  it('rows', () => {
    vm = createVue({
      template: `
        <wl-input type="textarea" :rows="3"></wl-input>
      `
    }, true);
    expect(vm.$el.querySelector('.wl-textarea__inner').getAttribute('rows')).to.equal('3');
  });

  it('resize', async() => {
    vm = createVue({
      template: `
        <wl-input type="textarea" :resize="resize"></wl-input>
      `,
      data() {
        return {
          resize: 'none'
        };
      }
    }, true);
    await waitImmediate();
    expect(vm.$el.querySelector('.wl-textarea__inner').style.resize).to.equal(vm.resize);
    vm.resize = 'horizontal';
    await waitImmediate();
    expect(vm.$el.querySelector('.wl-textarea__inner').style.resize).to.equal(vm.resize);
  });

  it('autosize', async() => {
    vm = createVue({
      template: `
        <div>
          <wl-input type="textarea" v-model="value" :autosize="{minRows: 3, maxRows: 5}" ref="limitSize"></wl-input>
          <wl-input type="textarea" v-model="value" autosize ref="noLimitSize"></wl-input>
        </div>
      `,
      data() {
        return {
          value: 'sda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasd'
        };
      }
    }, true);
    let limitSizeEle = vm.$refs.limitSize;
    let noLimitSizeEle = vm.$refs.noLimitSize;
    expect(limitSizeEle.textareaStyle.height).to.equal('117px');
    expect(noLimitSizeEle.textareaStyle.height).to.equal('201px');

    vm.value = '';
    await wait();
    expect(limitSizeEle.textareaStyle.height).to.equal('75px');
    expect(noLimitSizeEle.textareaStyle.height).to.equal('33px');
  });

  it('focus', async() => {
    vm = createVue({
      template: `
        <wl-input prefix-icon="world" ref="input"></wl-input>
      `
    }, true);
    const spy = sinon.spy();
    vm.$refs.input.$on('focus', spy);
    vm.$refs.input.focus();
    await waitImmediate();
    expect(spy.calledOnce).to.be.true;
  });

  it('Input contains Select and append slot', async() => {
    vm = createVue({
      template: `
      <wl-input v-model="value" clearable class="input-with-select" ref="input">
        <div slot="prepend">hello world!</div>
        <wl-button slot="append" icon="el-icon-search"></wl-button>
      </wl-input>
      `,
      data() {
        return {
          value: '1234'
        };
      }
    }, true);
    vm.$refs.input.hovering = true;

    await wait();
    const suffixEl = document.querySelector('.input-with-select > .wl-input__suffix');
    expect(suffixEl).to.not.be.null;
    expect(suffixEl.style.transform).to.not.be.empty;
  });

  it('validateEvent', async() => {
    const spy = sinon.spy();
    vm = createVue({
      template: `
        <wl-form :model="model" :rules="rules">
          <wl-form-item prop="input">
            <wl-input v-model="model.input" :validate-event="false">
            </wl-input>
          </wl-form-item>
        </wl-form>
      `,
      data() {
        const validator = (rule, value, callback) => {
          spy();
          callback();
        };
        return {
          model: {
            input: ''
          },
          rules: {
            input: [
              { validator }
            ]
          }
        };
      }
    }, true);

    vm.model.input = '123';
    await waitImmediate();
    expect(spy.called).to.be.false;
  });

  describe('Input events', () => {
    it('event focus and blur', async() => {
      vm = createVue({
        template: `
          <wl-input ref="input" placeholder="请输入内容" value="input"></wl-input>
        `
      }, true);
      const spyFocus = sinon.spy();
      const spyBlur = sinon.spy();
      vm.$refs.input.$on('focus', spyFocus);
      vm.$refs.input.$on('blur', spyBlur);
      vm.$refs.input.focus();
      vm.$refs.input.blur();
      await waitImmediate();
      expect(spyFocus.calledOnce).to.be.true;
      expect(spyBlur.calledOnce).to.be.true;
    });

    it('event change', async() => {
      vm = createVue({
        template: `
          <wl-input ref="input" placeholder="请输入内容" :value="input"></wl-input>
        `,
        data() {
          return {
            input: '1'
          };
        }
      }, true);

      const inputElm = vm.$el.querySelector('input');
      const simulateEvent = (text, event) => {
        inputElm.value = text;
        inputElm.dispatchEvent(new Event(event));
      };
      const spy = sinon.spy();
      vm.$refs.input.$on('change', spy);
      simulateEvent('A', 'input');
      simulateEvent('B', 'change');
      await waitImmediate();
      expect(spy.calledWith('B')).to.be.true;
      expect(spy.calledOnce).to.be.true;
    });

    it('event clear', async() => {
      vm = createVue({
        template: `
          <wl-input ref="input" placeholder="请输入内容" clearable :value="input"></wl-input>
        `,
        data() {
          return {
            input: '1'
          };
        }
      }, true);

      const inputElm = vm.$el.querySelector('input');
      const spyClear = sinon.spy();
      vm.$refs.input.$on('clear', spyClear);
      inputElm.focus();
      await waitImmediate();
      vm.$el.querySelector('.wl-input__clear').click();
      await waitImmediate();
      expect(spyClear.calledOnce).to.be.true;
    });

    it('event input', async() => {
      vm = createVue({
        template: `
          <wl-input
            ref="input"
            placeholder="请输入内容"
            clearable
            :value="input">
          </wl-input>
        `,
        data() {
          return {
            input: 'a'
          };
        }
      }, true);
      const spy = sinon.spy();
      vm.$refs.input.$on('input', spy);
      const nativeInput = vm.$refs.input.$el.querySelector('input');
      nativeInput.value = '1';
      triggerEvent(nativeInput, 'compositionstart');
      triggerEvent(nativeInput, 'input');
      await waitImmediate();
      nativeInput.value = '2';
      triggerEvent(nativeInput, 'compositionupdate');
      triggerEvent(nativeInput, 'input');
      await waitImmediate();
      triggerEvent(nativeInput, 'compositionend');
      await waitImmediate();
      // input event does not fire during composition
      expect(spy.calledOnce).to.be.true;
      // native input value is controlled
      expect(vm.input).to.equal('a');
      // :value绑定方式，如果input子元素value值改变，不会触发vm.input的值发生改变，从而在触发handleInput事件的时候，子元素input.value !== vm.input的值，会将vm.input的值重新赋值给input.value
      // v-model语法糖，会双向绑定vm.input的值，即无论改变input.value或者vm.input，两者会相互绑定
      expect(nativeInput.value).to.equal('a');

    });
  });

  describe('Input Methods', () => {
    it('method:select', async() => {
      const testContent = 'test';

      vm = createVue({
        template: `
          <wl-input
            ref="inputComp"
            value="${testContent}"
          />
        `
      }, true);

      expect(vm.$refs.inputComp.$refs.input.selectionStart).to.equal(testContent.length);
      expect(vm.$refs.inputComp.$refs.input.selectionEnd).to.equal(testContent.length);

      vm.$refs.inputComp.select();

      await waitImmediate();
      expect(vm.$refs.inputComp.$refs.input.selectionStart).to.equal(0);
      expect(vm.$refs.inputComp.$refs.input.selectionEnd).to.equal(testContent.length);
    });

    it('sets value on textarea / input type change', async() => {
      vm = createVue({
        template: `
          <wl-input :type="type" v-model="val" />
        `,
        data() {
          return {
            type: 'text',
            val: '123'
          };
        }
      }, true);
      expect(vm.$el.querySelector('input').value).to.equal('123');
      vm.type = 'textarea';
      await waitImmediate();
      expect(vm.$el.querySelector('textarea').value).to.equal('123');
      vm.type = 'password';
      await waitImmediate();
      expect(vm.$el.querySelector('input').value).to.equal('123');
    });

    it('limit input and show word count', async() => {
      vm = createVue({
        template: `
          <div>
            <wl-input
              class="test-text"
              type="text"
              v-model="input1"
              maxlength="10"
              :show-word-limit="show">
            </wl-input>
            <wl-input
              class="test-textarea"
              type="textarea"
              v-model="input2"
              maxlength="10"
              show-word-limit>
            </wl-input>
            <wl-input
              class="test-password"
              type="password"
              v-model="input3"
              maxlength="10"
              show-word-limit>
            </wl-input>
            <wl-input
              class="test-initial-exceed"
              type="text"
              v-model="input4"
              maxlength="2"
              show-word-limit>
            </wl-input>
          </div>
        `,
        data() {
          return {
            input1: '',
            input2: '',
            input3: '',
            input4: 'exceed',
            show: false
          };
        }
      }, true);

      const inputElm1 = vm.$el.querySelector('.test-text');
      const inputElm2 = vm.$el.querySelector('.test-textarea');
      const inputElm3 = vm.$el.querySelector('.test-password');
      const inputElm4 = vm.$el.querySelector('.test-initial-exceed');

      expect(inputElm1.querySelectorAll('.wl-input__count').length).to.equal(0);
      expect(inputElm2.querySelectorAll('.wl-input__count').length).to.equal(1);
      expect(inputElm3.querySelectorAll('.wl-input__count').length).to.equal(0);
      expect(inputElm4.classList.contains('is-exceed')).to.true;

      vm.show = true;
      await waitImmediate();
      expect(inputElm1.querySelectorAll('.wl-input__count').length).to.equal(1);

      vm.input4 = '1';
      await waitImmediate();
      expect(inputElm4.classList.contains('is-exceed')).to.false;
    });
  });
});
