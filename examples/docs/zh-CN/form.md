## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

:::demo 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker
```html
<wl-form ref="form" :model="form" label-width="80px">
  <wl-form-item label="活动名称">
    <wl-input v-model="form.name"></wl-input>
  </wl-form-item>
  <wl-form-item label="活动区域">
    <wl-select v-model="form.region" placeholder="请选择活动区域">
      <wl-option label="区域一" value="shanghai"></wl-option>
      <wl-option label="区域二" value="beijing"></wl-option>
    </wl-select>
  </wl-form-item>
  <wl-form-item label="活动时间">
    <wl-col :span="11">
      <wl-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></wl-date-picker>
    </wl-col>
  </wl-form-item>
  <wl-form-item label="即时配送">
    <wl-switch v-model="form.delivery"></wl-switch>
  </wl-form-item>
  <wl-form-item label="活动性质">
    <wl-checkbox-group v-model="form.type">
      <wl-checkbox label="美食/餐厅线上活动" name="type"></wl-checkbox>
      <wl-checkbox label="地推活动" name="type"></wl-checkbox>
      <wl-checkbox label="线下主题活动" name="type"></wl-checkbox>
      <wl-checkbox label="单纯品牌曝光" name="type"></wl-checkbox>
    </wl-checkbox-group>
  </wl-form-item>
  <wl-form-item label="特殊资源">
    <wl-radio-group v-model="form.resource">
      <wl-radio label="线上品牌商赞助"></wl-radio>
      <wl-radio label="线下场地免费"></wl-radio>
    </wl-radio-group>
  </wl-form-item>
  <wl-form-item label="活动形式">
    <wl-input type="textarea" v-model="form.desc"></wl-input>
  </wl-form-item>
  <wl-form-item>
    <wl-button type="primary" @click="onSubmit">立即创建</wl-button>
    <wl-button>取消</wl-button>
  </wl-form-item>
</wl-form>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
```
:::

:::tip
W3C 标准中有如下[规定](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)：
> <i>When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.</i>

即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 `<wl-form>` 标签上添加 `@submit.native.prevent`。
:::

### 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

:::demo 设置 `inline` 属性可以让表单域变为行内的表单域
```html
<wl-form :inline="true" :model="formInline" class="demo-form-inline">
  <wl-form-item label="审批人">
    <wl-input v-model="formInline.user" placeholder="审批人"></wl-input>
  </wl-form-item>
  <wl-form-item label="活动区域">
    <wl-select v-model="formInline.region" placeholder="活动区域">
      <wl-option label="区域一" value="shanghai"></wl-option>
      <wl-option label="区域二" value="beijing"></wl-option>
    </wl-select>
  </wl-form-item>
  <wl-form-item>
    <wl-button type="primary" @click="onSubmit">查询</wl-button>
  </wl-form-item>
</wl-form>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
```
:::

### 对齐方式

根据具体目标和制约因素，选择最佳的标签对齐方式。

:::demo 通过设置 `label-position` 属性可以改变表单域标签的位置，可选值为 `top`、`left`，当设为 `top` 时标签会置于表单域的顶部
```html
<wl-radio-group v-model="labelPosition" size="small">
  <wl-radio-button label="left">左对齐</wl-radio-button>
  <wl-radio-button label="right">右对齐</wl-radio-button>
  <wl-radio-button label="top">顶部对齐</wl-radio-button>
</wl-radio-group>
<div style="margin: 20px;"></div>
<wl-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <wl-form-item label="名称">
    <wl-input v-model="formLabelAlign.name"></wl-input>
  </wl-form-item>
  <wl-form-item label="活动区域">
    <wl-input v-model="formLabelAlign.region"></wl-input>
  </wl-form-item>
  <wl-form-item label="活动形式">
    <wl-input v-model="formLabelAlign.type"></wl-input>
  </wl-form-item>
</wl-form>
<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    }
  }
</script>
```
:::

### 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

