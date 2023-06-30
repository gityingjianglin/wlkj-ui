## Alert 警告

用于页面中展示重要的提示信息。

### 基本用法

页面中的非浮层元素，不会自动消失。

:::demo Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。
```html
<template>
  <wl-alert
    title="消息提示的文案"
    type="info">
  </wl-alert>
  <wl-alert
    title="成功提示的文案"
    type="success">
  </wl-alert>
  <wl-alert
    title="警告提示的文案"
    type="warning">
  </wl-alert>
  <wl-alert
    title="错误提示的文案"
    type="error">
  </wl-alert>
</template>
```
:::

### 自定义关闭按钮

自定义关闭按钮为文字或其他符号。

:::demo 在 Alert 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。`closable`属性决定是否可关闭，接受`boolean`，默认为`true`。你可以设置`close-text`属性来代替右侧的关闭图标，注意：`close-text`必须为文本。设置`close`事件来设置关闭时的回调。
```html
<template>
  <wl-alert
    title="消息提示文案"
    type="info"
    close-text="知道了">
  </wl-alert>
  <wl-alert
    title="错误提示文案"
    type="error"
    close-text="查看详情">
  </wl-alert>
  <wl-alert
    title="成功提示文案-不可关闭"
    type="success"
    show-icon
    :closable="false">
  </wl-alert>
  
  <wl-alert
    title="设置了回调的 alert"
    type="warning"
    show-icon
    @close="hello">
  </wl-alert>
</template>

<script>
  export default {
    methods: {
      hello() {
        alert('Hello World!');
      }
    }
  }
</script>
```
:::

### 带有 icon

表示某种状态时提升可读性。

:::demo 通过设置`show-icon`属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。
```html
<template>
  <wl-alert
    title="成功提示的文案"
    type="success"
    show-icon>
  </wl-alert>
  <wl-alert
    title="消息提示的文案"
    type="info"
    show-icon>
  </wl-alert>
  <wl-alert
    title="警告提示的文案"
    type="warning"
    show-icon>
  </wl-alert>
  <wl-alert
    title="错误提示的文案"
    type="error"
    show-icon>
  </wl-alert>
</template>
```
:::

### 文字居中

使用 `center` 属性让文字水平居中。

:::demo
```html
<template>
  <wl-alert
    title="成功提示的文案"
    type="success"
    center
    show-icon>
  </wl-alert>
  <wl-alert
    title="消息提示的文案"
    type="info"
    center
    show-icon>
  </wl-alert>
  <wl-alert
    title="警告提示的文案"
    type="warning"
    center
    show-icon>
  </wl-alert>
  <wl-alert
    title="错误提示的文案"
    type="error"
    center
    show-icon>
  </wl-alert>
</template>
```
:::

### 带有 icon 和辅助性文字介绍

:::demo 这是一个同时具有 icon 和辅助性文字的样例。可通过`icon-position`设置`icon`的垂直位置，可选值为`top`、`center`、`bottom`。
```html
<template>
  <wl-alert
    title="已成功！"
    type="success"
    description="你所提交的信息已经审核通过，请及时跟进申请状况。如有问题，请联系审核人员或在线客服。"
    icon-position="top"
    show-icon>
  </wl-alert>
  <wl-alert
    title="请注意"
    type="info"
    description="你所提交的信息已经审核失败，可以进入个人信箱查看原因，如有疑问，请联系客服人员。"
    icon-position="bottom"
    show-icon>
  </wl-alert>
  <wl-alert
    title="帮助信息"
    type="warning"
    description="你好，由于你的良好信用，我们决定赠送你三个月产品会员，欲了解会员特权与活动请进首页会员专区查看。"
    show-icon>
  </wl-alert>
  <wl-alert
    title="出错了！"
    type="error"
    description="你的账户会员使用权限将在3天后到期，请及时跟进申请状况。如有问题，请联系审核人员。"
    show-icon>
  </wl-alert>
</template>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | 标题           | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| icon-position | icon垂直方向的位置 | string | top/center/bottom | center |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |
| effect | 选择提供的主题 | string | light/dark | light |

### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
