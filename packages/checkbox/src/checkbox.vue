<template>
  <label
    class="wl-checkbox"
    :class="[
      border && checkboxSize ? 'wl-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      {  'is-checked': isChecked }
    ]"
    :id="id"
  >
    <span class="wl-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="wl-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        class="wl-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
      <input
        v-else
        class="wl-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
    </span>
    <span class="wl-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from 'wlkj-ui/src/mixins/emitter';
  export default {
    name: 'WlCheckbox',
    mixins: [Emitter],
    inject: {
      wlForm: {
        default: ''
      },
      wlFormItem: {
        default: ''
      }
    },
    componentName: 'WlCheckbox',
    data() {
      return {
        selfModel: false,
        focus: false,
        isLimitExceeded: false
      };
    },
    props: {
      value: {},
      label: {},
      indeterminate: Boolean,
      disabled: Boolean, // checkbox是否被禁用
      checked: Boolean, // checkbox是否被选中
      name: String,
      trueLabel: [String, Number],
      falseLabel: [String, Number],
      id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
      controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
      border: Boolean,
      size: String
    },
    watch: {
      value(value) {
        this.dispatch('WlFormItem', 'wl.form.change', value);
      }
    },
    computed: {
      model: {
        get() {
          return this.isGroup
            ? this.store : this.value !== undefined
              ? this.value : this.selfModel;
        },
        set(val) {
          if (this.isGroup) {
            this.isLimitExceeded = false;
            (this._checkboxGroup.min !== undefined &&
              val.length < this._checkboxGroup.min &&
                (this.isLimitExceeded = true));
            (this._checkboxGroup.max !== undefined &&
              val.length > this._checkboxGroup.max &&
                (this.isLimitExceeded = true));
            this.isLimitExceeded === false &&
            this.dispatch('WlCheckboxGroup', 'input', [val]);
          } else {
            this.$emit('input', val);
            this.selfModel = val;
          }
        }
      },
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'WlCheckboxGroup') {
            parent = parent.$parent;
          } else {
            this._checkboxGroup = parent;
            return true;
          }
        }
        return false;
      },
      store() {
        return this._checkboxGroup ? this._checkboxGroup.value : this.value;
      },
      isLimitDisabled() {
        const { max, min } = this._checkboxGroup;
        return !!(max || min) &&
          (this.model.length >= max && !this.isChecked) ||
          (this.model.length <= min && this.isChecked);
      },
      isDisabled() {
        return this.isGroup
          ? this._checkboxGroup.disabled || this.disabled || (this.wlForm || {}).disabled || this.isLimitDisabled
          : this.disabled || (this.wlForm || {}).disabled;
      },
      isChecked() {
        if ({}.toString.call(this.model) === '[object Boolean]') {
          return this.model;
        } else if (Array.isArray(this.model)) {
          return this.model.indexOf(this.label) > -1;
        } else if (this.model !== null && this.model !== undefined) {
          return this.model === this.trueLabel;
        }
      },
      _wlFormItemSize() {
        return (this.wlFormItem || {}).wlFormItemSize;
      },
      checkboxSize() {
        const temCheckboxSize = this.size || this._wlFormItemSize || (this.$WLKJ || {}).size;
        return this.isGroup
          ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
          : temCheckboxSize;
      }
    },
    methods: {
      addToStore() {
        if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
          this.model.push(this.label);
        } else {
          this.model = this.trueLabel || true;
        }
      },
      handleChange(ev) {
        if (this.isLimitExceeded) return;
        let value;
        if (ev.target.checked) {
          value = this.trueLabel === undefined ? true : this.trueLabel;
        } else {
          value = this.falseLabel === undefined ? false : this.falseLabel;
        }
        this.$emit('change', value, ev);
        this.$nextTick(() => {
          if (this.isGroup) {
            this.dispatch('WlCheckboxGroup', 'change', [this._checkboxGroup.value]);
          }
        });
      }
    },
    created() {
      // 默认被选中，把相关数据存储到this.model中
      this.checked && this.addToStore();
    },
    mounted() {
      if (this.indeterminate) {
        this.$el.setAttribute('aria-controls', this.controls);
      }
    }
  };
</script>
