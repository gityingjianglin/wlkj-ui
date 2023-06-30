<template>
  <div class="wl-breadcrumb">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WlBreadcrumb',
    props: {
      separator: {
        type: String
      },
      separatorClass: {
        type: String
      }
    },
    data() {
      return {
        index1: 123
      };
    },
    provide() {
      return {
        breadcrumb: this
      };
    }
  };
</script>