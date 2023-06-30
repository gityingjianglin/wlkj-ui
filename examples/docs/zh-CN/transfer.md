## Transfer 穿梭框

### 基础用法

:::demo Transfer 的数据通过 `data` 属性传入。数据类型为对象数组，每个对象需有以下属性：`key` 为数据的唯一性标识，`label` 为显示文本，`disabled` 表示该项数据是否禁止转移。目标列表中的数据项会同步到绑定至 `v-model` 的变量，值为数据项的 `key` 所组成的数组。如果需要在初始状态时目标列表有初始项，可以像本例一样为 `v-model` 绑定的变量赋予一个初始值。
```html
<template>
  <wl-transfer
    v-model="value"
    :data="data"></wl-transfer>
</template>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: [1, 4]
      };
    }
  };
</script>
```
:::

### 可自定义
对列表标题文案、按钮文案、列表底部的勾选状态文案等进行自定义。

:::demo 使用 `titles`、`button-texts`、`render-content` 和 `format` 属性分别对列表标题文案、按钮文案、数据项的渲染函数和列表顶部的勾选状态文案进行自定义。数据项的渲染还可以使用 `scoped-slot` 进行自定义。此外，如果希望某些数据项在初始化时就被勾选，可以使用 `left-default-checked` 和 `right-default-checked` 属性。最后，本例还展示了 `change` 事件的用法。
```html
<template>
  <wl-transfer
    v-model="value"
    :data="data"
    :left-default-checked="[2, 3]"
    :right-default-checked="[1]"
    :titles="['Source', 'Target']"
    :button-texts="['到左边', '到右边']"
    @change="transferHandleChange"
    target-order="unshift"></wl-transfer>
</template>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: [1, 4]
      };
    },
    methods: {
      transferHandleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      }
    }
  };
</script>
```
:::


### 数据项属性别名
默认情况下，Transfer 仅能识别数据项中的 key、label 和 disabled 字段。支持使用 props 属性为它们设置别名。

:::demo 数据源没有 `key` 和 `label` 字段，在功能上与它们相同的字段名为 `value` 和 `desc`。可以使用`props` 属性为 `key` 和 `label` 设置别名。
```html
<template>
  <wl-transfer
    v-model="value"
    :data="data"
    :props="{
      key: 'value',
      label: 'desc'
    }"></wl-transfer>
</template>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            value: i,
            desc: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: [1, 4]
      };
    }
  };
</script>
```
:::




### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值   | array | — | — |
| data | Transfer 的数据源		   | array[{ key, label, disabled }] | — | [] |
| target-order	 | 右侧列表元素的排序策略：若为 original，则保持与数据源相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前		   | string | original / push / unshift | original |
| titles | 自定义列表标题		   | array | — | ['列表 1', '列表 2'] |
| button-texts | 自定义按钮文案	   | array | — | [] |
| props | 数据源的字段别名		   | object{key, label, disabled} | — | — |
| left-default-checked | 初始状态下左侧列表的已勾选项的 key 数组	   | array | — | [] |
| right-default-checked	 | 初始状态下右侧列表的已勾选项的 key 数组	   | array | — | [] |


### Events

| 事件名称      | 说明          | 回调参数  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| change | 右侧列表元素变化时触发	   | 当前值、数据移动的方向（'left' / 'right'）、发生移动的数据 key 数组 |