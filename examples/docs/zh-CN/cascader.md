## Cascader 级联选择
级联选择框，需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。

### 基础用法

:::demo 

```html
<template>
  <wl-cascader
    v-model="value"
    :options="options"
    @change="handleChange"
    placeholder="不想选"
    size="medium"
    ></wl-cascader>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        options: [{
          value: 'zhinan',
          label: '水果',
          children: [{
            value: 'shejiyuanze',
            label: '苹果',
            children: [{
              value: 'yizhi',
              label: '红苹果'
            }, {
              value: 'fankui',
              label: '绿苹果'
            }, {
              value: 'xiaolv',
              label: '青苹果'
            }, {
              value: 'kekong',
              label: '黄苹果'
            }]
          }, {
            value: 'daohang',
            label: '主食',
            children: [{
              value: 'cexiangdaohang',
              label: '大米'
            }, {
              value: 'dingbudaohang',
              label: '面食'
            }]
          }]
        }, {
          value: 'zujian',
          label: '蔬菜',
          children: [{
            value: 'Basic',
            label: '蔬菜1',
            children: [{
              value: 'layout',
              label: '黄瓜'
            }, {
              value: 'color',
              label: '豆角'
            }, {
              value: 'typography',
              label: '茄子'
            }, {
              value: 'icon',
              label: '土豆'
            }, {
              value: 'button',
              label: '青椒'
            }]
          }, {
            value: 'Form',
            label: '科目',
            children: [{
              value: 'radio',
              label: '语文'
            }, {
              value: 'checkbox',
              label: '数学'
            }, {
              value: 'input',
              label: '英文'
            }, {
              value: 'input-number',
              label: '地理'
            }, {
              value: 'select',
              label: '生物'
            }, {
              value: 'cascader',
              label: '物理'
            }, {
              value: 'switch',
              label: '历史'
            }, {
              value: 'slider',
              label: '代数'
            }, {
              value: 'time-picker',
              label: '俄语'
            }, {
              value: 'date-picker',
              label: '法语'
            }, {
              value: 'datetime-picker',
              label: '泰语'
            }, {
              value: 'upload',
              label: '土耳其语'
            }, {
              value: 'rate',
              label: '阿拉伯语'
            }, {
              value: '科目',
              label: '朝鲜语'
            }]
          }, {
            value: 'data',
            label: '植物',
            children: [{
              value: 'table',
              label: '绿萝'
            }, {
              value: 'tag',
              label: '水仙'
            }, {
              value: 'progress',
              label: '仙人掌'
            }, {
              value: 'tree',
              label: '蒲公英'
            }, {
              value: 'pagination',
              label: '腊梅'
            }, {
              value: 'badge',
              label: '吊兰'
            }]
          }, {
            value: 'notice',
            label: '鲜花',
            children: [{
              value: 'alert',
              label: '玫瑰'
            }, {
              value: 'loading',
              label: '月季'
            }, {
              value: 'message',
              label: '兰花'
            }, {
              value: 'message-box',
              label: '薰衣草'
            }, {
              value: 'notification',
              label: '百合'
            }]
          }, {
            value: 'navigation',
            label: '瓜类',
            children: [{
              value: 'menu',
              label: '西瓜'
            }, {
              value: 'tabs',
              label: '南瓜'
            }, {
              value: 'breadcrumb',
              label: '冬瓜'
            }, {
              value: 'dropdown',
              label: '香瓜'
            }, {
              value: 'steps',
              label: '哈密瓜'
            }]
          }, {
            value: 'others',
            label: '端口',
            children: [{
              value: 'dialog',
              label: '8000'
            }, {
              value: 'tooltip',
              label: '8001'
            }, {
              value: 'popover',
              label: '8002'
            }, {
              value: 'card',
              label: '8003'
            }, {
              value: 'carousel',
              label: '8004'
            }, {
              value: 'collapse',
              label: '8005'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '文具',
          children: [{
            value: 'axure',
            label: '圆珠笔'
          }, {
            value: 'sketch',
            label: '铅笔'
          }, {
            value: 'jiaohu',
            label: '钢笔'
          }]
        }]
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>

```
:::

### 禁用选项
通过在数据源中设置 disabled 字段来声明该选项是禁用的

:::demo 

