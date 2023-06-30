## Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

### 线形进度条

:::demo Progress 组件设置`percentage`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。进度条宽度可根据容器元素的宽度自适应。

```html
<wl-row>
  <wl-col :span="24">
    <wl-progress :percentage="70"></wl-progress>
    <wl-progress :percentage="100" status="success"></wl-progress>
    <wl-progress :percentage="100" status="warning"></wl-progress>
    <wl-progress :percentage="50" status="exception"></wl-progress>
  </wl-col>
  <wl-col :span="6">
    <wl-progress :percentage="30"></wl-progress>
    <wl-progress :percentage="60" status="success"></wl-progress>
    <wl-progress :percentage="80" status="warning"></wl-progress>
    <wl-progress :percentage="50" status="exception"></wl-progress>
  </wl-col>
</wl-row>
```
:::

### 动态展示

:::demo 通过动态设置`percentage`属性控制进度条的显示长度。

```html
<wl-row>
  <wl-col :span="24">
    <wl-progress :percentage="percentage"></wl-progress>
  </wl-col>
  <wl-col :span="24">
    <wl-button icon="wl-icon-minus" @click="decrease">-</wl-button>
    <wl-button icon="wl-icon-PlusOutlined" @click="increase"></wl-button>
  </wl-col>
</wl-row>
<script>
  export default {
    data() {
      return {
        percentage: 10
      };
    },
    methods: {
      increase() {
        this.percentage += 10;
        if (this.percentage > 100) {
          this.percentage = 100;
        }
      },
      decrease() {
        this.percentage -= 10;
        if (this.percentage < 0) {
          this.percentage = 0;
        }
      }
    }
  }
</script>
```
:::

### 百分比内显

百分比不占用额外控件，适用于文件上传等场景。

:::demo Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来将进度条描述置于进度条内部。

```html
<wl-progress :text-inside="true" :stroke-width="30" :percentage="30"></wl-progress>
<wl-progress :text-inside="true" :stroke-width="26" :percentage="100" status="success"></wl-progress>
<wl-progress :text-inside="true" :stroke-width="22" :percentage="70" status="warning"></wl-progress>
<wl-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></wl-progress>
```
:::


### 环形进度条

Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小，`stroke-width` 属性更改进度条的高度。

:::demo

```html
<div>
  <wl-progress type="circle" :percentage="68" ></wl-progress>
  <wl-progress type="circle" :percentage="100" status="success"></wl-progress>
  <wl-progress type="circle" :percentage="50" status="exception"></wl-progress>
</div>
<div>
  <wl-progress type="circle" :percentage="68" :width="80" :stroke-width="3"></wl-progress>
  <wl-progress type="circle" :percentage="100" :width="80" :stroke-width="3" status="success"></wl-progress>
  <wl-progress type="circle" :percentage="50" :width="80" :stroke-width="3" status="exception"></wl-progress>
</div>
```
:::

### 仪表盘形进度条

:::demo 通过 `type` 属性来指定使用仪表盘形进度条。

```html

<wl-progress type="dashboard" :percentage="percentage" :color="colors"></wl-progress>
<div>
  <div>
    <wl-button icon="wl-icon-minus" @click="decrease">-</wl-button>
    <wl-button icon="wl-icon-PlusOutlined" @click="increase"></wl-button>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        percentage: 10,
        colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ]
      };
    },
    methods: {
      increase() {
        this.percentage += 10;
        if (this.percentage > 100) {
          this.percentage = 100;
        }
      },
      decrease() {
        this.percentage -= 10;
        if (this.percentage < 0) {
          this.percentage = 0;
        }
      }
    }
  }
</script>
```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| **percentage** | **百分比（必填）**   | number         |     0-100          |     0    |
| type          | 进度条类型           | string         | line/circle/dashboard | line |
| stroke-width  | 进度条的宽度，单位 px | number          | — | 6 |
| text-inside  | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | — | false |
| status  | 进度条当前状态 | string | success/exception/warning | — |
| width  | 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） | number |  | 126 |
| show-text  | 是否显示进度条文字内容 | boolean | — | true |
| stroke-linecap  | circle/dashboard 类型路径两端的形状 | string | butt/round/square | round |
| format  | 指定进度条文字内容 | function(percentage) | — | — |