<template>
  <div class="wl-page-header">
    <div class="wl-page-header__left" @click="$emit('back')">
      <i class="wl-icon-LeftOutline"></i>
      <div class="wl-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="wl-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import { t } from 'wlkj-ui/src/locale';
export default {
  name: 'WlPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return t('wl.pageHeader.title');
      }
    },
    content: String
  }
};
</script>
