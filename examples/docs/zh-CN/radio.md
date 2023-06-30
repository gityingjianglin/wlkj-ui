## Radio 单选框

在一组备选项中进行单选

### 基础用法

:::demo 要使用 Radio 组件，只需要设置`v-model`绑定变量，选中意味着变量的值为相应 Radio `label`属性的值，`label`可以是`String`、`Number`或`Boolean`。

```html
<template>
  <wl-radio v-model="radio" label="苹果">苹果</wl-radio>
  <wl-radio v-model="radio" label="西瓜">西瓜</wl-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '西瓜'
      };
    }
  }
</script>
```
:::

### 禁用状态

单选框禁用的状态。

:::demo 在`wl-radio`元素中设置`disabled`属性，它接受一个`Boolean`，`true`为禁用。另一种方式可以为`disabled`属性绑定变量，可动态控制是否禁用`wl-radio`组件。
```html
<template>
  <div class="gap">
    <wl-radio disabled label="苹果">苹果</wl-radio>
  </div>
  <div class="gap">
    <wl-radio :disabled="disabledB" v-model="radio" label="西瓜">西瓜</wl-radio>
    <wl-radio :disabled="disabledC" v-model="radio" label="哈密瓜">哈密瓜</wl-radio>
  </div>
  <div>
    <wl-button type="primary" @click="disabledB = !disabledB" size="small">toggle B</wl-button>
    <wl-button type="primary" @click="disabledC = !disabledC" size="small">toggle C</wl-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        disabledB: true,
        disabledC: true,
        radio: '西瓜'
      };
    }
  }
</script>
```
:::

### 单选框组

适用于在多个互斥的选项中选择的场景

:::demo 结合`wl-radio-group`元素和子元素`wl-radio`可以实现单选组，在`wl-radio-group`中绑定`v-model`，`v-model`绑定的值对应`wl-radio`元素中`label`的值即可，另外，还提供了`change`事件来响应变化，它会传入一个参数`value`。

```html
<template>
  <wl-radio-group v-model="radio">
    <wl-radio label="苹果">苹果</wl-radio>
    <wl-radio label="西瓜">西瓜</wl-radio>
    <wl-radio label="香蕉">香蕉</wl-radio>
  </wl-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio: '香蕉'
      };
    }
  }
</script>
```
:::


### 带有边框

:::demo 设置`border`属性可以渲染为带有边框的单选框。
```html
<template>
  <div>
    <wl-radio v-model="radio1" label="1" border>苹果</wl-radio>
    <wl-radio v-model="radio1" label="2" border>西瓜</wl-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '1'
      };
    }
  }
</script>
```
:::

### 按钮样式

按钮样式的单选组合。

:::demo 只需要把`wl-radio`元素换成`wl-radio-button`元素即可，此外还提供了`size`属性。
```html
<template>
  <div>
    <wl-radio-group v-model="radio1" size="large">
      <wl-radio-button label="苹果"></wl-radio-button>
      <wl-radio-button label="香蕉"></wl-radio-button>
      <wl-radio-button label="西瓜"></wl-radio-button>
      <wl-radio-button label="草莓"></wl-radio-button>
    </wl-radio-group>
  </div>
  <div style="margin-top: 20px">
    <wl-radio-group v-model="radio2" >
      <wl-radio-button label="苹果" ></wl-radio-button>
      <wl-radio-button label="香蕉"></wl-radio-button>
      <wl-radio-button label="西瓜"></wl-radio-button>
      <wl-radio-button label="草莓"></wl-radio-button>
    </wl-radio-group>
  </div>
  <div style="margin-top: 20px">
    <wl-radio-group v-model="radio3" disabled size="small">
      <wl-radio-button label="苹果"></wl-radio-button>
      <wl-radio-button label="香蕉" disabled ></wl-radio-button>
      <wl-radio-button label="西瓜"></wl-radio-button>
      <wl-radio-button label="草莓"></wl-radio-button>
    </wl-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '苹果',
        radio2: '香蕉',
        radio3: '西瓜'
      };
    }
  }
</script>
```
:::

### 不同尺寸

wl-radio 组件提供除了默认值以外的三种尺寸，需设置`border`属性以后才生效。

:::demo 设置`border`属性可以wl-radio组件设置三种尺寸，`size`属性取值为`large`，`medium`，`small`。
```html
<template>
  <div>
    <wl-radio v-model="radio" label="1" border size="large">西瓜</wl-radio>
    <wl-radio v-model="radio" label="2" border size="medium">苹果</wl-radio>
    <wl-radio v-model="radio" label="3" border size="small">香蕉</wl-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| label     | Radio 的 value   | string / number / boolean    |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| size  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |

### Radio Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| size     | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效   | string  | medium / small / mini |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| text-color  | 按钮形式的 Radio 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Radio 激活时的填充色和边框色    | string   | — | #409EFF   |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |
