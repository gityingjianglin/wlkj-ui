<template>
  <div class="wl-collapse" role="tablist" aria-multiselectable="true">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'WlCollapse',
    componentName: 'WlCollapse',
    provide() {
      return {
        collapse: this
      };
    },
    props: {
      value: {
        type: [Array, String, Number],
        default() {
          return [];
        }
      },
      accordion: Boolean
    },
    data() {
      return {
        activeNames: [].concat(this.value)

      };
    },
    computed: {
    },
    watch: {
      value(val) {
        this.activeNames = [].concat(this.value);
      }
    },
    methods: {
      setActiveNames(activeNames) {
        activeNames = [].concat(activeNames);
        let value = this.accordion ? activeNames[0] : activeNames;
        this.activeNames = activeNames;
        // 触发input事件，v-model指令自动改变绑定value值
        this.$emit('input', value);
        this.$emit('change', value);
      },
      handleItemClick(item) {
        if (this.accordion) {
          this.setActiveNames(
            (this.activeNames[0] || this.activeNames[0] === 0) &&
            this.activeNames[0] === item.name ? '' : item.name
          );
        } else {
          let activeNames = this.activeNames.slice(0);
          let idx = activeNames.indexOf(item.name);

          if (idx > -1) {
            activeNames.splice(idx, 1);
          } else {
            activeNames.push(item.name);
          }
          this.setActiveNames(activeNames);
        }
      }
    },
    created() {
      this.$on('item-click', this.handleItemClick);
    },
    mounted() {
    }
  };
</script>
