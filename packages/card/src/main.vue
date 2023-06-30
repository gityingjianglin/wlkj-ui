<template>
  <div class="wl-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div class="wl-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="wl-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'WlCard',
    props: {
      header: {},
      bodyStyle: {},
      shadow: {
        type: String
      }
    },
    data() {
      return {
      };
    },
    computed: {
    },
    watch: {
    },
    methods: {
    },
    mounted() {
    }
  };
</script>
