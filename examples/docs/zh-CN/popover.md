## Popover 弹出框

### 基础用法
Popover 的属性与 Tooltip 很类似，它们都是基于`Vue-popper`开发的。

:::demo `trigger`属性用于设置何时触发 Popover，支持四种触发方式：`hover`，`click`，`focus` 和 `manual`。对于触发 Popover 的元素，有两种写法：使用 `slot="reference"` 的具名插槽，或使用自定义指令`v-popover`指向 Popover 的索引`ref`。
```html
<template>
  <wl-popover
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
    <wl-button slot="reference">hover 激活</wl-button>
  </wl-popover>

  <wl-popover
    placement="bottom"
    title="标题"
    width="200"
    trigger="click"
    content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
    <wl-button slot="reference">click 激活</wl-button>
  </wl-popover>

  <wl-popover
    ref="popover"
    placement="right"
    title="标题"
    width="200"
    trigger="focus"
    content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
  </wl-popover>
  <wl-button v-popover:popover>focus 激活</wl-button>

  <wl-popover
    placement="bottom"
    title="标题"
    width="200"
    trigger="manual"
    content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。"
    v-model="visible">
    <wl-button slot="reference" @click="visible = !visible">手动激活</wl-button>
  </wl-popover>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      };
    }
  };
</script>
```
:::

### 展示方向
在这里我们提供 9 种不同方向的展示方式。

:::demo 由`placement`属性决定展示效果：`placement`属性值为：`方向-对齐位置`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。如`placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。
```html
<template>
  <div class="box">
    <div class="top">
      <wl-popover
        placement="top-start"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">上左</wl-button>
      </wl-popover>
      <wl-popover
        placement="top"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">上边</wl-button>
      </wl-popover>
      <wl-popover
        placement="top-end"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">上右</wl-button>
      </wl-popover>
    </div>
    <div class="left">
      <wl-popover
        placement="left-start"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">左上</wl-button>
      </wl-popover>
      <wl-popover
        placement="left"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">左边</wl-button>
      </wl-popover>
      <wl-popover
        placement="left-end"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">左下</wl-button>
      </wl-popover>
    </div>

    <div class="right">
      <wl-popover
        placement="right-start"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">右上</wl-button>
      </wl-popover>
      <wl-popover
        placement="right"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">右边</wl-button>
      </wl-popover>
      <wl-popover
        placement="right-end"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">右下</wl-button>
      </wl-popover>
    </div>
    <div class="bottom">
      <wl-popover
        placement="bottom-start"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">下左</wl-button>
      </wl-popover>
      <wl-popover
        placement="bottom"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">下边</wl-button>
      </wl-popover>
      <wl-popover
        placement="bottom-end"
        title="标题"
        width="200"
        trigger="hover"
        content="组件组成包括：品牌区域、顶部导航栏、导航栏、内容区域内容区域固定宽度 1200PX，颜色与背景颜色做区分。">
        <wl-button slot="reference">下右</wl-button>
      </wl-popover>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      };
    }
  };
</script>
```
:::


### 嵌套操作

当然，你还可以嵌套操作，这相比 Dialog 更为轻量：

:::demo
```html
<wl-popover
  placement="top"
  width="160"
  v-model="visible">
  <p>这是一段内容这是一段内容确定删除吗？</p>
  <div style="text-align: right; margin: 0">
    <wl-button size="mini" type="text" @click="visible = false">取消</wl-button>
    <wl-button type="primary" size="mini" @click="visible = false">确定</wl-button>
  </div>
  <wl-button slot="reference">删除</wl-button>
</wl-popover>

<script>
  export default {
    data() {
      return {
        visible: false,
      };
    }
  }
</script>
```
:::

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| trigger | 触发方式 | String  | click/focus/hover/manual |    click    |
|  title              | 标题 | String | — | — |
|  content        |  显示的内容，也可以通过 `slot` 传入 DOM   | String            | — | — |
|  width        |  宽度  | String, Number            | — | 最小宽度 150px |
|  placement        |  出现位置  | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  disabled       |  Popover 是否可用  | Boolean           | — |  false |
|  value / v-model        |  状态是否可见  | Boolean           | — |  false |
|  offset        |  出现位置的偏移量  | Number           | — |  0 |
|  transition     |  定义渐变动画      | String             | — | fade-in-linear |
|  visible-arrow   |  是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper) | Boolean | — | true |
|  popper-options        | [popper.js](https://popper.js.org/) 的参数 | Object            | 参考 [popper.js](https://popper.js.org/) 文档 | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| popper-class | 为 popper 添加类名 | String | — | — |
| open-delay | 触发方式为 hover 时的显示延迟，单位为毫秒 | Number | — | — |
| close-delay | 触发方式为 hover 时的隐藏延迟，单位为毫秒 | number | — | 200 |
| tabindex   | Popover 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number | — | 0 |

### Slot
| 参数 | 说明 |
|--- | ---|
| — | Popover 内嵌 HTML 文本 |
| reference | 触发 Popover 显示的 HTML 元素 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| show | 显示时触发 | — |
| after-enter | 显示动画播放完毕后触发 | — |
| hide | 隐藏时触发 | — |
| after-leave | 隐藏动画播放完毕后触发 | — |
