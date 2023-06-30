<template>
  <a
  class="wl-link"
  :href="linkHref"
  :class="[
    type ? 'wl-link--' + type : '',
    {
      'is-underline': !disabled && underline,
      'is-disabled': disabled
    }
  ]"
  >
    <i :class="icon" v-if="iconClass.length === 1"></i>
    <span v-if="$slots.default">
      <slot></slot>
      <i :calss=iconClass v-if="iconClass.length > 1"></i>
    </span>
  </a>
</template>
<script>
export default {
  name: 'WlLink',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    },
    linkHref: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    iconClass() {
      return this.icon.split(' ');
    }
  }
};
</script>