## Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

适用广泛的基础单选
:::demo `v-model`的值为当前被选中的`wl-option`的 value 属性值
```html
<template>
  <wl-select v-model="value" placeholder="请选择">
    <wl-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </wl-option>
  </wl-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '01',
          label: '西瓜'
        }, {
          value: '02',
          label: '哈密瓜'
        }, {
          value: '03',
          label: '橙子'
        }],
        value: ''
      }
    }
  }
</script>
```
:::

### 有禁用选项

:::demo 在`wl-option`中，设定`disabled`值为 true，即可禁用该选项
```html
<template>
  <wl-select v-model="value" placeholder="请选择">
    <wl-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
    </wl-option>
  </wl-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '01',
          label: '西瓜'
        }, {
          value: '02',
          label: '哈密瓜',
          disabled: true
        }, {
          value: '03',
          label: '橙子'
        }],
        value: ''
      }
    }
  }
</script>
```
:::

### 禁用状态

选择器不可用状态

:::demo 为`wl-select`设置`disabled`属性，则整个选择器不可用
```html
<template>
  <wl-select v-model="value" disabled placeholder="请选择">
    <wl-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </wl-option>
  </wl-select>
</template>
  
<script>
  export default {
    data() {
      return {
        options: [{
          value: '01',
          label: '西瓜'
        }, {
          value: '02',
          label: '哈密瓜'
        }, {
          value: '03',
          label: '橙子'
        }],
        value: ''
      }
    }
  }
</script>
```
:::

### 可清空单选

包含清空按钮，可将选择器清空为初始状态

:::demo 为`wl-select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。
```html
<template>
  <wl-select v-model="value" clearable placeholder="请选择">
    <wl-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </wl-option>
  </wl-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '01',
          label: '西瓜'
        }, {
          value: '02',
          label: '哈密瓜'
        }, {
          value: '03',
          label: '橙子'
        }],
        value: ''
      }
    }
  }
</script>
```
:::

### 基础多选

适用性较广的基础多选，用 Tag 展示已选项

:::demo 为`wl-select`设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置`collapse-tags`属性将它们合并为一段文字。
```html
<template>
  <wl-select v-model="value1" multiple placeholder="请选择">
    <wl-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </wl-option>
  </wl-select>

  <wl-select
    v-model="value2"
    multiple
    collapse-tags
    style="margin-left: 20px;"
    placeholder="请选择">
    <wl-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </wl-option>
  </wl-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '01',
          label: '西瓜'
        }, {
          value: '02',
          label: '哈密瓜'
        }, {
          value: '03',
          label: '橙子'
        }],
        value1: [],
        value2: []
      }
    }
  }
</script>
```
:::


### 可搜索

可以利用搜索功能快速查找选项

:::demo 为`wl-select`添加`filterable`属性即可启用搜索功能。默认情况下，Select 会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`filter-method`来实现。`filter-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。
```html
<template>
  <wl-select v-model="value" filterable placeholder="请选择">
    <wl-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </wl-option>
  </wl-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '01',
          label: '西瓜'
        }, {
          value: '02',
          label: '哈密瓜'
        }, {
          value: '03',
          label: '橙子'
        }],
        value: ''
      }
    }
  }
</script>
```
:::

:::tip
如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。
:::

### Select Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值 | boolean / string / number | — | — |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | — | value |
| size | 输入框尺寸 | string | medium/small/mini | — |
| clearable | 是否可以清空选项 | boolean | — | false |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | select input 的 name 属性 | string | — | — |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loading-text | 远程加载时显示的文字 | string | — | 加载中 |
| no-match-text | 搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置 | string | — | 无匹配数据 |
| no-data-text | 选项为空时显示的文字，也可以使用`slot="empty"`设置 | string | — | 无数据 |
| popper-class | Select 下拉框的类名 | string | — | — |
| reserve-keyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | — | false |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean | - | true |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

### Select Slots
|   name  | 说明     |
|---------|---------|
|    —    | Option 组件列表 |
| prefix  | Select 组件头部内容 |
| empty | 无选项时的列表 |
