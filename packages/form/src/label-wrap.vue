<script>
  export default {
    inject: ['wlForm', 'wlFormItem'],
    render() {
      // 渲染label节点
      const slots = this.$slots.default;
      if (!slots) return null;
      if (this.isAutoWidth) {
        const autoLabelWidth = this.wlForm.autoLabelWidth;
        const style = {};
        if (autoLabelWidth && autoLabelWidth !== 'auto') {
          // label左间距样式等于所有label最大宽度-自身label宽度
          const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth;
          if (marginLeft) {
            style.marginLeft = marginLeft + 'px';
          }
        }
        return (<div class="wl-form-item__label-wrap" style={style}>
          { slots }
        </div>);
      } else {
        return slots[0];
      }
    },
    props: {
      isAutoWidth: Boolean, // label标签是否是auto属性
      updateAll: Boolean // 如果label标签是auto属性，则需要同步更新所有label标签宽度
    },
    data() {
      return {
        computedWidth: 0 // label计算宽度
      };
    },
    computed: {
    },
    watch: {
      computedWidth(val, oldVal) {
        if (this.updateAll) {
          this.wlForm.registerLabelWidth(val, oldVal);
          this.wlFormItem.updateComputedLabelWidth(val);
        }
      }
    },
    methods: {
      // 获取label标签内容宽度
      getLabelWidth() {
        if (this.$el && this.$el.firstElementChild) {
          const computedWidth = window.getComputedStyle(this.$el.firstElementChild).width;
          return Math.ceil(parseFloat(computedWidth));
        } else {
          return 0;
        }
      },
      updateLabelWidth(action = 'update') {
        if (this.$slots.default && this.isAutoWidth && this.$el.firstElementChild) {
          if (action === 'update') {
            this.computedWidth = this.getLabelWidth();
          } else {
            this.wlForm.deregisterLabelWidth(this.computedWidth);
          }
        }
      }
    },
    created() {
    },
    mounted() {
      this.updateLabelWidth('update');
    },
    updated() {
      this.updateLabelWidth('update');
    },
    beforeDestroy() {
      this.updateLabelWidth('remove');
    }

  };
</script>
