## Tag 标签
用于标记和选择。

### 基础用法

:::demo 由type属性来选择tag的类型，也可以通过color属性来自定义背景色。

```html
<div>
  <wl-tag >001</wl-tag>
  <wl-tag type="success">002</wl-tag>
  <wl-tag type="info">003</wl-tag>
  <wl-tag type="warning">004</wl-tag>
  <wl-tag type="danger">005</wl-tag>
</div>

```
:::

### 可移除标签

:::demo 设置closable属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置disable-transitions属性，它接受一个Boolean，true 为关闭。

```html
<div>
  <wl-tag closable >001</wl-tag>
  <wl-tag type="success" closable>002</wl-tag>
  <wl-tag type="info" closable>003</wl-tag>
  <wl-tag type="warning" closable>004</wl-tag>
  <wl-tag type="danger" closable>005</wl-tag>
</div>

```
:::

### 动态编辑标签
动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现.

:::demo 

```html
<wl-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</wl-tag>
<input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
/>
<wl-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</wl-button>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<script>
  export default {
    data() {
      return {
        dynamicTags: ['001', '002', '003','004', '005', '标签六'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        console.log(this.dynamicTags)
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.focus()
          // this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

```
:::

### 不同的尺寸
Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：medium、small、mini，通过设置size属性来配置它们。

```html
<div>
  <wl-tag closable >默认标签</wl-tag>
  <wl-tag size="medium" type="success" closable>中等标签</wl-tag>
  <wl-tag size="small" type="info" closable>小型标签</wl-tag>
  <wl-tag size="mini" type="warning" closable>超小标签</wl-tag>
</div>

```
:::

### 不同主题
Tag 组件提供了三个不同的主题：dark、light 和 plain

:::demo 通过设置effect属性来改变主题，默认为 light

```html
<div class="tag-group">
  <span>Dark</span>
  <wl-tag effect="dark" >001</wl-tag>
  <wl-tag effect="dark" type="success">002</wl-tag>
  <wl-tag effect="dark" type="info">003</wl-tag>
  <wl-tag effect="dark" type="warning">004</wl-tag>
  <wl-tag effect="dark" type="danger">005</wl-tag>
</div>
<div class="tag-group">
  <span>Plain</span>
  <wl-tag effect="plain" >001</wl-tag>
  <wl-tag effect="plain" type="success" hit>002</wl-tag>
  <wl-tag effect="plain" type="info" >003</wl-tag>
  <wl-tag effect="plain" type="warning" >004</wl-tag>
  <wl-tag effect="plain" type="warning"  color="#666">005</wl-tag>
</div>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string  |   success/info/warning/danger |   -    |
| closable     | 是否可关闭   | boolean    | — | fasle    |
| disable-transitions     | 是否禁用渐变动画   | boolean    | — | false   |
| hit     | 是否有边框描边   | boolean    | — | false   |
| color  | 背景色 | string   |  —  |  -  |
| size    | 尺寸   | string  | medium / small / mini | -   |
| effect  | 主题 | string   | dark/light/plain  | light  |

### Events
| 事件名称  | 说明    | 回调参数     |
|---------- |-------- |---------- |
| click     | 点击 Tag 时触发的事件   | — |
| close     | 关闭 Tag 时触发的事件  | —  |