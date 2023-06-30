import { createVue, destroyVM, wait} from '../util';
// import Tree from 'packages/tree';

// describe： 定义一个测试套件
// it：定义一个测试用例
// expect：断言的判断条件
// toBe：断言的比较结果
// exist 存在
describe('Tree', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('showCheckbox', async() => {
    vm = createVue({
      template: `
        <wl-tree :data="treeData"  showCheckbox></wl-tree>
      `,
      data() {
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
          }]
        };
      }
    });
    let treeElm = vm.$el;
    await wait();
    let checkElm = treeElm.querySelector('.wl-checkbox');
    expect(checkElm).to.be.exist;
  });
  it('accordion', async() => {
    vm = createVue({
      template: `
        <wl-tree :data="treeData"  accordion></wl-tree>
      `,
      data() {
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
          }]
        };
      }
    });
    let treeElm = vm.$el;
    await wait();
    let checkElm = treeElm.querySelector('.wl-checkbox');
    expect(checkElm).to.be.exist;
  });
});
