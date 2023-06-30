<template>
  <div class="page-detail">
    <div class="section">
      <h2>层级</h2>
      <p><strong>层级 / Hierarchy</strong></p>
      <img class="img" src="~examples/assets/images/guide/zindex/zindex_01.png" />
      <p>
        状态的 Toast，表单报错提示等弹出内容。 Mask 蒙层，配合 Popout 层使用，用于锁定内容层和导航层操作，不单独使用。 Navigation 导航层，位于内容层之上，在用户滑动内容层时可保持位置不动，通常用于承载导航栏等需要固定在页面的元素,常位于页面左侧。 Content 内容层，承载页面主要内容。 Background 背景层，内容层的背景，颜色：#F2F4F8。
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
    },
    methods: {
    },
    data() {
      return {
      };
    },
    beforeDestroy() {
    },
    mounted() {
    }
  };
</script>
<style scoped lang="scss">
</style>
