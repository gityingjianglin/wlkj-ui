import { createVue, destroyVM } from '../util';

describe('Checkbox', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', done => {
    vm = createVue({
      template: `
        <wl-checkbox v-model="checked">
        </wl-checkbox>
      `,
      data() {
        return {
          checked: false
        };
      }
    }, true);
    let cbElm = vm.$el;
    expect(cbElm.classList.contains('wl-checkbox')).to.be.true;
    cbElm.click();
    vm.$nextTick(_ => {
      expect(cbElm.querySelector('.is-checked')).to.be.ok;
      done();
    });
  });

  it('disabled', () => {
    vm = createVue({
      template: `
        <wl-checkbox
          v-model="checked"
          disabled
        >
        </wl-checkbox>
      `,
      data() {
        return {
          checked: false
        };
      }
    }, true);
    let checkboxElm = vm.$el;
    expect(checkboxElm.querySelector('.is-disabled')).to.be.ok;
  });

  it('change event', done => {
    vm = createVue({
      template: `
        <wl-checkbox v-model="checked" @change="onChange">
        </wl-checkbox>
      `,
      methods: {
        onChange(val) {
          this.data = val;
        }
      },
      data() {
        return {
          data: '',
          checked: false
        };
      }
    }, true);
    let checkboxElm = vm.$el;
    checkboxElm.click();
    setTimeout(_ => {
      expect(vm.data).to.true;
      vm.checked = false;
      setTimeout(_ => {
        expect(vm.data).to.true;
        done();
      }, 10);
    }, 10);
  });

  it('checkbox group', done => {
    vm = createVue({
      template: `
        <wl-checkbox-group v-model="checkList">
          <wl-checkbox label="a" ref="a"></wl-checkbox>
          <wl-checkbox label="b" ref="b"></wl-checkbox>
          <wl-checkbox label="c" ref="c"></wl-checkbox>
          <wl-checkbox label="d" ref="d"></wl-checkbox>
        </wl-checkbox-group>
      `,
      data() {
        return {
          checkList: []
        };
      }
    }, true);
    expect(vm.checkList.length === 0).to.be.true;
    vm.$refs.a.$el.click();
    vm.$nextTick(_ => {
      expect(vm.checkList.indexOf('a') !== -1).to.be.true;
      done();
    });
  });

  it('checkbox group change event', done => {
    vm = createVue({
      template: `
        <wl-checkbox-group v-model="checkList" @change="onChange">
          <wl-checkbox label="a" ref="a"></wl-checkbox>
          <wl-checkbox label="b" ref="b"></wl-checkbox>
        </wl-checkbox-group>
      `,
      methods: {
        onChange(val) {
          this.data = val;
        }
      },
      data() {
        return {
          data: '',
          checkList: []
        };
      }
    }, true);
    vm.$refs.a.$el.click();
    setTimeout(_ => {
      expect(vm.data).to.deep.equal(['a']);
      vm.checkList = ['b'];
      done();
    }, 10);
  });

  it('checkbox group minimum and maximum', done => {
    vm = createVue({
      template: `
        <wl-checkbox-group 
          v-model="checkList" 
          :min="1" 
          :max="2"
        >
          <wl-checkbox label="a" ref="a"></wl-checkbox>
          <wl-checkbox label="b" ref="b"></wl-checkbox>
          <wl-checkbox label="c" ref="c"></wl-checkbox>
          <wl-checkbox label="d" ref="d"></wl-checkbox>
        </wl-checkbox-group>
      `,
      data() {
        return {
          checkList: ['a'],
          lastEvent: null
        };
      }
    }, true);
    expect(vm.checkList.length === 1).to.be.true;
    expect(vm.$refs.a.isDisabled).to.be.true;
    vm.$refs.a.$el.click();
    vm.$nextTick(() => {
      expect(vm.checkList.indexOf('a') !== -1).to.be.true;
      vm.$refs.b.$el.click();
      vm.$nextTick(() => {
        expect(vm.checkList.indexOf('a') !== -1).to.be.true;
        expect(vm.checkList.indexOf('b') !== -1).to.be.true;
        vm.$refs.c.$el.click();
        vm.$nextTick(() => {
          expect(vm.checkList.indexOf('c') !== -1).to.be.false;
          expect(vm.checkList.indexOf('d') !== -1).to.be.false;
          expect(vm.$refs.c.isDisabled).to.be.true;
          expect(vm.$refs.d.isDisabled).to.be.true;
          done();
        });
      });
    });
  });

  it('nested group', done => {
    vm = createVue({
      template: `
        <wl-checkbox-group v-model="checkList">
          <el-row>
            <wl-checkbox label="a" ref="a"></wl-checkbox>
            <wl-checkbox label="b" ref="b"></wl-checkbox>
            <wl-checkbox label="c" ref="c"></wl-checkbox>
            <wl-checkbox label="d" ref="d"></wl-checkbox>
          </el-row>
        </wl-checkbox-group>
      `,
      data() {
        return {
          checkList: []
        };
      }
    }, true);
    expect(vm.checkList.length === 0).to.be.true;
    vm.$refs.a.$el.click();
    vm.$nextTick(_ => {
      expect(vm.checkList.indexOf('a') !== -1).to.be.true;
      done();
    });
  });

  it('true false label', done => {
    vm = createVue({
      template: `
        <wl-checkbox true-label="a" :false-label="3" v-model="checked"></wl-checkbox>
      `,
      data() {
        return {
          checked: 'a'
        };
      }
    }, true);
    vm.$el.click();
    vm.$nextTick(_ => {
      expect(vm.checked === 3).to.be.true;
      done();
    });
  });

  it('checked', () => {
    vm = createVue({
      template: `
        <div>
          <wl-checkbox v-model="checked" checked></wl-checkbox>
          <wl-checkbox-group v-model="checklist">
            <wl-checkbox checked label="a"></wl-checkbox>
          </wl-checkbox-group>
        </div>
      `,
      data() {
        return {
          checked: false,
          checklist: []
        };
      }
    }, true);
    expect(vm.checked).to.be.true;
    expect(vm.checklist.indexOf('a') !== -1).to.be.true;
  });
});
