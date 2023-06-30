<template>
  <div class="page-detail">
    <div class="section">
      <h2>选择器</h2>
      <p>弹出一个下拉菜单给用户选择操作。</p>
    </div>
    <div class="section">
      <h3>选择器类型</h3>
      <p>类型分为单项选择器和多项选择器。</p>
    </div>
    <div class="section">
      <h4>单项选择器：</h4>
      <p>下拉项仅能选择一项，选中的内容上移至输入框显示，下拉框关闭。</p>
      <img class="img" src="~examples/assets/images/guide/select/select_01.png" />
    </div>
    <div class="section">
      <h4>多项选择器：</h4>
      <p>下拉项可选择多项，选中内容上移输入框标签显示，提供删除和清空选择按钮，点击选择器之外下拉框关闭。</p>
      <img class="img" src="~examples/assets/images/guide/select/select_02.png" />
    </div>
    <div class="section">
      <h3>选择器宽度</h3>
      <p>分为单项选择器宽度和多项选择器推荐宽度两种。 ①**单项选择器：文字及图标距离输入框边距 12px、宽度、高度与输入框相同。 ②多项选择器：**文字及图标距离输入框边距 12px、标签间距 12px。宽度、高度与输入框相同。</p>
      <img class="img" src="~examples/assets/images/guide/select/select_03.png" />
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
