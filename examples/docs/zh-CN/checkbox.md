## Checkbox 多选框
一组备选项中进行多选

### 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的内容。内容格式可以为`string`，或者`html`片段。

:::demo 在`wl-checkbox`元素中定义`v-model`绑定变量，单一的`checkbox`中，默认绑定变量的值会是`Boolean`，选中为`true`。

```html
<template>
  <!-- `checked` 为 true 或 false -->
  <wl-checkbox v-model="checked1">苹果</wl-checkbox>
  <wl-checkbox v-model="checked2"><span style="color:red;">香蕉</span></wl-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked1: true,
        checked2: true
      };
    }
  };
</script>
```
:::

### 禁用状态

多选框不可用状态。

:::demo 设置`disabled`属性即可。

```html
<template>
  <wl-checkbox v-model="checked1" disabled>苹果</wl-checkbox>
  <wl-checkbox v-model="checked2" disabled>西瓜</wl-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked1: false,
        checked2: true
      };
    }
  };
</script>
```
:::

### 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo `checkbox-group`元素能把多个 checkbox 管理为一组，只需要在 Group 中使用`v-model`绑定`Array`类型的变量即可。 `wl-checkbox` 的 `label`属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的内容。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

```html
<template>
  <wl-checkbox-group v-model="checkList">
    <wl-checkbox label="苹果"></wl-checkbox>
    <wl-checkbox label="西瓜"></wl-checkbox>
    <wl-checkbox label="香蕉"></wl-checkbox>
    <wl-checkbox label="禁用" disabled></wl-checkbox>
    <wl-checkbox label="选中且禁用" disabled></wl-checkbox>
  </wl-checkbox-group>
</template>

<script>
  export default {
    data () {
      return {
        checkList: ['选中且禁用','苹果']
      };
    }
  };
</script>
```
:::

### indeterminate 状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

:::demo

```html
<template>
  <wl-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</wl-checkbox>
  <div style="margin: 15px 0;"></div>
  <wl-checkbox-group v-model="checkedFruits" @change="handleCheckedFruitsChange">
    <wl-checkbox v-for="fruit in fruits" :label="fruit" :key="fruit">{{fruit}}</wl-checkbox>
  </wl-checkbox-group>
</template>
<script>
  const fruitOptions = ['苹果', '西瓜', '哈密瓜'];
  export default {
    data() {
      return {
        checkAll: false,
        checkedFruits: ['苹果', '西瓜'],
        fruits: fruitOptions,
        isIndeterminate: true
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedFruits = val ? fruitOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedFruitsChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.fruits.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.fruits.length;
      }
    }
  };
</script>
```
:::

### 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

:::demo

```html
<template>
  <wl-checkbox-group 
    v-model="checkedFruits"
    :min="1"
    :max="2">
    <wl-checkbox v-for="fruit in fruits" :label="fruit" :key="fruit">{{fruit}}</wl-checkbox>
  </wl-checkbox-group>
</template>
<script>
  const fruitOptions = ['苹果', '西瓜', '猕猴桃', '草莓'];
  export default {
    data() {
      return {
        checkedFruits: ['苹果', '草莓'],
        fruits: fruitOptions
      };
    }
  };
</script>
```

:::


### 带有边框

:::demo 设置`border`属性可以渲染为带有边框的多选框。同时在设置`border`属性以后可以设置wl-checkbox组件三种尺寸，`size`属性取值为`medium`,`small`,`mini`。
```html
<template>
  <div>
    <wl-checkbox v-model="checked1" label="苹果" border></wl-checkbox>
    <wl-checkbox v-model="checked2" label="西瓜" border size="medium"></wl-checkbox>
    <wl-checkbox v-model="checked3" label="哈密瓜" border size="small"></wl-checkbox>
    <wl-checkbox v-model="checked4" label="香蕉" border size="mini"></wl-checkbox>
  </div>
  <div style="margin-top: 20px;">
    <wl-checkbox-group v-model="checkboxGroup" size="mini">
      <wl-checkbox label="草莓" border></wl-checkbox>
      <wl-checkbox label="橙子" border disabled></wl-checkbox>
      <wl-checkbox label="橘子" border></wl-checkbox>
    </wl-checkbox-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checked1: true,
        checked2: false,
        checked3: false,
        checked4: false,
        checkboxGroup: ['草莓', '橙子']
      };
    }
  }
</script>
```
:::

### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| label     | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效）| string / number / boolean  |       —        |     —    |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| size  | Checkbox 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制    | boolean   |  — | false   |

### Checkbox Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | array | — | — |
| size     | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效   | string  | medium / small / mini  |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| min     | 可被勾选的 checkbox 的最小数量   | number    |       —        |     —    |
| max     | 可被勾选的 checkbox 的最大数量   | number    |       —        |     —    |
| text-color  | 按钮形式的 Checkbox 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Checkbox 激活时的填充色和边框色    | string   | — | #409EFF   |

### Checkbox-group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |
