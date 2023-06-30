<template>
  <ul class="wl-select-group__wrap" v-show="visible">
    <li class="wl-select-group__title">{{ label }}</li>
    <li>
      <ul class="wl-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from 'wlkj-ui/src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'WlOptionGroup',

    componentName: 'WlOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('WlOption', 'handleGroupDisabled', val);
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('WlOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
