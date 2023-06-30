<template>
  <transition name="wl-alert-fade">
    <div
      class="wl-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect, 'is-icon-' + iconPosition]"
      v-show="visible"
      role="alert"
    >
      <i class="wl-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="wl-alert__content">
        <span class="wl-alert__title" :class="[ isBoldTitle ]" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="wl-alert__description" v-if="$slots.default && !description"><slot></slot></p>
        <p class="wl-alert__description" v-if="description && !$slots.default">{{ description }}</p>
        <i class="wl-alert__closebtn " :class="{ 'is-customed': closeText !== '', 'wl-icon-CloseOutlined': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  const TYPE_CLASSES_MAP = {
    'success': 'wl-icon-CheckCircleOutline',
    'warning': 'wl-icon-InfoCircleFilled',
    'error': 'wl-icon-CloseCircleFilled'
  };
  export default {
    name: 'WlAlert',

    props: {
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: Boolean,
      iconPosition: {
        type: String,
        default: 'center'
      },
      center: Boolean,
      effect: {
        type: String,
        default: 'light',
        validator: function(value) {
          return ['light', 'dark'].indexOf(value) !== -1;
        }
      }
    },

    data() {
      return {
        visible: true
      };
    },

    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    },

    computed: {
      typeClass() {
        return `wl-alert--${ this.type }`;
      },

      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'wl-icon-InfoCircleFilled';
      },

      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },

      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    }
  };
</script>
