## Card 卡片
将信息聚合在卡片容器中展示。

### 基础用法


最基础的卡片容器，可承载文字、列表、图片、段落等等。

:::demo Card 组件包括`header`和`body`部分，`header`部分需要有显式具名 slot 分发，同时也是可选的。
```html
<wl-card class="box-card">
  <div slot="header" class="clearfix">
    <span>商品卡片</span>
    <wl-button style="float: right; padding: 3px 0" type="text">操作按钮</wl-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'商品 ' + o }}
  </div>
</wl-card>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
```
:::

### 简单卡片

卡片可以只有内容区域。

:::demo
```html
<wl-card class="box-card">
  <div v-for="item in fruitList" :key="item" class="text item">
    {{ item }}
  </div>
</wl-card>
<script>
  export default {
    data() {
      return {
        fruitList: [
          '苹果', '香蕉', '哈密瓜', '西瓜', '梨子'
        ]
      }
    }
  }
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 设置 header，也可以通过 `slot#header` 传入 DOM | string| — | — |
| body-style | 设置 body 的样式| object| — | { padding: '20px' } |
