## Icon 图标

提供了一套常用的图标集合。

### 使用方法

1.直接通过设置类名为 `wl-icon-CalendarFilled` 来使用即可。例如：

:::demo
```html
<i class="wl-icon-CalendarFilled"></i>
<i class="wl-icon-CheckSquareFilled"></i>
<i class="wl-icon-PlusOutlined"></i>
<wl-button type="primary" icon="wl-icon-SearchOutline" >搜索</wl-button>

```
:::

2.以组件的形式使用`wl-icon`。例如：

:::demo 设置`name`属性，属性值为图标类名（不包含wl-icon-部分）。
```html
<wl-icon name="SearchOutline">
  <span style="margin-left: 5px;">搜索</span>
</wl-icon>

```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 图标类名，类名不包含(wl-icon-)   | string  |        |         |


### 图标集合

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'wl-icon-' + name"></i>
      <span class="icon-name">{{'wl-icon-' + name}}</span>
    </span>
  </li>
</ul>