```html
<template>
  <wl-cascader
    v-model="value"
    :options="options"
    @change="handleChange"
    ></wl-cascader>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        options: [{
          value: 'zhinan',
          disabled: true,
          label: '水果',
          children: [{
            value: 'shejiyuanze',
            label: '苹果',
            children: [{
              value: 'yizhi',
              label: '红苹果'
            }, {
              value: 'fankui',
              label: '绿苹果'
            }, {
              value: 'xiaolv',
              label: '青苹果'
            }, {
              value: 'kekong',
              label: '黄苹果'
            }]
          }, {
            value: 'daohang',
            label: '主食',
            children: [{
              value: 'cexiangdaohang',
              label: '大米'
            }, {
              value: 'dingbudaohang',
              label: '面食'
            }]
          }]
        }, {
          value: 'zujian',
          label: '蔬菜',
          children: [{
            value: 'Basic',
            label: '蔬菜1',
            children: [{
              value: 'layout',
              label: '黄瓜'
            }, {
              value: 'color',
              label: '豆角'
            }, {
              value: 'typography',
              label: '茄子'
            }, {
              value: 'icon',
              label: '土豆'
            }, {
              value: 'button',
              label: '青椒'
            }]
          }, {
            value: 'Form',
            label: '科目',
            children: [{
              value: 'radio',
              label: '语文'
            }, {
              value: 'checkbox',
              label: '数学'
            }, {
              value: 'input',
              label: '英文'
            }, {
              value: 'input-number',
              label: '地理'
            }, {
              value: 'select',
              label: '生物'
            }, {
              value: 'cascader',
              label: '物理'
            }, {
              value: 'switch',
              label: '历史'
            }, {
              value: 'slider',
              label: '代数'
            }, {
              value: 'time-picker',
              label: '俄语'
            }, {
              value: 'date-picker',
              label: '法语'
            }, {
              value: 'datetime-picker',
              label: '泰语'
            }, {
              value: 'upload',
              label: '土耳其语'
            }, {
              value: 'rate',
              label: '阿拉伯语'
            }, {
              value: '科目',
              label: '朝鲜语'
            }]
          }, {
            value: 'data',
            label: '植物',
            children: [{
              value: 'table',
              label: '绿萝'
            }, {
              value: 'tag',
              label: '水仙'
            }, {
              value: 'progress',
              label: '仙人掌'
            }, {
              value: 'tree',
              label: '蒲公英'
            }, {
              value: 'pagination',
              label: '腊梅'
            }, {
              value: 'badge',
              label: '吊兰'
            }]
          }, {
            value: 'notice',
            label: '鲜花',
            children: [{
              value: 'alert',
              label: '玫瑰'
            }, {
              value: 'loading',
              label: '月季'
            }, {
              value: 'message',
              label: '兰花'
            }, {
              value: 'message-box',
              label: '薰衣草'
            }, {
              value: 'notification',
              label: '百合'
            }]
          }, {
            value: 'navigation',
            label: '瓜类',
            children: [{
              value: 'menu',
              label: '西瓜'
            }, {
              value: 'tabs',
              label: '南瓜'
            }, {
              value: 'breadcrumb',
              label: '冬瓜'
            }, {
              value: 'dropdown',
              label: '香瓜'
            }, {
              value: 'steps',
              label: '哈密瓜'
            }]
          }, {
            value: 'others',
            label: '端口',
            children: [{
              value: 'dialog',
              label: '8000'
            }, {
              value: 'tooltip',
              label: '8001'
            }, {
              value: 'popover',
              label: '8002'
            }, {
              value: 'card',
              label: '8003'
            }, {
              value: 'carousel',
              label: '8004'
            }, {
              value: 'collapse',
              label: '8005'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '文具',
          children: [{
            value: 'axure',
            label: '圆珠笔'
          }, {
            value: 'sketch',
            label: '铅笔'
          }, {
            value: 'jiaohu',
            label: '钢笔'
          }]
        }]
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>

```
:::

### 可清空
通过 clearable 设置输入框可清空

:::demo 

