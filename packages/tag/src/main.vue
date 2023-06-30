<template>
      <span
      :style = "color ? {background: color} : {}"
      class="wl-tag"
      :class="[
        type ? 'wl-tag--' + type : '',
        size ? 'wl-tag--' + size : '',
        'wl-tag--' + effect,
        {
          'is-hit': hit
        }
      ]"
      >
      <slot></slot>
      <i v-if="closable" 
      class="wl-tag__close wl-icon-CloseOutlined"
      @click="handleClick"
      ></i>
      </span>
  </template>
  <script>
  export default {
    name: 'WlTag',
    props: {
      type: {
        type: String,
        default: ''
      },
      closable: {
        type: Boolean,
        default: false
      },
      hit: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: ''
      },
      effect: {
        type: String,
        default: 'light'
      },
      color: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('close', evt);
      }
    }
  };
  </script>
