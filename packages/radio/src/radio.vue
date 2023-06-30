<template>
  <label
    class="wl-radio"
    :class="[
      border && radioSize ? 'wl-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-hidden-radio': hiddenRadio},
      { 'is-checked': model === label }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span class="wl-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="wl-radio__inner"></span>
      <input
        ref="radio"
        class="wl-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        autocomplete="off"
      >
    </span>
    <span class="wl-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from 'wlkj-ui/src/mixins/emitter';
  export default {
    name: 'WlRadio',
    mixins: [Emitter],
    inject: {
      wlForm: {
        default: ''
      },
      wlFormItem: {
        default: ''
      }
    },
    componentName: 'WlRadio',
    data() {
      return {
        focus: false
      };
    },
    props: {
      value: {}, // 绑定值
      label: {}, // radio value值，如v-model绑定值与label值相等，则radio组件选中
      disabled: Boolean, // 是否禁用
      border: Boolean, // 是否显示边框
      name: String, // radio 分类name
      hiddenRadio: {
        type: Boolean,
        default: false
      },
      size: String // 尺寸

    },
    watch: {
    },
    computed: {
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'WlRadioGroup') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value;
        },
        set(val) {
          if (this.isGroup) {
            this.dispatch('WlRadioGroup', 'input', [val]);
          } else {
            this.$emit('input', val);
          }
          this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
        }
      },
      _wlFormItemSize() {
        return (this.wlFormItem || {}).wlFormItemSize;
      },
      radioSize() {
        const tempRadioSize = this.size || this._wlFormItemSize || (this.$WLKJ || {}).size;
        return this.isGroup
          ? this._radioGroup.radioGroupSize || tempRadioSize
          : tempRadioSize;
      },
      isDisabled() {
        return this.isGroup
          ? this._radioGroup.disabled || this.disabled || (this.wlForm || {}).disabled
          : this.disabled || (this.wlForm || {}).disabled;
      },
      tabIndex() {
        return (this.isDisabled || (this.isGroup && this.model !== this.label)) ? -1 : 0;
      }
    },
    methods: {
      handleChange() {
        this.$nextTick(() => {
          this.$emit('change', this.model);
          this.isGroup && this.dispatch('WlRadioGroup', 'handleChange', this.model);
        });
      }
    },
    created() {
    },
    mounted() {
    }
  };
</script>
