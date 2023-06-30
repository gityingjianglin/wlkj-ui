## Button 按钮
按钮用于开始一个即时操作

### 基础用法

基础按钮

:::demo 使用`type`属性来定义Button的样式。

```html
<wl-row>
  <wl-button>默认按钮</wl-button>
  <wl-button type="primary">主要按钮</wl-button>
  <wl-button type="success">成功按钮</wl-button>
  <wl-button type="warning">警告按钮</wl-button>
  <wl-button type="danger">危险按钮</wl-button>
</wl-row>
<wl-row>
  <wl-button plain>朴素按钮</wl-button>
  <wl-button type="primary" plain>主要按钮</wl-button>
  <wl-button type="success" plain>成功按钮</wl-button>
  <wl-button type="warning" plain>警告按钮</wl-button>
  <wl-button type="danger" plain>危险按钮</wl-button>
</wl-row>
<wl-row>
  <wl-button border>线框按钮</wl-button>
  <wl-button type="primary" border>主要按钮</wl-button>
  <wl-button type="success" border>成功按钮</wl-button>
  <wl-button type="warning" border>警告按钮</wl-button>
  <wl-button type="danger" border>危险按钮</wl-button>
</wl-row>
<wl-row>
  <wl-button round>圆角按钮</wl-button>
  <wl-button type="primary" round>主要按钮</wl-button>
  <wl-button type="warning" round>警告按钮</wl-button>
  <wl-button type="danger" round>危险按钮</wl-button>
</wl-row>
```
:::

### 失效/禁用按钮

按钮不可用状态

:::demo 使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<wl-row>
  <wl-button disabled>默认按钮</wl-button>
  <wl-button type="primary" disabled>主要按钮</wl-button>
  <wl-button type="success" disabled>成功按钮</wl-button>
  <wl-button type="primary" disabled icon="wl-icon-CalendarOutline" circle></wl-button>
  <wl-button type="success" disabled icon="wl-icon-CheckOutline" circle></wl-button>
  <wl-button type="danger" disabled icon="wl-icon-DeleteOutline" circle></wl-button>
</wl-row>
```
:::

### 文字按钮

纯文字按钮

:::demo 默认只支持蓝色(#1A7BF3)文字按钮，如需其它颜色文字按钮，可通过`style`、`class`属性设置样式。
```html
<wl-button type="text">文字按钮</wl-button>
<wl-button type="text" style="color: red;">文字按钮</wl-button>
<wl-button type="text" style="color: green;">文字按钮</wl-button>
<wl-button type="text" disabled>文字按钮</wl-button>
```
:::

### 图标按钮

带图标的按钮可增强辨识度。

:::demo 设置`icon`属性即可，icon 的列表可以参考 icon 组件，同时可以设置在文字右边的 icon ，只要使用`i`标签即可，支持使用自定义图标。

```html
<wl-row>
  <wl-button type="primary" icon="wl-icon-CalendarOutline">保 存</wl-button>
  <wl-button type="primary">添 加<i class="wl-icon-AddCircleOutline wl-icon--right"></i></wl-button>
  <wl-button type="primary" icon="wl-icon-CloseCircleOutlined"></wl-button>
  <wl-button  icon="wl-icon-DeleteFilled">删 除</wl-button>
</wl-row>
<wl-row>
  <wl-button icon="wl-icon-SearchOutline" circle></wl-button>
  <wl-button type="primary" icon="wl-icon-CalendarOutline" circle></wl-button>
  <wl-button type="success" icon="wl-icon-CheckOutline" circle></wl-button>
  <wl-button type="warning" icon="wl-icon-AddCircleOutline" circle></wl-button>
  <wl-button type="danger" icon="wl-icon-DeleteOutline" circle></wl-button>
</wl-row>
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```html
<wl-button type="primary" :loading="true">加载中</wl-button>
```
:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`large`、`default/medium`、`small`，通过设置`size`属性来配置它们。

```html
<wl-row>
  <wl-button type="primary" size="large">大型按钮</wl-button>
  <wl-button type="primary">默认按钮</wl-button>
  <wl-button type="primary" size="small">小型按钮</wl-button>
</wl-row>
<wl-row>
  <wl-button type="danger" size="large" round>大型按钮</wl-button>
  <wl-button type="danger" size="medium" round>默认按钮</wl-button>
  <wl-button type="danger" size="small" round>小型按钮</wl-button>
</wl-row>
<wl-row>
  <wl-button type="danger" size="large" border>大型按钮</wl-button>
  <wl-button type="danger" size="medium" border>默认按钮</wl-button>
  <wl-button type="danger" size="small" border>小型按钮</wl-button>
</wl-row>
<wl-row>
  <wl-button disabled>大型按钮</wl-button>
  <wl-button disabled size="medium">默认按钮</wl-button>
  <wl-button disabled size="small" >小型按钮</wl-button>
</wl-row>
```
:::

### 自动聚焦

按钮可设置默认聚焦状态。

:::demo 通过设置`autofocus`属性为true可使按钮自动聚焦。

```html
  <wl-button type="primary" :autofocus="true">默认按钮</wl-button>
</wl-row>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| type     | 类型   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |

