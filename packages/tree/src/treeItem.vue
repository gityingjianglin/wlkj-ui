<template>
  <!-- <div> -->
    <div 
    class="wl-tree-node">
      <!--内容区  -->
      <!--  :style="{paddingLeft: 18 * childItem.level + 'px'}" -->
      <div class="wl-tree-node__content" 
     
      >
        <span
        v-if="childItem.children && childItem.children.length > 0"
        @click.stop="isShowChild(childItem)"
        class="wl-icon-caret-right"
        :class="[
          childItem.isShow ? 'expanded' : ''
        ]"></span>
          <!--  -->
        <wl-checkbox 
         v-show="rootTree.showCheckbox"
        :indeterminate="childItem.disCheck"
        v-model="childItem.checked"
        @change="checked =>handleChecked(checked, childItem)">
      </wl-checkbox>
      <!-- <span v-if="childInfo.parentNode">{{childInfo.parentNode.checked}}</span> -->
      <span 
        @click.stop="isShowChild(childItem)"
        class="wl-tree-node__label">{{childItem.label}}</span>
      </div>
      <!-- {{childInfo.isShow}} -->
      <!-- 子集 -->
      <div 
      v-if="childItem.isShow"
      class="wl-tree-node__children">
        <div v-for="el,index in  childItem.children">
          <treeItem :childItem= el ></treeItem>
        </div>
      </div>
    </div>
  <!-- </wl-checkbox-group> -->
  <!-- </div> -->
</template>

<script>
import wlCheckbox from 'wlkj-ui/packages/checkbox';
export default {
  name: 'treeItem',
  data() {
    return {
      initList: [],
      checkedData: ['三级 1-1-1'],
      childInfo: {}
    };
  },
  components: {
    wlCheckbox
  },
  inject: {
    rootTree: {
      default: ''
    }
  },
  props: {
    childItem: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  mounted() {
  },
  methods: {
    isShowChild(item) {
      if (item.children && item.children.length > 0) {
        if (this.rootTree.accordion) {
        // 只打开一个;当前点击的元素以及期父元素
          this.rootTree.allNode.forEach((el, i) => {
            if (!(el.id === item.parentId || el.id === item.id)) {
              el.isShow = false;
            }
          });
          this.childItem.isShow = !this.childItem.isShow;
        } else {
          this.childItem.isShow = !this.childItem.isShow;
        }
      }
    },
    // 选中某一项
    handleChecked(value, item, index) {
      this.childItem.checked = value;
      let checkData = Object.assign({}, this.childItem);
      delete checkData.parentId;
      delete checkData.id;
      delete checkData.disCheck;
      delete checkData.level;
      delete checkData.isShow;
      delete checkData.checked;
      delete checkData.children;
      this.rootTree.checkChange(checkData, value);
      // ☑ 选中 子要全部选中；父要判断是否旗下的子全部选中了；如果全不选中；父也要选中；否则是半选中状态
      // 取消选中 子要全部取消；父如果是选中状态要改变成半选中状态；父的父也是一样；循环
      /* 更新子节点 */
      if (item.children && item.children.length > 0) {
        this.updateChild(this.childItem.children);
      }
      /* 更新父节点 */
      console.log(item.parentId, 'item.parentId');
      if (item.parentId || item.parentId === 0) {
        this.updateParent(item.parentId, value);
      }
    },
    /**
     * 向上更新父节点
     * @param {*} parentId 父元素id
     * @param {*} checkType 选中的类型
     */
    updateParent(parentId, checkType) {
      let parentNode = this.rootTree.allNode.filter(x => x.id === parentId)[0];
      if (!checkType) {
        // 取消,区分是父元素是版选中的状态还是取消的状态
        let allCanceled = true;
        console.log(parentNode, 'parentNode');
        parentNode.children.forEach(el => {
          if (el.checked) {
            allCanceled = false;
          }
        });
        if (allCanceled) {
          // 全取消
          parentNode.checked = false;
          parentNode.disCheck = false;
        } else {
          // 半选中
          parentNode.checked = false;
          parentNode.disCheck = true;
        }
      } else {
        // 选中 区分是否所有的子元素都被选中，否则
        let allChecked = true;
        console.log(parentNode, 'parentNode');
        parentNode.children.forEach(el => {
          if (!el.checked) {
            allChecked = false;
          }
        });
        console.log(allChecked, 'allChecked');
        if (allChecked) {
          parentNode.checked = true;
          parentNode.disCheck = false;
        } else {
          // 父元素的状态是半选中的状态
          parentNode.checked = false;
          parentNode.disCheck = true;
        }
      }
      if (parentNode.parentId) {
        this.updateParent(parentNode.parentId, checkType);
      }
    },
    // 向下修改子节点状态
    updateChild(childList) {
      console.log(childList, '/////');
      childList.forEach(el => {
        el.checked = !el.checked;
        if (el.children && el.children.length > 0) {
          this.updateChild(el.children);
        }
      });
      console.log(childList, '////更新子节点', this.childItem, this.rootTree.allNode);
    }
  }
};
</script>
