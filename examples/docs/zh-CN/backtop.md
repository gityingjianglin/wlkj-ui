## Backtop 回到顶部

返回页面顶部的操作按钮

### 基础用法

滑动页面即可看到右下方的按钮。
:::demo `target`属性为触发滚动的对象，当滚动对象滚动内容区域超过默认值`200px`以后，会显示`wl-backtop`组件。

```html
<template>
  滑动页面即可看到右下方的按钮。
  <wl-backtop target=".page-component__scroll .wl-scrollbar__wrap"></wl-backtop>
</template>
```

:::

### 自定义显示内容

显示区域被固定为 40px \* 40px 的区域, 其中的内容可支持自定义。
:::demo

```html
<template>
  滑动页面即可看到右下方的按钮。
  <wl-backtop target=".page-component__scroll .wl-scrollbar__wrap" :bottom="100">
    <div
      style="{
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
    >
      up
    </div>
  </wl-backtop>
</template>
```

:::

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| target            | 触发滚动的对象                   | string          |        |        |
| visibility-height | 滚动高度达到此参数值才出现       | number |        | 200    |
| right             | 控制其显示位置, 距离页面右边距   | number |        | 40     |
| bottom            | 控制其显示位置, 距离页面底部距离 | number |        | 40     |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| click  | 点击按钮触发的事件 | 点击事件 |
