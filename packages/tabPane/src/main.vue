<template >
    <div 
    class="wl-tab-pane"
    :style="{display: activeValue === name ? 'block' : 'none'}">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'WlTabPane',
  data() {
    return {
      headerArr: [],
      activeValue: ''
    };
  },
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  // computed: {
  //   activeValue: {
  //     get() {
  //     console.log(this.tabs.checkedValue, 'this.tabs.checkedValue');
  //     return this.tabs.checkedValue;
  //     },
  //     set() {}
  //   }
  // },
  // 动态添加时；删除时需要删除当前标签下对应的content
  watch: {
    'tabs.checkedValue': {
      handler(newVal, oldVal) {
        this.activeValue = newVal;
      }
    }
  },
  methods: {},
  mounted() {
    this.activeValue = this.tabs.value;
    if (this.activeValue === this.name) {
      this.tabs.headerList.push({label: this.label, name: this.name, activeFlag: true, disabled: this.disabled});
    } else {
      this.tabs.headerList.push({label: this.label, name: this.name, activeFlag: false, disabled: this.disabled});
    }
  },
  inject: ['tabs']
};
</script>

<style scoped lang="less">

</style>