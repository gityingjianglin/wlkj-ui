<template>
  <div
    class="wl-switch"
    :class="[{ 'is-disabled': switchDisabled, 'is-checked': checked }, switchSize ? 'wl-switch--' + switchSize : '']"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="switchDisabled"
    @click.prevent="switchValue"
  >
    <input
      class="wl-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :id="id"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      @keydown.enter="switchValue"
    >
    <span
      :class="['wl-switch__label', 'wl-switch__label--left', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText">
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>
    <span class="wl-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
    </span>
    <span
      :class="['wl-switch__label', 'wl-switch__label--right', checked ? 'is-active' : '']"
      v-if="activeIconClass || activeText">
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
  </div>
</template>
<script>
  import emitter from 'wlkj-ui/src/mixins/emitter';
  import Focus from 'wlkj-ui/src/mixins/focus';
  import Migrating from 'wlkj-ui/src/mixins/migrating';

  export default {
    name: 'WlSwitch',
    mixins: [Focus('input'), Migrating, emitter],
    inject: {
      wlForm: {
        default: ''
      }
    },
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 44
      },
      activeIconClass: {
        type: String,
        default: ''
      },
      inactiveIconClass: {
        type: String,
        default: ''
      },
      activeText: String,
      inactiveText: String,
      activeColor: {
        type: String,
        default: ''
      },
      inactiveColor: {
        type: String,
        default: ''
      },
      activeValue: {
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: false
      },
      name: {
        type: String,
        default: ''
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: 'medium' // 可选值large，medium，small
      },
      id: String
    },
    data() {
      return {
        coreWidth: this.width
      };
    },
    created() {
      if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
        this.$emit('input', this.inactiveValue);
      }
    },
    computed: {
      checked() {
        return this.value === this.activeValue;
      },
      switchDisabled() {
        return this.disabled || (this.wlForm || {}).disabled;
      },
      switchSize() {
        return this.size;
      }
    },
    watch: {
      checked() {
        this.$refs.input.checked = this.checked;
        if (this.activeColor || this.inactiveColor) {
          this.setBackgroundColor();
        }
        if (this.validateEvent) {
          this.dispatch('WlFormItem', 'wl.form.change', [this.value]);
        }
      }
    },
    methods: {
      handleChange(event) {
        const val = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', val);
        this.$emit('change', val);
        this.$nextTick(() => {
          // set input's checked property
          // in case parent refuses to change component's value
          if (this.$refs.input) {
            this.$refs.input.checked = this.checked;
          }
        });
      },
      setBackgroundColor() {
        let newColor = this.checked ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },
      switchValue() {
        !this.switchDisabled && this.handleChange();
      },
      getMigratingConfig() {
        return {
          props: {
            'on-color': 'on-color is renamed to active-color.',
            'off-color': 'off-color is renamed to inactive-color.',
            'on-text': 'on-text is renamed to active-text.',
            'off-text': 'off-text is renamed to inactive-text.',
            'on-value': 'on-value is renamed to active-value.',
            'off-value': 'off-value is renamed to inactive-value.',
            'on-icon-class': 'on-icon-class is renamed to active-icon-class.',
            'off-icon-class': 'off-icon-class is renamed to inactive-icon-class.'
          }
        };
      }
    },
    mounted() {
      /* istanbul ignore if */
      this.coreWidth = this.width;
      if (this.size === 'large') {
        this.coreWidth = 64;
      } else if (this.size === 'small') {
        this.coreWidth = 28;
      }
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      this.$refs.input.checked = this.checked;
    }
  };
</script>
