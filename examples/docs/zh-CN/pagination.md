## Pagination 面包屑

数据量过多时，可使用分页分解数据。

### 基本用法

#### 页数较少时
:::demo 设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。`prev`表示上一页，`next`为下一页，`pager`表示页码列表，除此以外还提供了`jumper`和`total`，`sizes`，`jumper`表示跳页元素，`total`表示总条目数，`sizes`用于设置每页显示的页码数量。
```html
<template>
  <wl-pagination
    layout="prev, pager, next"
    :total="40">
  </wl-pagination>
</template>
```
:::

#### 页数大于7页时
:::demo
```html
<template>
  <wl-pagination
    layout="prev, pager, next"
    :total="400">
  </wl-pagination>
</template>
```
:::


#### 设置最大页码的按钮数
:::demo 默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。通过`pager-count`属性可以设置最大页码按钮数。
```html
<template>
  <wl-pagination
    layout="prev, pager, next"
    :pager-count="11"
    :total="400">
  </wl-pagination>
</template>
```
:::


#### 设置带背景色的分页
:::demo 设置`background`属性可以为分页按钮添加背景色。
```html
<template>
  <wl-pagination
    background
    layout="prev, pager, next"
    :total="400">
  </wl-pagination>
</template>
```
:::

#### 设置带边框的分页
:::demo 设置`border`属性可以为分页按钮添加背景色。
```html
<template>
  <wl-pagination
    border
    layout="prev, pager, next"
    :total="400">
  </wl-pagination>
</template>
```
:::


#### 可根据场景，添加其他功能模块。
:::demo `size-change`和`current-change`事件来处理页码大小和当前页变动时候触发的事件。`page-sizes`接受一个整型数组，数组元素为展示的选择每页显示个数的选项，`[10, 20, 30, 40]`表示四个选项，每页显示 10 个，20 个，30 个或者 40 个。
```html
<template>
  <wl-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400">
  </wl-pagination>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage: 4
      };
    }
  }
</script>
```
:::



### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| small | 是否使用小型分页样式   | boolean | — | false |
| background | 是否为分页按钮添加背景色		   | boolean | — | false |
| border | 是否为分页按钮添加边框		   | boolean | — | false |
| page-size | 每页显示条目个数	   | number | — | 10 |
| total | 总条目数		   | number | — | — |
| page-count | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性	   | Number | — | — |
| pager-count | 页码按钮的数量，当总页数超过该值时会折叠		   | number | 大于等于 5 且小于等于 21 的奇数	 | 7 |
| current-page | 当前页数，支持 .sync 修饰符		   | number | — | 1 |
| layout | 组件布局，子组件名用逗号分隔		   | String | sizes, prev, pager, next, jumper, total, slot | 'prev, pager, next, jumper, total' |
| page-sizes | 每页显示个数选择器的选项设置		   | number[]	 | — | [10, 20, 30, 40, 50, 100] |
| prev-text | 替代图标显示的上一页文字			   | string | — | — |
| next-text | 替代图标显示的下一页文字		   | string	 | — | — |



### Events

| 事件名称      | 说明          | 回调参数  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| size-change | pageSize 改变时会触发		   | 每页条数 |
| current-change	 | currentPage 改变时会触发	   | 当前页 |