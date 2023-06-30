<!--  -->
<template>
  <ul class="wl-pager" @click="onPagerClick">
    <li class="number" :class="{active: currentPage === 1, disabled}" v-if="pageCount > 0">1</li>
    <li
      class="wl-icon more btn-quickprev"
      :class="[quickprevIconClass, { disabled }]"
      v-if="showPrevMore"
      @mouseenter="onMouseenter('left')"
      @mouseleave="quickprevIconClass = 'wl-icon-EllipsisOutlined'"></li>
    <li
      class="number"
      v-for="pager in pagers"
      :key="pager"
      :class="{active: currentPage === pager, disabled}">{{ pager }}</li>
    <li
      class="wl-icon more btn-quicknext"
      :class="[quicknextIconClass, { disabled }]"
      v-if="showNextMore"
      @mouseenter="onMouseenter('right')"
      @mouseleave="quicknextIconClass = 'wl-icon-EllipsisOutlined'"></li>
    <li class="number" :class="{active: currentPage === pageCount, disabled}" v-if="pageCount > 1">{{ pageCount }}</li>
  </ul>
</template>

<script>

export default {
  name: 'ElPager',
  data() {
    return {
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: 'wl-icon-EllipsisOutlined',
      quickprevIconClass: 'wl-icon-EllipsisOutlined'
    };
  },

  props: {
    pagerCount: Number, // 页码按钮的数量，当总页数超过该值时会折叠
    pageCount: Number, // 总页数
    currentPage: Number, // 当前页数
    disabled: Boolean
  },

  components: {
  },

  computed: {
    pagers() {
      const pagerCount = this.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2;
      let currentPage = Number(this.currentPage);
      const pageCount = Number(this.pageCount);
      let showPrevMore = false;
      let showNextMore = false;
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true;
        }
      }
      const array = [];
      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        let offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i);
        }
      }
      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      return array;
    }
  },

  methods: {
    onPagerClick(e) {
      const target = e.target;
      if (target.tagName === 'UL' || this.disabled) {
        return;
      }
      let newPage = Number(e.target.textContent);
      const pageCount = this.pageCount;
      const pagerCountOffset = this.pagerCount - 2;
      const currentPage = this.currentPage;
      // 判断点击more
      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - pagerCountOffset;
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + pagerCountOffset;
        }
      }
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }
        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }
      if (newPage !== currentPage) {
        this.$emit('change', newPage);
      }
    },
    onMouseenter(direction) {
      if (this.disabled) return;
      if (direction === 'left') {
        this.quickprevIconClass = 'wl-icon-DoubleLeftOutline';
      } else {
        this.quicknextIconClass = 'wl-icon-DoubleRightOutline';
      }
    }
  },

  watch: {
    showPrevMore(val) {
      if (!val) this.quickprevIconClass = 'wl-icon-EllipsisOutlined';
    },
    showNextMore(val) {
      if (!val) this.quicknextIconClass = 'wl-icon-EllipsisOutlined';
    }
  },

  mounted() {},

  created() {}
};

</script>
<style lang='scss' scoped>
</style>