```html
<template>
  <wl-cascader
    v-model="value"
    :options="options"
    clearable
    @change="handleChange"
    ></wl-cascader>
</template>

<script>
  export default {
    data() {
      return {
        value: ['zhinan', 'shejiyuanze', 'yizhi'],
        options: [{
          value: 'zhinan',
          disabled: false,
          label: '水果',
          children: [{
            value: 'shejiyuanze',
            label: '苹果',
            children: [{
              value: 'yizhi',
              label: '红苹果'
            }, {
              value: 'fankui',
              label: '绿苹果'
            }, {
              value: 'xiaolv',
              label: '青苹果'
            }, {
              value: 'kekong',
              label: '黄苹果'
            }]
          }, {
            value: 'daohang',
            label: '主食',
            children: [{
              value: 'cexiangdaohang',
              label: '大米'
            }, {
              value: 'dingbudaohang',
              label: '面食'
            }]
          }]
        }, {
          value: 'zujian',
          label: '蔬菜',
          children: [{
            value: 'Basic',
            label: '蔬菜1',
            children: [{
              value: 'layout',
              label: '黄瓜'
            }, {
              value: 'color',
              label: '豆角'
            }, {
              value: 'typography',
              label: '茄子'
            }, {
              value: 'icon',
              label: '土豆'
            }, {
              value: 'button',
              label: '青椒'
            }]
          }, {
            value: 'Form',
            label: '科目',
            children: [{
              value: 'radio',
              label: '语文'
            }, {
              value: 'checkbox',
              label: '数学'
            }, {
              value: 'input',
              label: '英文'
            }, {
              value: 'input-number',
              label: '地理'
            }, {
              value: 'select',
              label: '生物'
            }, {
              value: 'cascader',
              label: '物理'
            }, {
              value: 'switch',
              label: '历史'
            }, {
              value: 'slider',
              label: '代数'
            }, {
              value: 'time-picker',
              label: '俄语'
            }, {
              value: 'date-picker',
              label: '法语'
            }, {
              value: 'datetime-picker',
              label: '泰语'
            }, {
              value: 'upload',
              label: '土耳其语'
            }, {
              value: 'rate',
              label: '阿拉伯语'
            }, {
              value: '科目',
              label: '朝鲜语'
            }]
          }, {
            value: 'data',
            label: '植物',
            children: [{
              value: 'table',
              label: '绿萝'
            }, {
              value: 'tag',
              label: '水仙'
            }, {
              value: 'progress',
              label: '仙人掌'
            }, {
              value: 'tree',
              label: '蒲公英'
            }, {
              value: 'pagination',
              label: '腊梅'
            }, {
              value: 'badge',
              label: '吊兰'
            }]
          }, {
            value: 'notice',
            label: '鲜花',
            children: [{
              value: 'alert',
              label: '玫瑰'
            }, {
              value: 'loading',
              label: '月季'
            }, {
              value: 'message',
              label: '兰花'
            }, {
              value: 'message-box',
              label: '薰衣草'
            }, {
              value: 'notification',
              label: '百合'
            }]
          }, {
            value: 'navigation',
            label: '瓜类',
            children: [{
              value: 'menu',
              label: '西瓜'
            }, {
              value: 'tabs',
              label: '南瓜'
            }, {
              value: 'breadcrumb',
              label: '冬瓜'
            }, {
              value: 'dropdown',
              label: '香瓜'
            }, {
              value: 'steps',
              label: '哈密瓜'
            }]
          }, {
            value: 'others',
            label: '端口',
            children: [{
              value: 'dialog',
              label: '8000'
            }, {
              value: 'tooltip',
              label: '8001'
            }, {
              value: 'popover',
              label: '8002'
            }, {
              value: 'card',
              label: '8003'
            }, {
              value: 'carousel',
              label: '8004'
            }, {
              value: 'collapse',
              label: '8005'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '文具',
          children: [{
            value: 'axure',
            label: '圆珠笔'
          }, {
            value: 'sketch',
            label: '铅笔'
          }, {
            value: 'jiaohu',
            label: '钢笔'
          }]
        }]
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>

```
:::

### 仅显示最后一级
可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。

:::demo 

