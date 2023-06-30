<template>
  <div 
  ref="wlTabs"
  class="wl-tabs"
  :class="[
     type === 'card' ? 'wl-tabs--card' : '',
     tabPosition ? 'wl-tabs--' + tabPosition : ''
     ]">
     <!-- <div v-if="tabPosition === 'bottom'" class="wl-tabs__content">
      <slot></slot>
    </div> -->
    <div 
    class="wl-tabs__header"
    :class="[
      tabPosition ? 'is-' + tabPosition : ''
    ]">
      <div 
      :class="[
        tabPosition ? 'is-' + tabPosition : ''
      ]"
      class="wl-tabs__nav-wrap">
        <div class="wl-tabs__nav-scroll">
          <div 
          class="wl-tabs__nav" 
          :class="[
            tabPosition ? 'is-' + tabPosition : ''
          ]"
          
          ref="box">
            <div 
            v-if="!(type === 'card')"
            class="wl-tabs__active-bar" 
            :class="[
              tabPosition ? 'is-' + tabPosition : ''
            ]"
            :style="style"
            ></div>
            <div 
            class="wl-tabs__item"
            :class="[
              item.activeFlag ? 'is-active' : '',
              tabPosition ? 'is-' + tabPosition : '',
              item.disabled ? 'is-disabled' : '',
            ]"
            :ref="`item${index}`"
            @click="activeTab(index, $event)"
            v-for="item, index in headerList" :key="index">{{item.label}}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- v-if="tabPosition !== 'bottom'" -->
    <div ref="content"  class="wl-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default{
  name: 'WlTabs',
  data() {
    return {
      headerList: [],
      initList: [],
      checkedValue: '',
      lineWidth: '0px',
      lineX: '0px',
      activeIndex: 0,
      style: {
        width: '',
        transform: ''
      }
    };
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    tabPosition: {
      type: String,
      default: 'top'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    'tabPosition': {
      handler(newVal, oldVal) {
        let contentEl = this.$refs.content;
        let pareEl = this.$refs.wlTabs.getElementsByClassName('wl-tabs__header')[0];
        if (newVal === 'bottom') {
          pareEl.insertBefore(contentEl, pareEl.children[0]);
        } else if (oldVal === 'bottom') {
          pareEl.removeChild(contentEl);
          this.$refs.wlTabs.appendChild(contentEl);
        }
        if (this.type !== 'card') {
          this.style = {
            width: '',
            transform: ''
          };
          this.computedtranslateX();
        }
      }
    }
  },
  mounted() {
    this.checkedValue = this.value;
    this.headerList.forEach((el, i)=> {
      if (el.name === this.value && this.value) {
        this.activeIndex = i;
      } else if (!this.value) {
        this.activeIndex = 0;
        this.checkedValue = this.headerList[0].name;
      }
    });
    this.initList = JSON.parse(JSON.stringify(this.headerList));
    if (this.type !== 'card') {
      this.computedtranslateX();
    }
  },
  methods: {
    activeTab(index, $event) {
      if (this.headerList[index].disabled) {
        return;
      };
      this.headerList.forEach(el => {
        el.activeFlag = false;
      });
      this.headerList[index].activeFlag = true;
      this.activeIndex = index;
      this.checkedValue = this.headerList[index].name;
      this.headerList = JSON.parse(JSON.stringify(this.headerList));
      if (this.type !== 'card') {
        this.computedtranslateX();
      }
      // this.$emit('tab-click', this.$refs[`item${index}`], $event);
      this.$emit('tab-click', {label: this.headerList[index].label, name: this.headerList[index].name}, $event);
    },
    // 获取线的偏移距离
    computedtranslateX() {
      this.$nextTick(() => {
        let el = this.$refs.box.getElementsByClassName('wl-tabs__item')[this.activeIndex];
        let elStyle = window.getComputedStyle(el, null);
        let paddingLeft = parseFloat(elStyle.getPropertyValue('padding-left'));
        let paddingTop = parseFloat(elStyle.getPropertyValue('padding-top'));
        let paddingBottom = parseFloat(elStyle.getPropertyValue('padding-bottom'));
        let paddingRight = parseFloat(elStyle.getPropertyValue('padding-right'));
        let translateValue = (this.tabPosition === 'top' || this.tabPosition === 'bottom') ? el.offsetLeft : el.offsetTop;
        // 位置不同取不同的宽度或者高度
        if (this.tabPosition === 'top' || this.tabPosition === 'bottom') {
          this.style.width = (el.clientWidth - paddingLeft - paddingRight) + 'px';
          this.style.height = '';
        } else {
          this.style.height = (el.clientHeight - paddingTop - paddingBottom) + 'px';
          this.style.width = '';
        }
        if (this.activeIndex === 0) {
          this.style.transform = (this.tabPosition === 'top' || this.tabPosition === 'bottom') ? 'translateX(0px)' : 'translateY(0px)';
          return;
        };
        // let translateValue = 0;
        this.style.transform = (this.tabPosition === 'top' || this.tabPosition === 'bottom') ? `translateX(${translateValue + paddingLeft}px)` : `translateY(${translateValue + paddingTop}px)`;
        // this.style.transform = `translateX(${translateValue + paddingLeft}px)`;
      });
    }
  },
  provide() {
    return {
      tabs: this
    };
  },
  destoryed() {
    console.log('组件被销毁了');
    // this.headerList = [];
  }
};
</script>

<style scoped lang="less">

</style>