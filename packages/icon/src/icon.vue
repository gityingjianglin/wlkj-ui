<template>
  <div>
    <i :class="'wl-icon-' + name"></i>
    <slot name="default"></slot>
  </div>
</template>
<script>
  import Migrating from 'wlkj-ui/src/mixins/migrating';
  export default {
    name: 'WlIcon',
    mixins: [Migrating],
    props: {
      name: String
    },
    data() {
      return {
      };
    },
    mounted() {
    }
  };
</script>