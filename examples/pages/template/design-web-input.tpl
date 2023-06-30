<template>
  <div class="page-detail">
    <div class="section">
      <h2>输入框</h2>
      <p>通过鼠标或键盘输入内容，是最基础的表单域的包装。</p>
    </div>
    <div class="section">
      <h3>输入框类型</h3>
      <p>输入框样式分为 3 种，通用类、按钮类、文本类样式如下：</p>
    </div>
    <div class="section">
      <h4>通用类：</h4>
      <p>最基础的输入框样式，输入前样式保持轻量，输入后样式清晰明了。</p>
      <img class="img" src="~examples/assets/images/guide/input/input_01.png" />
    </div>
    <div class="section">
      <h4>按钮类：</h4>
      <p>多用于输入后需用户确认的场景，例：搜索。</p>
      <img class="img" src="~examples/assets/images/guide/input/input_02.png" />
    </div>
    <div class="section">
      <h4>文本类：</h4>
      <p>长内容编辑使用，字数内容可限制，但高度区域不做固定限制，用户可根据习惯拉伸自定义。</p>
      <img class="img" src="~examples/assets/images/guide/input/input_03.png" />
    </div>
    <div class="section">
      <h3>输入框颜色</h3>
      <p>提示内容使用低透明度内容提示加低透明度边框，输入后内容明显于提示，便于用户确认。</p>
    </div>
    <div class="section">
      <h3>输入框样式</h3>
      <p>输入框分为：通用输入框和长文本两种。 ① 通用：文字及图标距离输入框边距 16px，宽度控制在 6 ～ 10 个删格，高度分大中小三种：40px、32px、24px。</p>
      <img class="img" src="~examples/assets/images/guide/input/input_04.png" />
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
