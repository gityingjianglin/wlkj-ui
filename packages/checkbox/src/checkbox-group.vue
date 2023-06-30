<template>
  <div class="wl-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
  import Emitter from 'wlkj-ui/src/mixins/emitter';
  export default {
    name: 'WlCheckboxGroup',
    componentName: 'WlCheckboxGroup',
    mixins: [Emitter],
    inject: {
      wlFormItem: {
        default: ''
      }
    },
    data() {
      return {
        test: 1
      };
    },
    props: {
      value: {},
      disabled: Boolean, // 是否禁用checkboxgroup
      min: Number, // 可被勾选的checkbox最小数量
      max: Number, // 可被勾选的checkbox最大数量
      size: String // 多选框尺寸，仅对按钮形式的checkbox或者带有border的checkbox生效
    },
    computed: {
      _wlFormItemSize() {
        return (this.wlFormItem || {}).wlFormItemSize;
      },
      checkboxGroupSize() {
        return this.size || this._wlFormItemSize || (this.$WLKJ || {}).size;
      }
    },
    watch: {
      value(value) {
        this.dispatch('WlFormItem', 'wl.form.change', [value]);
      }
    },
    methods: {
    }
  };
</script>
