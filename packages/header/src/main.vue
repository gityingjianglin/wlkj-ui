<template>
  <header class="wl-header" :style="{ height }">
    <slot></slot>
  </header>
</template>
<script>
  export default {
    name: 'WlHeader',
    componentName: 'WlHeader',
    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
