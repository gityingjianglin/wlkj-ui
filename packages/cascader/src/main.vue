<template>
  <div class="wl-cascader" 
  ref="cascader"
  :class="[
    size ? 'wl-cascader--' + size : ''
  ]">
    <wl-input :placeholder="placeholder" 
    ref="reference" 
    v-clickoutside="handleClose" 
    @focus="inputFocus" 
    v-model="checkedValue" 
    :size="size"
    :clearable="clearable"
    @clear="initValue" />
    <transition name="wl-zoom-in-top">
      <div class="wl-select-dropdown wl-popper" ref="popper" v-show="visible">
        <div class="wl-cascader-panel">
          <div class="wl-cascder-menu" v-for="el, i in defaultList" :key="i">
            <wl-scrollbar class="cascader-scroll">

              <ul class="wl-cascader-menu__list ">
                <li 
                class="wl-cascader-node" 
                :class="{
                  'in-active-path': item.active,
                  'is-disabled': item.disabled
                }" @click="checkedChange(item, i, index)" v-for="item, index in el" :key="index">
                  <span>{{ item.label }}</span>
                  <i v-if="item.children && item.children.length > 0" class="wl-icon-RightOutline"></i>
                </li>
              </ul>
            </wl-scrollbar>
          </div>

        </div>
      </div>

    </transition>
  </div>
</template>
<script>
import WlScrollbar from 'wlkj-ui/packages/scrollbar';
import Emitter from 'wlkj-ui/src/mixins/emitter';
import Clickoutside from 'wlkj-ui/src/utils/clickoutside';
import Popper from 'wlkj-ui/src/utils/vue-popper';
export default {
  name: 'WlCascader',
  mixins: [Emitter, Popper],
  props: {
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    placement: {
      default: 'bottom-start'
    },
    boundariesPadding: {
      default: 0
    },
    popperOptions: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },
    visibleArrow: {
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    clearable: {
      type: Boolean,
      default: true
    },
    showAllLevels: { // 仅仅在输入框中显示最后一级
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  directives: { Clickoutside },
  components: {
    WlScrollbar
  },
  data() {
    return {
      isShowSecondeMenu: false,
      checkedValue: '',
      optionsList: [],
      secondChildList: [],
      defaultList: [],
      defaultCheckValue: '',
      visible: false,
      arrIndex: 0
    };
  },
  mounted() {
    this.referenceElm = this.$refs.reference.$el;
    this.popperElm = this.$refs.popper;
    this.$on('updatePopper', () => {
      if (this.visible) this.updatePopper();
    });
    this.$on('destroyPopper', this.destroyPopper);
    this.checkedValue = '';
    this.defaultList = [];
    this.optionsList = this.options;
    if (this.optionsList.length === 0) {
      return;
    };
    //  空值的初始化
    if (this.value.length === 0) {
      this.optionsList.forEach((item) => {
        item.active = false;
      });
      this.optionsList[0].active = true;
      this.defaultList.push(this.optionsList);
    } else {
      // 有值的回显
      this.checkArr = this.value.slice(0);
      this.getChildValue(this.optionsList);
      this.checkedValue = this.showAllLevels ? this.checkedValue.slice(0, this.checkedValue.length - 1) : this.checkedValue;
      // this.$nextTick(() => {
      //   console.log(this.$refs.reference, this.$refs.reference.value, this.$refs.reference.type, '//////////');
      // });
    }
  },
  methods: {
    /*
     * 递归循环需要回显的参数
     * childList 需要过滤的子集合
    */
    getChildValue(childList) {
      childList.forEach(el => {
        if (el.value === this.value[this.arrIndex]) {
          el.active = true;
          this.arrIndex++;
          if (!this.showAllLevels) {
            if (this.arrIndex === this.value.length) {
              this.checkedValue = el.label;
            }
          } else {
            this.checkedValue = this.checkedValue + el.label + '/';
          }
          this.defaultList.push(childList);
          ;
          if (this.arrIndex !== this.value.length) {
            this.getChildValue(el.children);
          }
        }
      });
    },
    handleChange(evt) {
      console.log(evt, 'evt');
      this.$emit('change', evt);
    },
    // showList() {
    //   this.$refs.reference.focus();
    // },
    inputFocus(event) {
      this.visible = true;
    },
    checkedChange(item, defaultIndex, index) {
      if (item.disabled) {
        // 禁用的状态
        return;
      }
      // 总的list的索引；来判断是否要添加下一项；当前的点击的索引；修改状态；修改样式
      let checkList = this.defaultList[defaultIndex];
      let checkChildLsit = checkList[index].children;
      checkList.forEach(e => {
        e.active = false;
      });
      checkList[index].active = true;
      // this.defaultList = [];
      this.$set(this.defaultList, defaultIndex, checkList);
      // 存在下一级的children
      if (checkChildLsit) {
        checkChildLsit.forEach((el, i) => {
          el.active = false;
          if (i === 0) {
            el.active = true;
          }
        });
        // this.defaultCheckValue = this.defaultCheckValue + item.label + '/';
        this.$set(this.defaultList, defaultIndex + 1, checkChildLsit);
      } else {
        // 不存在下一级，隐藏弹框
        this.visible = false;
        this.checkArr = [];
        this.checkedValue = '';
        let len = this.defaultList.length;
        // this.checkedValue = this.defaultCheckValue + item.label;
        this.defaultList.forEach((list, i) => {
          list.forEach(el => {
            if (el.active) {
              this.checkArr.push(el.value);
              if (this.showAllLevels) {
                this.checkedValue += el.label + '/';
              } else {
                if (i === len - 1) {
                  this.checkedValue = el.label;
                }
              }
            }
          });
        });
        this.checkedValue = this.showAllLevels ? this.checkedValue.slice(0, this.checkedValue.length - 1) : this.checkedValue;
        this.$emit('change', this.checkArr);
      }
      this.defaultList = this.defaultList.slice(0, defaultIndex + 2);
    },
    handleClose() {
      this.visible = false;
    },
    initValue() {
      let len = this.defaultList.length;
      this.checkedValue = '';
      this.defaultList[len - 1].forEach(parentItem => {
        parentItem.active = false;
      });
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.destroyPopper();
      } else {
        this.updatePopper();
      }
    }
  }
};
</script>
