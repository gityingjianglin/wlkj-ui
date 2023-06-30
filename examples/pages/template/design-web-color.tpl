
<template>
  <div class="page-detail">
    <div class="section">
      <h2>色彩</h2>
      <p>色彩 / Color 万链 UI Style 提供了丰富的颜色模版，大致可归为两种色彩体系：系统级色彩体系和产品级色彩体系。 系统级色彩体系： 主要定义了海尔企业级应用中的基础色板、中性色板和数据可视化色板。 产品级色彩体系： 则是在具体设计过程中，基于系统色彩进一步定义符合产品调性以及功能诉求的颜色。</p>
    </div>
    <div class="section">
      <h3>系统级色彩体系主题色 / Color</h3>
      <p>万链 UI Style 主色及延展色设定采用 HSV 模型的值进行递减/递增得到完整渐变色板，结合了色彩加白、加黑、加深，贝塞尔曲线，以及针对冷暖色的不同旋转角度。根据颜色值、色号与主色色号(6)差的绝对值、减淡/加深这三个参数获取渐变后的色值，其中 HSV 的三个值分别经过了渐变调整，得出色版生成算法。</p>
    </div>
    <div class="section">
      <img class="img" src="~examples/assets/images/guide/color/color_01.png" />
    </div>
    <div class="section">
      <h3>中性色 / Neutral Color</h3>
      <img class="img" src="~examples/assets/images/guide/color/color_02.png" />
    </div>
    <div class="section">
      <h3>功能色 / Function Color</h3>
      <p>4种功能色扩展色可满足后台90%使用需求，可使用在图标、组件、弹层等场景；</p>
    </div>
    <div class="section">
      <h3>Functional / 主色功能</h3>
      <p>链接、成功、警告、错误</p>
      <img class="img" src="~examples/assets/images/guide/color/color_03.png" />
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
