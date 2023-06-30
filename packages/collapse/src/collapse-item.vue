<template>
  <div class="wl-collapse-item"
    :class="{'is-active': isActive, 'is-diabled': disabled}">
    <div class="tab"
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`wl-collapse-content-${id}`"
      :aria-describedby="`wl-collapse-content-${id}`"
    >
      <div
        class="wl-collapse-item__header"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        role="button"
        :id="`wl-collapse-head-${id}`"
        @keyup.space.enter.stop="handleEnterClick"
        @click="handleHeaderClick"
        @focus="handleFocus"
        @blur="focusing = false"
        :tabindex="disabled ? undefined : 0"
      >
        <i 
          class="wl-collapse-item__arrow wl-icon-RightOutline"
          :class="{'is-active': isActive}">
        </i>
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <wl-collapse-transition>
      <div
        class="wl-collapse-item__wrap"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`wl-collapse-head-${id}`"
        v-show="isActive"
        :id="`wl-collapse-content-${id}`"
      >
        <div class="wl-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </wl-collapse-transition>
  </div>
</template>
<script>
  import WlCollapseTransition from 'wlkj-ui/src/transitions/collapse-transition';
  import Emitter from 'wlkj-ui/src/mixins/emitter';
  import { generateId } from 'wlkj-ui/src/utils/util';
  export default {
    name: 'WlCollapseItem',
    componentName: 'WlCollapseItem',
    components: {
      WlCollapseTransition
    },
    mixins: [Emitter],
    inject: ['collapse'],
    props: {
      title: String,
      name: {
        type: [String, Number],
        default() {
          return this._uid;
        }
      },
      disabled: Boolean
    },
    data() {
      return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0,
        focusing: false,
        isClick: false,
        id: generateId()
      };
    },
    computed: {
      isActive() {
        return this.collapse.activeNames.indexOf(this.name) > -1;
      }
    },
    watch: {
    },
    methods: {
      handleFocus() {
        setTimeout(() => {
          if (!this.isClick) {
            this.focusing = true;
          } else {
            this.isClick = false;
          }
        }, 50);
      },
      handleHeaderClick() {
        if (this.disabled) return;
        this.dispatch('WlCollapse', 'item-click', this);
        this.focusing = false;
        this.isClick = true;
      },
      handleEnterClick() {
        this.dispatch('WlCollapse', 'item-click', this);
      }
    },
    created() {
    },
    mounted() {
    }
  };
</script>
