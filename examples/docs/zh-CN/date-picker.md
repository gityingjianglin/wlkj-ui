## DatePicker 日期选择器
用于选择或输入日期

### 选择日
以「日」为基本单位，基础的日期选择控件

:::demo 禁用日期通过 `disabledDate` 设置，传入函数。
```html
<template>
  <wl-date-picker
    v-model="value1"
    type="date"
    placeholder="选择日期"
    :picker-options="pickerOptions">
  </wl-date-picker>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: ''
      };
    }
  };
</script>
```
:::



### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值   | date(DatePicker) | — | — |
| readonly | 完全只读	   | boolean | — | false |
| disabled | 禁用	   | boolean | — | false |
| editable | 文本框可输入		   | boolean | — | true |
| clearable | 是否显示清除按钮	   | boolean | — | true |
| size | 输入框尺寸		   | string | large, small, mini | — |
| placeholder | 非范围选择时的占位内容	   | string | — | — |
| popper-class | DatePicker 下拉框的类名	   | string | — | — |
| picker-options | 当前时间日期选择器特有的选项参考下表	   | object | — | {} |


### Picker Options

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| disabledDate | 设置禁用状态，参数为当前日期，要求返回 Boolean	   | Function | — | — |


### Events

| 事件名称      | 说明          | 回调参数  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| change | 用户确认选定的值时触发	   | 组件绑定值。格式与绑定值一致，可受 value-format 控制 |
| blur | 当 input 失去焦点时触发	   | 组件实例 |
| focus | 当 input 获得焦点时触发	   | 组件实例 |

### Methods

| 方法名      | 说明          | 参数  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| focus | 使 input 获取焦点		   | — |