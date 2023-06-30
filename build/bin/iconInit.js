'use strict';

/*
  生成examples/icon.json 文件，文件内容为一维数组，icon class名称截取，示例：["revenue", "profit", "CheckCircleOutline", "..."]
*/

var postcss = require('postcss'); // 样式文件解析为节点node
var fs = require('fs');
var path = require('path');
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');
var nodes = postcss.parse(fontFile).nodes;

/*
  // 测试打印内容
  console.log(nodes);
  nodes = [
    Rule {
      raws: { before: '\n\n', between: ' ', semicolon: true, after: '\n' },
      type: 'rule',
      nodes: [ [Declaration] ],
      parent: Root {
        raws: [Object],
        type: 'root',
        nodes: [Circular *1],
        source: [Object]
      },
      source: { start: [Object], input: [Input], end: [Object] },
      selector: '.wl-icon-revenue:before'
    },
    Rule {
      raws: { before: '\n\n', between: ' ', semicolon: true, after: '\n' },
      type: 'rule',
      nodes: [ [Declaration] ],
      parent: Root {
        raws: [Object],
        type: 'root',
        nodes: [Circular *1],
        source: [Object]
      },
      source: { start: [Object], input: [Input], end: [Object] },
      selector: '.wl-icon-profit:before'
    },
  ]
*/

var classList = [];

nodes.forEach((node) => {
  var selector = node.selector || '';
  var reg = new RegExp(/\.wl-icon-([^:]+):before/);
  var arr = selector.match(reg);

  /*
    测试打印内容
    console.log(arr);
    arr = [
      '.wl-icon-revenue:before',
      'revenue',
      index: 0,
      input: '.wl-icon-revenue:before',
      groups: undefined
    ]
  */

  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});

classList.reverse(); // 希望按 css 文件顺序倒序排列
console.log(classList);
/*
  测试打印内容
  console.log(classList);
  classList = [
  'CalendarFilled', 'AddCircleFilled', 'CaretUpFilled', 'ClockCircleFilled',
  'CaretRightFilled', 'CheckSquareFilled', 'CloseCircleFilled', 'CaretLeftFilled',
  'CheckCircleFilled', 'LockFilled', 'InfoCircleFilled', 'FilterFilled', 'LeftCircleFilled',
  'MinusCircleFilled', 'DeleteFilled', 'UserCircleFilled', 'PlusSquareFilled',
  'CaretDownFilled', 'UnlockFilled', 'SearchFilled', 'RightCircleFilled',
  'MinusSquareFilled', 'UserFilled', 'UserCircleOutline', 'UserOutline',
  'RightOutline', 'LeftOutline', 'LockOutline', 'UpOutlined',
  'SearchOutline', 'UnlockOutline', 'InformationCircleOutline', 'PlusOutlined',
  'DoubleLeftOutline', 'EyeOutline', 'DoubleRightOutline', 'EnvironmentOutline',
  'EllipsisOutlined', 'FilterOutline', 'EyeInvisibleOutline', 'DownOutlined',
  'DragOutline', 'DeleteOutline', 'CloseOutlined', 'CloseCircleOutlined',
  'ClockCircleOutline', 'CheckOutline', 'AddCircleOutline', 'CalendarOutline',
  'CheckCircleOutline', 'profit', 'revenue', '...'
]
*/
fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {});