:::demo Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)
```html
<wl-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <wl-form-item label="活动名称" prop="name">
    <wl-input v-model="ruleForm.name"></wl-input>
  </wl-form-item>
  <wl-form-item label="活动区域" prop="region">
    <wl-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <wl-option label="区域一" value="shanghai"></wl-option>
      <wl-option label="区域二" value="beijing"></wl-option>
    </wl-select>
  </wl-form-item>
  <wl-form-item label="活动时间" required>
    <wl-col :span="11">
      <wl-form-item prop="date1">
        <wl-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></wl-date-picker>
      </wl-form-item>
    </wl-col>
  </wl-form-item>
  <wl-form-item label="即时配送" prop="delivery">
    <wl-switch v-model="ruleForm.delivery"></wl-switch>
  </wl-form-item>
  <wl-form-item label="活动性质" prop="type">
    <wl-checkbox-group v-model="ruleForm.type">
      <wl-checkbox label="美食/餐厅线上活动" name="type"></wl-checkbox>
      <wl-checkbox label="地推活动" name="type"></wl-checkbox>
      <wl-checkbox label="线下主题活动" name="type"></wl-checkbox>
      <wl-checkbox label="单纯品牌曝光" name="type"></wl-checkbox>
    </wl-checkbox-group>
  </wl-form-item>
  <wl-form-item label="特殊资源" prop="resource">
    <wl-radio-group v-model="ruleForm.resource">
      <wl-radio label="线上品牌商赞助"></wl-radio>
      <wl-radio label="线下场地免费"></wl-radio>
    </wl-radio-group>
  </wl-form-item>
  <wl-form-item label="活动形式" prop="desc">
    <wl-input type="textarea" v-model="ruleForm.desc"></wl-input>
  </wl-form-item>
  <wl-form-item>
    <wl-button type="primary" @click="submitForm('ruleForm')">立即创建</wl-button>
    <wl-button @click="resetForm('ruleForm')">重置</wl-button>
  </wl-form-item>
</wl-form>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
```
:::


:::tip
嵌套在 `wl-form-item` 中的 `wl-form-item` 标签宽度默认为零，不会继承 `wl-form` 的 `label-width`。如果需要可以为其单独设置 `label-width` 属性。
:::

### 表单内组件尺寸控制

通过设置 Form 上的 `size` 属性可以使该表单内所有可调节大小的组件继承该尺寸。Form-Item 也具有该属性。

:::demo 如果希望某个表单项或某个表单组件的尺寸不同于 Form 上的`size`属性，直接为这个表单项或表单组件设置自己的`size`即可。
```html
<wl-form ref="form" :model="sizeForm" label-width="80px" size="mini">
  <wl-form-item label="活动名称">
    <wl-input v-model="sizeForm.name"></wl-input>
  </wl-form-item>
  <wl-form-item label="活动区域">
    <wl-select v-model="sizeForm.region" placeholder="请选择活动区域">
      <wl-option label="区域一" value="shanghai"></wl-option>
      <wl-option label="区域二" value="beijing"></wl-option>
    </wl-select>
  </wl-form-item>
  <wl-form-item label="活动时间">
    <wl-col :span="11">
      <wl-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;"></wl-date-picker>
    </wl-col>
  </wl-form-item>
  <wl-form-item label="活动性质">
    <wl-checkbox-group v-model="sizeForm.type">
      <wl-checkbox-button label="美食/餐厅线上活动" name="type"></wl-checkbox-button>
      <wl-checkbox-button label="地推活动" name="type"></wl-checkbox-button>
      <wl-checkbox-button label="线下主题活动" name="type"></wl-checkbox-button>
    </wl-checkbox-group>
  </wl-form-item>
  <wl-form-item label="特殊资源">
    <wl-radio-group v-model="sizeForm.resource" size="medium">
      <wl-radio border label="线上品牌商赞助"></wl-radio>
      <wl-radio border label="线下场地免费"></wl-radio>
    </wl-radio-group>
  </wl-form-item>
  <wl-form-item size="large">
    <wl-button type="primary" @click="onSubmit">立即创建</wl-button>
    <wl-button>取消</wl-button>
  </wl-form-item>
</wl-form>

<script>
  export default {
    data() {
      return {
        sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  };
</script>
```
:::

### Form Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 `label-width` | string |  right/left/top            | right |
| label-width | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto`。 | string | — | — |
| label-suffix | 表单域标签的后缀 | string | — | — |
| hide-required-asterisk | 是否隐藏必填字段的标签旁边的红色星号 | boolean | — | false |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 是否以行内形式展示校验信息 | boolean | — | false |
| status-icon  | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证 | boolean | — | true |
| size  | 用于控制该表单内组件的尺寸 | string | medium / small / mini | — |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | — | false |

### Form Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))
| validateField | 对部分表单字段进行校验的方法 | Function(props: array \| string, callback: Function(errorMessage: string))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 | Function(props: array \| string)

### Form Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

### Form-Item Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px'。支持 `auto`。 | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |
| rules    | 表单验证规则 | object | — | — |
| error    | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 以行内形式展示校验信息 | boolean | — | false |
| size  | 用于控制该表单域下组件的尺寸 | string | medium / small / mini | - |

### Form-Item Slot
| name | 说明 |
|------|--------|
| — | Form Item 的内容 |
| label | 标签文本的内容 |

### Form-Item Scoped Slot
|  name  |   说明  |
|--------|--------|
|  error | 自定义表单校验信息的显示方式，参数为 { error } |

### Form-Item Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| resetField | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | -
| clearValidate | 移除该表单项的校验结果 | -
