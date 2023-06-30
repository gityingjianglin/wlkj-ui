<template>
  <div :class="[
      type === 'textarea' ? 'wl-textarea' : 'wl-input',
      inputSize ? 'wl-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'wl-input-group': $slots.prepend || $slots.append,
        'wl-input-group--append': $slots.append,
        'wl-input-group--prepend': $slots.prepend,
        'wl-input--prefix': $slots.prefix || prefixIcon,
        'wl-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="wl-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        class="wl-input__inner"
        v-bind="$attrs"
        :disabled="inputDisabled"
        :readonly="readonly"
        ref="input"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span class="wl-input__prefix" v-if="($slots.prefix || prefixIcon)">
        <slot name="prefix"></slot>
        <i
          class="wl-input__icon"
          v-if="prefixIcon"
          :class="prefixIcon"
        >
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="wl-input__suffix"
        v-if="getSuffixVisible()"
      >
        <span class="wl-input__suffix-inner">
          <template v-if="(!showClear || !showPwdVisible || !isWordLimitVisible)">
            <slot name="suffix"></slot>
            <i
              class="wl-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon"
            >
            </i>
          </template>
          <i
            v-if="showClear"
            class="wl-input__icon wl-input__clear wl-icon-CloseCircleOutlined "
            @mousedown.prevent
            @click="clear"
          >
          </i>
          <i
            v-if="showPwdVisible"
            class="wl-input__icon wl-input__clear"
            :class="[passwordVisible ? 'wl-icon-EyeOutline': 'wl-icon-EyeInvisibleOutline']"
            @click="handlePasswordVisible"
          >
          </i>
          <span v-if="isWordLimitVisible" class="wl-input__count">
            <span class="wl-input__count-inner">
              {{textLength}}/{{upperLimit}}
            </span>
          </span>
        </span>
        <i
          class="wl-input__icon"
          v-if="validateState"
          :class="['wl-input__validateIcon', validateIcon]"
        >
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="wl-input-group__append"
        v-if="$slots.append"
      >
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="wl-textarea__inner"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      ref="textarea"
      :style="textareaStyle"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'" class="wl-input__count">{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>