```html
<template>
  <wl-cascader
    v-model="value"
    :options="options"
    :showAllLevels="false"
    clearable
    @change="handleChange"
    ></wl-cascader>
</template>

<script>
  export default {
    data() {
      return {
        value: ['zhinan', 'shejiyuanze', 'yizhi'],
        options: [{
          value: 'zhinan',
          disabled: false,
          label: '水果',
          children: [{
            value: 'shejiyuanze',
            label: '苹果',
            children: [{
              value: 'yizhi',
              label: '红苹果'
            }, {
              value: 'fankui',
              label: '绿苹果'
            }, {
              value: 'xiaolv',
              label: '青苹果'
            }, {
              value: 'kekong',
              label: '黄苹果'
            }]
          }, {
            value: 'daohang',
            label: '主食',
            children: [{
              value: 'cexiangdaohang',
              label: '大米'
            }, {
              value: 'dingbudaohang',
              label: '面食'
            }]
          }]
        }, {
          value: 'zujian',
          label: '蔬菜',
          children: [{
            value: 'Basic',
            label: '蔬菜1',
            children: [{
              value: 'layout',
              label: '黄瓜'
            }, {
              value: 'color',
              label: '豆角'
            }, {
              value: 'typography',
              label: '茄子'
            }, {
              value: 'icon',
              label: '土豆'
            }, {
              value: 'button',
              label: '青椒'
            }]
          }, {
            value: 'Form',
            label: '科目',
            children: [{
              value: 'radio',
              label: '语文'
            }, {
              value: 'checkbox',
              label: '数学'
            }, {
              value: 'input',
              label: '英文'
            }, {
              value: 'input-number',
              label: '地理'
            }, {
              value: 'select',
              label: '生物'
            }, {
              value: 'cascader',
              label: '物理'
            }, {
              value: 'switch',
              label: '历史'
            }, {
              value: 'slider',
              label: '代数'
            }, {
              value: 'time-picker',
              label: '俄语'
            }, {
              value: 'date-picker',
              label: '法语'
            }, {
              value: 'datetime-picker',
              label: '泰语'
            }, {
              value: 'upload',
              label: '土耳其语'
            }, {
              value: 'rate',
              label: '阿拉伯语'
            }, {
              value: '科目',
              label: '朝鲜语'
            }]
          }, {
            value: 'data',
            label: '植物',
            children: [{
              value: 'table',
              label: '绿萝'
            }, {
              value: 'tag',
              label: '水仙'
            }, {
              value: 'progress',
              label: '仙人掌'
            }, {
              value: 'tree',
              label: '蒲公英'
            }, {
              value: 'pagination',
              label: '腊梅'
            }, {
              value: 'badge',
              label: '吊兰'
            }]
          }, {
            value: 'notice',
            label: '鲜花',
            children: [{
              value: 'alert',
              label: '玫瑰'
            }, {
              value: 'loading',
              label: '月季'
            }, {
              value: 'message',
              label: '兰花'
            }, {
              value: 'message-box',
              label: '薰衣草'
            }, {
              value: 'notification',
              label: '百合'
            }]
          }, {
            value: 'navigation',
            label: '瓜类',
            children: [{
              value: 'menu',
              label: '西瓜'
            }, {
              value: 'tabs',
              label: '南瓜'
            }, {
              value: 'breadcrumb',
              label: '冬瓜'
            }, {
              value: 'dropdown',
              label: '香瓜'
            }, {
              value: 'steps',
              label: '哈密瓜'
            }]
          }, {
            value: 'others',
            label: '端口',
            children: [{
              value: 'dialog',
              label: '8000'
            }, {
              value: 'tooltip',
              label: '8001'
            }, {
              value: 'popover',
              label: '8002'
            }, {
              value: 'card',
              label: '8003'
            }, {
              value: 'carousel',
              label: '8004'
            }, {
              value: 'collapse',
              label: '8005'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '文具',
          children: [{
            value: 'axure',
            label: '圆珠笔'
          }, {
            value: 'sketch',
            label: '铅笔'
          }, {
            value: 'jiaohu',
            label: '钢笔'
          }]
        }]
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>

```
:::

### Cascader Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model    | 选中项绑定值  |  -   |   —  | —  |
| options     | 可选项数据源，键名可通过 Props 属性配置   | array    | — | —  |
| props     | 配置选项，具体见下表 | object    | — |  —  |
| size     | 尺寸   | string    | medium / small / mini | -   |
| placeholder  | 输入框占位文本 | string   |  —  | 请选择 |
| clearable  | 是否支持清空选项 | boolean   |  —  | false |
| showAllLevels  | 输入框中是否显示选中值的完整路径 | boolean   |  —  | true |

### Cascader Events
| 事件名称      | 说明    | 回调参数   |
|---------- |-------- |---------- |
| change      | 当选中节点变化时触发   | 选中节点的值   |