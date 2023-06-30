<template>
  <form class="wl-form" :class="[
    labelPosition ? 'wl-form--label-' + labelPosition : '',
    { 'wl-form--inline': inline }
  ]">
    <slot></slot>
  </form>
</template>
<script>
  import objectAssign from 'wlkj-ui/src/utils/merge';
  export default {
    name: 'WlForm',
    componentName: 'WlForm',
    provide() {
      return {
        wlForm: this
      };
    },
    props: {
      labelPosition: String, // label标签字体对齐位置 right/left/top 默认值为right
      labelWidth: String, // label标签宽度，可以是auto
      labelSuffix: {
        type: String,
        default: ''
      },
      inline: Boolean, // 是否行内展示表单元素
      inlineMessage: Boolean, // 是否行内展示表单元素错误信息
      rules: Object, // form表单规则校验
      validateOnRuleChange: { // 是否rules规则改变，重新验证表单元素
        type: Boolean,
        default: true
      },
      model: Object, // 表单绑定对象
      showMessage: { // 是否展示验证出错信息
        type: Boolean,
        default: true
      },
      size: String, // 表单元素尺寸 取值为medium / small / mini
      hideRequiredAsterisk: { // 隐藏必填字段前面星号
        type: Boolean,
        default: false
      },
      disabled: Boolean, // 是否禁用表单内所有组件，默认值为false
      statusIcon: Boolean // 验证反馈图标
    },
    data() {
      return {
        fields: [], // 表单元素集合
        potentialLabelWidthArr: [] // 表单元素label标签宽度集合
      };
    },
    computed: {
      autoLabelWidth() {
        if (!this.potentialLabelWidthArr.length) return 0;
        const max = Math.max(...this.potentialLabelWidthArr);
        return max ? `${max}px` : '';
      }
    },
    watch: {
      rules() {
        // 从form-item组件中移除表单元素监听事件如blur，change，之后根据rules的变化内容重新绑定表单元素监听事件
        this.fileds.forEach((field) => {
          field.removeValidateEvents();
          field.addValidateEvents();
        });

        if (this.validateOnRuleChange) {
          this.validate(() => {});
        }
      }
    },
    methods: {
      resetFields() {
        if (!this.model) {
          console.warn('[Wlkj-ui Warn][Form]model is required for resetFields to work.');
          return;
        }
        this.fields.forEach(field => {
          field.resetField();
        });
      },
      clearValidate(props = []) {
        // 清除表单元素校验值
        const fields = props.length
          ? (typeof props === 'string'
            ? this.fileds.filter(field => field.prop === props)
            : this.fields.filter(field => props.indexOf(field.prop) > -1)
          ) : this.fields;
        fields.forEach((field) => {
          field.clearValidate();
        });
      },
      validate(callback) {
        if (!this.model) {
          console.warn('[Wlkj-ui Warn][Form]model is required for resetFields to work.');
          return;
        }

        let promise;
        if (typeof callback !== 'function' && window.promise) {
          promise = new window.Promise((resolve, reject) => {
            callback = function(valid, invalidFields) {
              valid ? resolve(valid) : reject(invalidFields);
            };
          });
        }

        let valid = true;
        let count = 0;
        let invalidFields = {};
        // 如果表单元素为空，则立即返回验证回调函数
        if (this.fields.length === 0 && callback) {
          callback(true);
        }

        this.fields.forEach((field) => {
          if (field) {
            field.validate('', (message, field) => {
              // 如果field没有规则，则message和field返回undefined，如field验证通过，message为''，field为null，如如field验证失败message为验证失败提示字段，field为验证失败字段对象
              if (message) {
                valid = false;
              }
              invalidFields = objectAssign({}, invalidFields, field);
              if (typeof callback === 'function' && ++count === this.fields.length) {
                // count判断全部验证完毕，则调用callback函数
                callback(valid, invalidFields);
              }
            });
          }
        });
        if (promise) {
          return promise;
        }
      },
      // 验证单个/多个字段
      validateField(props, cb) {
        props = [].concat(props);
        const fields = this.fields.filter(field => props.indexOf(field.prop) > -1);
        if (!fields.length) {
          console.warn('[Wlkj-ui Warn]please pass correct props!');
          return;
        }
        fields.forEach((field) => {
          field.validate('', cb);
        });
      },
      // 获取指定宽度值label的index
      getLabelWidthIndex(width) {
        const index = this.potentialLabelWidthArr.indexOf(width);
        if (index === -1) {
          throw new Error('[WlkjFrom]unpected width', width);
        }
        return index;
      },
      // 注册label宽度数组
      registerLabelWidth(val, oldVal) {
        if (val && oldVal) {
          const index = this.getLabelWidthIndex.indexOf(oldVal);
          this.potentialLabelWidthArr.splice(index, 1, val);
        } else if (val) {
          this.potentialLabelWidthArr.push(val);
        }
      },
      // 从数组中删除指定宽度label项
      deregisterLabelWidth(val) {
        const index = this.potentialLabelWidthArr.indexOf(val);
        this.potentialLabelWidthArr.splice(index, 1);
      }
    },
    created() {
      // 监听form表单添加field表单元素
      this.$on('wl.form.addField', (field) => {
        if (field) {
          this.fields.push(field);
        }
      });
      // 监听form表单移除field表单元素
      /* istanbul ignore next */
      this.$on('wl.form.removeField', (field) => {
        if (field.prop) {
          this.fields.splice(this.fields.indexOf(field), 1);
        }
      });
    },
    mounted() {}
  };
</script>