<script>
  import merge from 'wlkj-ui/src/utils/merge';
  import emitter from 'wlkj-ui/src/mixins/emitter';
  import Migrating from 'wlkj-ui/src/mixins/migrating';
  import {isKorean} from 'wlkj-ui/src/utils/shared';
  import calcTextareaHeight from './calcTextareaHeight';
  export default {
    name: 'WlInput',
    componentName: 'WlInput',
    mixins: [emitter, Migrating],
    inheritAttrs: false, // 避免底层容器继承属性传递给当前子组件，只接收直接父组件的@attrs
    inject: {
      wlForm: {
        default: ''
      },
      wlFormItem: {
        default: ''
      }
    },
    props: {
      value: [String, Number],
      size: String,
      resize: String,
      prefixIcon: String, // 前置icon样式
      suffixIcon: String, // 后置icon样式
      disabled: Boolean,
      readonly: Boolean,
      autocomplete: {
        type: String,
        default: 'off'
      },
      type: {
        type: String,
        default: 'text'
      },
      clearable: {
        type: Boolean,
        default: false
      },
      showPassword: {
        type: Boolean,
        default: false
      },
      showWordLimit: {
        type: Boolean,
        default: false
      },
      tabindex: String,
      label: String,
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      validateEvent: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        hovering: false,
        focused: false, // 表单元素是否聚焦
        isComposing: false,
        passwordVisible: false, // 表单元素显示密码框
        textareaCalcStyle: {} //
      };
    },
    computed: {
      _wlFormItemSize() {
        return (this.wlFormItem || {}).wlFormItemSize;
      },
      // 获取表单元素验证状态 validating error success
      validateState() {
        return this.wlFormItem ? this.wlFormItem.validateState : '';
      },
      validateIcon() {
        return {
          validating: 'wl-icon-ClockCircleOutline',
          success: 'wl-icon-CheckCircleOutline',
          error: 'wl-icon-CloseCircleOutlined'
        }[this.validateState];
      },
      textareaStyle() {
        return merge({}, this.textareaCalcStyle, { resize: this.resize });
      },
      inputSize() {
        return this.size || this._wlFormItemSize || (this.$WLKJ || {}).size;
      },
      inputDisabled() {
        return this.disabled || (this.wlForm || {}).disabled;
      },
      nativeInputValue() {
        return this.value === null || this.value === undefined ? '' : String(this.value);
      },
      // 验证反馈图标
      needStatusIcon() {
        return this.wlForm ? this.wlForm.statusIcon : false;
      },
      showClear() {
        return this.clearable &&
          !this.inputDisabled &&
          !this.readonly &&
          this.nativeInputValue &&
          (this.focused || this.hovering);
      },
      showPwdVisible() {
        return this.showPassword &&
          !this.inputDisabled &&
          !this.readonly &&
          (!!this.nativeInputValue || this.focused);
      },
      isWordLimitVisible() {
        return this.showWordLimit &&
          this.$attrs.maxlength &&
          (this.type === 'text' || this.type === 'textarea') &&
          !this.inputDisabled &&
          !this.readonly &&
          !this.showPassword;
      },
      // 当前已输入字符数
      textLength() {
        if (typeof this.value === 'number') {
          return String(this.value).length;
        }
        return (this.value || '').length;
      },
      // 当前最大能输入字符
      upperLimit() {
        return this.$attrs.maxlength;
      },
      // 是否输入超越最大字符
      inputExceed() {
        return this.isWordLimitVisible &&
          (this.textLength > this.upperLimit);
      }
    },
    watch: {
      value(val) {
        // value值变化重新计算textarea高度
        this.$nextTick(this.resizeTextarea);
        if (this.validateEvent) {
          this.dispatch('WlFormItem', 'wl.form.change', [val]);
        }
      },
      nativeInputValue() {
        // 绑定value值改变，则改变元素实际value值
        this.setNativeInputValue();
      },
      type() {
        // type值改变，重新执行mounted挂载内容
        this.$nextTick(() => {
          this.setNativeInputValue();
          this.updateIconOffset();
          this.resizeTextarea();
        });
      }
    },
    methods: {
      getInput() {
        return this.$refs.input || this.$refs.textarea;
      },
      focus() {
        this.getInput().focus();
      },
      blur() {
        this.getInput().blur();
      },
      select() {
        this.getInput().select();
      },
      handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('WlFormItem', 'wl.form.blur', [this.value]);
        }
      },
      handleFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      // 计算textarea高度
      resizeTextarea() {
        if (this.$isServer) return;
        const { autosize, type } = this;
        if (type !== 'textarea') return;
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
          };
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;
        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      handleCompositionStart(event) {
        // 向组件外推送compositionstart事件，即在WlInput组件上绑定@compositionstart监听事件
        this.$emit('compositionstart', event);
        this.isComposing = true;
      },
      handleCompositionEnd(event) {
        this.$emit('compositionend', event);
        if (this.isComposing) {
          this.isComposing = false;
          this.handleInput(event);
        }
      },
      handleCompositionUpdate(event) {
        this.$emit('compositionupdate', event);
        const text = event.target.value;
        const lastCharacter = text[text.length - 1] || '';
        this.isComposing = !isKorean(lastCharacter);
      },
      handleInput(event) {
        // 如果还处于拼音输入中文区间，则返回
        if (this.isComposing) return;
        if (event.target.value === this.nativeInputValue) return;
        this.$emit('input', event.target.value);
        this.$nextTick(this.setNativeInputValue);
      },
      setNativeInputValue() {
        const input = this.getInput();
        if (!input) return;
        if (input.value === this.nativeInputValue) return;
        input.value = this.nativeInputValue;
      },
      getSuffixVisible() {
        return this.$slots.suffix ||
          this.suffixIcon ||
          this.clearable ||
          this.showPassword ||
          this.showWordLimit ||
          (this.validateState && this.nativeInputValue);
      },
      clear() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear');
      },
      handlePasswordVisible() {
        this.passwordVisible = !this.passwordVisible;
        this.$nextTick(() => {
          this.focus();
        });
      },
      // 在有前置prepend和后置append元素的情况下重新计算prefix和suffix位置(prefix，suffix默认是绝对定位，以父元素为参照)
      calcIconOffset(place) {
        let elList = [].slice.call(this.$el.querySelectorAll(`.wl-input__${place}`) || []);
        if (!elList.length) return;
        let el = null;
        for (let i = 0; i < elList.length; i++) {
          if (elList[i].parentNode === this.$el) {
            el = elList[i];
            break;
          }
        }
        if (!el) return;
        const pendantMap = {
          suffix: 'append',
          prefix: 'prepend'
        };

        const pendant = pendantMap[place];
        if (this.$slots[pendant]) {
          el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelector(`.wl-input-group__${pendant}`).offsetWidth}px)`;
        } else {
          el.removeAttribute('style');
        }
      },
      updateIconOffset() {
        this.calcIconOffset('prefix');
        this.calcIconOffset('suffix');
      }
    },
    created() {
      this.$on('inputSelect', this.select);
    },
    mounted() {
      this.setNativeInputValue();
      this.updateIconOffset();
      this.resizeTextarea();
    },
    updated() {
      this.$nextTick(this.updateIconOffset);
    }
  };
</script>
