## Collapse 折叠面板

通过折叠面板收纳内容区域

### 基础用法

可同时展开多个面板，面板之间不影响

:::demo
```html
<wl-collapse v-model="activeNames" @change="handleChange">
  <wl-collapse-item title="色彩" name="1">
    <div style="color: #ff9933;">色彩 / Color 万链 UI Style 提供了丰富的颜色模版，大致可归为两种色彩体系：系统级色彩体系和产品级色彩体系。</div>
    <div>系统级色彩体系： 主要定义了企业级应用中的基础色板、中性色板和数据可视化色板。 产品级色彩体系： 则是在具体设计过程中，基于系统色彩进一步定义符合产品调性以及功能诉求的颜色。</div>
  </wl-collapse-item>
  <wl-collapse-item title="字体" name="2">
    <div style="color: #ff66cc;">字体类型 / Font Type 字体是体系化界面设计中最基本的构成之一。字体类型主要通过对“字体家族”，“字体颜色”，“字体规范”这三个方面来进行定义。</div>
    <div>字体家族 / Font Famliy *对于字体的选用一般情况下，必须使用系统自带的字体</div>
  </wl-collapse-item>
  <wl-collapse-item title="网络UI系统" name="3">
    <div style="color: #00cc99;">基本单位/Basic Unit 定义一个全局基础单位参数， Hd = 2px，所有间距、所有组件均以 2px 的倍数作为参考标准，不仅符合偶数的思路同时能够匹配多数主流的显示设备。</div>
  </wl-collapse-item>
  <wl-collapse-item title="圆角" name="4">
    <div style="color: #0066ff;">基本单位/Basic Unit 定义一个全局基础单位参数， Hd = 2px，所有间距、所有组件均以 2px 的倍数作为参考标准，不仅符合偶数的思路同时能够匹配多数主流的显示设备。</div>
  </wl-collapse-item>
</wl-collapse>
<script>
  export default {
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>
```
:::

### 多层嵌套

可嵌套多个子面板

:::demo
```html
<wl-collapse v-model="activeNames" @change="handleChange">
  <wl-collapse-item title="色彩" name="1">
    <div style="color: #ff9933;">色彩 / Color 万链 UI Style 提供了丰富的颜色模版，大致可归为两种色彩体系：系统级色彩体系和产品级色彩体系。</div>
    <div>系统级色彩体系： 主要定义了企业级应用中的基础色板、中性色板和数据可视化色板。 产品级色彩体系： 则是在具体设计过程中，基于系统色彩进一步定义符合产品调性以及功能诉求的颜色。</div>
    <wl-collapse v-model="activeNames" @change="handleChange">
      <wl-collapse-item title="圆角" name="4">
        <div style="color: #0066ff;">基本单位/Basic Unit 定义一个全局基础单位参数， Hd = 2px，所有间距、所有组件均以 2px 的倍数作为参考标准，不仅符合偶数的思路同时能够匹配多数主流的显示设备。</div>
      </wl-collapse-item>
    </wl-collapse>
  </wl-collapse-item>
  <wl-collapse-item title="字体" name="2">
    <div style="color: #ff66cc;">字体类型 / Font Type 字体是体系化界面设计中最基本的构成之一。字体类型主要通过对“字体家族”，“字体颜色”，“字体规范”这三个方面来进行定义。</div>
    <div>字体家族 / Font Famliy *对于字体的选用一般情况下，必须使用系统自带的字体</div>
  </wl-collapse-item>
  <wl-collapse-item title="网络UI系统" name="3">
    <div style="color: #00cc99;">基本单位/Basic Unit 定义一个全局基础单位参数， Hd = 2px，所有间距、所有组件均以 2px 的倍数作为参考标准，不仅符合偶数的思路同时能够匹配多数主流的显示设备。</div>
  </wl-collapse-item>
</wl-collapse>
<script>
  export default {
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>
```
:::

### 手风琴效果

每次只能展开一个面板

