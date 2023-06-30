<template>
  <div class="wl-form-item" :class="[{
      'wl-form-item--feedback': wlForm && wlForm.statusIcon,
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required': isRequired || required,
      'is-no-asterisk': wlForm && wlForm.hideRequiredAsterisk
    },
    sizeClass ? 'wl-form-item--' + sizeClass : ''
  ]">
    <label-wrap
      :is-auto-width="labelStyle && labelStyle.width === 'auto'"
      :update-all="form.labelWidth === 'auto'"
    >
      <label :for="labelFor" class="wl-form-item__label" :style="labelStyle" v-if="label || $slots.label" >
        <slot name="label">{{label + form.labelSuffix}}</slot>
      </label>
    </label-wrap>
    <div class="wl-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="wl-zoom-in-top">
        <slot
          v-if="validateState ==='error' && showMessage && wlForm.showMessage"
          name="error"
          :error="validateMessage">
          <div
            class="wl-form-item__error"
            :class="{
              'wl-form-item__error--inline': typeof inlineMessage === 'boolean'
                ? inlineMessage
                : (wlForm && wlForm.inlineMessage || false)
            }">
            {{validateMessage}}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>
<script>
  import AsyncValidator from 'async-validator';
  import LabelWrap from './label-wrap';
  import { noop, getPropByPath } from 'wlkj-ui/src/utils/util';
  import emitter from 'wlkj-ui/src/mixins/emitter';
  import objectAssign from 'wlkj-ui/src/utils/merge';
  export default {
    name: 'WlFormItem',
    componentName: 'WlFormItem',
    inject: ['wlForm'],
    provide() {
      return {
        wlFormItem: this
      };
    },
    mixins: [emitter],
    components: {
      LabelWrap
    },
    props: {
      label: String, // 表单元素label名称
      labelWidth: String, // 表单元素label宽度
      prop: String, // 表单元素挂载字段名
      size: String, // 表单内元素尺寸 取值medium，small，mini
      required: { // 表单元素字段是否必填
        type: Boolean,
        default: undefined
      },
      rules: [Object, Array], // 表单元素验证规则，可以数组的方式传入多个规则
      error: String,
      validateStatus: String,
      for: String, // label挂载字段
      inlineMessage: { // 行内显示错误信息
        type: [String, Boolean],
        default: ''
      },
      showMessage: { // 是否显示验证错误信息
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        validateState: '',
        validateMessage: '',
        validateDisabled: false,
        computedLabelWidth: 0, // label计算宽度
        validator: {},
        isNested: false
      };
    },
    watch: {
      error: {
        immediate: true,
        handler(value) {
          this.validateMessage = value;
          this.validateState = value ? 'error' : '';
        }
      },
      validateStatus(value) {
        this.validateState = value;
      },
      rules(value) {
        if ((!value || value.length === 0) && this.required === undefined) {
          this.clearValidate();
        }
      }
    },
    computed: {
      form() {
        let parent = this.$parent;
        let parentName = parent.$options.componentName;
        while (parentName !== 'WlForm') {
          if (parentName === 'WlFormItem') {
            this.isNested = true;
          }
          parent = parent.$parent;
          parentName = parent.$options.componentName;
        }
        return parent;
      },
      labelFor() {
        return this.for || this.prop;
      },
      labelStyle() {
        let ret = {};
        if (this.form.lablePosition === 'top') return ret;
        const labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          ret.width = labelWidth;
        }
        return ret;
      },
      contentStyle() {
        const ret = {};
        const label = this.label;
        if (this.form.lablePosition === 'top' || this.form.inline) return ret;
        if (!label && !this.labelWidth && this.isNested) return ret;
        const labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth === 'auto') {
          if (this.labelWidth === 'auto') {
            ret.marginLeft = this.computedLabelWidth;
          } else if (this.form.labelWidth === 'auto') {
            ret.marginLeft = this.wlForm.autoLabelWidth;
          }
        } else {
          ret.marginLeft = labelWidth;
        }
        return ret;
      },
      fieldValue() {
        const model = this.wlForm.model;
        if (!model || !this.prop) return;
        let path = this.prop;
        if (path.indexOf(':') > -1) {
          path = path.replace(/:/, '.');
        }
        return getPropByPath(model, path, true).v;
      },
      isRequired() {
        let rules = this.getRules;
        let isRequired = false;
        if (rules && rules.length) {
          rules.every((rule) => {
            if (rule.required) {
              isRequired = true;
              return false;
            }
            return true;
          });
        }
        return isRequired;
      },
      // 获取外层表单尺寸
      _formSize() {
        return this.wlForm.size;
      },
      wlFormItemSize() {
        return this.size || this._formSize;
      },
      sizeClass() {
        let result = this.wlFormItemSize || (this.$WLKJ || {}).size;
        return result;
      }
    },
    methods: {
      validate(trigger, callback = noop) {
        this.validateDisable = false;
        const rules = this.getFilteredRules(trigger);
        if (!rules || rules.length === 0 && this.required === undefined) {
          callback();
          return true;
        }

        this.validateState = 'validating';
        const descriptor = {};
        rules.forEach((rule) => {
          delete rule.trigger;
        });

        descriptor[this.prop] = rules;

        let model = {};
        model[this.prop] = this.fieldValue;

        const validator = new AsyncValidator(descriptor);
        validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
          this.validateState = !errors ? 'success' : 'error';
          this.validateMessage = errors ? errors[0].message : '';
          callback(this.validateMessage, invalidFields);
          // 通知父元素wlForm表单子元素验证结果
          this.wlForm && this.wlForm.$emit('validate', this.prop, !errors, this.validateMessage || null);
        });
      },
      // 清除表单元素验证信息
      clearValidate() {
        this.validateMessage = '';
        this.validateState = '';
        this.validateDisable = false;
      },
      resetField() {
        this.validateState = '';
        this.validateMessage = '';

        let model = this.form.model;
        let value = this.fieldValue;
        let path = this.prop;
        if (path.indexOf(':') > -1) {
          path = path.replace(/:/, '.');
        }

        let prop = getPropByPath(model, path, true);
        this.validateDisable = true;
        if (Array.isArray(value)) {
          prop.o[prop.k] = [].concat(this.initialValue);
        } else {
          prop.o[prop.k] = this.initialValue;
        }
        this.$nextTick(() => {
          this.validateDisable = false;
        });

        this.broadcast('WlTimeSelect', 'fieldReset', this.initialValue);
      },
      getRules() {
        let formRules = this.form.rules; // form表单rules
        let selfRules = this.rules; // 表单元素自身rules
        const requiredRule = this.required !== undefined ? {required: !!this.required} : []; // 是否必填规则

        const prop = getPropByPath(formRules, this.prop || ''); // 表单所有prop
        formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : []; // 获取表单所属prop校验规则
        return [].concat(selfRules || formRules || []).concat(requiredRule); // 返回所属表单元素规则数组，如果表单元素有规则，则屏蔽表单所属规则
      },
      getFilteredRules(trigger) {
        const rules = this.getRules();
        return rules.filter((rule) => {
          if (!rule.trigger || trigger === '') return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger);
          } else {
            return rule.trigger === trigger;
          }
        }).map(rule => objectAssign({}, rule));
      },
      updateComputedLabelWidth(width) {
        this.computedLabelWidth = width ? `${width}px` : '';
      },
      addValidateEvents() {
        const rules = this.getRules();
        if (rules.length || this.required !== undefined) {
          this.$on('wl.form.blur', this.onFieldBlur);
          this.$on('wl.form.change', this.onFieldChange);
        }
      },
      onFieldBlur() {
        this.validate('blur');
      },
      onFieldChange() {
        if (this.validateDisable) {
          this.validateDisable = false;
          return;
        }
        this.validate('change');
      },
      removeValidateEvents() {
        this.$off();
      }
    },
    created() {
    },
    mounted() {
      if (this.prop) {
        this.dispatch('WlForm', 'wl.form.addField', [this]);
      }
      let initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      });
      this.addValidateEvents();
    },
    beforeDestroy() {
      this.dispatch('WlForm', 'wl.form.removeField', [this]);
    }
  };
</script>
