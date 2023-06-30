import { destroyVM, createVue, createTest } from '../util';
import DatePicker from 'packages/date-picker';

describe('DatePicker', () => {
  const getDatePickerVm = (configs = {}, options) => {
    ['readonly', 'editable', 'clearable', 'placeholder', 'disabled'].forEach(config => {
      configs[config] = configs[config] || false;
    });
    configs.pickerOptions = configs.pickerOptions || null;
    configs.placeholder = configs.placeholder || '请选择';
    configs.dateValue = configs.dateValue || new Date();
    const vm = createVue({
      template: `
        <div>
          <wl-date-picker
            v-model='dateValue'
            :readonly='readonly'
            :editable='editable'
            :disabled='disabled'
            :pickerOptions='pickerOptions'
            :popper-class="popperClass"
            :clearable="clearable"></wl-date-picker>
        </div>
      `,

      data() {
        return {
          readonly: configs.readonly,
          editable: configs.editable,
          clearable: configs.clearable,
          disabled: configs.disabled,
          pickerOptions: configs.pickerOptions,
          placeholder: configs.placeholder,
          popperClass: configs.popperClass,
          dateValue: configs.dateValue
        };
      }
    }, true);
    return vm;
  };

  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(DatePicker, true);
    expect(vm.$el.className).to.equal('wl-date-picker');
    vm.handleFocus();
    expect(vm.visible).to.true;
  });

  it('custom dropdown class', () => {
    vm = getDatePickerVm({ popperClass: 'custom-dropdown' });
    const dropdown = vm.$el.querySelector('.wl-select-dropdown');
    expect(dropdown.classList.contains('custom-dropdown')).to.true;
  });

  it('disabled datepicker', () => {
    vm = createTest(DatePicker, { disabled: true }, true);
    const input = vm.$el.querySelector('.wl-input');
    console.log(input.classList);
    expect(input.classList.contains('is-disabled')).to.true;
  });

  it('readonly datepicker', () => {
    vm = createTest(DatePicker, { readonly: true }, true);
    const input = vm.$el.querySelector('.wl-input__inner');
    console.log(input);
    expect(input.getAttribute('readonly')).to.equal('readonly');
  });

  it('editable datepicker', () => {
    vm = createTest(DatePicker, { editable: false }, true);
    const input = vm.$el.querySelector('.wl-input__inner');
    console.log(input);
    expect(input.getAttribute('readonly')).to.equal('readonly');
  });

  it('value datepicker', async() => {
    vm = createVue({
      template: `
      <wl-date-picker v-model='dateValue'></wl-date-picker>
      `,
      data() {
        return {
          dateValue: new Date()
        };
      }
    }, true);
    let getYear = new Date().getFullYear();
    console.log(getYear);
    let getMonth = new Date().getMonth() + 1;
    if (getMonth < 10) {
      getMonth = '0' + getMonth;
    }
    let getDay = new Date().getDate();
    if (getDay < 10) {
      getDay = '0' + getDay;
    }
    let chooseDate = getYear + '-' + getMonth + '-' + getDay;
    console.log('vm.chooseDate');
    console.log(vm._data);
    // console.log(vm);
    const input = vm.$el.querySelector('.wl-input__inner');
    vm.$nextTick(_ => {
      console.log(input.value);
      expect(input.value).to.equal(chooseDate);
    });
  });

  it('focus', done => {
    vm = createVue({
      template: `
      <wl-date-picker ref='datePicker'></wl-date-picker>
      `
    }, true);
    const spy = sinon.spy();

    vm.$refs.datePicker.$on('focus', spy);
    vm.$refs.datePicker.handleFocus();

    vm.$nextTick(_ => {
      expect(spy.calledOnce).to.be.true;
      done();
    });
  });
});
