## Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

### 基础用法
基础的树形结构展示。
:::demo 

```html
<template>
  <wl-tree :data="treeData" accordion :props="defaultProps" ></wl-tree>
</template>

<script>
  export default {
    data () {
      return {
        treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  }
</script>
```
:::

### 可选择
适用于需要选择层级时使用。
:::demo 

```html
<template>
  <wl-tree :data="treeData" show-checkbox :props="defaultProps" ></wl-tree>
</template>

<script>
  export default {
    data () {
      return {
        treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  }
</script>
```
:::

### 手风琴模式
对于同一级的节点，每次只能展开一个
:::demo 

```html
<template>
  <wl-tree :data="treeData" accordion  :props="defaultProps" ></wl-tree>
</template>

<script>
  export default {
    data () {
      return {
        treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  }
</script>
```
:::

### Tree Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data | 展示数据 | array | — | — |
| accordion     | 是否每次只打开一个同级树节点展开 | boolean   |       —        |     false  |
| show-checkbox  | 节点是否可被选择 | boolean   | — | false   |

### Tree Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| check-change  | 节点选中状态发生变化时的回调 |  共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中  |