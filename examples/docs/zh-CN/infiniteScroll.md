## InfiniteScroll 无限滚动

滚动至底部时，加载更多数据。

### 基础用法
在要实现滚动加载的列表上上添加`v-infinite-scroll`，并赋值相应的加载方法，可实现滚动到底部时自动执行加载方法。
:::demo
```html
<template>
  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    methods: {
      load () {
        this.count += 1
      }
    }
  }
</script>
```
:::

### 距离阈值
可动态配置滚动区域的距离阈值。
:::demo
```html
<template>
  <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-distance="200"  style="overflow:auto">
    <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    methods: {
      load () {
        this.count += 1
      }
    }
  }
</script>
```
:::



### Attributes

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| infinite-scroll-disabled | 是否禁用           | boolean      | - |false |
| infinite-scroll-delay   | 节流时延，单位为ms   | number       |   - |200   |
| infinite-scroll-distance| 触发加载的距离阈值，单位为px | number   |- |0 |
| infinite-scroll-immediate | 是否立即执行加载方法，以防初始状态下内容无法撑满容器。| boolean | - |true |
