<template>
  <footer class="wl-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>
<script>
  export default {
    name: 'WlFooter',
    componentName: 'WlFooter',
    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
