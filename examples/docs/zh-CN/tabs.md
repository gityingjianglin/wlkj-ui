## Tabs 标签页
分隔内容上有关联但属于不同类别的数据集合。

### 基础用法
基础的、简洁的标签页。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 value 属性来指定当前选中的标签页。

```html
<template>
   <wl-tabs v-model="activeName"  @tab-click="handleClick">
    <wl-tab-pane label="用户" name="first" disabled>用户</wl-tab-pane>
    <wl-tab-pane label="配置管理" name="second">配置管理</wl-tab-pane>
    <wl-tab-pane label="角色管理" name="third">角色管理</wl-tab-pane>
    <wl-tab-pane label="定时任务补偿"  name="fourth">定时任务补偿</wl-tab-pane>
  </wl-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, $event) {
        console.log(tab, $event, '????????');
      }
    }
  };
</script>

```
:::

### 选项卡样式
选项卡样式的标签页。

:::demo 只需要设置 type 属性为 card 就可以使选项卡改变为标签风格。

```html
<template>
   <wl-tabs v-model="activeName" type="card"  @tab-click="handleClick">
    <wl-tab-pane label="用户" name="first">用户</wl-tab-pane>
    <wl-tab-pane label="配置管理" name="second">配置管理</wl-tab-pane>
    <wl-tab-pane label="角色管理" name="third">角色管理</wl-tab-pane>
    <wl-tab-pane label="定时任务补偿"  name="fourth">定时任务补偿</wl-tab-pane>
  </wl-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, $event) {
        console.log(tab, $event, '????????');
      }
    }
  };
</script>

```
:::

### 位置
可以通过 tab-position 设置标签的位置

:::demo 标签一共有四个方向的设置 tabPosition="left|right|top|bottom"

```html
<template>
  <!-- <wl-radio-group v-modwl="tabPosition" style="margin-bottom: 30px;">
    <wl-radio-button label="top">top</wl-radio-button>
    <wl-radio-button label="right">right</wl-radio-button>
    <wl-radio-button label="bottom">bottom</wl-radio-button>
    <wl-radio-button label="left">left</wl-radio-button>
  </wl-radio-group> -->
  <div style="margin-bottom: 30px;">
  <wl-button label="top" @click="changePosition('top')">top</wl-button>
  <wl-button label="top" @click="changePosition('right')">right</wl-button>
  <wl-button label="top" @click="changePosition('bottom')">123</wl-button>
  <wl-button label="top" @click="changePosition('left')">left</wl-button>
</div>
  <wl-tabs :tab-position="tabPosition"  style="height: 200px;">
    <wl-tab-pane label="用户管理" name="first">用户管理</wl-tab-pane>
    <wl-tab-pane label="配置管理" name="second">配置管理</wl-tab-pane>
    <wl-tab-pane label="角色管理" name="third">角色管理</wl-tab-pane>
    <wl-tab-pane label="定时任务补偿" disabled name="fourth">定时任务补偿</wl-tab-pane>
  </wl-tabs>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'left'
      };
    },
    methods: {
      changePosition(value) {
        this.tabPosition = value
      }
    }
  };
</script>

```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model     | 绑定值，选中选项卡的 name   | string  |  — |  第一个选项卡的 name  |
| type     | 风格类型   | string    | card | —   |
| tab-position     | 选项卡所在位置   | string    | top/right/bottom/left | top   |

### Tabs  Events
| 事件名称  | 说明    | 回调参数     |
|---------- |-------- |---------- |
| tab-click     | tab 被选中时触发   | 被选中的标签 tab 值对象 |

### Tab-pane Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选项卡标题   | string  |  — |  —  |
| name     | 与选项卡绑定值 value 对应的标识符，表示选项卡别名  | string    | — | —  |
| disabled     | 是否禁用   | boolean |  — |  fasle |