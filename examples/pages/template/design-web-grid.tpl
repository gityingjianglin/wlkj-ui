<template>
  <div class="page-detail">
    <div class="section">
      <h2>栅格</h2>
      <p><strong>栅格 / Grid</strong> 栅格是根据 Colimn 和 Gutter 组成，Column 动态缩放，Gutter 不变。基于 1128px 的 24 栅格理论使用： Colimn width(列宽):24 Gutter width(水槽):24 Grid(基本单位):8。</p>
      <img class="img" src="~examples/assets/images/guide/grid/grid_01.png" />
      <p>
        <strong>8 像素原则 / 8px</strong> 因根据栅格建立了以 8 像素为单位的网格系统，建议各组件尺寸及间距大小以 8 的倍数做设计参考依据。<br/>
        <strong>参考分辨率 / Resolving power</strong> 用户的主流分辨率为 1366px 、1440px 和 1920px，同时设计师应注意在 1280px 分辨率下主要内容显示的完整性。<br/>
        <strong>画板 / Board</strong> 为了有效降低沟通与理解成本，建议根据用户的主流分辨率情况，使用统一尺寸的画板，例如 1440px。
      </p>
      <p><span class="color-alarm">注：前台页面需保证内容区居中不超过 1200px</span></p>
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