:::demo 通过 `accordion` 属性来设置是否以手风琴模式显示。
```html
<wl-collapse v-model="activeName" accordion>
  <wl-collapse-item title="投影" name="1">
    <div>投影 / Shadow 阴影来源于现实生活的反映物体与物体之间距离的物理现象。在界面中，我们往往通过模拟元素的投影直截了当的来告诉用户，元素之间的高度距离与层次关系。</div>
  </wl-collapse-item>
  <wl-collapse-item title="图标" name="2">
    <div>图标 / Icon Size 图标是 UI 设计中必不可少的组成。通常我们理解图标设计的含义，是将某个概念转换成清晰易读的图形，从而降低用户的理解成本，提升界面的美观度。</div>
  </wl-collapse-item>
  <wl-collapse-item title="栅格" name="3">
    <div>栅格 / Grid 栅格是根据 Colimn 和 Gutter 组成，Column 动态缩放，Gutter 不变。基于 1128px 的 24 栅格理论使用： Colimn width(列宽):24 Gutter width(水槽):24 Grid(基本单位):8。</div>
  </wl-collapse-item>
  <wl-collapse-item title="层级" name="4">
    <div>层级 / Hierarchy</div>
  </wl-collapse-item>
</wl-collapse>
<script>
  export default {
    data() {
      return {
        activeName: '1'
      };
    }
  }
</script>
```
:::

### 自定义面板标题

除了可以通过 `title` 属性以外，还可以通过具名 `slot` 插槽来实现自定义面板的标题内容，以实现增加图标等效果。

:::demo
```html
<wl-collapse accordion>
  <wl-collapse-item >
    <template slot="title">
      色彩<i class="header-icon wl-icon-InfoCircleFilled"></i>
    </template>
    <div style="color: #ff9933;">色彩 / Color 万链 UI Style 提供了丰富的颜色模版，大致可归为两种色彩体系：系统级色彩体系和产品级色彩体系。</div>
    <div>系统级色彩体系： 主要定义了海尔企业级应用中的基础色板、中性色板和数据可视化色板。 产品级色彩体系： 则是在具体设计过程中，基于系统色彩进一步定义符合产品调性以及功能诉求的颜色。</div>
  </wl-collapse-item>
  <wl-collapse-item title="字体">
    <div style="color: #ff66cc;">字体类型 / Font Type 字体是体系化界面设计中最基本的构成之一。字体类型主要通过对“字体家族”，“字体颜色”，“字体规范”这三个方面来进行定义。</div>
    <div>字体家族 / Font Famliy *对于字体的选用一般情况下，必须使用系统自带的字体</div>
  </wl-collapse-item>
  <wl-collapse-item title="网络UI系统">
    <div style="color: #00cc99;">基本单位/Basic Unit 定义一个全局基础单位参数， Hd = 2px，所有间距、所有组件均以 2px 的倍数作为参考标准，不仅符合偶数的思路同时能够匹配多数主流的显示设备。</div>
  </wl-collapse-item>
  <wl-collapse-item title="圆角">
    <div style="color: #0066ff;">基本单位/Basic Unit 定义一个全局基础单位参数， Hd = 2px，所有间距、所有组件均以 2px 的倍数作为参考标准，不仅符合偶数的思路同时能够匹配多数主流的显示设备。</div>
  </wl-collapse-item>
</wl-collapse>
```
:::

### Collapse Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`) | string / array | — | — |
| accordion | 是否手风琴模式 | boolean | — | false |

### Collapse Slots
| name | 说明 |
|------|--------|
| title | 自定义面板的标题内容 |

### Collapse Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 当前激活面板改变时触发(如果是手风琴模式，参数 `activeNames` 类型为`string`，否则为`array`) | (activeNames: array / string) |

### Collapse Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name      | 唯一标志符      | string/number | —     | —    |
| title     | 面板标题        | string        | —     | —    |
| disabled  | 是否禁用        | boolean       | —     | —    |
