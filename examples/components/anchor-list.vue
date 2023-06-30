<template>
  <div class="anchor-box">
    <div v-for="item in anchorList" :class="{'active': item.active}" @click="anchorClick(item)">
      <a :href="item.href" >{{ item.text }}</a>
    </div>
  </div>
</template>

<style lang="scss">
  .anchor-box {
    position: fixed;
    right: 30px;
    top: 114px;
    width: 130px;
    line-height: 20px;
    div {
      overflow: hidden;
      max-width: 130px;
      height: 21px;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 13px;
      border-left: 2px solid #ccc;
    }
    div.active {
      border-left-color: #409EFF;
      a {
        color: #409EFF;
      }
    }
    a {
      color: #999;
      font-size: 12px;
    }
  }
</style>

<script type="text/babel">
  export default {
    data() {
      return {
        anchorList: []
      };
    },
    props: {
      datas: {
        type: [Array, NodeList],
        default: () => {
          return [];
        }
      }
    },
    methods: {
      anchorClick(item) {
        // 存储锚点是通过点击的方式定位的
        localStorage.setItem('anchorClick', 'T');
        this.anchorList.forEach((item) => {
          item.active = false;
        });
        item.active = true;
      }
    },

    computed: {
    },

    watch: {
      datas(newVal) {
        this.anchorList = newVal;
      }
    },

    created() {
      this.anchorList = this.datas;
    },

    mounted() {
    },

    beforeDestroy() {
    }
  };
</script>
