## Slider 滑块
通过拖动滑块在一个固定区间内进行选择

### 基础用法
在拖动滑块时，显示当前值。
:::demo



```html
<div style="display:flex; justify-content: space-between; margin-top:20px">
  <span>默认</span>
  <wl-slider :value="0"></wl-slider>
</div>
<div style="display:flex; justify-content: space-between; margin-top:20px">
  <span>自定义初始值</span>
  <wl-slider :value="50"></wl-slider>
</div>
<div style="display:flex; justify-content: space-between; margin-top:20px">
  <span>禁用</span>
  <wl-slider :value="50" disabled></wl-slider>
</div>

```
:::

### 竖向模式
:::demo 设置vertical可使 Slider 变成竖向模式，此时必须设置高度height属性



```html
<div>
  <span>默认</span>
  <wl-slider 
  :value="value1" 
  vertical 
  @change="numChange"
  height="200px"></wl-slider>
</div>
<script>
  export default {
    data() {
      return {
        value1: 0,
        value2: 50
      }
    },
    methods: {
      numChange(newValue){
          this.value1 = newValue
          console.log(this.value1)
      }
    }
  };
</script>

```
:::


### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 绑定值   | number    |   —  |      —   | 0    |
| disabled     | 是否禁用状态   | boolean    | — | false   |
| vertical     | 是否竖向模式   | boolean    | — | false   |
| height     | Slider 高度，竖向模式时必填  | string    | — | -   |

### Events
| 事件名称      | 说明    | 回调参数   |
|---------- |-------- |---------- |
| change     | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | 改变后的值|