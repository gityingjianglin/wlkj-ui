import { createVue, destroyVM } from '../util';

describe('Radio', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', done => {
    vm = createVue({
      template: `
        <wl-radio v-model="radio" label="a">
        </wl-radio>
      `,
      data() {
        return {
          radio: ''
        };
      }
    }, true);
    let radioElm = vm.$el;
    expect(radioElm.classList.contains('wl-radio')).to.be.true;
    radioElm.click();
    setTimeout(_ => {
      expect(radioElm.querySelector('.is-checked')).to.be.ok;
      done();
    }, 10);
  });

  it('disabled', done => {
    vm = createVue({
      template: `
        <wl-radio
          v-model="radio"
          label="3"
          disabled
        >
        </wl-radio>
      `,
      data() {
        return {
          radio: ''
        };
      }
    }, true);
    let radioElm = vm.$el;
    radioElm.click();
    setTimeout(_ => {
      expect(vm.radio === '').to.be.true;
      expect(radioElm.querySelector('.is-disabled')).to.be.ok;
      done();
    }, 10);
  });

  it('border', () => {
    vm = createVue({
      template: `
        <wl-radio
          v-model="radio"
          label="3"
          border
        >
        </wl-radio>
      `,
      data() {
        return {
          radio: ''
        };
      }
    }, true);
    let radioElm = vm.$el;
    expect(radioElm.classList.contains('is-bordered')).to.be.true;
  });

  it('change event', done => {
    vm = createVue({
      template: `
        <wl-radio
          v-model="radio"
          label="3"
          @change="handleChange"
        >
        </wl-radio>
      `,
      data() {
        return {
          radio: '',
          data: ''
        };
      },
      methods: {
        handleChange(val) {
          this.data = val;
        }
      }
    }, true);
    let radioElm = vm.$el;
    radioElm.click();
    setTimeout(_ => {
      expect(vm.data).to.equal('3');
      done();
    }, 10);
  });

  it('change event only triggers on user input', done => {
    vm = createVue({
      template: `
        <wl-radio
          v-model="radio"
          label="3"
          @change="handleChange"
        >
        </wl-radio>
      `,
      data() {
        return {
          radio: '',
          data: ''
        };
      },
      methods: {
        handleChange(val) {
          this.data = val;
        }
      }
    }, true);
    vm.radio = '3';
    setTimeout(_ => {
      expect(vm.data).to.equal('');
      done();
    }, 10);
  });

  describe('Radio group', () => {
    it('create', done => {
      vm = createVue({
        template: `
          <wl-radio-group v-model="radio">
            <wl-radio :label="3" ref="radio1">备选项</wl-radio>
            <wl-radio :label="6" ref="radio2">备选项</wl-radio>
            <wl-radio :label="9">备选项</wl-radio>
          </wl-radio-group>
        `,
        data() {
          return {
            radio: 3
          };
        }
      }, true);
      setTimeout(_ => {
        expect(vm.$refs.radio1.$el.querySelector('.is-checked')).to.be.ok;
        let radioElm = vm.$refs.radio2.$el;
        radioElm.click();
        setTimeout(_ => {
          expect(radioElm.querySelector('.is-checked')).to.be.ok;
          expect(vm.radio === 6).to.be.true;
          done();
        }, 10);
      }, 50);
    });

    it('disabled', done => {
      vm = createVue({
        template: `
          <wl-radio-group v-model="radio" disabled>
            <wl-radio :label="3" ref="radio1">备选项</wl-radio>
            <wl-radio :label="6" ref="radio2">备选项</wl-radio>
            <wl-radio :label="9">备选项</wl-radio>
          </wl-radio-group>
        `,
        data() {
          return {
            radio: 3
          };
        }
      }, true);
      let radio2 = vm.$refs.radio2;
      expect(vm.$el.querySelectorAll('label.is-disabled').length).to.be.equal(3);
      expect(vm.$refs.radio1.$el.querySelector('.is-checked')).to.be.exist;
      radio2.$el.click();
      setTimeout(_ => {
        expect(vm.radio === 3).to.be.true;
        expect(vm.$refs.radio1.$el.querySelector('.is-checked')).to.be.exist;
        done();
      }, 10);
    });

    it('change event', done => {
      vm = createVue({
        template: `
          <wl-radio-group v-model="radio" @change="onChange">
            <wl-radio :label="3">备选项</wl-radio>
            <wl-radio :label="6" ref="radio2">备选项</wl-radio>
            <wl-radio :label="9">备选项</wl-radio>
          </wl-radio-group>
        `,
        methods: {
          onChange(val) {
            this.data = val;
          }
        },
        data() {
          return {
            radio: 3,
            data: 0
          };
        }
      }, true);
      let radio2 = vm.$refs.radio2;
      radio2.$el.click();
      setTimeout(_ => {
        expect(vm.data).to.equal(6);
        done();
      }, 10);
    });

    it('change event only triggers on user input', done => {
      vm = createVue({
        template: `
          <wl-radio-group v-model="radio" @change="onChange">
            <wl-radio :label="3">备选项</wl-radio>
            <wl-radio :label="6">备选项</wl-radio>
            <wl-radio :label="9">备选项</wl-radio>
          </wl-radio-group>
        `,
        methods: {
          onChange(val) {
            this.data = val;
          }
        },
        data() {
          return {
            radio: 3,
            data: 0
          };
        }
      }, true);
      vm.radio = 6;
      setTimeout(_ => {
        expect(vm.data).to.equal(0);
        done();
      }, 10);
    });

  });
});
