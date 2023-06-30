<template>
  <div class="wl-tree">
    <!-- <wl-checkbox-group> -->
      <!-- <treeItem :childData="initData" :accordion="accordion"></treeItem> -->
      <div v-for="item,index in  initData">
        <treeItem  :childItem= item ></treeItem>
      </div>
    <!-- </wl-checkbox-group> -->
    <!-- <div class="wl-tree-node">
      <div class="wl-tree-node__content">
        <span class="expanded  wl-icon-caret-right"></span>
        <span class="wl-tree-node__label">一级1</span>
      </div>
      <div class="wl-tree-node__children">
        <div class="wl-tree-node">
          <div class="wl-tree-node__content" style="padding-left: 18px;">
            <span class="expanded  wl-icon-caret-right"></span>
            <span class="wl-tree-node__label">二级1</span>
          </div>
          <div class="wl-tree-node__children">
            <div class="wl-tree-node">
              <div class="wl-tree-node__content" style="padding-left: 36px;">
                <span class="expanded  wl-icon-caret-right"></span>
                <span class="wl-tree-node__label">二级1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import treeItem from './treeItem.vue';
export default {
  name: 'WlTree',
  data() {
    return {
      initData: '',
      allNode: [],
      accordionFlag: false
    };
  },
  provide() {
    return {
      rootTree: this
    };
  },
  components: {
    treeItem
  },
  props: {
    data: {
      type: Array
    },
    accordion: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    let temp = this.data;
    // let temp = JSON.parse(JSON.stringify(this.data));
    temp.forEach((el, i) => {
      el.parentId = '';
      el.id = i.toString();
      el.disCheck = false;
      el.level = el.level ? el.level : 0;
      if (el.children && el.children.length > 0) {
        el.isShow = false;
        // this.$set(el, 'isShow', false)
        el.checked = false;
        this.setLevel(el);
        // this.setChildData(el);
      }
    });
    this.initData = JSON.parse(JSON.stringify(temp));
    // this.initData = temp;
    this.getAllData();
  },
  methods: {
    // 递归循环添加节点
    setChildData(parentItem) {
      parentItem.children.forEach((el, k) => {
        el.id = `${parentItem.id}-${k}`;
        // el.parentNode = parentItem;
        el.parentId = parentItem.id;
        el.disCheck = false;
        el.isShow = false;
        if (el.children && el.children.length > 0) {
          this.setChildData(el);
        }
      });
    },
    // 递归添加层级；
    setLevel(el) {
      el.children.forEach((item, k) => {
        item.level = el.level + 1;
        item.checked = false;
        item.id = `${el.id}-${k}`;
        item.parentId = el.id;
        item.disCheck = false;
        item.isShow = false;
        console.log(item.level, el.level + 1);
        if (item.children && item.children.length > 0) {
          this.setLevel(item);
        }
      });
    },
    getAllData() {
      this.initData.forEach((el, i) => {
        this.allNode.push(el);
        if (el.children && el.children.length > 0) {
          this.pushChild(el);
        }
      });
    },
    pushChild(el) {
      el.children.forEach((item, k) => {
        this.allNode.push(item);
        if (item.children && item.children.length > 0) {
          this.pushChild(item);
        }
      });
    },
    // check-change 事件
    checkChange(data, checked) {
      this.$emit('checkChange', data, checked);
    }
  },
  created() {
    this.accordionFlag = this.accordion;
  },
  watch: {
    data: {
      handler: function(newValue, oldValue) {
        console.log(newValue, oldValue);
      },
      deep: true
    }
  }
};
</script>
