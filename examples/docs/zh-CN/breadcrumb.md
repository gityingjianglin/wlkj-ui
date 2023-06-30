## Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

### 基本用法

适用广泛的基础用法。

:::demo 在`wl-breadcrumb`中使用`wl-breadcrumb-item`标签表示从首页开始的每一级。`separator`属性支持在`wl-breadcrumb`标签中设置它来决定分隔符，它只能是字符串，默认为斜杠`/`。
```html
<template>
  <wl-breadcrumb separator="/">
    <wl-breadcrumb-item :to="{ path: '/zh-CN/component/installation' }" :replace="true" target="blank">首页</wl-breadcrumb-item>
    <wl-breadcrumb-item><a href="/">产品信息</a></wl-breadcrumb-item>
    <wl-breadcrumb-item>关于我们</wl-breadcrumb-item>
    <wl-breadcrumb-item>联系我们</wl-breadcrumb-item>
  </wl-breadcrumb>
</template>
```
:::

### 图标分隔符
:::demo 通过设置 `separator-class` 可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 设置失效
```html
<template>
  <wl-breadcrumb separator-class="wl-icon-RightOutline">
    <wl-breadcrumb-item :to="{ path: '/zh-CN/component/installation' }">首页</wl-breadcrumb-item>
    <wl-breadcrumb-item>产品信息</wl-breadcrumb-item>
    <wl-breadcrumb-item>关于我们</wl-breadcrumb-item>
    <wl-breadcrumb-item>联系我们</wl-breadcrumb-item>
  </wl-breadcrumb>
</template>
```
:::

### Breadcrumb 属性
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| separator     | 分隔符           | string | — | 斜杠'/' |
| separator-class | 图标分隔符 class	 | string | — | - |



### Breadcrumb Item 属性
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| to     | 路由跳转对象，同 vue-router 的 to           | string/object | — | — |
| replace | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录	 | boolean | — | false |
| target | 是否新页面打开，to为字符串时targer为blank不起效果	 | string | self,blank | - |
