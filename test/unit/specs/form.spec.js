import { createVue, destroyVM, waitImmediate } from '../util';

describe('Form', () => {
  let vm;
  let hasPromise = true;
  before(() => {
    if (!window.Promise) {
      hasPromise = false;
      window.Promise = require('es6-promise').Promise;
    }
  });
  after(() => {
    if (!hasPromise) {
      window.Promise = undefined;
    }
  });
  afterEach(() => {
    destroyVM(vm);
  });

  it('label width', done => {
    vm = createVue({
      template: `
        <wl-form label-width="80px" ref="form" :model="form">
          <wl-form-item label="活动名称">
          </wl-form-item>
        </wl-form>
      `,
      data() {
        return {
          form: {
            name: ''
          }
        };
      }
    }, true);
    expect(vm.$el.querySelector('.wl-form-item__label').style.width).to.equal('80px');
    expect(vm.$el.querySelector('.wl-form-item__content').style.marginLeft).to.equal('80px');
    done();
  });

  it('auto label width', async() => {
    vm = createVue({
      template: `
        <wl-form ref="form" :model="form" label-width="auto">
          <wl-form-item label="活动名称" prop="activityName">
          </wl-form-item>
          <wl-form-item label="活动名称备注" v-if="display" prop="remark">
          </wl-form-item>
        </wl-form>
      `,
      data() {
        return {
          form: {
            activityName: '',
            remark: ''
          },
          display: true
        };
      }
    }, true);
    await waitImmediate();

    const formItems = vm.$el.querySelectorAll('.wl-form-item__content');
    const marginLeft1 = parseInt(formItems[0].style.marginLeft, 10);
    const marginLeft2 = parseInt(formItems[1].style.marginLeft, 10);
    expect(marginLeft1 === marginLeft2).to.be.true;
    vm.display = false;
    await waitImmediate();

    const formItem = vm.$el.querySelector('.wl-form-item__content');
    const marginLeft3 = parseInt(formItem.style.marginLeft, 10);
    expect(marginLeft3 < marginLeft1).to.be.true;
  });

  it('inline form', done => {
    vm = createVue({
      template: `
        <wl-form label-width="80px" ref="form" :model="form" inline>
          <wl-form-item label="活动名称" prop="activityName">
          </wl-form-item>
        </wl-form>
      `,
      data() {
        return {
          form: {
            activityName: '',
            remark: ''
          },
          display: true
        };
      }
    }, true);
    expect(vm.$el.classList.contains('wl-form--inline')).to.be.true;
    done();
  });

  it('label position', done => {
    vm = createVue({
      template: `
        <div>
          <wl-form label-position="top" ref="labelTop" :model="form" >
            <wl-form-item label="活动名称" prop="activityName">
            </wl-form-item>
          </wl-form>
          <wl-form label-position="left" ref="labelLeft" :model="form" >
            <wl-form-item label="活动名称" prop="activityName">
            </wl-form-item>
          </wl-form>
        </div>
      `,
      data() {
        return {
          form: {
            activityName: '',
            remark: ''
          },
          display: true
        };
      }
    }, true);
    expect(vm.$refs.labelTop.$el.classList.contains('wl-form--label-top')).to.be.true;
    expect(vm.$refs.labelLeft.$el.classList.contains('wl-form--label-left')).to.be.true;
    done();
  });

  it('label size', () => {
    vm = createVue({
      template: `
        <div>
          <wl-form ref="formMini" size="mini" :model="form" >
            <wl-form-item label="活动名称" prop="activityName">
            </wl-form-item>
          </wl-form>
        </div>
      `,
      data() {
        return {
          form: {
            activityName: ''
          }
        };
      }
    }, true);
    expect(vm.$refs.formMini.$el.children[0].classList.contains('wl-form-item--mini')).to.be.true;
  });

  it('show message', done => {
    vm = createVue({
      template: `
        <div>
          <wl-form ref="form" :model="form"  >
            <wl-form-item label="活动名称" prop="activityName" :show-message="false"
              :rules="{
                required: true,
                message: '请输入活动名称',
                trigger: 'change',
                min: 3,
                max: 6
              }"
            >
            </wl-form-item>
          </wl-form>
        </div>
      `,
      data() {
        return {
          form: {
            activityName: ''
          }
        };
      }
    }, true);
    vm.$refs.form.validate((valid) => {
      expect(valid).to.not.true;
      vm.$refs.form.$nextTick(() => {
        expect(vm.$el.querySelector('.wl-form-item__error')).to.not.exist;
        done();
      });
    });
  });

  it('reset fields', (done) => {
    vm = createVue({
      template: `
        <wl-form ref="form" :rules="rules" :model="form" label-width="auto">
          <wl-form-item label="活动名称" prop="activityName">
          </wl-form-item>
          <wl-form-item label="活动备注"  prop="remark">
          </wl-form-item>
          <wl-form-item label="注意事项"  prop="notice">
          </wl-form-item>
        </wl-form>
      `,
      data() {
        return {
          form: {
            activityName: '',
            remark: '',
            notice: ''
          },
          rules: {
            activityName: [
              { required: true, message: '请输入活动名称', trigger: 'blur' }
            ],
            remark: [
              { required: true, message: '请选择活动备注', trigger: 'change' }
            ],
            notice: [
              { required: true, message: '请输入活动注意事项', trigger: 'change' }
            ]
          }
        };
      },
      methods: {
        setValue() {
          this.form.activityName = 'a';
          this.form.remark = 'b';
          this.form.notice = 'c';
        }
      }
    }, true);

    vm.setValue();
    vm.$refs.form.resetFields();
    vm.$refs.form.$nextTick(() => {
      expect(vm.form.activityName).to.equal('');
      expect(vm.form.remark).to.equal('');
      expect(vm.form.notice).to.equal('');
      done();
    });
  });

  it('clear validate', done => {
    vm = createVue({
      template: `
        <wl-form ref="form" :rules="rules" :model="form" label-width="auto">
          <wl-form-item label="活动名称" prop="activityName">
          </wl-form-item>
          <wl-form-item label="活动备注"  prop="remark">
          </wl-form-item>
          <wl-form-item label="注意事项"  prop="notice">
          </wl-form-item>
        </wl-form>
      `,
      data() {
        return {
          form: {
            activityName: '',
            remark: '',
            notice: ''
          },
          rules: {
            activityName: [
              { required: true, message: '请输入活动名称', trigger: 'blur' }
            ],
            remark: [
              { required: true, message: '请选择活动备注', trigger: 'change' }
            ],
            notice: [
              { required: true, message: '请输入活动注意事项', trigger: 'change' }
            ]
          }
        };
      }
    }, true);
    const form = vm.$refs.form;
    const activityNameField = form.fields.filter(field => field.prop === 'activityName')[0];
    const remarkField = form.fields.filter(field => field.prop === 'remark')[0];
    form.validate();
    vm.$nextTick(() => {
      expect(activityNameField.validateMessage).to.equal('请输入活动名称');
      form.clearValidate(['activityName']);
      vm.$nextTick(() => {
        expect(activityNameField.validateMessage).to.equal('');
        form.clearValidate();
        vm.$nextTick(() => {
          expect(remarkField.validateMessage).to.equal('');
          done();
        });
      });
    });
  });

  it('form item nest', done => {
    vm = createVue({
      template: `
        <wl-form ref="form" :rules="rules" :model="form" label-width="auto">
          <wl-form-item label="活动时间" prop="activityDate">
            <wl-form-item label="开始时间" prop="startDate">
            </wl-form-item>
            <wl-form-item label="结束时间"  prop="endDate">
            </wl-form-item>
          </wl-form-item>
        </wl-form>
      `,
      data() {
        return {
          form: {
            activityDate: '',
            startDate: '',
            endDate: ''
          },
          rules: {
            startDate: [
              { required: true, message: '请输入活动开始时间', trigger: 'blur' }
            ],
            endDate: [
              { required: true, message: '请输入活动结束时间', trigger: 'blur' }
            ]
          }
        };
      }
    }, true);
    vm.$refs.form.validate(valid => {
      expect(valid).to.not.true;
      done();
    });
  });

  /* describe('validate', () => {
    it('input', done => {
      vm = createVue({
        template: `
          <wl-form ref="form" :rules="rules" :model="form" label-width="auto">
            <wl-form-item label="活动时间" prop="activityName" ref="activityName">
              <input v-model="form.activityName" type="text" />
            </wl-form-item>
          </wl-form>
        `,
        data() {
          return {
            form: {
              activityName: ''
            },
            rules: {
              activityName: [
                { required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
              ]
            }
          };
        },
        methods: {
          setValue(value) {
            this.form.activityName = value;
          }
        }
      }, true);
      vm.$refs.form.validate((valid) => {
        const field = vm.$refs.activityName;
        expect(valid).to.not.true;
        done();
        // 需要处理表单子元素 input textarea等 v-model绑定key的值变化以后，通知wl-form-item组件验证，表单子元素组件尚未开发 todo
        vm.$refs.form.$nextTick(() => {
          expect(field.validateMessage).to.equal('请输入活动名称');
          vm.setValue = 'abcdef';
          vm.$refs.form.$nextTick(() => {
            expect(field.validateMessage).to.equal('');
            vm.setValue = 'aa';
            vm.$refs.form.$nextTick(() => {
              expect(field.validateMessage).to.equal('请输入活动名称');
              done();
            });
          });
        });
      });
    });
  }); */

  /* it('textarea', done => {
    vm = createVue({
      template: `
        <wl-form ref="form" :rules="rules" :model="form" label-width="auto">
          <wl-form-item label="活动时间" prop="activityName" ref="activityName">
            <textarea v-model="from.activityName"></textarea>
          </wl-form-item>
        </wl-form>
      `,
      data() {
        return {
          form: {
            activityName: ''
          },
          rules: {
            activityName: [
              { required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
            ]
          }
        };
      },
      methods: {
        setValue(value) {
          this.form.activityName = value;
        }
      }
    }, true);
    vm.$refs.form.validate((valid) => {
      const field = vm.$refs.activityName;
      expect(valid).to.not.true;
      vm.$refs.form.$nextTick(() => {
        expect(field.validateMessage).to.equal('请输入活动名称');
        this.setValue = 'abcdef';
        vm.$refs.form.$nextTick(() => {
          expect(field.validateMessage).to.equal('');
          this.setValue = 'aa';
          vm.$refs.form.$nextTick(() => {
            expect(field.validateMessage).to.equal('请输入活动名称');
            done();
          });
        });
      });
    });
  }); */
});
