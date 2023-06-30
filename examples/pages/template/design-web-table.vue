<template>
  <div class="page-detail">
    <div class="section">
      <h2>表格</h2>
      <p>展示行列数据。</p>
    </div>
    <div class="section">
      <h3>表格样式</h3>
      <p>
        表格内容居左对齐（除操作、金额除外），若表格内容项较多，左右出现滑动，操作栏浮起第一屏显示，以便用户操作。<br>
        表头：Bg color：#000000 5%，Font:14px/Medium/#000000 85% 表格内容：Font:14px/Regular/#000000 85%<br>
        1.每一列内容要以产品根据具体业务场景提供规定字符数，横向排版，原则内容不换行显示 2.对齐方式为每一列左对齐，最后一列为右对齐 3.表格中，诸如金额、数量等数值分布排列时，通常采用“右对齐”方式，既方便用户快捷读取数据，还可以使用户进行纵向数据对比。</p>
      <img class="img" src="~examples/assets/images/guide/table/table_01.png" />
    </div>
    <div class="section">
      <h3>标签状态样式</h3>
      <img class="img" src="~examples/assets/images/guide/table/table_02.png" />
    </div>
    <div class="section">
      <h3>表格高度间距样式</h3>
      <img class="img" src="~examples/assets/images/guide/table/table_03.png" />
    </div>
    <div class="section">
      <h3>操作区规范</h3>
      <p>
        1.操作项大于 4 项时建议使用图标表示 2.操作文字相加个数大于 12 字时建议使用图标表示 3.操作内容右对齐显示，按推荐程度向左排列<br>
        <span class="color-alarm">（操作区不允许图标和文字同时出现）</span>
      </p>
      <img class="img" src="~examples/assets/images/guide/table/table_04.png" />
    </div>
    <div class="section">
      <h3>操作区使用图标场景：</h3>
      <p>
        1.鼠标 hover 操作图标时，以气泡显示图标内容介绍 2 操作在四项以上时，前三项操作右对齐显示，其他操作以“ ... ”收起表示，点击“ ... ”以气泡卡片展开其他操作
      </p>
      <img class="img" src="~examples/assets/images/guide/table/table_05.png" />
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
