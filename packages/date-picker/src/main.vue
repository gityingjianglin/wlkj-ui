<template>
  <div class="wl-date-picker">
    <div class="wl-date-editor wl-input--prefix wl-input--suffix wl-date-editor--date" v-clickoutside="handleClose">
      <wl-input
        v-model="chooseDate"
        ref="reference"
        :placeholder="placeholder"
        prefix-icon="wl-icon-CalendarFilled"
        :clearable="clearable"
        :readonly="readonly || !editable"
        @focus="handleFocus"
        @keydown.native.enter.prevent="handleClose('enter')"
        @blur="handleBlur"
        :disabled="disabled"></wl-input>
    </div>
    <transition
      name="wl-zoom-in-top"
      @after-leave="doDestroy">
      <div
        class="wl-select-dropdown wl-popper"
        ref="popper"
        :class="[popperClass]"
        v-show="visible">
        <wl-date @getTime="getTime" ref="dateRef" :pickerOptions="pickerOptions"></wl-date>
      </div>
    </transition>
  </div>
</template>
<script>
import wlInput from 'wlkj-ui/packages/input';
import wlDate from './date';
// import WlDateMenu from './date-dropdown';
import Emitter from 'wlkj-ui/src/mixins/emitter';
import Clickoutside from 'wlkj-ui/src/utils/clickoutside';
import Popper from 'wlkj-ui/src/utils/vue-popper';
export default {
  mixins: [Emitter, Popper],
  name: 'WlDatePicker',
  data() {
    return {
      chooseDate: '',
      visible: false,
      isShow: false // 点击日历除日期以为的地方不隐藏弹框
    };
  },
  directives: { Clickoutside },
  components: {
    wlInput,
    wlDate
    // WlDateMenu
  },
  props: {
    value: {
      type: [String, Date]
    },
    'pickerOptions': {
      type: Object
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    // placement: {
    //   default: 'bottom-start'
    // },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },

    visibleArrow: {
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    size: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    valueFormat: {
      type: String
    },
    align: {
      type: String,
      default: 'left'
    },
    popperClass: {
      type: String
    },
    defaultValue: {
      type: Date
    }
  },
  methods: {
    handleFocus(event) {
      if (this.readonly || this.disabled || !this.editable) {
        return;
      }
      if (this.chooseDate) {
        let dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (dateFormat.test(this.chooseDate)) {
          this.$refs.dateRef.clickDay = this.chooseDate;
          this.$refs.dateRef.init(this.chooseDate);
        }
      } else {
        this.$refs.dateRef.clickDay = '';
        this.$refs.dateRef.init('');
      }
      this.visible = true;
      this.$emit('focus', event);
    },
    handleBlur(event) {
      this.$emit('blur', event);
    },
    blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },
    getTime(dateObj) { // 点击了日历
      this.chooseDate = dateObj.date;
      this.blur();
    },
    handleClose(str) {
      if (this.chooseDate) {
        let dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (dateFormat.test(this.chooseDate)) {
          if (this.pickerOptions && this.pickerOptions.disabledDate && this.pickerOptions.disabledDate(new Date(this.chooseDate))) {
            if (!str) {
              this.chooseDate = this.$refs.dateRef.clickDay;
              // this.visible = false;
              // this.$refs.reference.blur();
              // this.$emit('change', this.chooseDate);
            } else {
              return;
            }
          }
          this.$refs.dateRef.clickDay = this.chooseDate;
          this.visible = false;
          this.$refs.reference.blur();
          this.$emit('change', new Date(this.chooseDate));
        } else {
          if (!str) {
            this.chooseDate = this.$refs.dateRef.clickDay;
            this.visible = false;
            this.$emit('change', new Date(this.chooseDate));
          }
        }
      } else {
        if (!str) {
          this.visible = false;
        }
      }
    },
    enterOpt() {}
  },
  watch: {
    visible(val) {
      if (!val) {
        this.destroyPopper();
      } else {
        this.updatePopper();
      }
    }
  },
  created() {
  },
  mounted() {
    console.log('readonly');
    console.log(this.readonly);
    console.log(this.editable);
    this.referenceElm = this.$refs.reference.$el;
    this.popperElm = this.$refs.popper;
    this.$on('updatePopper', () => {
      if (this.visible) this.updatePopper();
    });
    if (this.value) {
      let getDate = new Date(this.value);
      let getYear = getDate.getFullYear();
      console.log(getYear);
      let getMonth = getDate.getMonth() + 1;
      if (getMonth < 10) {
        getMonth = '0' + getMonth;
      }
      let getDay = getDate.getDate();
      if (getDay < 10) {
        getDay = '0' + getDay;
      }
      this.chooseDate = getYear + '-' + getMonth + '-' + getDay;
    }
    this.$on('destroyPopper', this.destroyPopper);
  }
};
</script>
