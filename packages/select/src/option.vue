<template>
  <li
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
    class="wl-select-dropdown__item"
    v-show="visible"
    :class="{
      'selected': itemSelected,
      'is-disabled': disabled || groupDisabled || limitReached,
      'hover': hover
    }">
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script type="text/babel">
  import Emitter from 'wlkj-ui/src/mixins/emitter';
  import { getValueByPath, escapeRegexpString } from 'wlkj-ui/src/utils/util';

  export default {
    mixins: [Emitter],

    name: 'WlOption',

    componentName: 'WlOption',

    inject: ['select'],

    props: {
      value: {
        required: true // 选项value
      },
      label: [String, Number], // 选项标签值
      created: Boolean, // 是否由用户创建
      disabled: { // 是否禁用选项
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        index: -1,
        groupDisabled: false, // 群组group是否禁用
        visible: true, // 选项是否展示
        hitState: false,
        hover: false // 选项是否处于悬浮hover状态
      };
    },

    computed: {
      isObject() {
        return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
      },
      // 判断当前项显示的值，取值lable或者value值
      currentLabel() {
        return this.label || (this.isObject ? '' : this.value);
      },

      currentValue() {
        return this.value || this.label || '';
      },

      itemSelected() {
        if (!this.select.multiple) {
          // 单选直接判断select组件value值与当前选项值是否相等
          return this.isEqual(this.value, this.select.value);
        } else {
          // 多选则判断当前选项值是否在select组件value中，多选select.value 为数组
          return this.contains(this.select.value, this.value);
        }
      },

      limitReached() {
        if (this.select.multiple) {
          return !this.itemSelected &&
            (this.select.value || []).length >= this.select.multipleLimit &&
            this.select.multipleLimit > 0;
        } else {
          return false;
        }
      }
    },

    watch: {
      currentLabel() {
        if (!this.created && !this.select.remote) this.dispatch('WlSelect', 'setSelected');
      },
      value(val, oldVal) {
        const { remote, valueKey } = this.select;
        if (!this.created && !remote) {
          if (valueKey && typeof val === 'object' && typeof oldVal === 'object' && val[valueKey] === oldVal[valueKey]) {
            return;
          }
          this.dispatch('WlSelect', 'setSelected');
        }
      }
    },

    methods: {
      isEqual(a, b) {
        // 单选直接比对select.value与this.value值
        if (!this.isObject) {
          return a === b;
        } else {
          const valueKey = this.select.valueKey;
          return getValueByPath(a, valueKey) === getValueByPath(b, valueKey);
        }
      },

      contains(arr = [], target) {
        if (!this.isObject) {
          return arr && arr.indexOf(target) > -1;
        } else {
          // 如果当前选项值绑定是对象，则查找当前选项绑定值对象中的valueKey与select.value 数组中的对象valueKey属性值做对比
          const valueKey = this.select.valueKey;
          return arr && arr.some(item => {
            return getValueByPath(item, valueKey) === getValueByPath(target, valueKey);
          });
        }
      },

      handleGroupDisabled(val) {
        this.groupDisabled = val;
      },

      hoverItem() {
        if (!this.disabled && !this.groupDisabled) {
          this.select.hoverIndex = this.select.options.indexOf(this);
        }
      },

      selectOptionClick() {
        if (this.disabled !== true && this.groupDisabled !== true) {
          // 分发父组件Wlselect，handleOptionClick事件，传入option组件对象，是否通过用户点击标识
          this.dispatch('WlSelect', 'handleOptionClick', [this, true]);
        }
      },

      queryChange(query) {
        this.visible = new RegExp(escapeRegexpString(query), 'i').test(this.currentLabel) || this.created;
        if (!this.visible) {
          this.select.filteredOptionsCount--;
        }
      }
    },

    created() {
      this.select.options.push(this);
      this.select.cachedOptions.push(this);
      this.select.optionsCount++;
      this.select.filteredOptionsCount++;

      this.$on('queryChange', this.queryChange);
      this.$on('handleGroupDisabled', this.handleGroupDisabled);
    },

    beforeDestroy() {
      const { selected, multiple } = this.select;
      let selectedOptions = multiple ? selected : [selected];
      let index = this.select.cachedOptions.indexOf(this);
      let selectedIndex = selectedOptions.indexOf(this);

      // if option is not selected, remove it from cache
      if (index > -1 && selectedIndex < 0) {
        this.select.cachedOptions.splice(index, 1);
      }
      this.select.onOptionDestroy(this.select.options.indexOf(this));
    }
  };
</script>
