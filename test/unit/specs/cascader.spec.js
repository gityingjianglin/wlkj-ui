import { createTest, createVue, waitImmediate, destroyVM } from '../util';
import Cascader from 'packages/cascader';

// describe： 定义一个测试套件
// it：定义一个测试用例
// expect：断言的判断条件
// toBe：断言的比较结果
// exist 存在
describe('Cascader', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('size', () => {
    vm = createTest(Cascader, {
      size: 'medium'
    }, true);
    let CascaderElm = vm.$el;
    expect(CascaderElm.classList.contains('wl-cascader--medium')).to.be.true;
  });

  it('placeholder', () => {
    vm = createTest(Cascader, {
      placeholder: '不选择'
    }, true);
    // let CascaderElm = vm.$el;
    console.log('CascaderElm', vm.$refs.reference.$refs.input.getAttribute('placeholder'));
    expect(vm.$refs.reference.$refs.input.getAttribute('placeholder')).to.be.equals('不选择');
    // vm = createVue({
    //   template: `
    //   <wl-cascader :placeholder="placeholder" ref="cascaderDom"></wl-cascader>
    //   `,
    //   data() {
    //     return {
    //       placeholder: '不选择',
    //       value: []
    //     };
    //   }
    // });
    // let cascaderDom = vm.$refs.cascaderDom.$el;
    // let inputElm = cascaderDom.querySelector('.wl-input__inner');
    // expect(inputElm.getAttribute('placeholder')).to.be.equals('不选择');
  });

  it('clearable', async() => {
    vm = createVue({
      template: `
      <wl-cascader clearable :value="value" :options="options"></wl-cascader>
      `,
      data() {
        return {
          placeholder: '不选择',
          value: ['zhinan', 'shejiyuanze', 'yizhi'],
          options: [{
            value: 'zhinan',
            disabled: false,
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              },
              {
                value: 'loading',
                label: 'Loading 加载'
              },
              {
                value: 'message',
                label: 'Message 消息提示'
              },
              {
                value: 'message-box',
                label: 'MessageBox 弹框'
              },
              {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }]
        };
      }
    });
    let cascaderDom = vm.$el;
    await waitImmediate();
    let inputElm = cascaderDom.querySelector('.wl-input__inner');
    console.log(inputElm.value, '123456');
    // var a = 1;
    inputElm.addEventListener('focus', function() {
      console.log('事件执行');
      // a++;
    });
    const event = new window.MouseEvent('focus');
    inputElm.dispatchEvent(event);
    await waitImmediate();
    let inputClearElm = cascaderDom.querySelector('.wl-input__clear');
    inputClearElm.addEventListener('click', function() {
      console.log('cleader执行');
    });
    const eventClear = new window.MouseEvent('click');
    inputClearElm.dispatchEvent(eventClear);
    await waitImmediate();
    console.log(inputElm.value, '789');
    expect(inputElm.value).to.be.equals('');
  });

  it('value', async() => {
    vm = createVue({
      template: `
      <wl-cascader clearable :value="value" :options="options"></wl-cascader>
      `,
      data() {
        return {
          placeholder: '不选择',
          value: ['zhinan', 'shejiyuanze', 'yizhi'],
          options: [{
            value: 'zhinan',
            disabled: false,
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              },
              {
                value: 'loading',
                label: 'Loading 加载'
              },
              {
                value: 'message',
                label: 'Message 消息提示'
              },
              {
                value: 'message-box',
                label: 'MessageBox 弹框'
              },
              {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }]
        };
      }
    });
    let cascaderDom = vm.$el;
    await waitImmediate();
    let inputElm = cascaderDom.querySelector('.wl-input__inner');
    console.log(inputElm.value, '123456');
    expect(inputElm.value).to.be.equals('指南/设计原则/一致');
  });

});
