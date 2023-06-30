<template>
  <div class="page-detail">
    <div class="section">
      <h2>按钮</h2>
      <p>按钮用于开始一个即时操作。</p>
    </div>
    <div class="section">
      <h3>按钮类型</h3>
      <p>按钮样式分为 3 种，主按钮、次按钮、文本按钮，按钮样式如下：</p>
    </div>
    <div class="section">
      <h4>主按钮：</h4>
      <p>突出“完成”、“确认”类关键操作；一个按钮区最多使用一个主按钮，视觉观感较重，每个页面尽量不要超过 2 个，越少越好。</p>
      <img class="img" src="~examples/assets/images/guide/button/button_01.png" />
    </div>
    <div class="section">
      <h4>次按钮：</h4>
      <p>伴随主按钮旁的次要功能，如取消、重置。</p>
      <img class="img" src="~examples/assets/images/guide/button/button_02.png" />
    </div>
    <div class="section">
      <h4>文本按钮：</h4>
      <p>① 多用于固定组件的功能性按钮或业务需求所用，功能重要程度最低，视觉观感最轻，如收起、取消。 ② 文本按钮也有主次之分，主按钮观感较重用于页面常出现的通用按钮：如收起。次按钮视觉较轻，常用于：取消、重置等。</p>
      <img class="img" src="~examples/assets/images/guide/button/button_03.png" />
    </div>
    <div class="section">
      <h3>按钮颜色</h3>
      <p>主按钮以主色为背景，尽量避免过度色。</p>
    </div>
    <div class="section">
      <h3>按钮宽度</h3>
      <p>按钮宽度根据文本字数不同，宽度不同。按钮暂分为大按钮、中按钮、小按钮三种</p>
      <p><span class="color-alarm">按钮文案若只有两个字，如“取消”需在两个字间添加空格“取 消”</span></p>
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
