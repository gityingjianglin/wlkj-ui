<template>
  <aside class="wl-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>
<script>
  export default {
    name: 'WlAside',
    componentName: 'WlAside',
    props: {
      width: {
        type: String,
        default: '300px'
      }
    }
  };
</script>
