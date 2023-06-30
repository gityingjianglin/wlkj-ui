<template>
  <div class="page-detail">
    <div class="section">
      <h2>圆角</h2>
      <p><strong>基本单位/Basic Unit</strong> 定义一个全局基础单位参数， <span class="color-link">Hd = 2px</span>，所有间距、所有组件均以 <span class="color-link">2px</span> 的倍数作为参考标准，不仅符合偶数的思路同时能够匹配多数主流的显示设备。</p>
      <img class="img" src="~examples/assets/images/guide/radius/radius_01.png" />
    </div>

    <div class="section">
      <h3>边框</h3>
      <p><strong>边框/Border Width</strong> 边框提供两种样式供选择：一般标准使用 1px，特殊使用 Hd=2px 基准</p>
      <img class="img" src="~examples/assets/images/guide/radius/radius_02.png" />
    </div>

    <div class="section">
      <h3>分割线</h3>
      <p><strong>分割线/ Divider</strong> 分割线用于分割内容区域和标题区域等多种信息模块时使用，让页面结构层次更加清晰 1.多出现于数据录入累（表单页）内容上方标题下方以明确题目内容。 2.数据展示类（详情页）内容下方以分割各模块详情内容。</p>
      <img class="img" src="~examples/assets/images/guide/radius/radius_03.png" />
    </div>

    <div class="section">
      <h3>间距</h3>
      <p><strong>间距/ Space</strong> 间距是元素（模块）与模块之间的距离。间距决定信息的整体布局以及内容之间的关系，其主要目的是提高信息阅读及用户操作的效率，模块间距可作为拉开信息模块之间的介质，让页面更加具有秩序感与统一性。在设计时，需按照页面结构及所展示的内容合理定义间距大小。</p>
      <img class="img" src="~examples/assets/images/guide/radius/radius_04.png" />
    </div>

    <div class="section">
      <h3>设计原则</h3>
      <p><strong>明确的关系</strong>  通过间距差异，准确表达信息与信息之间的关系：内容越相关，间距越小。</p>
      <p><strong>舒适的节奏</strong>  通过间距差异，准确体现信息间的主次关系，同时传递给用户既符合逻辑又舒适的信息读取节奏感。</p>
      <img class="img" src="~examples/assets/images/guide/radius/radius_05.png" />
    </div>

    <div class="section">
      <h3>间距关系推演示例</h3>
      <p>设计过程中，如何去选择元素间距？提供以下推演方法：</p>
      <p>1.找到该组件中，最重要的元素，并设定为基准点。 2.整理其他元素与基准点的相关性。 3.设定最相关元素的间距，并以此类推其他元素的间距。<br>
以 Toast 为例，所有元素中，标题最重要，因此设定标题为基准点。描述、图标、操作与标题的相关性等级分别为：①②③</p>
      <img class="img" src="~examples/assets/images/guide/radius/radius_06.png" />
    </div>

    <div class="section">
      <h3>可适配</h3>
      <p>为兼顾各种分辨率屏幕用户使用体验，容器内、外间距（内容区与导航区间距）根据屏幕宽度进行适配。</p>
      <img class="img" src="~examples/assets/images/guide/radius/radius_07.png" />
    </div>

    <div class="section">
      <h3>如何使用间距规范</h3>
      <p><strong>1.明确类型：</strong>根据自己需要的间距类型，去寻找具体尺寸</p>
      <p><strong>2.推演关系：</strong>参见间距关系推演示例</p>
      <p><strong>3.整体微调：</strong>根据肉眼感受，整体调整最终效果</p>
    </div>

    <div class="section">
      <h3>圆点</h3>
      <p><strong>圆点/ Circle</strong>  圆点用于标签、状态、图标等提示作用，大小参考 Hd=2px 的倍数间距标准</p>
      <img class="img" src="~examples/assets/images/guide/radius/radius_08.png" />
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
